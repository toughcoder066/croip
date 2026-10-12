import { z } from "zod";

export const FieldErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
});
export type FieldError = z.infer<typeof FieldErrorSchema>;

export const ApiErrorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  fields: z.array(FieldErrorSchema).optional(),
});
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  statusCode: z.number(),
  error: ApiErrorDetailSchema,
  timestamp: z.string(),
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
