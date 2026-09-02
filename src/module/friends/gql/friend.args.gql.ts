import { GraphQLString } from "graphql";

export const sendFriendRequestGQLArgs = {
  fromUserId: { type: GraphQLString },
  toUserId: { type: GraphQLString },
};

export const friendRequestGQLArgs = {
  userId: { type: GraphQLString },
  requestId: { type: GraphQLString },
};

export const userIdGQLArgs = {
  userId: { type: GraphQLString },
};
