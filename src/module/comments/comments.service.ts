import {
  ForbiddenException,
  NotFoundException,
} from "../../common/exceptions/error.exceptions";
import { IComment } from "../../common";
import commentModel from "../../database/model/comment.model";
import postModel from "../../database/model/post.model";
import { DatabaseRepository } from "../../database/repository/database.repository";
import { CreateCommentBody } from "./comments.validation";

export class CommentsService {
  private commentRepository: DatabaseRepository<IComment>;

  constructor() {
    this.commentRepository = new DatabaseRepository<IComment>(commentModel);
  }

  async createComment(userId: string, data: CreateCommentBody) {
    const post = await postModel.findById(data.postId);

    if (!post) {
      throw new NotFoundException("post not found");
    }

    const comment = await this.commentRepository.create({
      postId: data.postId,
      userId,
      content: data.content,
    });

    return comment;
  }

  async getCommentsByPost(postId: string) {
    const post = await postModel.findById(postId);

    if (!post) {
      throw new NotFoundException("post not found");
    }

    return this.commentRepository.findAll({
      filter: { postId },
      populate: { path: "userId", select: "userName email profileImage" },
    });
  }

  async deleteComment(userId: string, id: string) {
    const comment = await this.commentRepository.findById({ id, lean: false });

    if (!comment) {
      throw new NotFoundException("comment not found");
    }

    if (String(comment.userId) !== userId) {
      throw new ForbiddenException("you can only delete your own comment");
    }

    await comment.deleteOne();
    return { id };
  }
}

export const commentsService = new CommentsService();
