import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";
import { authConfig } from "@/config/auth";


export class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email().trim(),
      password: z.string()
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("Invalid e-mail or password", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Invalid e-mail or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user!.role ?? "member" }, secret, {
      subject: user!.id,
      expiresIn
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.json({ token, user: userWithoutPassword });
  }
}
