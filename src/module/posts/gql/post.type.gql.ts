import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { oneCommentType } from "../../comments/gql/comment.type.gql";
import { userSummaryGQLType } from "../../user/gql/user.type.gql";
import { postResolver } from "./post.resolver.gql";

export const onePostType = new GraphQLObjectType({
  name: "OnePostType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    images: { type: new GraphQLList(GraphQLString) },
    comments: {
      type: new GraphQLList(oneCommentType),
      resolve(parent) {
        return parent.comments ?? [];
      },
    },
    author: {
      type: userSummaryGQLType,
      resolve: postResolver.getAuthor,
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const getAllPostsType = new GraphQLObjectType({
  name: "GetAllPostsType",
  fields: {
    message: {
      type: new GraphQLList(onePostType),
    },
  },
});
