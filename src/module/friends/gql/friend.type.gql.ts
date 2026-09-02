import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";

export const friendGQLType = new GraphQLObjectType({
  name: "Friend",
  fields: {
    id: { type: GraphQLID },
    fromUser: { type: GraphQLString },
    toUser: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const friendListGQLType = new GraphQLList(friendGQLType);
