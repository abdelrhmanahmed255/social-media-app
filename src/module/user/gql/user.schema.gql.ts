import { GraphQLString } from "graphql";
import { userProfileGQLType } from "./user.type.gql";
import { userProfileGQLArgs } from "./user.args.gql";
import { userResolver } from "./user.resolver.gql";
import { GQLObjectFields } from "../../gql/types.gql";

export class UserGQLSchema {
  constructor() {}

  registerQuery(): GQLObjectFields {
    return {
      userProfile: {
        type: userProfileGQLType,
        args: userProfileGQLArgs,
        resolve: userResolver.userProfile,
      },
      test: {
        type: GraphQLString,
        resolve() {
          return "test from query";
        },
      },
    };
  }
}

export const userGQLSchema = new UserGQLSchema();
