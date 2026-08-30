import { NextFunction, Request, Response } from "express";
import { BadRequetException } from "../common/exceptions/error.exceptions";
import { TokenService } from "../common/service/token.service";
import { JwtPayload } from "jsonwebtoken";

export interface userRequest extends Request {
  user: JwtPayload & { id: string };
}

const tokenService = new TokenService();

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new BadRequetException("token not found");
    }

    const [flag, token] = req.headers.authorization.split(" ");

    if (flag !== "Bearer" || !token) {
      throw new BadRequetException("token not valid");
    }

    const decodedData = tokenService.verifyAccessToken(token);

    if (!decodedData || !decodedData.id) {
      throw new BadRequetException("token not valid");
    }

    (req as userRequest).user = decodedData as JwtPayload & { id: string };
    next();
  } catch (error) {
    next(error);
  }
};
