/**
 * Firebase Cloud Function with Apollo GraphQL Server
 *
 * This module sets up a GraphQL endpoint using Apollo Server v4 integrated with
 * Firebase Cloud Functions. The server uses Express as the underlying HTTP framework
 * and provides a /graphql endpoint accessible via Firebase Hosting rewrites.
 */

// Firebase Functions SDK for creating cloud functions
import * as functions from "firebase-functions";
// Express web framework for handling HTTP requests
import express from "express";
// CORS middleware to handle cross-origin requests from web clients
import cors from "cors";
// Apollo Server v4 - GraphQL server implementation
import { ApolloServer } from "@apollo/server";
// Express 4 integration adapter for Apollo Server v4
// This replaces the deprecated apollo-server-express package
import { expressMiddleware } from "@as-integrations/express4";

// Body parser middleware for parsing JSON request bodies
import { json } from "body-parser";

// GraphQL type definitions (schema) defining the structure of our GraphQL API
import { typeDefs } from "./typedefs";

// GraphQL resolvers implementing the logic for each query/mutation/field
import { resolvers } from "./resolvers";

/**
 * Express application instance
 * This serves as the foundation for our HTTP server and will be wrapped by Firebase Functions
 */
const app = express();

/**
 * Apollo Server instance
 * Configured with our schema (typeDefs) and resolver functions
 * Apollo Server v4 requires explicit start() call before accepting requests
 */
const server = new ApolloServer({ typeDefs, resolvers });

/**
 * Server initialization state tracker
 * Apollo Server v4 requires calling start() exactly once before handling requests
 * This flag prevents multiple start() calls in serverless environments
 */
let started = false;

/**
 * Lazy initialization function for Apollo Server
 *
 * In serverless environments like Cloud Functions, instances may be reused across
 * multiple invocations. This function ensures the server is started exactly once
 * per instance lifecycle, avoiding errors from calling start() multiple times.
 */
const start = async () => {
  if (!started) {
    await server.start();
    started = true;
  }
};

/**
 * CORS middleware configuration
 * Allows cross-origin requests from web browsers to access the GraphQL endpoint
 * Default configuration permits all origins - consider restricting in production
 */
app.use(
  cors<cors.CorsRequest>({
    origin: true,
  })
);

/**
 * JSON body parser middleware
 * Parses incoming request bodies in JSON format and makes them available on req.body
 * body-parser is used instead of express.json() for better compatibility and reliability
 */
app.use(json());

/**
 * Apollo Server middleware integration
 *
 * This middleware:
 * 1. Ensures Apollo Server is started (lazy initialization)
 * 2. Routes requests through Apollo Server's GraphQL handler
 * 3. Handles GraphQL queries, mutations, and introspection requests
 *
 * The expressMiddleware converts Apollo Server v4's request handling
 * into Express-compatible middleware
 */
app.use(async (req, res, next) => {
  await start();
  return expressMiddleware(server)(req, res, next);
});

/**
 * Export the Express app as a Firebase Cloud Function
 *
 * This creates an HTTPS-triggered function named 'graphql' that:
 * - Is accessible at: https://<region>-<project-id>.cloudfunctions.net/graphql
 * - Can be routed via Firebase Hosting rewrites (e.g., /api/graphql -> graphql function)
 * - Handles all HTTP methods (GET for playground, POST for queries/mutations)
 *
 * Firebase automatically manages:
 * - SSL/TLS certificates
 * - Auto-scaling based on traffic
 * - Request/response lifecycle
 */
export const graphql = functions.https.onRequest(app);
