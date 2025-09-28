import { Router } from "express";

import { ExtraServicesController } from "@/controllers/extra-services-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const extraServicesRoutes = Router();
const extraServicesController = new ExtraServicesController();

extraServicesRoutes.post(
  "/:call_id",
  verifyUserAuthorization(["technician"]),
  extraServicesController.create
);

extraServicesRoutes.delete(
  "/:extra_service_id",
  verifyUserAuthorization(["technician"]),
  extraServicesController.remove
);
