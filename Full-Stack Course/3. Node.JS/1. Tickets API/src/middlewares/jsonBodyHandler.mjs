/**
 * Middleware to parse the incoming request body as JSON.
 *
 * Reads the request stream, concatenates the chunks,
 * and attempts to parse the result as JSON.
 * If parsing fails, `request.body` is set to `null`.
 * Also sets the response `Content-Type` header to `application/json`.
 *
 * @async
 * @param {import('http').IncomingMessage} request - The HTTP request object.
 * @param {import('http').ServerResponse} response - The HTTP response object.
 *
 * @returns {Promise<void>}
 */
export async function jsonBodyHandler(request, response) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch(error) {
    request.body = null;
  }

  response.setHeader("Content-Type", "application/json");
}
