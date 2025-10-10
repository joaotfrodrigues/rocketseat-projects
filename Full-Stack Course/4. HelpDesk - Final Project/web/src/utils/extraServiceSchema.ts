import { z } from "zod";


export const extraServiceSchema = z.object({
  description: z.string().trim()
    .min(5, { message: "Descrição demasiado curta" })
    .max(50, { message: "Descrição demasiado longa" }),
  price: z.string().min(0, "Preço inválido")
});
