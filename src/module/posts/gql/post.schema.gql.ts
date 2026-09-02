import { postGQLType, postListGQLType } from "./post.type.gql";
import {
  createPostGQLArgs,
  postIdGQLArgs,
  updatePostGQLArgs,
  deletePostGQLArgs,
} from "./post.args.gql";
import { postResolver } from "./post.resolver.gql";

export class PostGQLSchema {
  constructor() {}

  registerQuery() {
    return {
      getPosts: {
        type: postListGQLType,
        resolve: postResolver.getAllPosts,
      },
      getPost: {
        type: postGQLType,
        args: postIdGQLArgs,
        resolve: postResolver.getPostById,
      },
    };
  }

  registerMutation() {
    return {
      createPost: {
        type: postGQLType,
        args: createPostGQLArgs,
        resolve: postResolver.createPost,
      },
      updatePost: {
        type: postGQLType,
        args: updatePostGQLArgs,
        resolve: postResolver.updatePost,
      },
      deletePost: {
        type: postGQLType,
        args: deletePostGQLArgs,
        resolve: postResolver.deletePost,
      },
    };
  }
}

export const postGQLSchema = new PostGQLSchema();
