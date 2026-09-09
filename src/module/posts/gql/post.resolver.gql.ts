import { postsService } from "../posts.service";

class PostResolver {
  constructor() {}

  async getAllPosts() {
    const posts = await postsService.getAllPosts();
    return { message: posts };
  }

  async getPostById(parent: any, args: { id: string }) {
    return postsService.getPostById(args.id);
  }

 
  getAuthor(parent: any) {
    return parent.userId;
  }

  async createPost(parent: any, args: { userId: string; content: string }) {
    return postsService.createPost(args.userId, { content: args.content });
  }

  async updatePost(
    parent: any,
    args: { userId: string; id: string; content: string }
  ) {
    return postsService.updatePost(args.userId, args.id, {
      content: args.content,
    });
  }

  async deletePost(parent: any, args: { userId: string; id: string }) {
    return postsService.deletePost(args.userId, args.id);
  }
}

export const postResolver = new PostResolver();
