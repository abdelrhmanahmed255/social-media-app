import { z } from "zod";

export const signupSchema = {
  body: z
    .strictObject({
      userName: z.string().min(5, { error: "username must be at least 5 characters" }),
      email: z.email(),
      password: z.string(),
      phone: z.string(),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "password not matched",
          path: ["confirmPassword"],
        });
      }
    }),
};

export const loginSchema = {
  body: z.strictObject({
    email: z.email(),
    password: z.string(),
  }),
};

export const refreshTokenSchema = {
  body: z.strictObject({
    refreshToken: z.string().min(1),
  }),
};

export const getUserParamsSchema = {
  params: z.strictObject({
    id: z.string().min(1),
  }),
};

export type SignupBody = z.infer<typeof signupSchema.body>;
export type LoginBody = z.infer<typeof loginSchema.body>;
export type RefreshTokenBody = z.infer<typeof refreshTokenSchema.body>;
