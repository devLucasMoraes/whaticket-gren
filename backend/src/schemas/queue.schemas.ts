import { z } from "zod";

export const queueCreateSchema = z.object({
  name: z
    .string()
    .min(2, "ERR_QUEUE_INVALID_NAME")
    .max(100, "ERR_QUEUE_INVALID_NAME"),
  color: z
    .string()
    .nonempty("ERR_QUEUE_INVALID_COLOR")
    .regex(/^#([A-Fa-f0-9]{6})$/, "ERR_QUEUE_INVALID_COLOR"),
  greetingMessage: z.string().optional(),
});

export type QueueCreateSchema = z.infer<typeof queueCreateSchema>;

export const queueUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "ERR_QUEUE_INVALID_NAME")
    .max(100, "ERR_QUEUE_INVALID_NAME"),
  color: z
    .string()
    .nonempty("ERR_QUEUE_INVALID_COLOR")
    .regex(/^#([A-Fa-f0-9]{6})$/, "ERR_QUEUE_INVALID_COLOR"),
  greetingMessage: z.string().optional(),
});

export type QueueUpdateSchema = z.infer<typeof queueUpdateSchema>;

export const queueParamsSchema = z.object({
  id: z.string().refine((value) => {
    return !isNaN(parseInt(value));
  }, "ERR_QUEUE_INVALID_ID"),
});

export type QueueParamsSchema = z.infer<typeof queueParamsSchema>;
