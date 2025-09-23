import { Request, Response, NextFunction } from "express";

import { AppError } from "@/utils/app-error";


export function verifyUserAuthorization(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user || !roles.includes(request.user.role)) {
      throw new AppError("Não autorizado", 401);
    }

    return next();
  }
}
