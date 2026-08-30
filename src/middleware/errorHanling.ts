import { NextFunction, Request, Response } from "express";
import { AppException } from "../common/exceptions/error.exceptions";

export const errorHanling = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err instanceof AppException ? err.statusCode : 500;

  const cause =
    err instanceof AppException ? err.cause : undefined;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    cause,
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
