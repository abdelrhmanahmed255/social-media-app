import { NextFunction, Request, Response } from "express";
import { IUser } from "../common";
import userModel from "../database/model/user.model";
import { DatabaseRepository } from "../database/repository/database.repository";
import { userRequest } from "./auth.middleware";
import { BadRequetException } from "../common/exceptions/error.exceptions";

let userRepostartory = new DatabaseRepository<IUser>(userModel);

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userReq = req as userRequest;
      let userData = await userRepostartory.findById({ id: userReq.user.id });

      if (!userData) {
        throw new BadRequetException("user not found");
      }

      if (!roles.includes(String((userData as IUser).role))) {
        throw new BadRequetException("unauthorized");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
