import { z } from "zod";
import { UserTypeSchema, AccountStatusSchema } from "./roles.js";

export const UserSchema = z.object({
  id: z.string().uuid(),
  userCode: z.string().min(3).max(32),
  userType: UserTypeSchema,
  status: AccountStatusSchema,
  email: z.string().email().nullable().optional(),
  phoneNumber: z.string().min(9).max(20).nullable().optional(),
  idpProvider: z.enum(["LOCAL", "SUPABASE_AUTH", "ZITADEL", "OIDC_GOV", "MACHINE_CREDENTIALS"]),
  idpSubjectId: z.string().nullable().optional(),
  isMfaEnabled: z.boolean().default(false),
  metadata: z.record(z.unknown()).default({}),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

export const RatepayerProfileSchema = z.object({
  userId: z.string().uuid(),
  ratepayerType: z.enum(["INDIVIDUAL", "ORGANIZATION"]),
  firstName: z.string().max(100).nullable().optional(),
  lastName: z.string().max(100).nullable().optional(),
  companyName: z.string().max(255).nullable().optional(),
  ghanaCardNumber: z.string().max(30).nullable().optional(),
  tinNumber: z.string().max(30).nullable().optional(),
  kycStatus: z.enum([
    "UNVERIFIED",
    "PHONE_VERIFIED",
    "GHANA_CARD_SUBMITTED",
    "GHANA_CARD_VERIFIED",
    "ENTERPRISE_TIN_VERIFIED",
  ]),
  primaryPhone: z.string().min(9).max(20),
  primaryEmail: z.string().email().nullable().optional(),
  preferredChannel: z.enum(["SMS", "EMAIL", "WHATSAPP", "APP_PUSH"]).default("SMS"),
  digitalAddressGhPost: z.string().max(20).nullable().optional(),
});
export type RatepayerProfile = z.infer<typeof RatepayerProfileSchema>;
