import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class TaskStatusController {
  async update(request: Request, response: Response) {
    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"])
    });

    const paramsSchema = z.object({
      task_id: z.uuid()
    });

    const { status } = bodySchema.parse(request.body);
    const { task_id: taskId } = paramsSchema.parse(request.params);

    const isUserAssigned = await prisma.task.findFirst({
      where: {
        id: taskId,
        assignedTo: request.user!.id
      }
    });

    if (!isUserAssigned) {
      throw new AppError("Unauthorized", 401);
    }

    const oldStatus = isUserAssigned.status;

    const task = await prisma.task.update({
      data: {
        status
      },
      where: {
        id: taskId,
        assignedTo: request.user!.id
      }
    });

    await prisma.taskHistory.create({
      data: {
        taskId,
        changedBy: request.user!.id,
        oldStatus,
        newStatus: status
      }
    });

    return response.json(task);
  }
}
