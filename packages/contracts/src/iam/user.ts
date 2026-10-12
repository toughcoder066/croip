import { z } from "zod";
import { UserTypeSchema, AccountStatusSchema, ScopeLevelSchema } from "./roles.js";

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
  preferredChannels: z.array(z.string()).default(["SMS"]),
  digitalAddressGhPost: z.string().max(20).nullable().optional(),
});
export type RatepayerProfile = z.infer<typeof RatepayerProfileSchema>;

export const ProfileCompletionSchema = z.object({
  percentage: z.number().min(0).max(100),
  kycLevel: z.string(),
  isComplete: z.boolean(),
  checklist: z.object({
    phoneVerified: z.boolean(),
    nameProvided: z.boolean(),
    emailProvided: z.boolean(),
    ghanaCardProvided: z.boolean(),
    digitalAddressProvided: z.boolean(),
  }),
  missingFields: z.array(z.string()),
  nextSteps: z.array(z.string()),
});
export type ProfileCompletion = z.infer<typeof ProfileCompletionSchema>;

export const RegisterRatepayerInputSchema = z
  .object({
    phoneNumber: z.string().min(9).max(20).describe("Primary phone number for SMS notifications and OTP login"),
    password: z.string().min(8, "Password must be at least 8 characters").describe("Account password for ratepayer authentication"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters").describe("Confirm account password"),
    email: z.string().email().optional(),
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    companyName: z.string().max(255).optional(),
    ghanaCardNumber: z.string().max(30).optional().describe("National ID (e.g., GHA-123456789-0)"),
    ratepayerType: z.enum(["INDIVIDUAL", "ORGANIZATION"]).default("INDIVIDUAL"),
    digitalAddressGhPost: z.string().max(20).optional().describe("GhanaPost GPS address (e.g. AK-039-5028)"),
    preferredLanguage: z.string().default("en"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterRatepayerInput = z.infer<typeof RegisterRatepayerInputSchema>;

// Ratepayer Login Step 1: Phone + Password Verification
export const RatepayerLoginInputSchema = z.object({
  phoneNumber: z.string().min(9).max(20).describe("Registered phone number"),
  password: z.string().min(6).describe("Account password"),
});
export type RatepayerLoginInput = z.infer<typeof RatepayerLoginInputSchema>;

export const RatepayerLoginStep1ResponseSchema = z.object({
  status: z.literal("OTP_REQUIRED"),
  message: z.string(),
  phoneNumber: z.string(),
  expiresInSeconds: z.number(),
  devOtpCode: z.string().optional().describe("Mock OTP code for local/test validation"),
});
export type RatepayerLoginStep1Response = z.infer<typeof RatepayerLoginStep1ResponseSchema>;

// Ratepayer Login Step 2: OTP Verification & Token Issuance
export const VerifyOtpSchema = z.object({
  phoneNumber: z.string().min(9).max(20),
  otpCode: z.string().min(4).max(8),
});
export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;

export const RequestOtpSchema = z.object({
  phoneNumber: z.string().min(9).max(20),
  purpose: z.enum(["RATEPAYER_LOGIN", "RATEPAYER_REGISTER"]).default("RATEPAYER_LOGIN"),
});
export type RequestOtpInput = z.infer<typeof RequestOtpSchema>;

export const StaffLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type StaffLoginInput = z.infer<typeof StaffLoginSchema>;

export const AuthTokenResponseSchema = z.object({
  accessToken: z.string(),
  tokenType: z.literal("Bearer"),
  expiresInSeconds: z.number(),
  user: z.object({
    id: z.string().uuid(),
    userCode: z.string(),
    userType: UserTypeSchema,
    email: z.string().nullable().optional(),
    phoneNumber: z.string().nullable().optional(),
    roles: z.array(z.record(z.unknown())),
  }),
  completion: ProfileCompletionSchema.optional(),
});
export type AuthTokenResponse = z.infer<typeof AuthTokenResponseSchema>;

export const OnboardGovStaffInputSchema = z.object({
  email: z.string().email("A valid official government email address is required"),
  firstName: z.string().min(2, "First name must have at least 2 characters").max(100),
  lastName: z.string().min(2, "Last name must have at least 2 characters").max(100),
  department: z.string().min(2, "Department is required").max(100),
  designation: z.string().max(100).optional(),
  employeeId: z.string().max(50).optional(),
  phoneNumber: z.string().min(9).max(20).optional(),
  initialRole: z.string().default("ROLE_GRA_OVERSIGHT"),
  scopeLevel: ScopeLevelSchema.default("NATIONAL"),
  regionId: z.string().optional(),
  concessionaireId: z.string().uuid().optional(),
  municipalityId: z.string().optional(),
  initialPassword: z.string().min(8, "Password must be at least 8 characters").optional(),
});
export type OnboardGovStaffInput = z.infer<typeof OnboardGovStaffInputSchema>;

export const OnboardGovStaffResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    userCode: z.string(),
    email: z.string(),
    phoneNumber: z.string().nullable(),
    status: AccountStatusSchema,
    isMfaEnabled: z.boolean(),
  }),
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
    designation: z.string().nullable(),
    department: z.string(),
    employeeId: z.string().nullable(),
  }),
  initialRole: z.string(),
  scopeLevel: ScopeLevelSchema,
  temporaryPassword: z.string().optional(),
  message: z.string(),
});
export type OnboardGovStaffResponse = z.infer<typeof OnboardGovStaffResponseSchema>;
