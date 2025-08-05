import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/app-error";


interface TokenPayload {
  role: string
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    // Bearer 3i1bi3i2utbi
    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new AppError("JWT token not found", 401);
    }

    const { role, sub: userId } = verify(token, authConfig.jwt.secret) as TokenPayload;

    request.user = {
      id: userId,
      role
    }

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
}
