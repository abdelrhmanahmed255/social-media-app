import { z } from "zod";

export const sendFriendRequestSchema = {
  body: z.strictObject({
    toUserId: z.string().min(1),
  }),
};

export const friendRequestParamsSchema = {
  params: z.strictObject({
    id: z.string().min(1),
  }),
};

export type SendFriendRequestBody = z.infer<typeof sendFriendRequestSchema.body>;
