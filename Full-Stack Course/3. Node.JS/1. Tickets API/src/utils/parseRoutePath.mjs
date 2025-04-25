/**
 * Converts a route path with named parameters into a regular expression.
 *
 * Replaces path parameters like `:id` with named capture groups,
 * and adds optional query string matching at the end.
 *
 * For example: "/users/:id" becomes /\/users\/(?<id>[a-z0-9-_]+)(?<query>\?(.*))?$/
 *
 * @param {string} path - The route path containing parameter placeholders (e.g., "/users/:id").
 * @returns {RegExp} A RegExp object to match and extract route and query parameters.
 */
export function parseRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)");

  const pathRegex = new RegExp(`${params}(?<query>\\?(.*))?$`);

  return pathRegex;
}
