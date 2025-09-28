import { Router } from "express";

import { CallsController } from "@/controllers/calls-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const callsRoutes = Router();
const callsController = new CallsController();

callsRoutes.get(
  "/:call_id",
  verifyUserAuthorization(["client", "technician", "admin"]),
  callsController.show
);

callsRoutes.get(
  "/",
  verifyUserAuthorization(["client", "technician", "admin"]),
  callsController.index
);

callsRoutes.post(
  "/",
  verifyUserAuthorization(["client"]),
  callsController.create
);

callsRoutes.patch(
  "/status/:call_id",
  verifyUserAuthorization(["technician", "admin"]),
  callsController.updateStatus
);
