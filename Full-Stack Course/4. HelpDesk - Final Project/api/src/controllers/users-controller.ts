import { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";


export class UsersController {
  async create(request: Request, response: Response) {
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
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
        .max(16, { message: "Senha demasiado longa" })
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const emailInUse = await prisma.user.findFirst({ where: { email } });

    if (emailInUse) {
      throw new AppError("E-mail já está em uso");
    }

    const hashedPassword = await hash(password as string, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const { password: _, schedules, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }
}
