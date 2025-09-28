import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class CallsController {
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      call_id: z.uuid()
    });

    const { call_id: callId } = paramsSchema.parse(request.params);

    const user = request.user;
    const where: {
      id: string,
      clientId?: string,
      technicianId?: string,
    } = { id: callId }

    if (user!.role === "client") {
      where.clientId = user!.id;
    }

    if (user!.role === "technician") {
      where.technicianId = user!.id;
    }

    const call = await prisma.call.findFirst({
      where,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        service: {
          select: { title: true, price: true }
        },
        technician: {
          select: { name: true, email: true, avatar: true }
        },
        client: {
          select: { name: true, avatar: true }
        },
        extraServices: {
          select: { id: true, description: true, price: true }
        }
      }
    });

    if (!call) {
      throw new AppError("Chamado não encontrado", 404);
    }

    return response.json(call);
  }

  async index(request: Request, response: Response) {
    const querySchema = z.object({
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10)
    });

    const { page, perPage } = querySchema.parse(request.query);

    // Calculate de skip values
    const skip = (page - 1) * perPage;

    const user = request.user;
    const where: { clientId?: string, technicianId?: string } = {}

    if (user!.role === "client") {
      where.clientId = user!.id;
    }

    if (user!.role === "technician") {
      where.technicianId = user!.id;
    }

    const calls = await prisma.call.findMany({
      skip,
      take: perPage,
      where,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        service: {
          select: { title: true, price: true }
        },
        technician: {
          select: { name: true, avatar: true }
        },
        client: {
          select: { name: true, avatar: true }
        }
      }
    });

    // Get total number of pages
    const totalRecords = await prisma.call.count({ where });

    const totalPages = Math.ceil(totalRecords / perPage);

    return response.json({
      calls,
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
        .min(5, { message: "Título demasiado curto" })
        .max(50, { message: "Título demasiado longo" }),
      description: z.string().trim()
        .min(20, { message: "Descrição demasiado curta" })
        .max(500, { message: "Descrição demasiado longa" }),
      service_id: z.uuid()
    });

    const { title, description, service_id: serviceId } = bodySchema.parse(request.body);

    // verify if service exists
    const serviceExists = await prisma.service.findFirst({
      where: { id: serviceId }
    });

    if (!serviceExists) {
      throw new AppError("Serviço não encontrado", 404);
    }

    // get random technician
    const techniciansCount = await prisma.user.count({
      where: { role: "technician" }
    });

    if (techniciansCount === 0) {
      throw new AppError("Não há técnicos disponíveis no momento");
    }

    const skip = Math.floor(Math.random() * techniciansCount);

    const technician = await prisma.user.findFirst({
      where: { role: "technician" },
      skip,
      orderBy: { id: "asc" }
    });

    const call = await prisma.call.create({
      data: {
        title,
        description,
        status: "opened",
        serviceId,
        clientId: request.user!.id,
        technicianId: technician!.id
      }
    });

    return response.status(201).json(call);
  }

  async updateStatus(request: Request, response: Response) {
    const paramsSchema = z.object({
      call_id: z.uuid()
    });

    const bodySchema = z.object({
      status: z.enum(["opened", "progress", "closed"])
    });

    const { call_id: callId } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    if (request.user!.role === "technician") {
      const callExists = await prisma.call.findFirst({
        where: {
          id: callId,
          technicianId: request.user!.id
        }
      });

      if (!callExists) {
        throw new AppError("Chamado não encontrado", 404);
      }
    }

    const call = await prisma.call.update({
      where: {
        id: callId
      },
      data: { status },
      include: {
        service: {
          select: { title: true, price: true }
        },
        technician: {
          select: { name: true, email: true, avatar: true }
        },
        client: {
          select: { name: true, avatar: true }
        },
        extraServices: {
          select: { id: true, description: true, price: true }
        }
      }
    });


    if (!call) {
      throw new AppError("Chamado não encontrado", 404);
    }

    return response.json(call);
  }
}
