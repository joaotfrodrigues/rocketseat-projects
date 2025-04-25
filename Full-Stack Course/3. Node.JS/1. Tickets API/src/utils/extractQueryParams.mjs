/**
 * Parses a URL query string into an object of key-value pairs.
 *
 * For example: "?name=John&age=30" becomes { name: "John", age: "30" }.
 *
 * @param {string} query - The query string starting with "?".
 * @returns {Object.<string, string>} An object containing parsed query parameters.
 */
export function extractQueryParams(query) {
  return query.slice(1).split("&").reduce((queryParams, param) => {
    const [ key, value ] = param.split("=");

    queryParams[key] = value;

    return queryParams;
  }, {})
}
