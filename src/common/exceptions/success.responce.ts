import { Response } from "express";

export const SuccessResponse = <T>({
  res,
  message,
  status = 200,
  data,
}: {
  res: Response;
  message: string;
  status?: number;
  data?: T;
}) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};
