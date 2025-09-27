import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class ClientsController {
  async index(request: Request, response: Response) {
    const querySchema = z.object({
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10)
    });

    const { page, perPage } = querySchema.parse(request.query);

    // Calculate de skip values
    const skip = (page - 1) * perPage;

    const clients = await prisma.user.findMany({
      skip,
      take: perPage,
      where: {
        role: "client"
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        avatar: true
      }
    });

    // Get total number of pages
    const totalRecords = await prisma.user.count({
      where: {
        role: "client"
      }
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    return response.json({
      clients,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1
      }
    });
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "O campo nome é obrigatório" })
        .max(16, { message: "Nome demasiado longo" }),
      email: z
        .string()
        .trim()
        .email({ message: "O campo e-mail é obrigatório" })
        .toLowerCase(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, email } = bodySchema.parse(request.body);

    const clientExists = await prisma.user.findFirst({
      where: {
        id,
        role: "client"
      }
    });

    if (!clientExists) {
      throw new AppError("Cliente não encontrado", 404);
    }

    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id }
      }
    });

    if (emailExists) {
      throw new AppError("E-mail já em uso");
    }

    const client = await prisma.user.update({
      data: {
        name, email
      },
      where: {
        id,
        role: "client"
      }
    });

    return response.json(client);
  }

  async remove(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const clientExists = await prisma.user.findFirst({
      where: {
        id,
        role: "client"
      }
    });

    if (!clientExists) {
      throw new AppError("Cliente não encontrado", 404);
    }

    await prisma.user.delete({
      where: {
        id,
        role: "client"
      }
    });

    return response.status(204).json();
  }
}
