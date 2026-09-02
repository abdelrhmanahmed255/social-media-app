import {
  BadRequetException,
  NotFoundException,
  ForbiddenException,
} from "../../common/exceptions/error.exceptions";
import { IPost } from "../../common";
import { DatabaseRepository } from "../../database/repository/database.repository";
import postModel from "../../database/model/post.model";
import { s3Service } from "../../common/service/s3.service";
import { MulterStorageEnum } from "../../common/enums/multer.enum";
import { CreatePostBody, UpdatePostBody } from "./posts.validation";

export class PostsService {
  private postRepository: DatabaseRepository<IPost>;

  constructor() {
    this.postRepository = new DatabaseRepository<IPost>(postModel);
  }

  async createPost(
    userId: string,
    data: CreatePostBody,
    file?: Express.Multer.File
  ) {
    let images: string[] = [];

    if (file) {
      const uploaded = await s3Service.uploadFile({
        storageKey: MulterStorageEnum.diskStorage,
        path: "posts",
        file,
      });
      images = [uploaded.Key];
    }

    const post = await this.postRepository.create({
      userId,
      content: data.content,
      images,
    });

    return post;
  }

  async getAllPosts() {
    return this.postRepository.findAll({
      populate: { path: "userId", select: "userName email profileImage" },
    });
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findById({
      id,
      populate: { path: "userId", select: "userName email profileImage" },
    });

    if (!post) {
      throw new NotFoundException("post not found");
    }

    return post;
  }

  async updatePost(userId: string, id: string, data: UpdatePostBody) {
    const post = await this.postRepository.findById({ id, lean: false });

    if (!post) {
      throw new NotFoundException("post not found");
    }

    if (String(post.userId) !== userId) {
      throw new ForbiddenException("you can only update your own post");
    }

    const updated = await this.postRepository.findByIdAndUpdate({
      id,
      data: { content: data.content },
    });

    return updated;
  }

  async deletePost(userId: string, id: string) {
    const post = await this.postRepository.findById({ id, lean: false });

    if (!post) {
      throw new NotFoundException("post not found");
    }

    if (String(post.userId) !== userId) {
      throw new ForbiddenException("you can only delete your own post");
    }

    await post.deleteOne();
    return { id };
  }
}

export const postsService = new PostsService();
