import type { Generated } from "kysely";
import type { UserType, AccountStatus, ScopeLevel } from "@croip/contracts";

export interface UsersTable {
  id: Generated<string>;
  user_code: string;
  user_type: UserType;
  status: AccountStatus;
  email: string | null;
  phone_number: string | null;
  password_hash: string | null;
  idp_provider: string;
  idp_subject_id: string | null;
  is_mfa_enabled: boolean;
  mfa_enforced: boolean;
  failed_login_attempts: number;
  locked_until: Date | null;
  metadata: string; // JSONB
  last_login_at: Date | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface GovStaffProfilesTable {
  user_id: string;
  first_name: string;
  last_name: string;
  designation: string | null;
  department: string;
  employee_id: string | null;
  official_phone: string | null;
  notes: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface ConcessionaireUserProfilesTable {
  user_id: string;
  concessionaire_id: string;
  first_name: string;
  last_name: string;
  staff_id: string | null;
  department: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface RatepayerProfilesTable {
  user_id: string;
  ratepayer_type: "INDIVIDUAL" | "ORGANIZATION";
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  ghana_card_number: string | null;
  ghana_card_hash: string | null;
  tin_number: string | null;
  kyc_status: string;
  kyc_verified_at: Date | null;
  kyc_verified_by: string | null;
  primary_email: string | null;
  primary_phone: string;
  preferred_channels: string[];
  preferred_language: string;
  postal_address: string | null;
  digital_address_ghpost: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface PermissionsTable {
  id: string;
  category: string;
  display_name: string;
  description: string | null;
  created_at: Generated<Date>;
}

export interface RolesTable {
  id: string;
  role_type: UserType;
  name: string;
  description: string | null;
  is_system_role: boolean;
  created_at: Generated<Date>;
}

export interface RolePermissionsTable {
  role_id: string;
  permission_id: string;
}

export interface UserRoleAssignmentsTable {
  id: Generated<string>;
  user_id: string;
  role_id: string;
  scope_level: ScopeLevel;
  region_id: string | null;
  concessionaire_id: string | null;
  municipality_id: string | null;
  assigned_by: string | null;
  expires_at: Date | null;
  created_at: Generated<Date>;
}

export interface AuditLogsTable {
  id: Generated<string>;
  occurred_at: Generated<Date>;
  actor_user_id: string | null;
  actor_user_type: UserType | null;
  actor_ip_address: string | null;
  user_agent: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  diff_payload: string | null; // JSONB
  status_code: string;
  failure_reason: string | null;
}

export interface OtpVerificationsTable {
  id: Generated<string>;
  phone_number: string;
  otp_code_hash: string;
  purpose: string;
  expires_at: Date;
  verified_at: Date | null;
  attempts: number;
  created_at: Generated<Date>;
}

export interface UserSessionsTable {
  id: Generated<string>;
  user_id: string;
  refresh_token_hash: string;
  ip_address: string | null;
  user_agent: string | null;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Generated<Date>;
}

export interface Database {
  "croip_iam.users": UsersTable;
  "croip_iam.gov_staff_profiles": GovStaffProfilesTable;
  "croip_iam.concessionaire_user_profiles": ConcessionaireUserProfilesTable;
  "croip_iam.ratepayer_profiles": RatepayerProfilesTable;
  "croip_iam.permissions": PermissionsTable;
  "croip_iam.roles": RolesTable;
  "croip_iam.role_permissions": RolePermissionsTable;
  "croip_iam.user_role_assignments": UserRoleAssignmentsTable;
  "croip_iam.audit_logs": AuditLogsTable;
  "croip_iam.otp_verifications": OtpVerificationsTable;
  "croip_iam.user_sessions": UserSessionsTable;
}
