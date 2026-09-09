import { onePostType, getAllPostsType } from "./post.type.gql";
import {
  createPostGQLArgs,
  postIdGQLArgs,
  updatePostGQLArgs,
  deletePostGQLArgs,
} from "./post.args.gql";
import { postResolver } from "./post.resolver.gql";
import { GQLObjectFields } from "../../gql/types.gql";

export class PostGQLSchema {
  constructor() {}

  registerQuery(): GQLObjectFields {
    return {
      getPosts: {
        type: getAllPostsType,
        resolve: postResolver.getAllPosts,
      },
      getPost: {
        type: onePostType,
        args: postIdGQLArgs,
        resolve: postResolver.getPostById,
      },
    };
  }

  registerMutation(): GQLObjectFields {
    return {
      createPost: {
        type: onePostType,
        args: createPostGQLArgs,
        resolve: postResolver.createPost,
      },
      updatePost: {
        type: onePostType,
        args: updatePostGQLArgs,
        resolve: postResolver.updatePost,
      },
      deletePost: {
        type: onePostType,
        args: deletePostGQLArgs,
        resolve: postResolver.deletePost,
      },
    };
  }
}

export const postGQLSchema = new PostGQLSchema();
