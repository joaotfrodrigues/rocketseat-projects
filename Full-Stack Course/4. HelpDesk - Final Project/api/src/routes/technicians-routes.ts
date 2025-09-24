import { Router } from "express";

import { TechniciansController } from "@/controllers/technicians-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const techniciansRoutes = Router();
const techniciansController = new TechniciansController();

techniciansRoutes.get(
  "/:id",
  verifyUserAuthorization(["technician", "admin"]),
  techniciansController.show
);

techniciansRoutes.get(
  "/",
  verifyUserAuthorization(["admin"]),
  techniciansController.index
);

techniciansRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  techniciansController.create
);

techniciansRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  techniciansController.remove
);
