import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class TasksController {
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      task_id: z.uuid()
    });

    const { task_id: taskId } = paramsSchema.parse(request.params);

    const includeOptions = {
      user: { select: { id: true, name: true, email: true, role: true } },
      team: { select: { id: true, name: true, description: true } },
      taskHistory: { select: { changedBy: true, oldStatus: true, newStatus: true, changedAt: true } }
    };

    let task;

    // If admin, can view any task
    if (request.user!.role === "admin") {
      task = await prisma.task.findFirst({
        where: { id: taskId },
        include: includeOptions
      });
    } else {
      // For regular users, first search as assigned user
      task = await prisma.task.findFirst({
        where: {
          id: taskId,
          assignedTo: request.user!.id
        },
        include: includeOptions
      });

      // If not found, search through user's teams
      if (!task) {
        const userTeams = await prisma.teamMember.findMany({
          where: { userId: request.user!.id },
          select: { teamId: true }
        });

        const userTeamIds = userTeams.map(tm => tm.teamId);

        task = await prisma.task.findFirst({
          where: {
            id: taskId,
            teamId: { in: userTeamIds }
          },
          include: includeOptions
        });
      }
    }

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return response.json(task);
  }

  async index(request: Request, response: Response) {
    const tasks = await prisma.task.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        team: { select: { id: true, name: true, description: true } },
        taskHistory: { select: { changedBy: true, oldStatus: true, newStatus: true, changedAt: true } }
      }
    });

    return response.json(tasks);
  }

  async indexByTeam(request: Request, response: Response) {
    const paramsSchema = z.object({
      team_id: z.uuid()
    });

    const { team_id: teamId } = paramsSchema.parse(request.params);

    if (request.user!.role === "member") {
      const userInTeam = await prisma.teamMember.findFirst({
        where: {
          userId: request.user!.id,
          teamId
        }
      });

      if (!userInTeam) {
        throw new AppError("Unauthorized", 401);
      }
    }

    const tasks = await prisma.task.findMany({ where: { teamId } });

    return response.json(tasks);
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().min(2).max(50),
      description: z.string().optional(),
      status: z.enum(["pending", "in_progress", "completed"]),
      priority: z.enum(["low", "medium", "high"]),
      assigned_to: z.uuid(),
      team_id: z.uuid()
    });

    const { title, description, status,
      priority, assigned_to: assignedTo, team_id: teamId } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({ where: { id: assignedTo } });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const team = await prisma.team.findFirst({ where: { id: teamId } });

    if (!team) {
      throw new AppError("Team not found", 404);
    }

    const userInTeam = await prisma.teamMember.findFirst({
      where: {
        userId: assignedTo,
        teamId
      }
    });

    if (!userInTeam) {
      throw new AppError("That user does not belong to that team", 400);
    }

    const task = await prisma.task.create({
      data: {
        title, description: description || "", status, priority, assignedTo, teamId
      }
    });

    return response.status(201).json(task);
  }

  async update(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().min(2).max(50),
      description: z.string().optional(),
      status: z.enum(["pending", "in_progress", "completed"]),
      priority: z.enum(["low", "medium", "high"]),
      assigned_to: z.uuid(),
      team_id: z.uuid()
    });

    const { title, description, status,
      priority, assigned_to: assignedTo, team_id: teamId } = bodySchema.parse(request.body);

    const paramsSchema = z.object({
      task_id: z.uuid()
    });

    const { task_id: taskId } = paramsSchema.parse(request.params);

    const user = await prisma.user.findFirst({ where: { id: assignedTo } });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const team = await prisma.team.findFirst({ where: { id: teamId } });

    if (!team) {
      throw new AppError("Team not found", 404);
    }

    const userInTeam = await prisma.teamMember.findFirst({
      where: {
        userId: assignedTo,
        teamId
      }
    });

    if (!userInTeam) {
      throw new AppError("That user does not belong to that team", 400);
    }

    const taskExists = await prisma.task.findFirst({ where: { id: taskId } });

    if (!taskExists) {
      throw new AppError("Task not found", 404);
    }

    const taskUpdated = await prisma.task.update({
      data: {
        title, description: description || "", status, priority, assignedTo, teamId
      },
      where: {
        id: taskId
      }
    });

    return response.json(taskUpdated);
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      task_id: z.uuid()
    });

    const { task_id: taskId } = paramsSchema.parse(request.params);

    const task = await prisma.task.findFirst({ where: { id: taskId } });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    await prisma.task.delete({ where: { id: taskId } });

    return response.status(204).json();
  }
}
