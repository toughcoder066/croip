import { z } from 'zod';

/**
 * Zod validation schema for Citizen Ratepayer Self-Registration.
 *
 * Enforces:
 * - Names between 2 and 100 characters.
 * - Password matching confirmation with minimum 8 characters.
 * - At least one valid contact channel (phone or email) to receive verification OTPs and property notices.
 * - Preferred notification channels (defaulting to SMS for Ghana mobile penetration).
 */
export const RegisterRatepayerSchema = z.object({
  firstName: z.string().min(2, 'First name is required').max(100),
  lastName: z.string().min(2, 'Last name is required').max(100),
  phone: z.string().min(9, 'Phone number must be at least 9 digits').max(20).optional(),
  email: z.string().email('Valid email address is required').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  preferredChannels: z.array(z.string()).default(['SMS']).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
}).refine((data) => Boolean(data.phone || data.email), {
  message: 'At least one contact identifier (phone number or email) is required',
  path: ['phone']
});

/**
 * Zod schema representing individual milestone checklist items
 * required for full ratepayer profile verification.
 */
export const ProfileCompletionChecklistSchema = z.object({
  phoneProvided: z.boolean(),
  emailProvided: z.boolean(),
  nameProvided: z.boolean(),
  ghanaCardProvided: z.boolean(),
  digitalAddressProvided: z.boolean(),
  tinProvided: z.boolean(),
});

/**
 * Zod schema representing the complete profile score, KYC tier,
 * missing attributes, and recommended onboarding actions.
 */
export const ProfileCompletionSchema = z.object({
  percentage: z.number().min(0).max(100),
  kycLevel: z.string(),
  isComplete: z.boolean(),
  checklist: ProfileCompletionChecklistSchema,
  missingFields: z.array(z.string()),
  nextSteps: z.array(z.string()),
});

/**
 * TypeScript type inferred from {@link ProfileCompletionSchema}.
 */
export type ProfileCompletion = z.infer<typeof ProfileCompletionSchema>;

/**
 * Calculates progressive profile completion score and determines regulatory KYC tier.
 *
 * Scoring Heuristics (Total Weight = 6):
 * 1. Legal Name (First + Last, or Full Name): 1/6 (approx 17%)
 * 2. Mobile Phone (SMS & instant OTP delivery): 1/6 (approx 17%)
 * 3. Email Address (Digital billing & electronic receipts): 1/6 (approx 17%)
 * 4. Ghana Card PIN (National Identity verification for Land Act 1043 compliance): 1/6 (approx 17%)
 * 5. GhanaPost GPS Digital Address (Parcel spatial anchoring): 1/6 (approx 17%)
 * 6. GRA TIN (Taxpayer Identification Number for corporate ratepayers): 1/6 (approx 17%)
 *
 * KYC Tiers:
 * - `TIER_3_VERIFIED`: Ghana Card + Mobile Phone + Digital Address provided.
 *   Permits legally binding sectional title property registration and co-ownership claims.
 * - `TIER_2_BASIC`: At least one verified contact channel (phone or email).
 *   Permits browsing public valuation rolls and making payments on existing bills.
 * - `TIER_1_UNVERIFIED`: Basic registered account without contact/identity verification.
 *
 * @param profile - Ratepayer profile object containing contact, identity, and address fields.
 * @returns {@link ProfileCompletion} containing percentage (0-100), KYC level, checklist, missing fields, and actionable next steps.
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
  const hasPhone = Boolean(profile.phone);
  const hasEmail = Boolean(profile.email);
  const hasName = Boolean((profile.firstName && profile.lastName) || profile.fullName);
  const hasGhanaCard = Boolean(profile.ghanaCardNumber);
  const hasDigitalAddress = Boolean(profile.digitalAddress);
  const hasTin = Boolean(profile.tin);

  const checklist = {
    phoneProvided: hasPhone,
    emailProvided: hasEmail,
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
    missingFields.push('name');
    nextSteps.push('Provide your first and last name');
  }

  if (checklist.phoneProvided) completedCount++;
  else {
    missingFields.push('phone');
    nextSteps.push('Add a mobile phone number for SMS and instant OTP login');
  }

  if (checklist.emailProvided) completedCount++;
  else {
    missingFields.push('email');
    nextSteps.push('Add an email address to receive digital property bills and receipts');
  }

  if (checklist.ghanaCardProvided) completedCount++;
  else {
    missingFields.push('ghanaCardNumber');
    nextSteps.push('Link your Ghana Card (National ID) to verify property ownership');
  }

  if (checklist.digitalAddressProvided) completedCount++;
  else {
    missingFields.push('digitalAddress');
    nextSteps.push('Add GhanaPost GPS digital address for accurate property lookup');
  }

  if (checklist.tinProvided) completedCount++;
  else {
    missingFields.push('tin');
    nextSteps.push('Add Taxpayer Identification Number (TIN) if registered as a corporate ratepayer');
  }

  const percentage = Math.round((completedCount / totalWeight) * 100);

  let kycLevel = 'TIER_1_UNVERIFIED';
  if (checklist.ghanaCardProvided && checklist.phoneProvided && checklist.digitalAddressProvided) {
    kycLevel = 'TIER_3_VERIFIED';
  } else if (checklist.phoneProvided || checklist.emailProvided) {
    kycLevel = 'TIER_2_BASIC';
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

/**
 * Zod validation schema for Step 1 of Ratepayer Login (Password Verification).
 *
 * Accepts either:
 * - General `identifier` (matching email, phone, or username)
 * - Explicit `phone`
 * - Explicit `email`
 * along with the user's plaintext password.
 */
export const RatepayerLoginStep1Schema = z.object({
  identifier: z.string().min(3).optional(),
  phone: z.string().min(9).optional(),
  email: z.string().email().optional(),
  password: z.string().min(1, 'Password is required')
}).refine((data) => Boolean(data.identifier || data.phone || data.email), {
  message: 'Identifier, phone, or email is required',
  path: ['identifier']
});

/**
 * Zod validation schema for Step 2 of Ratepayer Login (Two-Factor OTP Verification).
 *
 * Validates the 6-digit numeric OTP sent to the citizen's verified phone number
 * before issuing an authenticated 64-character hex session token.
 */
export const RatepayerVerifyOtpSchema = z.object({
  identifier: z.string().min(3).optional(),
  phone: z.string().min(9).optional(),
  otp: z.string().length(6, 'OTP must be 6 digits')
}).refine((data) => Boolean(data.identifier || data.phone), {
  message: 'Identifier or phone is required',
  path: ['identifier']
});

/**
 * Zod validation schema for Internal Staff Login.
 *
 * Authenticates CROIP administrative staff, MMDA revenue officers,
 * and Concessionaire supervisors via single-step email/phone and password.
 */
export const StaffLoginSchema = z.object({
  identifier: z.string().min(3, 'Email or phone required'),
  password: z.string().min(1)
});

/**
 * Zod validation schema for Onboarding New Staff Members.
 *
 * Used by CROIP System Admins and MMDA Supervisors to create staff profiles,
 * assign organizational roles, and scope permissions to assemblies or concession zones.
 */
export const OnboardStaffSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  password: z.string().min(8),
  department: z.string().optional(),
  staffIdNumber: z.string().optional(),
  roleCode: z.string().min(1),
  concessionId: z.string().uuid().optional(),
  assemblyId: z.string().uuid().optional()
});

/**
 * Zod validation schema for Updating User Account Status.
 *
 * Supports lifecycle transitions:
 * - `ACTIVE`: Normal operational status.
 * - `SUSPENDED`: Access revoked due to disciplinary or security action.
 * - `PENDING`: Awaiting verification or supervisory activation.
 */
export const UpdateUserStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'PENDING'])
});

/**
 * Zod validation schema for Assigning an RBAC Role to a User.
 *
 * Supports scoping the role to a specific MMDA assembly or concessionaire zone.
 */
export const AssignRoleSchema = z.object({
  roleCode: z.string().min(1),
  concessionId: z.string().uuid().optional(),
  assemblyId: z.string().uuid().optional()
});
