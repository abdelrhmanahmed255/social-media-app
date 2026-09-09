import { GraphQLFieldConfigMap, GraphQLFieldConfigArgumentMap, GraphQLNonNull, GraphQLString, GraphQLID } from "graphql";

// Field map passed to GraphQLObjectType `fields` (e.g. RootQuery, RootMutation)
export type GQLObjectFields = GraphQLFieldConfigMap<any, any>;
export type GQLArgsMap = GraphQLFieldConfigArgumentMap;

export const GQLRequiredString = new GraphQLNonNull(GraphQLString);
export const GQLOptionalString = GraphQLString;
export const GQLRequiredID = new GraphQLNonNull(GraphQLID);
