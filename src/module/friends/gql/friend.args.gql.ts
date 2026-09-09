import { GQLArgsMap, GQLRequiredString } from "../../gql/types.gql";

export const sendFriendRequestGQLArgs: GQLArgsMap = {
  fromUserId: { type: GQLRequiredString },
  toUserId: { type: GQLRequiredString },
};

export const friendRequestGQLArgs: GQLArgsMap = {
  userId: { type: GQLRequiredString },
  requestId: { type: GQLRequiredString },
};

export const userIdGQLArgs: GQLArgsMap = {
  userId: { type: GQLRequiredString },
};
