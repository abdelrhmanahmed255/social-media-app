import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { Readable } from "stream";
import { bootstrap } from "./app.controller";
import { connectDB } from "./database/connection";
import { env } from "./config/env.service";
import { s3Service } from "./common/service/s3.service";
import { BadRequetException } from "./common/exceptions/error.exceptions";
import { errorHanling, asyncHandler } from "./middleware/errorHanling";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();

const start = async () => {
  await connectDB();
  bootstrap(app);

  app.get(
    "/uploads/*",
    asyncHandler(async (req: Request, res: Response) => {
      console.log(req.params);

      const pathParam = req.params[0] ?? (req.params as { path?: string }).path;

      let filePath: string[] =
        typeof pathParam === "string" ? pathParam.split("/") : [];

      console.log(filePath);

      if (!filePath?.length) {
        throw new BadRequetException("path not found");
      }

      const key = filePath.join("/");
      const data = await s3Service.getFile({ Key: key });

      if (data.ContentType) {
        res.setHeader("Content-Type", data.ContentType);
      }

      if (data.Body) {
        return (data.Body as Readable).pipe(res);
      }

      throw new BadRequetException("file not found");
    })
  );

  app.use(errorHanling);

  app.listen(env.port, () => {
    console.log(`server is running on port ${env.port}`);
  });
};

start();
