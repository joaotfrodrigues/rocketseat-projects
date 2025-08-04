import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

import { AppError } from "@/utils/app-error";


export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    const issues = z.treeifyError(error);

    return response.status(400).json({ message: "Bad gateway", issues });
  }

  return response.status(500).json({ message: "Something went wrong" });
}
