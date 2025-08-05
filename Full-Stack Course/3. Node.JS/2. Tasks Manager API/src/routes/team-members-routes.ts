import { Router } from "express";

import { TeamMembersController } from "@/controllers/team-members-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const teamMembersRoutes = Router();
const teamMembersController = new TeamMembersController();

teamMembersRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]));

teamMembersRoutes.post("/:team_id/user", teamMembersController.create);
teamMembersRoutes.delete("/:team_id/user/:user_id", teamMembersController.delete);
