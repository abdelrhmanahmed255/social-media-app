import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequetException } from "../exceptions/error.exceptions";

type validationKey = keyof Request;
type validationSchema = Partial<Record<validationKey, ZodType>>;

export const Validation = (schema: validationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationError: unknown[] = [];

    for (const key of Object.keys(schema) as validationKey[]) {
      if (!schema[key]) continue;

      const result = schema[key]!.safeParse(req[key]);
      if (!result.success) {
        validationError.push({
          key,
          errors: result.error.issues,
        });
      } else {
        (req as any)[key] = result.data;
      }
    }

    if (validationError.length) {
      throw new BadRequetException("validation error", validationError);
    }

    return next();
  };
};
