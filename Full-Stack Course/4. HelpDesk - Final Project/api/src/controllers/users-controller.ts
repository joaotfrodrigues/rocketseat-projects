import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { z } from "zod";

import { DiskStorage } from "@/providers/disk-storage";
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

  async update(request: Request, response: Response) {
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
      filename: z.string()
        .min(20, { message: "Nome do ficheiro demasiado curto" })
    });

    const { name, email, filename: avatar } = bodySchema.parse(request.body);

    const emailInUse = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: request.user!.id }
      }
    });

    if (emailInUse) {
      throw new AppError("E-mail já está em uso");
    }

    const diskStorage = new DiskStorage();
    const avatarExists = await diskStorage.checkFileExists(avatar);

    if (!avatarExists) {
      throw new AppError("Ficheiro não encontrado", 404);
    }

    const user = await prisma.user.update({
      where: {
        id: request.user!.id
      },
      data: {
        name, email, avatar
      }
    });

    return response.json(user);
  }

  async updatePassword(request: Request, response: Response) {
    const bodySchema = z.object({
      old_password: z.string(),
      new_password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
        .max(16, { message: "Senha demasiado longa" })
    });

    const { old_password: oldPassword, new_password: newPassword } = bodySchema.parse(request.body);

    const userExists = await prisma.user.findFirst({
      where: { id: request.user!.id }
    });

    if (!userExists) {
      throw new AppError("Not authorized", 401);
    }

    const passwordMatched = await compare(oldPassword, userExists.password);

    if (!passwordMatched) {
      throw new AppError("Password errada", 401);
    }

    const hashedPassword = await hash(newPassword as string, 8);

    const user = await prisma.user.update({
      where: {
        id: request.user!.id
      },
      data: {
        password: hashedPassword
      }
    });

    return response.json(user);
  }
}
