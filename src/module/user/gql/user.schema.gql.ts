import { GraphQLString } from "graphql";
import { helloWorldGQLType } from "./user.type.gql";
import { helloWorldGQLArgs } from "./user.args.gql";
import { userResolver } from "./user.resolver.gql";

export class UserGQLSchema {
  constructor() {}

  registerQuery() {
    return {
      helloworld: {
        type: helloWorldGQLType,
        args: helloWorldGQLArgs,
        resolve: userResolver.helloWorld,
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
