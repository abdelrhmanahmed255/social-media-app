import { Express, Request, Response, Router } from "express";
import cors from "cors";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import authRouter from "./module/auth/auth.controller";
import postsRouter from "./module/posts/posts.controller";
import userRouter from "./module/user/user.controller";



export const bootstrap = (app: Express) => {
  app.use(cors());
  app.use(express.json());
 

  const router: Router = Router();

  router.get("/", (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Social Media API is running",
    });
  });
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "HelloWorldQuery",
      fields: {
        helloWorld: {
          type: GraphQLString,
          resolve: () => "GraphQL is running",
        },
      },
    }),
    mutation: new GraphQLObjectType({
      name: "RootMutation",
      fields: {
        helloWorld: {
          type: new GraphQLObjectType({
            name: "HelloWorldMutation",
            fields: {
              message: { type: GraphQLString },
            },
          }),
          args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
          },
          resolve(parent: any, args: {
             name: string; 
             email: string;
              password: string 
            }) {
  
            const { name, email, password } = args;
            return {
              message: `Hello ${name}, account created for ${email}`,
            };
          },
        },
      },
    }),
  });

  app.all("/graphql", createHandler({ schema }));

  app.use("/api", router);
  app.use("/api/auth", authRouter);
  app.use("/api/posts", postsRouter);
  app.use("/api/user", userRouter);
};
