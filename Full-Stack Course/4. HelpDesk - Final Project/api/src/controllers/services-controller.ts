import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class ServicesController {
  async index(request: Request, response: Response) {
    const querySchema = z.object({
      status: z
        .enum(["active", "inactive"])
        .nullable()
        .default(null),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10)
    });

    const { status, page, perPage } = querySchema.parse(request.query);

    // Calculate de skip values
    const skip = (page - 1) * perPage;

    const services = await prisma.service.findMany({
      skip,
      take: perPage,
      where: {
        ...(status ? { status } : {}),
        deletedAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // Get total number of pages
    const totalRecords = await prisma.service.count({
      where: {
        ...(status ? { status } : {})
      }
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    return response.json({
      services,
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
      title: z.string().trim()
        .min(2, { message: "O nome do serviço é obrigatório" })
        .max(100, { message: "Nome do serviço demasiado longo" }),
      price: z.coerce.number()
        .min(0, { message: "O preço não pode ser negativo" })
    });

    const { title, price } = bodySchema.parse(request.body);

    const titleInUse = await prisma.service.findFirst({
      where: { title, deletedAt: null }
    });

    if (titleInUse) {
      throw new AppError("Titulo em uso");
    }

    const service = await prisma.service.create({
      data: { title, price, status: "active" }
    });

    return response.status(201).json(service);
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const bodySchema = z.object({
      title: z.string().trim()
        .min(2, { message: "O nome do serviço é obrigatório" })
        .max(100, { message: "Nome do serviço demasiado longo" }),
      price: z.coerce.number()
        .min(0, { message: "O preço não pode ser negativo" })
    });

    const { id } = paramsSchema.parse(request.params);
    const { title, price } = bodySchema.parse(request.body);

    const serviceExists = await prisma.service.findFirst({
      where: { id, deletedAt: null }
    });

    if (!serviceExists) {
      throw new AppError("Serviço não encontrado", 404);
    }

    const titleInUse = await prisma.service.findFirst({
      where: { title, deletedAt: null }
    });

    if (titleInUse) {
      throw new AppError("Titulo em uso");
    }

    const service = await prisma.service.update({
      data: {
        title, price
      },
      where: {
        id
      }
    });

    return response.json(service);
  }

  async updateStatus(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const bodySchema = z.object({
      status: z.enum(["active", "inactive"])
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    const serviceExists = await prisma.service.findFirst({
      where: { id, deletedAt: null }
    });

    if (!serviceExists) {
      throw new AppError("Serviço não encontrado", 404);
    }

    const service = await prisma.service.update({
      data: { status },
      where: { id }
    });

    return response.json(service);
  }

  async remove(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const serviceExists = await prisma.service.findFirst({
      where: { id }
    });

    if (!serviceExists) {
      throw new AppError("Serviço não encontrado", 404);
    }

    await prisma.service.update({
      data: { deletedAt: new Date() },
      where: { id }
    });

    return response.status(204).json();
  }
}
