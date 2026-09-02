import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userGQLSchema } from "../user/gql/user.schema.gql";
import { postGQLSchema } from "../posts/gql/post.schema.gql";
import { commentGQLSchema } from "../comments/gql/comment.schema.gql";
import { friendGQLSchema } from "../friends/gql/friend.schema.gql";

export const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userGQLSchema.registerQuery(),
    ...postGQLSchema.registerQuery(),
    ...commentGQLSchema.registerQuery(),
    ...friendGQLSchema.registerQuery(),
  },
});

export const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...postGQLSchema.registerMutation(),
    ...commentGQLSchema.registerMutation(),
    ...friendGQLSchema.registerMutation(),
  },
});

export const schema = new GraphQLSchema({ query, mutation });
