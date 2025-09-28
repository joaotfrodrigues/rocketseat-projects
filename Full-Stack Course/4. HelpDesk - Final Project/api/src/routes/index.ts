import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { techniciansRoutes } from "./technicians-routes";
import { servicesRoutes } from "./services-routes";
import { clientsRoutes } from "./clients-routes";
import { callsRoutes } from "./calls-routes";
import { extraServicesRoutes } from "./extra-services-routes";
import { uploadsRoutes } from "./uploads-routes";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";


export const routes = Router();

// Public routes
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

// Authenticated routes
routes.use(ensureAuthenticated);

routes.use("/technicians", techniciansRoutes);
routes.use("/services", servicesRoutes);
routes.use("/clients", clientsRoutes);
routes.use("/calls", callsRoutes);
routes.use("/extra-services", extraServicesRoutes);
routes.use("/uploads", uploadsRoutes);
