export const Permissions = {
  // Oversight & Policy
  VIEW_NATIONAL_DASHBOARDS: "dashboards:view_national",
  APPROVE_POLICY: "policy:approve",

  // Municipality / Concession Management (Concessions are Municipalities)
  MANAGE_MUNICIPALITIES: "municipalities:manage",
  VIEW_MUNICIPALITIES: "municipalities:read",
  MANAGE_CONCESSIONAIRES: "concessionaires:manage",
  VIEW_CONCESSIONAIRES: "concessionaires:read",
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

  // Property Oversight & Administration (Admin/Staff)
  VIEW_ALL_PROPERTIES: "properties:read",
  MANAGE_PROPERTIES: "properties:manage",

  // Ratepayer / Citizen Property Claim & Self-Service
  SEARCH_PROPERTIES: "properties:search",
  CLAIM_PROPERTY: "properties:claim",
  MANAGE_OWN_PROPERTIES: "properties:manage_own",
  VIEW_OWN_PROPERTIES: "properties:view_own",
  VIEW_OWN_BILLS: "bills:view_own",
  INITIATE_PAYMENTS: "payments:initiate",
  VIEW_OWN_RECEIPTS: "receipts:view_own",
  CREATE_DISPUTES: "disputes:create",
} as const;

export type PermissionId = (typeof Permissions)[keyof typeof Permissions];
