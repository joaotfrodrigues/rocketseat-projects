import { z } from "zod";


export const createCallSchema = z.object({
  title: z.string().trim()
    .min(5, { message: "Título demasiado curto" })
    .max(50, { message: "Título demasiado longo" }),
  description: z.string().trim()
    .min(20, { message: "Descrição demasiado curta" })
    .max(500, { message: "Descrição demasiado longa" }),
  service_id: z.string().min(1, { message: "Serviço é obrigatório" })
});

