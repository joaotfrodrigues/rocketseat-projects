import fs from "node:fs/promises";

const DATABASE_PATH = new URL("db.json", import.meta.url);

/**
 * Represents a simple JSON file-based database for managing tickets.
 */
export class Database {
  /** @type {string} The table name used internally. */
  #table = "tickets";

  /** @type {Object.<string, any[]>} The in-memory database object. */
  #database = {}

  constructor() {
    this.#init();
  }

  /**
   * Initializes the database by reading from the JSON file.
   * Called automatically in the constructor.
   * 
   * @private
   * @returns {Promise<void>}
   */
  async #init() {
    try {
      const data = await fs.readFile(DATABASE_PATH, "utf8");
      this.#database = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Persists the current database state to the JSON file.
   * 
   * @private
   * @returns {Promise<void>}
   */
  async #persist() {
    try {
      await fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Returns all records from the current table.
   *
   * @returns {Promise<Object[]>} An array of records or an empty array.
   */
  async select() {
    try {
      return this.#database[this.#table] ?? [];
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Inserts a new ticket into the database.
   *
   * @param {Object} body - The data for the new ticket.
   * @returns {Promise<boolean>} True if inserted successfully, otherwise false.
   */
  async insert(body) {
    try {
      const data = { id: Date.now(), ...body, status: "open" };

      if (Array.isArray(this.#database[this.#table])) {
        this.#database[this.#table].push(data);
      } else {
        this.#database[this.#table] = [ data ];
      }

      await this.#persist();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Updates an existing ticket by ID.
   *
   * @param {number|string} ticketId - The ID of the ticket to update.
   * @param {Object} body - The updated data.
   * @returns {Promise<boolean>} True if updated successfully, otherwise false.
   */
  async update(ticketId, body) {
    try {
      const tickets = this.#database[this.#table];
      let ticketIndex = tickets.findIndex(ticket => ticket.id === Number(ticketId));

      if (ticketIndex === -1) return false;

      tickets[ticketIndex] = { ...tickets[ticketIndex], ...body };

      await this.#persist();

      return true;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Deletes a ticket by ID.
   *
   * @param {number|string} ticketId - The ID of the ticket to delete.
   * @returns {Promise<boolean>} True if deleted successfully, otherwise false.
   */
  async delete(ticketId) {
    try {
      const tickets = this.#database[this.#table];
      const ticketIndex = tickets.findIndex(ticket => ticket.id === Number(ticketId));

      if (ticketIndex === -1) return false;

      tickets.splice(ticketIndex, 1);

      await this.#persist();

      return true;
    } catch (error) {
      console.error(error);
    }
  }
}
