/**
 * Verifies that the request body contains all required keys
 * and that each value matches the expected type.
 *
 * The `requiredKeys` object should map keys to expected type strings
 * (e.g., { name: "string", age: "number" }).
 *
 * @param {Object} body - The request body to validate.
 * @param {Object.<string, string>} requiredKeys - An object defining required keys and their expected types.
 * @returns {boolean} True if the body is valid, otherwise false.
 */
export function verifyBodyReqs(body, requiredKeys) {
  try {
    const bodyKeys = Object.keys(body);
    const reqKeys = Object.keys(requiredKeys);

    if (bodyKeys.length !== reqKeys.length) return false;

    const validBody = bodyKeys.every(key => {
      return reqKeys.includes(key) && typeof body[key] === requiredKeys[key];
    });

    if (!validBody) return false;

    return true;
  } catch (error) {
    return false;
  }
}
