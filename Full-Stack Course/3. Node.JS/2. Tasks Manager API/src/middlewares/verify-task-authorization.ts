import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";

export async function verifyTaskAuthorization(request: Request, response: Response, next: NextFunction) {
  if (!request.user) {
    throw new AppError("Unauthorized", 401);
  }

  const taskId = request.params.task_id;

  if (!taskId) {
    return next();
  }

  // Admins can access any task
  if (request.user.role === "admin") {
    return next();
  }

  // For regular users, check if they can access the task
  const task = await prisma.task.findFirst({
    where: { id: taskId },
    select: { assignedTo: true, teamId: true }
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  // Check if user is assigned to the task
  if (task.assignedTo === request.user.id) {
    return next();
  }

  // Check if user is member of the task's team
  const userInTeam = await prisma.teamMember.findFirst({
    where: {
      userId: request.user.id,
      teamId: task.teamId
    }
  });

  if (!userInTeam) {
    throw new AppError("Unauthorized", 401);
  }

  return next();
} 