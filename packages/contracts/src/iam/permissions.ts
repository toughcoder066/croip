export const Permissions = {
  // Oversight & Policy
  VIEW_NATIONAL_DASHBOARDS: "dashboards:view_national",
  APPROVE_POLICY: "policy:approve",

  // Concessionaire Management
  MANAGE_CONCESSIONAIRES: "concessionaires:manage",
  MANAGE_API_CLIENTS: "api_clients:manage",

  // Rate Cards & Billing
  SUBMIT_RATE_CARDS: "rate_cards:submit",
  VERIFY_RATE_CARDS: "rate_cards:verify",
  SUBMIT_BILLS: "bills:submit",
  REVIEW_BILLS: "bills:review",

  // Financial Oversight & Disbursements
  VIEW_PAYMENTS: "payments:view",
  PREPARE_DISBURSEMENTS: "disbursements:prepare",
  APPROVE_DISBURSEMENTS: "disbursements:approve",
  MANAGE_RECONCILIATION: "reconciliation:manage",

  // IAM & Security
  MANAGE_USERS: "iam:users_manage",
  ASSIGN_ROLES: "iam:roles_assign",
  READ_AUDIT: "audit:read",
  MANAGE_DISPUTES: "disputes:manage",
} as const;

export type PermissionId = (typeof Permissions)[keyof typeof Permissions];
