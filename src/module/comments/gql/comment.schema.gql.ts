import { commentGQLType, commentListGQLType } from "./comment.type.gql";
import {
  createCommentGQLArgs,
  commentIdGQLArgs,
  postCommentsGQLArgs,
} from "./comment.args.gql";
import { commentResolver } from "./comment.resolver.gql";

export class CommentGQLSchema {
  constructor() {}

  registerQuery() {
    return {
      getComments: {
        type: commentListGQLType,
        args: postCommentsGQLArgs,
        resolve: commentResolver.getCommentsByPost,
      },
    };
  }

  registerMutation() {
    return {
      createComment: {
        type: commentGQLType,
        args: createCommentGQLArgs,
        resolve: commentResolver.createComment,
      },
      deleteComment: {
        type: commentGQLType,
        args: commentIdGQLArgs,
        resolve: commentResolver.deleteComment,
      },
    };
  }
}

export const commentGQLSchema = new CommentGQLSchema();
