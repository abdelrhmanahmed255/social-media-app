import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { genderGQLType, userRoleGQLType } from "../../gql/enums.gql";

export const userSummaryGQLType = new GraphQLObjectType({
  name: "UserSummary",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    profileImage: { type: GraphQLString },
  },
});

export const userGQLType = new GraphQLObjectType({
  name: "OneUserType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    profileImage: { type: GraphQLString },
    role: { type: userRoleGQLType },
    gender: { type: genderGQLType },
    confirmEmail: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const userProfileGQLType = new GraphQLObjectType({
  name: "UserProfile",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});
