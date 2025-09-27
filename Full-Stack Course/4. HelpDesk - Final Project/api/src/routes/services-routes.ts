import { Router } from "express";

import { ServicesController } from "@/controllers/services-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const servicesRoutes = Router();
const servicesController = new ServicesController();

servicesRoutes.get(
  "/",
  verifyUserAuthorization(["client", "admin"]),
  servicesController.index
);

servicesRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  servicesController.create
);

servicesRoutes.patch(
  "/:id",
  verifyUserAuthorization(["admin"]),
  servicesController.update
);

servicesRoutes.patch(
  "/status/:id",
  verifyUserAuthorization(["admin"]),
  servicesController.updateStatus
);

servicesRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  servicesController.remove
);
