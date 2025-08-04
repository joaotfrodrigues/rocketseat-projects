import { Router } from "express";

import { sessionsRoutes } from "./sessions-routes";
import { usersRoutes } from "./users-routes";


export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

