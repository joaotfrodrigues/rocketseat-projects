import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class TeamsController {
  async index(request: Request, response: Response) {
    const teams = await prisma.team.findMany({
      include: {
        teamMembers: { select: { userId: true, createdAt: true } }
      }
    });

    return response.json(teams);
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const team = await prisma.team.findFirst({
      include: {
        teamMembers: { select: { userId: true, createdAt: true } }
      },
      where: { id }
    });

    if (!team) {
      throw new AppError("Team not found", 404);
    }

    return response.json(team);
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(2).max(50),
      description: z.string().optional()
    });

    const { name, description } = bodySchema.parse(request.body);

    const teamWithSameName = await prisma.team.findFirst({ where: { name } });

    if (teamWithSameName) {
      throw new AppError("Team name already in use", 400);
    }

    const team = await prisma.team.create({
      data: { name, description: description || "" }
    });

    return response.status(201).json(team);
  }

  async update(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(2).max(50),
      description: z.string().optional()
    });

    const paramsSchema = z.object({
      id: z.uuid()
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, description } = bodySchema.parse(request.body);

    const teamFound = await prisma.team.findFirst({ where: { id } });

    if (!teamFound) {
      throw new AppError("Team not found", 404);
    }

    const updatedTeam = await prisma.team.update({
      data: {
        name,
        description: description || ""
      },
      where: {
        id
      }
    });

    return response.json(updatedTeam);
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const existingTeam = await prisma.team.findFirst({ where: { id } });

    if (!existingTeam) {
      throw new AppError("Invalid team id");
    }

    await prisma.team.delete({ where: { id } });

    return response.status(204).json();
  }
}
