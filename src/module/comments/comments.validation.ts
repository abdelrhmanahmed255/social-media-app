import { z } from "zod";

export const createCommentSchema = {
  body: z.strictObject({
    postId: z.string().min(1),
    content: z.string().min(1),
  }),
};

export const commentParamsSchema = {
  params: z.strictObject({
    id: z.string().min(1),
  }),
};

export const postCommentsParamsSchema = {
  params: z.strictObject({
    postId: z.string().min(1),
  }),
};

export type CreateCommentBody = z.infer<typeof createCommentSchema.body>;
