import { z } from "zod";


export const manageServiceSchema = z.object({
  title: z.string().trim()
    .min(2, { message: "O nome do serviço é obrigatório" })
    .max(100, { message: "Nome do serviço demasiado longo" }),
  price: z.coerce.number({ message: "Preço inválido" }).min(0, "Preço inválido")
});

