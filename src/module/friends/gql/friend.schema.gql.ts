import { oneFriendType, getAllFriendsType } from "./friend.type.gql";
import {
  sendFriendRequestGQLArgs,
  friendRequestGQLArgs,
  userIdGQLArgs,
} from "./friend.args.gql";
import { friendResolver } from "./friend.resolver.gql";
import { GQLObjectFields } from "../../gql/types.gql";

export class FriendGQLSchema {
  constructor() {}

  registerQuery(): GQLObjectFields {
    return {
      getFriends: {
        type: getAllFriendsType,
        args: userIdGQLArgs,
        resolve: friendResolver.getFriends,
      },
      getPendingRequests: {
        type: getAllFriendsType,
        args: userIdGQLArgs,
        resolve: friendResolver.getPendingRequests,
      },
    };
  }

  registerMutation(): GQLObjectFields {
    return {
      sendFriendRequest: {
        type: oneFriendType,
        args: sendFriendRequestGQLArgs,
        resolve: friendResolver.sendFriendRequest,
      },
      acceptFriendRequest: {
        type: oneFriendType,
        args: friendRequestGQLArgs,
        resolve: friendResolver.acceptFriendRequest,
      },
      rejectFriendRequest: {
        type: oneFriendType,
        args: friendRequestGQLArgs,
        resolve: friendResolver.rejectFriendRequest,
      },
    };
  }
}

export const friendGQLSchema = new FriendGQLSchema();
