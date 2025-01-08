import { z } from "zod";

export const quickAnswerCreateSchema = z.object({
  shortcut: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo"),
  message: z.string().nonempty("Mensagem é obrigatória"),
});

export type QuickAnswerCreateSchema = z.infer<typeof quickAnswerCreateSchema>;

export const quickAnswerUpdateSchema = z.object({
  id: z.number(),
  shortcut: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo"),
  message: z.string().nonempty("Mensagem é obrigatória"),
});

export type QuickAnswerUpdateSchema = z.infer<typeof quickAnswerUpdateSchema>;

export const quickAnswerParamsSchema = z.object({
  id: z.string().refine((value) => {
    return !isNaN(parseInt(value));
  }, "ERR_WHATSAPP_INVALID_ID"),
});

export type QuickAnswerParamsSchema = z.infer<typeof quickAnswerParamsSchema>;
