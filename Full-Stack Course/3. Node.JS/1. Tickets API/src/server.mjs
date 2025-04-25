import http from "node:http";

import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.mjs";
import { routeHandler } from "./middlewares/routeHandler.mjs";

/**
 * Creates an HTTP server to handle requests.
 * 
 * - The server first applies the `jsonBodyHandler` middleware to parse JSON request bodies.
 * - Then, it routes the request to the appropriate controller based on the request's method and path.
 * 
 * The server listens on port 3333.
 */
http.createServer(async (request, response) => {
  // Apply the JSON body handler middleware
  await jsonBodyHandler(request, response);

  // Route the request to the correct handler
  routeHandler(request, response);
}).listen(3333);
