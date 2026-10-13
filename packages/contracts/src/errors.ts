import { z } from "zod";

/**
 * Granular field-level validation error detail compliant with RFC 7807 / RFC 9457 Problem Details.
 */
export const FieldErrorSchema = z.object({
  /** Parameter or request body field path causing the validation error. */
  field: z.string(),
  /** User-friendly error message explaining the validation constraint failure. */
  message: z.string(),
});
export type FieldError = z.infer<typeof FieldErrorSchema>;

/**
 * Standard API error detail payload providing error code and optional field-level breakdowns.
 */
export const ApiErrorDetailSchema = z.object({
  /** Machine-readable error code (e.g., 'BAD_REQUEST', 'UNAUTHORIZED', 'NOT_FOUND', 'CONFLICT'). */
  code: z.string(),
  /** Human-readable explanation of the error. */
  message: z.string(),
  /** Array of individual field validation issues when validation fails. */
  fields: z.array(FieldErrorSchema).optional(),
});
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;

/**
 * Unified Central Platform API Error Response Envelope adhering to RFC 7807 problem standards.
 */
export const ApiErrorResponseSchema = z.object({
  /** Discriminator literal indicating a non-successful response. */
  success: z.literal(false),
  /** HTTP response status code matching the envelope. */
  statusCode: z.number(),
  /** Structured error detail. */
  error: ApiErrorDetailSchema,
  /** ISO-8601 timestamp representing when the error occurred. */
  timestamp: z.string(),
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
