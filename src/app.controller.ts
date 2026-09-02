import { Express, Request, Response, Router } from "express";
import cors from "cors";
import express from "express";
// import { bootstrapGraphQL } from "./module/gql";
import authRouter from "./module/auth/auth.controller";
import postsRouter from "./module/posts/posts.controller";
import commentsRouter from "./module/comments/comments.controller";
import friendsRouter from "./module/friends/friends.controller";
import userRouter from "./module/user/user.controller";



export const bootstrap = (app: Express) => {
  app.use(cors());
  app.use(express.json());
 

  const router: Router = Router();

  router.get("/", (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Social Media API is running",
    });
  });

  // bootstrapGraphQL(app); 

  app.use("/api", router);
  app.use("/api/auth", authRouter);
  app.use("/api/posts", postsRouter);
  app.use("/api/comments", commentsRouter);
  app.use("/api/friends", friendsRouter);
  app.use("/api/user", userRouter);
};
