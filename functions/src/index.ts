// working example of Firebase Function with Apollo Server

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { json } from "body-parser";

import { typeDefs } from "./typedefs";
import { resolvers } from "./resovlers";

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

let started = false;
const start = async () => {
  if (!started) {
    await server.start();
    started = true;
  }
};

app.use(cors<cors.CorsRequest>());
app.use(json()); // body-parser is more reliable than express.json() in some cases

app.use(async (req, res, next) => {
  await start();
  return expressMiddleware(server)(req, res, next);
});

export const graphql = functions.https.onRequest(app);
