import { z } from "zod";

export const UserTypeSchema = z.enum([
  "CROIP_GOV_ADMIN",
  "CONCESSIONAIRE_USER",
  "RATEPAYER",
  "FIELD_AGENT",
  "SERVICE_ACCOUNT",
]);
export type UserType = z.infer<typeof UserTypeSchema>;

export const AccountStatusSchema = z.enum([
  "PENDING_ACTIVATION",
  "ACTIVE",
  "SUSPENDED",
  "DEACTIVATED",
  "LOCKED_OUT",
]);
export type AccountStatus = z.infer<typeof AccountStatusSchema>;

export const ScopeLevelSchema = z.enum([
  "NATIONAL",
  "REGIONAL",
  "CONCESSIONAIRE",
  "MUNICIPALITY",
]);
export type ScopeLevel = z.infer<typeof ScopeLevelSchema>;

export const StandardRoles = {
  EXECUTIVE_OVERSIGHT: "EXECUTIVE_OVERSIGHT",
  SUPER_ADMIN: "SUPER_ADMIN",
  CONCESSIONAIRE_MANAGER: "CONCESSIONAIRE_MANAGER",
  RATE_CARD_VERIFIER: "RATE_CARD_VERIFIER",
  FINANCE_OFFICER: "FINANCE_OFFICER",
  FINANCE_APPROVER: "FINANCE_APPROVER",
  AUDITOR: "AUDITOR",
  SUPPORT_OFFICER: "SUPPORT_OFFICER",
  CONCESSIONAIRE_ADMIN: "CONCESSIONAIRE_ADMIN",
  CONCESSIONAIRE_BILLING: "CONCESSIONAIRE_BILLING",
} as const;

export type StandardRoleId = keyof typeof StandardRoles;
