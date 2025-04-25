import { parseRoutePath } from "./utils/parseRoutePath.mjs";
import { verifyBodyReqs } from "./utils/verifyBodyReqs.mjs";

/**
 * Defines the application's HTTP routes and their associated handlers.
 * Each route object includes a method, a path (converted to RegExp), and a controller function.
 *
 * @type {Array<{
 *   method: string,
 *   path: RegExp,
 *   controller: (request: IncomingMessage & { body?: any, query?: Object, params?: Object }, response: ServerResponse, database: Database) => Promise<void>
 * }>}
 */
export const routes = [
  {
    method: "GET",
    path: "/tickets",
    /**
     * Handles GET /tickets. Optionally filters tickets by status.
     */
    controller: async (request, response, database) => {
      let tickets = await database.select();

      if (request.query.status === "open" || request.query.status === "closed") {
        tickets = tickets.filter(ticket => ticket.status === request.query.status);
      }

      return response.end(JSON.stringify(tickets));
    }
  },
  {
    method: "POST",
    path: "/tickets",
    /**
     * Handles POST /tickets. Creates a new ticket if body is valid.
     */
    controller: async (request, response, database) => {
      const bodyRequirements = {
        "equipment": "string",
        "description": "string",
        "user_name": "string"
      }

      if (request.body !== null && verifyBodyReqs(request.body, bodyRequirements)) {
        if (await database.insert(request.body)) {
          return response.writeHead(201).end("Ticket criado com sucesso!");
        } else {
          return response.writeHead(500).end("Aconteceu algo de errado");
        }
      } else {
        return response.writeHead(400).end("Bad gateway");
      }
    }
  },
  {
    method: "PUT",
    path: "/tickets/:id",
    /**
     * Handles PUT /tickets/:id. Updates an existing ticket with new data.
     */
    controller: async (request, response, database) => {
      const bodyRequirements = {
        "equipment": "string",
        "description": "string"
      }

      if(request.body !== null && verifyBodyReqs(request.body, bodyRequirements)) {
        const ticketId = request.params.id;
        if (!ticketId) return response.writeHead(400).end("Ticket id é obrigatório");

        if (await database.update(ticketId, request.body)) {
          return response.end("Ticket atualizado com sucesso");
        } else {
          return response.writeHead(400).end("Ticket id inválido");
        }
      } else {
        return response.writeHead(400).end("Bad gateway");
      }
    }
  },
  {
    method: "PATCH",
    path: "/tickets/:id/status",
    /**
     * Handles PATCH /tickets/:id/status. Closes the ticket by setting status to "closed".
     */
    controller: async (request, response, database) => {
      const ticketId = request.params.id;
      if (!ticketId) return response.writeHead(400).end("Ticket id é obrigatório");

      if (await database.update(ticketId, { status: "closed" })) {
        return response.end("Ticket fechado com sucesso!");
      } else {
        return response.writeHead(400).end("Ticket id inválido");
      }
    }
  },
  {
    method: "DELETE",
    path: "/tickets/:id",
    /**
     * Handles DELETE /tickets/:id. Deletes a ticket from the database.
     */
    controller: async (request, response, database) => {
      const ticketId = request.params.id;
      if (!ticketId) return response.writeHead(400).end("Ticket id é obrigatório");

      if (await database.delete(ticketId)) {
        return response.end("Ticket eliminado com sucesso!");
      } else {
        return response.writeHead(400).end("Ticket id inválido");
      }
    }
  }
].map(route => ({
  ...route,
  path: parseRoutePath(route.path)
}));
