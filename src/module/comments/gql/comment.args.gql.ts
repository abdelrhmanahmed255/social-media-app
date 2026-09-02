import { GraphQLString } from "graphql";

export const createCommentGQLArgs = {
  userId: { type: GraphQLString },
  postId: { type: GraphQLString },
  content: { type: GraphQLString },
};

export const commentIdGQLArgs = {
  userId: { type: GraphQLString },
  id: { type: GraphQLString },
};

export const postCommentsGQLArgs = {
  postId: { type: GraphQLString },
};
