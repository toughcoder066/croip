import { sql } from "kysely";
import type { Kysely } from "kysely";
import type { Database } from "./types.js";
import type { AccountStatus, ScopeLevel, ProfileCompletion } from "@croip/contracts";

export interface CreateGovStaffParams {
  userType: "CROIP_GOV_ADMIN";
  userCode?: string;
  email: string;
  phoneNumber?: string;
  passwordHash?: string;
  idpProvider?: string;
  idpSubjectId?: string;
  firstName: string;
  lastName: string;
  designation?: string;
  department: string;
  employeeId?: string;
  initialRole?: string;
  scopeLevel?: ScopeLevel;
  regionId?: string;
  concessionaireId?: string;
  municipalityId?: string;
}

export interface CreateRatepayerParams {
  userCode?: string;
  phoneNumber: string;
  passwordHash?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  ghanaCardNumber?: string;
  ratepayerType?: "INDIVIDUAL" | "ORGANIZATION";
  digitalAddressGhPost?: string;
  preferredLanguage?: string;
}

function generateUserCode(prefix: string): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${year}-${randomSuffix}`;
}

export function calculateRatepayerCompletion(profile: any): ProfileCompletion {
  const checklist = {
    phoneVerified: Boolean(profile?.primary_phone),
    nameProvided: Boolean((profile?.first_name && profile?.last_name) || profile?.company_name),
    emailProvided: Boolean(profile?.primary_email),
    ghanaCardProvided: Boolean(profile?.ghana_card_number),
    digitalAddressProvided: Boolean(profile?.digital_address_ghpost),
  };

  const missingFields: string[] = [];
  const nextSteps: string[] = [];

  let completedCount = 0;
  const totalWeight = 5;

  if (checklist.phoneVerified) completedCount++;
  else {
    missingFields.push("phoneNumber");
    nextSteps.push("Verify phone number via OTP");
  }

  if (checklist.nameProvided) completedCount++;
  else {
    missingFields.push("name");
    nextSteps.push("Provide full legal name or organization name");
  }

  if (checklist.emailProvided) completedCount++;
  else {
    missingFields.push("email");
    nextSteps.push("Add email address for digital billing statements");
  }

  if (checklist.ghanaCardProvided) completedCount++;
  else {
    missingFields.push("ghanaCardNumber");
    nextSteps.push("Link Ghana Card (National ID) to verify property ownership");
  }

  if (checklist.digitalAddressProvided) completedCount++;
  else {
    missingFields.push("digitalAddressGhPost");
    nextSteps.push("Add GhanaPost GPS digital address for accurate property lookup");
  }

  const percentage = Math.round((completedCount / totalWeight) * 100);

  return {
    percentage,
    kycLevel: profile?.kyc_status ?? "UNVERIFIED",
    isComplete: percentage === 100,
    checklist,
    missingFields,
    nextSteps,
  };
}

export class IamRepository {
  constructor(private db: Kysely<Database>) {}

  /**
   * Onboards Government Oversight Staff - Executed by CROIP Admin
   */
  async onboardGovStaff(params: CreateGovStaffParams, adminActorId: string) {
    return await this.db.transaction().execute(async (trx) => {
      const userCode = params.userCode ?? generateUserCode("ADM");

      // 1. Insert Core User Record
      const userRes = await trx
        .insertInto("croip_iam.users")
        .values({
          user_code: userCode,
          user_type: "CROIP_GOV_ADMIN",
          status: "ACTIVE",
          email: params.email,
          phone_number: params.phoneNumber ?? null,
          password_hash: params.passwordHash ?? null,
          idp_provider: params.idpProvider ?? "LOCAL",
          idp_subject_id: params.idpSubjectId ?? null,
          is_mfa_enabled: false,
          mfa_enforced: true,
          failed_login_attempts: 0,
          locked_until: null,
          metadata: JSON.stringify({ onboardedBy: adminActorId }),
          last_login_at: null,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      // 2. Insert Gov Staff Profile
      const profileRes = await trx
        .insertInto("croip_iam.gov_staff_profiles")
        .values({
          user_id: userRes.id,
          first_name: params.firstName,
          last_name: params.lastName,
          designation: params.designation ?? null,
          department: params.department,
          employee_id: params.employeeId ?? null,
          official_phone: params.phoneNumber ?? null,
          notes: null,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      // 3. Assign Initial Scoped Role
      if (params.initialRole) {
        await trx
          .insertInto("croip_iam.user_role_assignments")
          .values({
            user_id: userRes.id,
            role_id: params.initialRole,
            scope_level: params.scopeLevel ?? "NATIONAL",
            region_id: params.regionId ?? null,
            concessionaire_id: params.concessionaireId ?? null,
            municipality_id: params.municipalityId ?? null,
            assigned_by: adminActorId,
            expires_at: null,
          })
          .execute();
      }

      // 4. Audit Log
      await trx
        .insertInto("croip_iam.audit_logs")
        .values({
          actor_user_id: adminActorId,
          actor_user_type: "CROIP_GOV_ADMIN",
          actor_ip_address: null,
          user_agent: null,
          action: "STAFF.ONBOARDED_BY_ADMIN",
          entity_type: "USER",
          entity_id: userRes.id,
          diff_payload: JSON.stringify({ email: params.email, role: params.initialRole, userCode }),
          status_code: "SUCCESS",
          failure_reason: null,
        })
        .execute();

      return {
        user: userRes,
        profile: profileRes,
      };
    });
  }

  /**
   * Citizen Self-Registration from Unified Ratepayer App
   */
  async registerRatepayer(params: CreateRatepayerParams) {
    return await this.db.transaction().execute(async (trx) => {
      const userCode = params.userCode ?? generateUserCode("RP");

      const user = await trx
        .insertInto("croip_iam.users")
        .values({
          user_code: userCode,
          user_type: "RATEPAYER",
          status: "ACTIVE",
          email: params.email ?? null,
          phone_number: params.phoneNumber,
          password_hash: params.passwordHash ?? null,
          idp_provider: "LOCAL",
          idp_subject_id: null,
          is_mfa_enabled: false,
          mfa_enforced: false,
          failed_login_attempts: 0,
          locked_until: null,
          metadata: JSON.stringify({ registeredVia: "UNIFIED_RATEPAYER_APP" }),
          last_login_at: null,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      const profile = await trx
        .insertInto("croip_iam.ratepayer_profiles")
        .values({
          user_id: user.id,
          ratepayer_type: params.ratepayerType ?? "INDIVIDUAL",
          first_name: params.firstName ?? null,
          last_name: params.lastName ?? null,
          company_name: params.companyName ?? null,
          ghana_card_number: params.ghanaCardNumber ?? null,
          ghana_card_hash: null,
          tin_number: null,
          kyc_status: "PHONE_VERIFIED",
          kyc_verified_at: null,
          kyc_verified_by: null,
          primary_email: params.email ?? null,
          primary_phone: params.phoneNumber,
          preferred_channels: ["SMS"],
          preferred_language: params.preferredLanguage ?? "en",
          postal_address: null,
          digital_address_ghpost: params.digitalAddressGhPost ?? null,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("croip_iam.audit_logs")
        .values({
          actor_user_id: user.id,
          actor_user_type: "RATEPAYER",
          actor_ip_address: null,
          user_agent: null,
          action: "RATEPAYER.REGISTERED",
          entity_type: "RATEPAYER",
          entity_id: user.id,
          diff_payload: JSON.stringify({ phone: params.phoneNumber, userCode }),
          status_code: "SUCCESS",
          failure_reason: null,
        })
        .execute();

      const completion = calculateRatepayerCompletion(profile);

      return {
        user,
        profile,
        completion,
      };
    });
  }

  async getRatepayerByPhone(phoneNumber: string) {
    const user = await this.db
      .selectFrom("croip_iam.users")
      .where("phone_number", "=", phoneNumber)
      .where("user_type", "=", "RATEPAYER")
      .selectAll()
      .executeTakeFirst();

    if (!user) return null;

    const profile = await this.db
      .selectFrom("croip_iam.ratepayer_profiles")
      .where("user_id", "=", user.id)
      .selectAll()
      .executeTakeFirst();

    const completion = calculateRatepayerCompletion(profile);

    return {
      ...user,
      profile: profile ?? null,
      completion,
    };
  }

  async createOtp(phoneNumber: string, otpCodeHash: string, purpose: string = "RATEPAYER_LOGIN") {
    // Expire in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    return await this.db
      .insertInto("croip_iam.otp_verifications")
      .values({
        phone_number: phoneNumber,
        otp_code_hash: otpCodeHash,
        purpose,
        expires_at: expiresAt,
        verified_at: null,
        attempts: 0,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async verifyOtp(phoneNumber: string, otpCodeHash: string, purpose: string = "RATEPAYER_LOGIN") {
    const record = await this.db
      .selectFrom("croip_iam.otp_verifications")
      .where("phone_number", "=", phoneNumber)
      .where("purpose", "=", purpose)
      .where("verified_at", "is", null)
      .where("expires_at", ">", new Date())
      .orderBy("created_at", "desc")
      .selectAll()
      .executeTakeFirst();

    if (!record) return { valid: false, reason: "OTP_NOT_FOUND_OR_EXPIRED" };

    if (record.otp_code_hash !== otpCodeHash) {
      await this.db
        .updateTable("croip_iam.otp_verifications")
        .set({ attempts: record.attempts + 1 })
        .where("id", "=", record.id)
        .execute();
      return { valid: false, reason: "INVALID_CODE" };
    }

    // Mark verified
    await this.db
      .updateTable("croip_iam.otp_verifications")
      .set({ verified_at: new Date() })
      .where("id", "=", record.id)
      .execute();

    return { valid: true, record };
  }

  async getStaffByEmail(email: string) {
    const user = await this.db
      .selectFrom("croip_iam.users")
      .where("email", "=", email)
      .where("user_type", "=", "CROIP_GOV_ADMIN")
      .selectAll()
      .executeTakeFirst();

    if (!user) return null;

    const profile = await this.db
      .selectFrom("croip_iam.gov_staff_profiles")
      .where("user_id", "=", user.id)
      .selectAll()
      .executeTakeFirst();

    const roles = await this.db
      .selectFrom("croip_iam.user_role_assignments")
      .where("user_id", "=", user.id)
      .selectAll()
      .execute();

    return {
      ...user,
      profile,
      roles,
    };
  }

  async getUserById(userId: string) {
    const user = await this.db
      .selectFrom("croip_iam.users")
      .where("id", "=", userId)
      .selectAll()
      .executeTakeFirst();

    if (!user) return null;

    let profile: Record<string, unknown> | null = null;
    let completion: ProfileCompletion | undefined;

    if (user.user_type === "CROIP_GOV_ADMIN") {
      profile = (await this.db
        .selectFrom("croip_iam.gov_staff_profiles")
        .where("user_id", "=", userId)
        .selectAll()
        .executeTakeFirst()) ?? null;
    } else if (user.user_type === "RATEPAYER") {
      profile = (await this.db
        .selectFrom("croip_iam.ratepayer_profiles")
        .where("user_id", "=", userId)
        .selectAll()
        .executeTakeFirst()) ?? null;
      completion = calculateRatepayerCompletion(profile);
    } else if (user.user_type === "CONCESSIONAIRE_USER") {
      profile = (await this.db
        .selectFrom("croip_iam.concessionaire_user_profiles")
        .where("user_id", "=", userId)
        .selectAll()
        .executeTakeFirst()) ?? null;
    }

    const roles = await this.db
      .selectFrom("croip_iam.user_role_assignments")
      .where("user_id", "=", userId)
      .selectAll()
      .execute();

    return {
      ...user,
      profile,
      roles,
      completion,
    };
  }

  async updateUserStatus(userId: string, newStatus: AccountStatus, actorId?: string) {
    return await this.db.transaction().execute(async (trx) => {
      const updated = await trx
        .updateTable("croip_iam.users")
        .set({ status: newStatus, updated_at: sql`clock_timestamp()` })
        .where("id", "=", userId)
        .returningAll()
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("croip_iam.audit_logs")
        .values({
          actor_user_id: actorId ?? null,
          actor_user_type: null,
          actor_ip_address: null,
          user_agent: null,
          action: "USER.STATUS_UPDATED",
          entity_type: "USER",
          entity_id: userId,
          diff_payload: JSON.stringify({ newStatus }),
          status_code: "SUCCESS",
          failure_reason: null,
        })
        .execute();

      return updated;
    });
  }

  async assignRole(params: {
    userId: string;
    roleId: string;
    scopeLevel: ScopeLevel;
    regionId?: string;
    concessionaireId?: string;
    municipalityId?: string;
    assignedBy?: string;
  }) {
    return await this.db
      .insertInto("croip_iam.user_role_assignments")
      .values({
        user_id: params.userId,
        role_id: params.roleId,
        scope_level: params.scopeLevel,
        region_id: params.regionId ?? null,
        concessionaire_id: params.concessionaireId ?? null,
        municipality_id: params.municipalityId ?? null,
        assigned_by: params.assignedBy ?? null,
        expires_at: null,
      })
      .returningAll()
      .executeTakeFirst();
  }

  async revokeRole(assignmentId: string) {
    return await this.db
      .deleteFrom("croip_iam.user_role_assignments")
      .where("id", "=", assignmentId)
      .returningAll()
      .executeTakeFirst();
  }

  async listRoles() {
    return await this.db.selectFrom("croip_iam.roles").selectAll().execute();
  }

  async listPermissions() {
    return await this.db.selectFrom("croip_iam.permissions").selectAll().execute();
  }
}
