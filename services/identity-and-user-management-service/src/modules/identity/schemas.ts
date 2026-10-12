import { z } from 'zod';

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

export const ProfileCompletionChecklistSchema = z.object({
  phoneProvided: z.boolean(),
  emailProvided: z.boolean(),
  nameProvided: z.boolean(),
  ghanaCardProvided: z.boolean(),
  digitalAddressProvided: z.boolean(),
  tinProvided: z.boolean(),
});

export const ProfileCompletionSchema = z.object({
  percentage: z.number().min(0).max(100),
  kycLevel: z.string(),
  isComplete: z.boolean(),
  checklist: ProfileCompletionChecklistSchema,
  missingFields: z.array(z.string()),
  nextSteps: z.array(z.string()),
});

export type ProfileCompletion = z.infer<typeof ProfileCompletionSchema>;

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

export const RatepayerLoginStep1Schema = z.object({
  identifier: z.string().min(3).optional(),
  phone: z.string().min(9).optional(),
  email: z.string().email().optional(),
  password: z.string().min(1, 'Password is required')
}).refine((data) => Boolean(data.identifier || data.phone || data.email), {
  message: 'Identifier, phone, or email is required',
  path: ['identifier']
});

export const RatepayerVerifyOtpSchema = z.object({
  identifier: z.string().min(3).optional(),
  phone: z.string().min(9).optional(),
  otp: z.string().length(6, 'OTP must be 6 digits')
}).refine((data) => Boolean(data.identifier || data.phone), {
  message: 'Identifier or phone is required',
  path: ['identifier']
});

export const StaffLoginSchema = z.object({
  identifier: z.string().min(3, 'Email or phone required'),
  password: z.string().min(1)
});

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

export const UpdateUserStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'PENDING'])
});

export const AssignRoleSchema = z.object({
  roleCode: z.string().min(1),
  concessionId: z.string().uuid().optional(),
  assemblyId: z.string().uuid().optional()
});
