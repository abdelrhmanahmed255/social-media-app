import { GQLArgsMap, GQLRequiredString } from "../../gql/types.gql";

export const createPostGQLArgs: GQLArgsMap = {
  userId: { type: GQLRequiredString },
  content: { type: GQLRequiredString },
};

export const postIdGQLArgs: GQLArgsMap = {
  id: { type: GQLRequiredString },
};

export const updatePostGQLArgs: GQLArgsMap = {
  userId: { type: GQLRequiredString },
  id: { type: GQLRequiredString },
  content: { type: GQLRequiredString },
};

export const deletePostGQLArgs: GQLArgsMap = {
  userId: { type: GQLRequiredString },
  id: { type: GQLRequiredString },
};
