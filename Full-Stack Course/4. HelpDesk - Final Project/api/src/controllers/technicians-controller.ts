import { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class TechniciansController {
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    let { id } = paramsSchema.parse(request.params);

    if (request.user!.role === "technician" && id !== request.user!.id) {
      throw new AppError("Não autorizado");
    }

    const technician = await prisma.user.findFirst({
      where: {
        id,
        role: "technician"
      }
    });

    if (!technician) {
      throw new AppError("Técnico não encontrado", 404);
    }

    return response.json(technician);
  }

  async index(request: Request, response: Response) {
    const querySchema = z.object({
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10)
    });

    const { page, perPage } = querySchema.parse(request.query);

    // Calculate de skip values
    const skip = (page - 1) * perPage;

    const technicians = await prisma.user.findMany({
      skip,
      take: perPage,
      where: {
        role: "technician"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // Get total number of pages
    const totalRecords = await prisma.user.count({
      where: {
        role: "technician"
      }
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    return response.json({
      technicians,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1
      }
    });
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim()
        .min(2, { message: "O campo nome é obrigatório" })
        .max(16, { message: "Nome demasiado longo" }),
      email: z.string().trim()
        .email({ message: "O campo e-mail é obrigatório" })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
        .max(16, { message: "Senha demasiado longa" }),
      schedules: z.string()
        .refine((schedules) => {
          try {
            const parsed = JSON.parse(schedules);
            return Array.isArray(parsed);
          } catch (error) {
            return false;
          }
        }, { message: "Horários inválidos" })
    });

    const { name, email, password, schedules } = bodySchema.parse(request.body);

    const emailInUse = await prisma.user.findFirst({ where: { email } });

    if (emailInUse) {
      throw new AppError("E-mail já está em uso");
    }

    const hashedPassword = await hash(password as string, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "technician",
        schedules
      }
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const bodySchema = z.object({
      name: z.string().trim()
        .min(2, { message: "O campo nome é obrigatório" })
        .max(16, { message: "Nome demasiado longo" }),
      email: z.string().trim()
        .email({ message: "O campo e-mail é obrigatório" })
        .toLowerCase(),
      schedules: z.string()
        .refine((schedules) => {
          try {
            const parsed = JSON.parse(schedules);
            return Array.isArray(parsed);
          } catch (error) {
            return false;
          }
        }, { message: "Horários inválidos" })
    });

    const { id } = paramsSchema.parse(request.params);
    const { name, email, schedules } = bodySchema.parse(request.body);

    const emailInUse = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id
        }
      }
    });

    if (emailInUse) {
      throw new AppError("E-mail já está em uso");
    }

    const user = await prisma.user.update({
      data: {
        name,
        email,
        schedules
      },
      where: {
        id,
        role: "technician"
      }
    });

    const { password, ...userWithoutPassword } = user;

    return response.json(userWithoutPassword);
  }

  async remove(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const technician = await prisma.user.findFirst({
      where: {
        id,
        role: "technician"
      }
    });

    if (!technician) {
      throw new AppError("Técnico não encontrado", 404);
    }

    await prisma.user.delete({
      where: {
        id,
        role: "technician"
      }
    });

    return response.status(204).json();
  }
}
