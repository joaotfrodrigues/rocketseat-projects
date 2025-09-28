import { Request, Response } from "express";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class ExtraServicesController {
  async create(request: Request, response: Response) {
    const paramsSchema = z.object({
      call_id: z.uuid()
    });

    const bodySchema = z.object({
      description: z.string().trim()
        .min(5, { message: "Descrição demasiado curta" })
        .max(50, { message: "Descrição demasiado longa" }),
      price: z.coerce.number()
        .min(0, { message: "O preço não pode ser negativo" })
    });

    const { call_id: callId } = paramsSchema.parse(request.params);
    const { description, price } = bodySchema.parse(request.body);

    const callExists = await prisma.call.findFirst({
      where: {
        id: callId,
        technicianId: request.user!.id
      }
    });

    if (!callExists) {
      throw new AppError("Chamado não encontrado", 404);
    }

    const extraService = await prisma.extraService.create({
      data: {
        description,
        price,
        callId
      }
    });

    return response.status(201).json(extraService);
  }

  async remove(request: Request, response: Response) {
    const paramsSchema = z.object({
      extra_service_id: z.uuid()
    });

    const { extra_service_id: extraServiceId } = paramsSchema.parse(request.params);

    const callExists = await prisma.extraService.findFirst({
      where: {
        id: extraServiceId,
        call: {
          technicianId: request.user!.id
        }
      }
    });

    if (!callExists) {
      throw new AppError("Chamado não encontrado", 404);
    }

    await prisma.extraService.delete({
      where: {
        id: extraServiceId,
        call: {
          technicianId: request.user!.id
        }
      }
    });

    return response.status(204).json();
  }
}
