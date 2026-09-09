import { GQLArgsMap, GQLRequiredString } from "../../gql/types.gql";

export const createCommentGQLArgs: GQLArgsMap = {
  userId: { type: GQLRequiredString },
  postId: { type: GQLRequiredString },
  content: { type: GQLRequiredString },
};

export const commentIdGQLArgs: GQLArgsMap = {
  userId: { type: GQLRequiredString },
  id: { type: GQLRequiredString },
};

export const postCommentsGQLArgs: GQLArgsMap = {
  postId: { type: GQLRequiredString },
};
