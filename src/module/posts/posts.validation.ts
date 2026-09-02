import { z } from "zod";

export const createPostSchema = {
  body: z.strictObject({
    content: z.string().min(1),
  }),
};

export const updatePostSchema = {
  body: z.strictObject({
    content: z.string().min(1),
  }),
  params: z.strictObject({
    id: z.string().min(1),
  }),
};

export const postParamsSchema = {
  params: z.strictObject({
    id: z.string().min(1),
  }),
};

export type CreatePostBody = z.infer<typeof createPostSchema.body>;
export type UpdatePostBody = z.infer<typeof updatePostSchema.body>;
