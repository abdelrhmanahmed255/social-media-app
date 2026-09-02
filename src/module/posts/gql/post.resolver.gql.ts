import { postsService } from "../posts.service";

class PostResolver {
  constructor() {}

  async getAllPosts() {
    return postsService.getAllPosts();
  }

  async getPostById(_parent: any, args: { id: string }) {
    return postsService.getPostById(args.id);
  }

  async createPost(_parent: any, args: { userId: string; content: string }) {
    return postsService.createPost(args.userId, { content: args.content });
  }

  async updatePost(
    _parent: any,
    args: { userId: string; id: string; content: string }
  ) {
    return postsService.updatePost(args.userId, args.id, {
      content: args.content,
    });
  }

  async deletePost(_parent: any, args: { userId: string; id: string }) {
    return postsService.deletePost(args.userId, args.id);
  }
}

export const postResolver = new PostResolver();
