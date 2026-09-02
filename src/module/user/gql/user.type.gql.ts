import { GraphQLObjectType, GraphQLString } from "graphql";

export const helloWorldGQLType = new GraphQLObjectType({
  name: "HelloWorldQuery",
  fields: {
    message: {
      type: GraphQLString,
    },
  },
});
