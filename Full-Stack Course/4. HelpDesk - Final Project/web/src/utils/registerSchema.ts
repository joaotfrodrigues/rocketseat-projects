import { z } from "zod";


export const registerSchema = z.object({
  name: z.string().trim()
    .min(2, { message: "O campo nome é obrigatório" })
    .max(16, { message: "Nome demasiado longo" }),
  email: z.string().trim().email({ message: "O campo e-mail é obrigatório" }),
  password: z.string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(16, { message: "Senha demasiado longa" })
});

