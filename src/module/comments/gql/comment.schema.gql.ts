import { oneCommentType, getAllCommentsType } from "./comment.type.gql";
import {
  createCommentGQLArgs,
  commentIdGQLArgs,
  postCommentsGQLArgs,
} from "./comment.args.gql";
import { commentResolver } from "./comment.resolver.gql";
import { GQLObjectFields } from "../../gql/types.gql";

export class CommentGQLSchema {
  constructor() {}

  registerQuery(): GQLObjectFields {
    return {
      getComments: {
        type: getAllCommentsType,
        args: postCommentsGQLArgs,
        resolve: commentResolver.getCommentsByPost,
      },
    };
  }

  registerMutation(): GQLObjectFields {
    return {
      createComment: {
        type: oneCommentType,
        args: createCommentGQLArgs,
        resolve: commentResolver.createComment,
      },
      deleteComment: {
        type: oneCommentType,
        args: commentIdGQLArgs,
        resolve: commentResolver.deleteComment,
      },
    };
  }
}

export const commentGQLSchema = new CommentGQLSchema();
