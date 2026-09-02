import { friendGQLType, friendListGQLType } from "./friend.type.gql";
import {
  sendFriendRequestGQLArgs,
  friendRequestGQLArgs,
  userIdGQLArgs,
} from "./friend.args.gql";
import { friendResolver } from "./friend.resolver.gql";

export class FriendGQLSchema {
  constructor() {}

  registerQuery() {
    return {
      getFriends: {
        type: friendListGQLType,
        args: userIdGQLArgs,
        resolve: friendResolver.getFriends,
      },
      getPendingRequests: {
        type: friendListGQLType,
        args: userIdGQLArgs,
        resolve: friendResolver.getPendingRequests,
      },
    };
  }

  registerMutation() {
    return {
      sendFriendRequest: {
        type: friendGQLType,
        args: sendFriendRequestGQLArgs,
        resolve: friendResolver.sendFriendRequest,
      },
      acceptFriendRequest: {
        type: friendGQLType,
        args: friendRequestGQLArgs,
        resolve: friendResolver.acceptFriendRequest,
      },
      rejectFriendRequest: {
        type: friendGQLType,
        args: friendRequestGQLArgs,
        resolve: friendResolver.rejectFriendRequest,
      },
    };
  }
}

export const friendGQLSchema = new FriendGQLSchema();
