import { GraphQLString } from "graphql";

export const createPostGQLArgs = {
  userId: { type: GraphQLString },
  content: { type: GraphQLString },
};

export const postIdGQLArgs = {
  id: { type: GraphQLString },
};

export const updatePostGQLArgs = {
  userId: { type: GraphQLString },
  id: { type: GraphQLString },
  content: { type: GraphQLString },
};

export const deletePostGQLArgs = {
  userId: { type: GraphQLString },
  id: { type: GraphQLString },
};
