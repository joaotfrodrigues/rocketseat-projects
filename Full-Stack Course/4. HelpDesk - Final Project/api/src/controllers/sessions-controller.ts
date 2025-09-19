import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";


export class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().trim().email(),
      password: z.string()
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.json({ token, user: userWithoutPassword });
  }
}
