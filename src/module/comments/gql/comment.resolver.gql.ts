import { commentsService } from "../comments.service";

class CommentResolver {
  constructor() {}

  async getCommentsByPost(parent: any, args: { postId: string }) {
    const comments = await commentsService.getCommentsByPost(args.postId);
    return { message: comments };
  }

  async createComment(
    parent: any,
    args: { userId: string; postId: string; content: string }
  ) {
    return commentsService.createComment(args.userId, {
      postId: args.postId,
      content: args.content,
    });
  }

  async deleteComment(parent: any, args: { userId: string; id: string }) {
    return commentsService.deleteComment(args.userId, args.id);
  }
}

export const commentResolver = new CommentResolver();
