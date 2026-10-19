/**
 * RBAC bootstrap catalog.
 *
 * Applied to Postgres on service start-up:
 *  - Resources and their (resource, action) permissions are upserted every boot so new
 *    platform modules automatically appear in the access matrix.
 *  - System roles and their DEFAULT grants are only inserted when a role does not yet exist.
 *    After that the database is the single source of truth — grants edited in the portal
 *    are never overwritten by this file.
 *
 * Roles mirror the CROIP Governance Framework (Decision D23) in @croip/contracts iam/roles.ts.
 */

export const RBAC_ACTIONS = ['VIEW', 'EDIT', 'CREATE', 'DELETE'] as const;
export type RbacAction = (typeof RBAC_ACTIONS)[number];

export interface ResourceSeed {
  code: string;
  name: string;
  description: string;
}

export const RESOURCE_SEEDS: ResourceSeed[] = [
  { code: 'USER_MANAGEMENT', name: 'User Management', description: 'Oversight officer accounts, lifecycle status and role assignment.' },
  { code: 'ROLE_ACCESS', name: 'Roles & Access Control', description: 'Roles, permission grants and the RBAC matrix.' },
  { code: 'CONCESSION_MANAGEMENT', name: 'Concessionaire Management', description: 'Partner concessionaires, contracts, MMDA territory assignments, and personnel.' },
  { code: 'RATEPAYERS', name: 'Ratepayers & KYC', description: 'Citizen ratepayer accounts, Ghana Card KYC verification tiers, and property claims.' },
  { code: 'API_CLIENTS', name: 'API Clients & Integrations', description: 'Machine-to-machine credentials for concessionaire backends.' },
  { code: 'JURISDICTIONS', name: 'Assemblies & Jurisdictions', description: 'Countries, regions and MMDA reference data.' },
  { code: 'PROPERTY_REGISTRY', name: 'Property Registry', description: 'Cadastral properties, documents, photos and valuation lists.' },
  { code: 'RATE_CARDS', name: 'Rate Cards', description: 'Municipal rate cards and bylaw certification.' },
  { code: 'BILLING', name: 'Property Billing', description: 'Bills submitted by concessionaires and compliance review.' },
  { code: 'PAYMENTS', name: 'Payments & Collections', description: 'Payment records, collection callbacks and receipts.' },
  { code: 'DISBURSEMENTS', name: 'Disbursements', description: 'Revenue-split disbursement batches (maker-checker).' },
  { code: 'RECONCILIATION', name: 'Reconciliation & Exceptions', description: 'Reconciliation runs, control totals and discrepancies.' },
  { code: 'DISPUTES', name: 'Disputes Management', description: 'Ratepayer billing, boundary and valuation disputes.' },
  { code: 'AUDIT_LOGS', name: 'Audit Logs', description: 'Tamper-evident audit trail and forensic exports.' },
  { code: 'REPORTING', name: 'Dashboards & Reporting', description: 'National dashboards and statutory reports.' },
  { code: 'CONFIGURATION', name: 'System Configuration', description: 'Gateways, platform parameters and reference configuration.' }
];

export interface RoleSeed {
  code: string;
  name: string;
  description: string;
  scopeLevel: 'NATIONAL' | 'REGIONAL' | 'CONCESSIONAIRE' | 'MUNICIPALITY';
  /** resourceCode -> actions as a compact string: V=VIEW E=EDIT C=CREATE D=DELETE */
  grants: Record<string, string>;
}

const ALL = 'VECD';

export const ROLE_SEEDS: RoleSeed[] = [
  {
    code: 'SUPER_ADMIN',
    name: 'Super Administrator',
    description: 'CROIP Platform Lead: full system configuration, account management and security administration.',
    scopeLevel: 'NATIONAL',
    grants: Object.fromEntries(RESOURCE_SEEDS.map((r) => [r.code, ALL]))
  },
  {
    code: 'EXECUTIVE_OVERSIGHT',
    name: 'Executive Oversight',
    description: 'Minister, senior Ministry officials and CROIP leadership: read-only national dashboards, zero PII.',
    scopeLevel: 'NATIONAL',
    grants: { REPORTING: 'V', CONCESSION_MANAGEMENT: 'V', RATEPAYERS: 'V', JURISDICTIONS: 'V', PAYMENTS: 'V', DISBURSEMENTS: 'V', RECONCILIATION: 'V' }
  },
  {
    code: 'CONCESSIONAIRE_MANAGER',
    name: 'Concessionaire Manager',
    description: 'CROIP Partnerships Team: onboards concessionaires, assigns MMDA territories, manages API keys.',
    scopeLevel: 'NATIONAL',
    grants: { CONCESSION_MANAGEMENT: 'VEC', API_CLIENTS: ALL, JURISDICTIONS: 'V', PROPERTY_REGISTRY: 'V', RATEPAYERS: 'V', REPORTING: 'V' }
  },
  {
    code: 'CONCESSIONAIRE_ADMIN',
    name: 'Concessionaire Admin',
    description: 'Partner Concession Lead: manages revenue operations, field staff, and batch submissions within assigned MMDA concession.',
    scopeLevel: 'CONCESSIONAIRE',
    grants: { CONCESSION_MANAGEMENT: 'VE', BILLING: 'VEC', PROPERTY_REGISTRY: 'VEC', RATEPAYERS: 'V', PAYMENTS: 'V', DISPUTES: 'VE', REPORTING: 'V' }
  },
  {
    code: 'CONCESSIONAIRE_BILLING',
    name: 'Concessionaire Billing',
    description: 'Prepares municipal rate bills and pushes batch submissions to CROIP for rating review.',
    scopeLevel: 'CONCESSIONAIRE',
    grants: { BILLING: 'VEC', PROPERTY_REGISTRY: 'V', RATE_CARDS: 'V', REPORTING: 'V' }
  },
  {
    code: 'CONCESSIONAIRE_AGENT',
    name: 'Concessionaire Agent',
    description: 'Field agent: verifies properties on-premises, registers new properties, and issues bills within their assigned MMDA.',
    scopeLevel: 'MUNICIPALITY',
    grants: { PROPERTY_REGISTRY: 'VEC', BILLING: 'VC' }
  },
  {
    code: 'CONCESSIONAIRE_OFFICER',
    name: 'Concessionaire Officer',
    description: 'Reviews and approves or rejects field verifications submitted by agents, and handles disputes within their assigned MMDA.',
    scopeLevel: 'MUNICIPALITY',
    grants: { PROPERTY_REGISTRY: 'VE', DISPUTES: 'VE' }
  },
  {
    code: 'RATE_CARD_VERIFIER',
    name: 'Rate Card Verifier',
    description: 'CROIP Compliance Team: certifies municipal rate cards against bylaws and audits calculated bills.',
    scopeLevel: 'REGIONAL',
    grants: { RATE_CARDS: 'VEC', BILLING: 'VE', JURISDICTIONS: 'V', PROPERTY_REGISTRY: 'V', DISPUTES: 'V' }
  },
  {
    code: 'FINANCE_OFFICER',
    name: 'Finance Officer',
    description: 'CROIP Finance Team: monitors collections, prepares reconciliation and disbursement batches.',
    scopeLevel: 'NATIONAL',
    grants: { PAYMENTS: 'V', DISBURSEMENTS: 'VC', RECONCILIATION: 'VEC', CONCESSION_MANAGEMENT: 'V', AUDIT_LOGS: 'V', REPORTING: 'V' }
  },
  {
    code: 'FINANCE_APPROVER',
    name: 'Finance Approver',
    description: 'CROIP Finance Checker: maker-checker dual approval for daily bank disbursements.',
    scopeLevel: 'NATIONAL',
    grants: { DISBURSEMENTS: 'VE', PAYMENTS: 'V', RECONCILIATION: 'VE', AUDIT_LOGS: 'V', REPORTING: 'V' }
  },
  {
    code: 'AUDITOR',
    name: 'Auditor',
    description: 'Internal Audit / Auditor-General: read-only oversight across financial records and audit logs.',
    scopeLevel: 'NATIONAL',
    grants: {
      AUDIT_LOGS: 'V', PAYMENTS: 'V', DISBURSEMENTS: 'V', RECONCILIATION: 'V', BILLING: 'V',
      PROPERTY_REGISTRY: 'V', CONCESSION_MANAGEMENT: 'V', RATEPAYERS: 'V', REPORTING: 'V'
    }
  },
  {
    code: 'SUPPORT_OFFICER',
    name: 'Support Officer',
    description: 'Handles citizen inquiries, receipt re-issuance and dispute mediation.',
    scopeLevel: 'NATIONAL',
    grants: { DISPUTES: 'VEC', RATEPAYERS: 'VE', PROPERTY_REGISTRY: 'V', PAYMENTS: 'V', BILLING: 'V', JURISDICTIONS: 'V' }
  },
  {
    code: 'RATEPAYER',
    name: 'Citizen Ratepayer',
    description: 'Property owner, landlord or tenant: discovers properties, claims units, pays municipal rate bills, and tracks receipts.',
    scopeLevel: 'NATIONAL',
    grants: { RATEPAYERS: 'VE', PROPERTY_REGISTRY: 'V', BILLING: 'V', PAYMENTS: 'VC', DISPUTES: 'VC' }
  }
];

const ACTION_LETTER: Record<string, RbacAction> = { V: 'VIEW', E: 'EDIT', C: 'CREATE', D: 'DELETE' };

export function expandActions(compact: string): RbacAction[] {
  return [...compact].map((ch) => ACTION_LETTER[ch]).filter((a): a is RbacAction => Boolean(a));
}
