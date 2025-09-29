import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

usersRoutes.patch(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["client", "technician", "admin"]),
  usersController.update
);

usersRoutes.patch(
  "/password",
  ensureAuthenticated,
  verifyUserAuthorization(["client", "technician", "admin"]),
  usersController.updatePassword
);
