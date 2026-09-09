import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { userSummaryGQLType } from "../../user/gql/user.type.gql";

export const oneCommentType = new GraphQLObjectType({
  name: "OneCommentType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    postId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    user: {
      type: userSummaryGQLType,
      resolve(parent) {
        return parent.userId;
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const getAllCommentsType = new GraphQLObjectType({
  name: "GetAllCommentsType",
  fields: {
    message: {
      type: new GraphQLList(oneCommentType),
    },
  },
});
