import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  usersController.index
);
usersRoutes.get(
  "/:user_id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  usersController.show
);
usersRoutes.post("/", usersController.create);

