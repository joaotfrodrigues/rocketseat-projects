import { Request, Response } from "express";
import { z, ZodError } from "zod";

import uploadConfig from "@/configs/upload";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/app-error";


export class UploadsController {
  async create(request: Request, response: Response) {
    const diskStorage = new DiskStorage();

    try {
      const fileSchema = z.object({
        filename: z.string().min(1, { message: "Arquivo é obrigatório" }),
        mimetype: z.string().refine((type) => {
          return uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type)
        },
          { message: "Formato de arquivo inválido. Formatos permitidos: " + uploadConfig.ACCEPTED_IMAGE_TYPES }
        ),
        size: z.number().positive().refine((size) => {
          return size <= uploadConfig.MAX_FILE_SIZE
        },
          { message: `Arquivo excede o tamanho máximo de ${uploadConfig.MAX_SIZE} ` }
        ),
      }).passthrough();

      const file = fileSchema.parse(request.file);
      const filename = await diskStorage.saveFile(file.filename);

      return response.json({ filename });
    } catch (error) {
      if (error instanceof ZodError) {
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, "tmp");
        }

        throw new AppError(error.issues[0].message);
      }

      throw error;
    }
  }
}
