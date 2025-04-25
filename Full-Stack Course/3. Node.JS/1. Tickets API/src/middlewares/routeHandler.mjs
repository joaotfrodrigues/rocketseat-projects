import { extractQueryParams } from "../utils/extractQueryParams.mjs";
import { Database } from "../database.mjs";
import { routes } from "../routes.mjs";

const database = new Database();

/**
 * Handles incoming HTTP requests by matching them to predefined routes.
 *
 * It looks up a matching route based on the HTTP method and URL,
 * extracts route and query parameters, and invokes the corresponding controller.
 * If no route matches, responds with 404.
 *
 * @param {import('http').IncomingMessage} request - The HTTP request object.
 * @param {import('http').ServerResponse} response - The HTTP response object.
 */
export function routeHandler(request, response) {
  const route = routes.find(route => {
    if (route.method === request.method && route.path.test(request.url)) {
      return route;
    }
  });

  if (!route) return response.writeHead(404).end("Rota não encontrada");

  const routeParams = request.url.match(route.path);

  const { query, ...params } = routeParams.groups;

  request.params = params;
  request.query = query ? extractQueryParams(query) : {};

  return route.controller(request, response, database);
}
