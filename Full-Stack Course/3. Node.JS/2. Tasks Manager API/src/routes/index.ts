import { Router } from "express";

import { sessionsRoutes } from "./sessions-routes";
import { usersRoutes } from "./users-routes";
import { teamsRoutes } from "./teams-routes";
import { teamMembersRoutes } from "./team-members-routes";
import { tasksRoutes } from "./tasks-routes";


export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/teams", teamsRoutes);
routes.use("/team", teamMembersRoutes);
routes.use("/tasks", tasksRoutes);
