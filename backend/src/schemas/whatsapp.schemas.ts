import { z } from "zod";

export const whatsappCreateSchema = z.object({
  name: z
    .string()
    .min(2, "ERR_WHATSAPP_INVALID_NAME")
    .max(100, "ERR_WHATSAPP_INVALID_NAME"),
  queueIds: z.array(z.number()).optional().default([]),
  greetingMessage: z
    .string()
    .nonempty("ERR_WHATSAPP_INVALID_GREETING")
    .optional(),
  farewellMessage: z
    .string()
    .nonempty("ERR_WHATSAPP_INVALID_FAREWELL")
    .optional(),
  status: z
    .enum(["OPENING", "CLOSED", "CONNECTED"])
    .optional()
    .default("OPENING"),
  isDefault: z.boolean(),
});

export type WhatsappCreateSchema = z.infer<typeof whatsappCreateSchema>;

export const whatsappUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "ERR_WHATSAPP_INVALID_NAME")
    .max(100, "ERR_WHATSAPP_INVALID_NAME"),
  queueIds: z.array(z.number()).optional().default([]),
  greetingMessage: z
    .string()
    .nonempty("ERR_WHATSAPP_INVALID_GREETING")
    .optional(),
  farewellMessage: z
    .string()
    .nonempty("ERR_WHATSAPP_INVALID_FAREWELL")
    .optional(),
  status: z
    .enum(["OPENING", "CLOSED", "CONNECTED"])
    .optional()
    .default("OPENING"),
  isDefault: z.boolean(),
  session: z.string().optional(),
});

export type WhatsappUpdateSchema = z.infer<typeof whatsappUpdateSchema>;

export const whatsappParamsSchema = z.object({
  id: z.string().refine((value) => {
    return !isNaN(parseInt(value));
  }, "ERR_WHATSAPP_INVALID_ID"),
});

export type WhatsappParamsSchema = z.infer<typeof whatsappParamsSchema>;
