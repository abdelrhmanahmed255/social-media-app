import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";

export const commentGQLType = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: { type: GraphQLID },
    postId: { type: GraphQLString },
    userId: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const commentListGQLType = new GraphQLList(commentGQLType);
