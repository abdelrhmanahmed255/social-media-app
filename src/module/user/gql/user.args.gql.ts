import { GraphQLString } from "graphql";

export const helloWorldGQLArgs = {
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
};
