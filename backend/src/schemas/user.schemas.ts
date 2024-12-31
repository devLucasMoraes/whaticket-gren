import { z } from "zod";

export const userCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .nonempty("Nome nõo pode ser vazio"),
  email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Senha muito curta")
    .max(100, "Nome muito longo")
    .nonempty("Senha é obrigatória"),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .nonempty("Nome nõo pode ser vazio"),
  email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Senha muito curta")
    .max(100, "Nome muito longo")
    .nonempty("Senha é obrigatória"),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export const userParamsSchema = z.object({
  id: z.string().uuid(),
});

export type UserParamsSchema = z.infer<typeof userParamsSchema>;
