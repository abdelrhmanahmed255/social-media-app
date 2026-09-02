import { commentsService } from "../comments.service";

class CommentResolver {
  constructor() {}

  async getCommentsByPost(_parent: any, args: { postId: string }) {
    return commentsService.getCommentsByPost(args.postId);
  }

  async createComment(
    _parent: any,
    args: { userId: string; postId: string; content: string }
  ) {
    return commentsService.createComment(args.userId, {
      postId: args.postId,
      content: args.content,
    });
  }

  async deleteComment(_parent: any, args: { userId: string; id: string }) {
    return commentsService.deleteComment(args.userId, args.id);
  }
}

export const commentResolver = new CommentResolver();
