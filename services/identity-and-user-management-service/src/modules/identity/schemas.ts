import { z } from 'zod';

export const RegisterRatepayerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(9, 'Valid phone number is required'),
  email: z.string().email().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  preferredChannels: z.array(z.string()).default(['SMS']),
  tin: z.string().optional(),
  ghanaCardNumber: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export const RatepayerLoginStep1Schema = z.object({
  phone: z.string().min(9),
  password: z.string().min(1)
});

export const RatepayerVerifyOtpSchema = z.object({
  phone: z.string().min(9),
  otp: z.string().length(6, 'OTP must be 6 digits')
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
