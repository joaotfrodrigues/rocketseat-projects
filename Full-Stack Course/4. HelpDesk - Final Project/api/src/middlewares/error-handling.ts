import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { ZodError } from "zod";


export const errorHandling: ErrorRequestHandler = (
  error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  } else if (error instanceof ZodError) {
    return response.status(400).json({ message: "Validation Format", issues: error.format() });
  } else {
    console.log(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
