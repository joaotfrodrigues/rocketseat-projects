import { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class UsersController {
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      user_id: z.uuid()
    });

    const { user_id: userId } = paramsSchema.parse(request.params);

    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      where: { id: userId }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return response.json(user);
  }

  async index(request: Request, response: Response) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2).max(50),
      email: z.email().trim(),
      password: z.string().min(6).max(16)
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("E-mail already in use");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }
}
