/**
 * User Identity, Ratepayer Profile, and Access Management Contract Schemas.
 * Governs registration, KYC tiers, profile completion scoring, and credential validation.
 */
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
  ratepayerType: z.enum(["INDIVIDUAL", "ORGANIZATION"]).default("INDIVIDUAL"),
  firstName: z.string().max(100).nullable().optional(),
  lastName: z.string().max(100).nullable().optional(),
  fullName: z.string().max(200),
  companyName: z.string().max(255).nullable().optional(),
  ghanaCardNumber: z.string().max(30).nullable().optional(),
  tinNumber: z.string().max(30).nullable().optional(),
  kycStatus: z.enum([
    "UNVERIFIED",
    "TIER_1_UNVERIFIED",
    "TIER_2_BASIC",
    "TIER_3_VERIFIED",
    "PHONE_VERIFIED",
    "GHANA_CARD_SUBMITTED",
    "GHANA_CARD_VERIFIED",
    "ENTERPRISE_TIN_VERIFIED",
  ]).default("TIER_1_UNVERIFIED"),
  primaryPhone: z.string().min(9).max(20).nullable().optional(),
  primaryEmail: z.string().email().nullable().optional(),
  preferredChannels: z.array(z.string()).default(["SMS"]),
  digitalAddressGhPost: z.string().max(20).nullable().optional(),
});
export type RatepayerProfile = z.infer<typeof RatepayerProfileSchema>;

export const ProfileCompletionChecklistSchema = z.object({
  phoneProvided: z.boolean(),
  emailProvided: z.boolean(),
  nameProvided: z.boolean(),
  ghanaCardProvided: z.boolean(),
  digitalAddressProvided: z.boolean(),
  tinProvided: z.boolean(),
});
export type ProfileCompletionChecklist = z.infer<typeof ProfileCompletionChecklistSchema>;

export const ProfileCompletionSchema = z.object({
  percentage: z.number().min(0).max(100),
  kycLevel: z.string(),
  isComplete: z.boolean(),
  checklist: ProfileCompletionChecklistSchema,
  missingFields: z.array(z.string()),
  nextSteps: z.array(z.string()),
});
export type ProfileCompletion = z.infer<typeof ProfileCompletionSchema>;

/**
 * Calculates progressive profile completion metrics and KYC tier scoring for citizen ratepayers.
 *
 * Scored dimensions:
 * - Basic Contact (Phone / Email): 20 points
 * - Structured Name (First / Last Name): 20 points
 * - National Identity (Ghana Card): 30 points
 * - Digital Address (GhanaPost GPS): 15 points
 * - Tax Identification Number (GRA TIN): 15 points
 *
 * @param profile - Ratepayer profile attributes
 * @returns Profile completion metric object containing percentage, KYC status, and completion flag.
 */
export function calculateRatepayerCompletion(profile: {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  fullName?: string | null | undefined;
  phone?: string | null | undefined;
  email?: string | null | undefined;
  primaryPhone?: string | null | undefined;
  primaryEmail?: string | null | undefined;
  ghanaCardNumber?: string | null | undefined;
  digitalAddress?: string | null | undefined;
  digitalAddressGhPost?: string | null | undefined;
  tin?: string | null | undefined;
  tinNumber?: string | null | undefined;
  kycStatus?: string | null | undefined;
}): ProfileCompletion {
  const phone = profile.phone || profile.primaryPhone;
  const email = profile.email || profile.primaryEmail;
  const hasName = Boolean((profile.firstName && profile.lastName) || profile.fullName);
  const hasGhanaCard = Boolean(profile.ghanaCardNumber);
  const hasDigitalAddress = Boolean(profile.digitalAddress || profile.digitalAddressGhPost);
  const hasTin = Boolean(profile.tin || profile.tinNumber);

  const checklist: ProfileCompletionChecklist = {
    phoneProvided: Boolean(phone),
    emailProvided: Boolean(email),
    nameProvided: hasName,
    ghanaCardProvided: hasGhanaCard,
    digitalAddressProvided: hasDigitalAddress,
    tinProvided: hasTin,
  };

  const missingFields: string[] = [];
  const nextSteps: string[] = [];

  let completedCount = 0;
  const totalWeight = 6;

  if (checklist.nameProvided) completedCount++;
  else {
    missingFields.push("name");
    nextSteps.push("Provide your first and last name");
  }

  if (checklist.phoneProvided) completedCount++;
  else {
    missingFields.push("phone");
    nextSteps.push("Add a mobile phone number for SMS and instant OTP login");
  }

  if (checklist.emailProvided) completedCount++;
  else {
    missingFields.push("email");
    nextSteps.push("Add an email address to receive digital property bills and receipts");
  }

  if (checklist.ghanaCardProvided) completedCount++;
  else {
    missingFields.push("ghanaCardNumber");
    nextSteps.push("Link your Ghana Card (National ID) to verify property ownership");
  }

  if (checklist.digitalAddressProvided) completedCount++;
  else {
    missingFields.push("digitalAddress");
    nextSteps.push("Add GhanaPost GPS digital address for accurate property lookup");
  }

  if (checklist.tinProvided) completedCount++;
  else {
    missingFields.push("tin");
    nextSteps.push("Add Taxpayer Identification Number (TIN) if registered as a corporate ratepayer");
  }

  const percentage = Math.round((completedCount / totalWeight) * 100);

  let kycLevel = "TIER_1_UNVERIFIED";
  if (checklist.ghanaCardProvided && checklist.phoneProvided && checklist.digitalAddressProvided) {
    kycLevel = "TIER_3_VERIFIED";
  } else if (checklist.phoneProvided || checklist.emailProvided) {
    kycLevel = "TIER_2_BASIC";
  }

  return {
    percentage,
    kycLevel: profile.kycStatus || kycLevel,
    isComplete: percentage === 100,
    checklist,
    missingFields,
    nextSteps,
  };
}

export const RegisterRatepayerInputSchema = z
  .object({
    firstName: z.string().min(2, "First name must have at least 2 characters").max(100),
    lastName: z.string().min(2, "Last name must have at least 2 characters").max(100),
    phone: z.string().min(9).max(20).optional().describe("Primary mobile number for SMS and OTP login"),
    email: z.string().email("A valid email address is required").optional().describe("Primary email address"),
    password: z.string().min(8, "Password must be at least 8 characters").describe("Account password for ratepayer authentication"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters").describe("Confirm account password"),
    preferredChannels: z.array(z.string()).default(["SMS"]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => Boolean(data.phone || data.email), {
    message: "At least one contact identifier (phone number or email) is required",
    path: ["phone"],
  });
export type RegisterRatepayerInput = z.infer<typeof RegisterRatepayerInputSchema>;

// Ratepayer Login Step 1: Phone/Email + Password Verification
export const RatepayerLoginInputSchema = z.object({
  identifier: z.string().min(3).describe("Registered phone number or email"),
  password: z.string().min(1).describe("Account password"),
});
export type RatepayerLoginInput = z.infer<typeof RatepayerLoginInputSchema>;

export const RatepayerLoginStep1ResponseSchema = z.object({
  status: z.literal("OTP_REQUIRED"),
  message: z.string(),
  destination: z.string(),
  expiresInSeconds: z.number(),
  devOtpCode: z.string().optional().describe("Mock OTP code for local/test validation"),
});
export type RatepayerLoginStep1Response = z.infer<typeof RatepayerLoginStep1ResponseSchema>;

// Ratepayer Login Step 2: OTP Verification & Token Issuance
export const VerifyOtpSchema = z.object({
  identifier: z.string().min(3).describe("Phone number or email receiving OTP"),
  otpCode: z.string().min(4).max(8),
});
export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;

export const RequestOtpSchema = z.object({
  identifier: z.string().min(3),
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
