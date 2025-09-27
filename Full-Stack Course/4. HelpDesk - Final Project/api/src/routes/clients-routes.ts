import { Router } from "express";

import { ClientsController } from "@/controllers/clients-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.get(
  "/",
  verifyUserAuthorization(["admin"]),
  clientsController.index
);

clientsRoutes.patch(
  "/:id",
  verifyUserAuthorization(["admin"]),
  clientsController.update
);

clientsRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  clientsController.remove
);
