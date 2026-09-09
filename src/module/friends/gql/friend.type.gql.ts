import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { friendRequestStatusGQLType } from "../../gql/enums.gql";
import { userSummaryGQLType } from "../../user/gql/user.type.gql";

export const oneFriendType = new GraphQLObjectType({
  name: "OneFriendType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    fromUser: { type: new GraphQLNonNull(GraphQLID) },
    toUser: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: new GraphQLNonNull(friendRequestStatusGQLType) },
    sender: {
      type: userSummaryGQLType,
      resolve(parent) {
        return parent.fromUser;
      },
    },
    receiver: {
      type: userSummaryGQLType,
      resolve(parent) {
        return parent.toUser;
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const getAllFriendsType = new GraphQLObjectType({
  name: "GetAllFriendsType",
  fields: {
    message: {
      type: new GraphQLList(oneFriendType),
    },
  },
});
