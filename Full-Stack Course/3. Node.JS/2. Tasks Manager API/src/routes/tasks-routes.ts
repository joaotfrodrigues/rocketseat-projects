import { Router } from "express";

import { TasksController } from "@/controllers/tasks-controller";
import { TaskStatusController } from "@/controllers/task-status-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";


export const tasksRoutes = Router();
const tasksController = new TasksController();
const taskStatusController = new TaskStatusController();

tasksRoutes.use(ensureAuthenticated);

tasksRoutes.get("/:task_id", tasksController.show);
tasksRoutes.get("/team/:team_id", tasksController.indexByTeam);

tasksRoutes.patch("/status/:task_id", taskStatusController.update);

tasksRoutes.use(verifyUserAuthorization(["admin"]));

tasksRoutes.get("/", tasksController.index);
tasksRoutes.post("/", tasksController.create);
tasksRoutes.put("/:task_id", tasksController.update);
tasksRoutes.delete("/:task_id", tasksController.delete);
