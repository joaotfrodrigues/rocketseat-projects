import { z } from "zod";


export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "O campo nome é obrigatório" })
    .max(16, { message: "Nome demasiado longo" }),
  email: z
    .string()
    .trim()
    .email({ message: "O campo e-mail é obrigatório" })
    .toLowerCase()
});

