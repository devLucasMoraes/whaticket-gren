import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Senha muito curta")
    .max(100, "Nome muito longo")
    .nonempty("Senha é obrigatória"),
});

export type loginSchema = z.infer<typeof loginSchema>;
