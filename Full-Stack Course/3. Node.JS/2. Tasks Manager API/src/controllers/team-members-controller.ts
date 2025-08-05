import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class TeamMembersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.uuid()
    });

    const { user_id: userId } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const paramsSchema = z.object({
      team_id: z.uuid()
    });

    const { team_id: teamId } = paramsSchema.parse(request.params);

    const team = await prisma.team.findFirst({ where: { id: teamId } });

    if (!team) {
      throw new AppError("Team not found", 404);
    }

    const userAssociation = await prisma.teamMember.create({
      data: {
        userId,
        teamId
      },
      include: {
        team: true
      }
    });

    return response.status(201).json(userAssociation);
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      team_id: z.uuid(),
      user_id: z.uuid()
    });

    const { team_id: teamId, user_id: userId } = paramsSchema.parse(request.params);

    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const team = await prisma.team.findFirst({ where: { id: teamId } });

    if (!team) {
      throw new AppError("Team not found", 404);
    }

    await prisma.teamMember.delete({
      where: {
        userId_teamId: {
          userId,
          teamId
        }
      }
    });

    return response.status(204).json();
  }
}
