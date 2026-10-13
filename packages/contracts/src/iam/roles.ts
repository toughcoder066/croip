import { z } from "zod";

/**
 * Top-level identity classification determining user lifecycle, credential requirements, and default tenant scope.
 */
export const UserTypeSchema = z.enum([
  /** Central government officer or oversight team member. */
  "CROIP_GOV_ADMIN",
  /** Operational staff of an onboarded partner concessionaire. */
  "CONCESSIONAIRE_USER",
  /** Citizen property owner, landlord, or tenant subject to municipal rates. */
  "RATEPAYER",
  /** Field agent performing physical property enumeration or cashless collection assistance. */
  "FIELD_AGENT",
  /** Machine-to-machine integration account for external ingestion pipelines. */
  "SERVICE_ACCOUNT",
]);
export type UserType = z.infer<typeof UserTypeSchema>;

/**
 * Account operational status controlling access permission to platform services.
 */
export const AccountStatusSchema = z.enum([
  /** Newly registered account awaiting initial verification or email/OTP confirmation. */
  "PENDING_ACTIVATION",
  /** Fully active account with standard operational permissions. */
  "ACTIVE",
  /** Temporarily barred due to compliance investigations or security locks. */
  "SUSPENDED",
  /** Permanently disabled upon staff termination or user request. */
  "DEACTIVATED",
  /** Locked following repeated failed authentication attempts. */
  "LOCKED_OUT",
]);
export type AccountStatus = z.infer<typeof AccountStatusSchema>;

/**
 * Jurisdiction scope level defining territorial boundaries for role assignments.
 */
export const ScopeLevelSchema = z.enum([
  /** Platform-wide national scope covering all 16 regions and 261 MMDAs. */
  "NATIONAL",
  /** Regional scope covering administrative regions (e.g. Greater Accra, Ashanti). */
  "REGIONAL",
  /** Scoped strictly to an assigned partner concessionaire company. */
  "CONCESSIONAIRE",
  /** Scoped strictly to an individual District Assembly (MMDA). */
  "MUNICIPALITY",
]);
export type ScopeLevel = z.infer<typeof ScopeLevelSchema>;

/**
 * Standard system roles in accordance with the CROIP Governance Framework (Decision D23).
 */
export const StandardRoles = {
  /** Minister, Senior Ministry officials, and CROIP leadership: read-only national dashboards. */
  EXECUTIVE_OVERSIGHT: "EXECUTIVE_OVERSIGHT",
  /** CROIP Platform Lead: full system configuration, account management, and security administration. */
  SUPER_ADMIN: "SUPER_ADMIN",
  /** CROIP Partnerships Team: onboards concessionaires, assigns MMDA territories, manages API keys. */
  CONCESSIONAIRE_MANAGER: "CONCESSIONAIRE_MANAGER",
  /** CROIP Compliance Team: certifies municipal rate cards against bylaws; audits calculated bills. */
  RATE_CARD_VERIFIER: "RATE_CARD_VERIFIER",
  /** CROIP Finance Team: monitors collection callbacks, prepares bank reconciliation and disbursement batches. */
  FINANCE_OFFICER: "FINANCE_OFFICER",
  /** CROIP Finance Checker: maker-checker dual approval for daily bank disbursements. */
  FINANCE_APPROVER: "FINANCE_APPROVER",
  /** Internal Audit / Auditor-General: read-only oversight across all financial records and audit logs. */
  AUDITOR: "AUDITOR",
  /** Customer support officer handling citizen inquiries, receipt re-issuance, and dispute mediation. */
  SUPPORT_OFFICER: "SUPPORT_OFFICER",
  /** Concessionaire Administrator: manages operations and staff within assigned MMDA concession. */
  CONCESSIONAIRE_ADMIN: "CONCESSIONAIRE_ADMIN",
  /** Concessionaire Billing Officer: calculates draft bills and pushes batch submissions to CROIP. */
  CONCESSIONAIRE_BILLING: "CONCESSIONAIRE_BILLING",
  /** Citizen Ratepayer: discovers properties, claims units, pays municipal bills, and tracks receipts. */
  RATEPAYER: "RATEPAYER",
} as const;

export type StandardRoleId = keyof typeof StandardRoles;
