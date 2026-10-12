import crypto from "node:crypto";
import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getDb, IamRepository } from "@croip/db";
import {
  OnboardGovStaffInputSchema,
  OnboardGovStaffResponseSchema,
} from "@croip/contracts";
import { hashPassword, verifyToken } from "../utils/auth-token.js";

const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const adminRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  const repo = new IamRepository(getDb());

  app.post(
    "/v1/admin/gov-staff/onboard",
    {
      schema: {
        tags: ["Government & Admin"],
        summary: "Onboard Staff Member (CROIP Admin)",
        description: "Allows a CROIP Administrator or IAM Officer to provision national oversight accounts for GRA, Ministry of Finance, MLGDRD, or Regional Auditors.",
        body: OnboardGovStaffInputSchema,
        response: {
          201: OnboardGovStaffResponseSchema,
          400: ErrorResponseSchema,
          403: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const body = request.body;
      const authHeader = request.headers.authorization;
      const actorHeader = request.headers["x-actor-user-id"] as string | undefined;

      let adminActorId = actorHeader || "00000000-0000-0000-0000-000000000001";

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const payload = verifyToken<{ sub: string; userType: string }>(token);
        if (!payload) {
          return reply.code(403).send({ error: "Invalid admin authorization token" });
        }
        if (payload.userType !== "CROIP_GOV_ADMIN") {
          return reply.code(403).send({ error: "Access denied. Only CROIP Administrators can onboard government staff." });
        }
        adminActorId = payload.sub;
      }

      const existing = await repo.getStaffByEmail(body.email);
      if (existing) {
        return reply.code(400).send({
          error: `A government staff account with email '${body.email}' already exists.`,
        });
      }

      const tempPassword = body.initialPassword || `Croip@${crypto.randomBytes(4).toString("hex").toUpperCase()}!`;
      const passwordHash = hashPassword(tempPassword);

      const result = await repo.onboardGovStaff(
        {
          userType: "CROIP_GOV_ADMIN",
          email: body.email,
          phoneNumber: body.phoneNumber,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          department: body.department,
          designation: body.designation,
          employeeId: body.employeeId,
          initialRole: body.initialRole,
          scopeLevel: body.scopeLevel,
          regionId: body.regionId,
          concessionaireId: body.concessionaireId,
          municipalityId: body.municipalityId,
        },
        adminActorId
      );

      return reply.code(201).send({
        user: {
          id: result.user.id,
          userCode: result.user.user_code,
          email: result.user.email!,
          phoneNumber: result.user.phone_number,
          status: result.user.status,
          isMfaEnabled: result.user.is_mfa_enabled,
        },
        profile: {
          firstName: result.profile.first_name,
          lastName: result.profile.last_name,
          designation: result.profile.designation,
          department: result.profile.department,
          employeeId: result.profile.employee_id,
        },
        initialRole: body.initialRole,
        scopeLevel: body.scopeLevel,
        temporaryPassword: tempPassword,
        message: "Government staff member successfully onboarded by CROIP Admin",
      });
    }
  );
};
