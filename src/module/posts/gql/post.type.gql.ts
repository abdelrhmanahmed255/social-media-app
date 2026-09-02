import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";

export const postGQLType = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: GraphQLID },
    userId: { type: GraphQLString },
    content: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const postListGQLType = new GraphQLList(postGQLType);
