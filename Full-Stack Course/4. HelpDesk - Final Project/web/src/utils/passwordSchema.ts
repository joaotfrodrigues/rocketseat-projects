import { z } from "zod";


export const passwordSchema = z.object({
  old_password: z.string(),
  new_password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(16, { message: "Senha demasiado longa" })
});

