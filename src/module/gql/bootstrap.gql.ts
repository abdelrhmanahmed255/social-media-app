import { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./schema.gql";


export const bootstrapGraphQL = (app: Express) => {
  app.all("/graphql", createHandler({ schema }));
};
