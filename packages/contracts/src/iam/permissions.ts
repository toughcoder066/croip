/**
 * Atomic system permissions for the Central Revenue Oversight & Integration Platform (CROIP).
 * Used for role-based access control (RBAC), API authorization guards, and security scopes.
 */
export const Permissions = {
  // =========================================================================
  // Executive & National Policy Oversight
  // =========================================================================
  /** Read-only access to national executive dashboards, collections, and compliance metrics. */
  VIEW_NATIONAL_DASHBOARDS: "dashboards:view_national",
  /** Authority to approve ministerial revenue split allocation policies and disbursement models. */
  APPROVE_POLICY: "policy:approve",

  // =========================================================================
  // Concessionaire & Municipality (MMDA) Governance
  // =========================================================================
  /** Register, configure, and maintain District Assembly (MMDA) operational parameters. */
  MANAGE_MUNICIPALITIES: "municipalities:manage",
  /** View District Assembly records, gazetted boundaries, and concession assignments. */
  VIEW_MUNICIPALITIES: "municipalities:read",
  /** Onboard, activate, suspend, or offboard partner revenue concessionaires. */
  MANAGE_CONCESSIONAIRES: "concessionaires:manage",
  /** View concessionaire corporate profiles, assigned territories, and performance metrics. */
  VIEW_CONCESSIONAIRES: "concessionaires:read",
  /** Provision, rotate, and revoke machine-to-machine API client credentials. */
  MANAGE_API_CLIENTS: "api_clients:manage",

  // =========================================================================
  // Rate Cards & Bill Certification
  // =========================================================================
  /** Submit municipal rate cards based on gazetted District Assembly bylaws. */
  SUBMIT_RATE_CARDS: "rate_cards:submit",
  /** Verify and certify submitted rate cards against statutory municipal bylaws. */
  VERIFY_RATE_CARDS: "rate_cards:verify",
  /** Concessionaire batch submission of calculated property rate bills. */
  SUBMIT_BILLS: "bills:submit",
  /** Compliance review of submitted bills against the active verified rate card. */
  REVIEW_BILLS: "bills:review",

  // =========================================================================
  // Financial Operations, Settlement & Disbursements
  // =========================================================================
  /** Inspect payment transactions, gateway callbacks, and collection ledgers. */
  VIEW_PAYMENTS: "payments:view",
  /** Prepare daily multi-party bank disbursement instruction batches. */
  PREPARE_DISBURSEMENTS: "disbursements:prepare",
  /** Checker approval for executing daily bank disbursement transfers. */
  APPROVE_DISBURSEMENTS: "disbursements:approve",
  /** Manage bank reconciliation and settlement batch balancing. */
  MANAGE_RECONCILIATION: "reconciliation:manage",

  // =========================================================================
  // IAM, Security & Disputes
  // =========================================================================
  /** Administer user accounts, staff profiles, and account lifecycle statuses. */
  MANAGE_USERS: "iam:users_manage",
  /** Assign or revoke roles for staff, concessionaires, and platform officers. */
  ASSIGN_ROLES: "iam:roles_assign",
  /** Read tamper-evident immutable audit logs across platform operations. */
  READ_AUDIT: "audit:read",
  /** Investigate, mediate, and resolve ratepayer billing and valuation disputes. */
  MANAGE_DISPUTES: "disputes:manage",

  // =========================================================================
  // Property Oversight & Cadastral Administration (Staff)
  // =========================================================================
  /** Inspect nationwide cadastral property records and structural hierarchies. */
  VIEW_ALL_PROPERTIES: "properties:read",
  /** Administrative management of property cadastral boundaries and parcel classifications. */
  MANAGE_PROPERTIES: "properties:manage",

  // =========================================================================
  // Ratepayer / Citizen Self-Service
  // =========================================================================
  /** Discover and locate properties via GhanaPost GPS digital address. */
  SEARCH_PROPERTIES: "properties:search",
  /** Submit an ownership or occupancy claim on an existing property unit. */
  CLAIM_PROPERTY: "properties:claim",
  /** Self-manage owned properties, update media, and declare sectional units. */
  MANAGE_OWN_PROPERTIES: "properties:manage_own",
  /** View portfolio of approved and pending properties owned by the caller. */
  VIEW_OWN_PROPERTIES: "properties:view_own",
  /** View municipal rate bills issued against owned properties. */
  VIEW_OWN_BILLS: "bills:view_own",
  /** Initiate digital cashless payments via mobile money or card. */
  INITIATE_PAYMENTS: "payments:initiate",
  /** Retrieve and verify digital payment receipts carrying authentic QR codes. */
  VIEW_OWN_RECEIPTS: "receipts:view_own",
  /** Raise formal billing, boundary, or valuation grievance tickets. */
  CREATE_DISPUTES: "disputes:create",
} as const;

export type PermissionId = (typeof Permissions)[keyof typeof Permissions];
