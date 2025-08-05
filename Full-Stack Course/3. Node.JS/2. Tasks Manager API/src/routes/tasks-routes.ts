import { Router } from "express";

import { TasksController } from "@/controllers/tasks-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.use(ensureAuthenticated);

tasksRoutes.get("/:task_id", tasksController.show);
tasksRoutes.get("/team/:team_id", tasksController.indexByTeam);

tasksRoutes.use(verifyUserAuthorization(["admin"]));

tasksRoutes.get("/", tasksController.index);
tasksRoutes.post("/", tasksController.create);
tasksRoutes.put("/:task_id", tasksController.update);
tasksRoutes.delete("/:task_id", tasksController.delete);
