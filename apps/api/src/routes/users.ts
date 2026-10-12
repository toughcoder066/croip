import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getDb, IamRepository } from "@croip/db";
import {
  UserTypeSchema,
  AccountStatusSchema,
  ScopeLevelSchema,
  ProfileCompletionSchema,
} from "@croip/contracts";

const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  const repo = new IamRepository(getDb());

  // 1. Get User by ID
  app.get(
    "/v1/users/:id",
    {
      schema: {
        tags: ["Access Control & RBAC"],
        summary: "Get User by ID",
        description: "Retrieves complete user identity, profile details, active scoped role assignments, and onboarding/KYC progress.",
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            userCode: z.string(),
            userType: UserTypeSchema,
            status: AccountStatusSchema,
            email: z.string().nullable(),
            phoneNumber: z.string().nullable(),
            isMfaEnabled: z.boolean(),
            profile: z.record(z.unknown()).nullable(),
            roles: z.array(z.record(z.unknown())),
            completion: ProfileCompletionSchema.optional(),
          }),
          404: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const user = await repo.getUserById(id);

      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }

      return reply.code(200).send({
        id: user.id,
        userCode: user.user_code,
        userType: user.user_type,
        status: user.status,
        email: user.email,
        phoneNumber: user.phone_number,
        isMfaEnabled: user.is_mfa_enabled,
        profile: user.profile,
        roles: user.roles,
        completion: user.completion,
      });
    }
  );

  // 2. Update Account Status
  app.patch(
    "/v1/users/:id/status",
    {
      schema: {
        tags: ["Access Control & RBAC"],
        summary: "Update Account Status",
        description: "Modifies user account lifecycle state (e.g. SUSPENDED, ACTIVE, LOCKED_OUT).",
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          status: AccountStatusSchema,
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            status: AccountStatusSchema,
            updatedAt: z.string(),
          }),
          404: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { status } = request.body;

      try {
        const updated = await repo.updateUserStatus(id, status);
        return reply.code(200).send({
          id: updated.id,
          status: updated.status,
          updatedAt: updated.updated_at.toISOString(),
        });
      } catch {
        return reply.code(404).send({ error: "User not found or update failed" });
      }
    }
  );

  // 3. Assign Scoped Role
  app.post(
    "/v1/users/:id/roles",
    {
      schema: {
        tags: ["Access Control & RBAC"],
        summary: "Assign Scoped Role",
        description: "Grants a role to a user bounded by national, regional, concessionaire, or municipal scope.",
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          roleId: z.string(),
          scopeLevel: ScopeLevelSchema,
          regionId: z.string().optional(),
          concessionaireId: z.string().uuid().optional(),
          municipalityId: z.string().optional(),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            userId: z.string().uuid(),
            roleId: z.string(),
            scopeLevel: ScopeLevelSchema,
          }),
          400: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const body = request.body;

      const assignment = await repo.assignRole({
        userId: id,
        roleId: body.roleId,
        scopeLevel: body.scopeLevel,
        regionId: body.regionId,
        concessionaireId: body.concessionaireId,
        municipalityId: body.municipalityId,
      });

      if (!assignment) {
        return reply.code(400).send({ error: "Failed to assign role" });
      }

      return reply.code(201).send({
        id: assignment.id,
        userId: assignment.user_id,
        roleId: assignment.role_id,
        scopeLevel: assignment.scope_level,
      });
    }
  );

  // 4. Revoke Role
  app.delete(
    "/v1/users/:id/roles/:assignmentId",
    {
      schema: {
        tags: ["Access Control & RBAC"],
        summary: "Revoke Role Assignment",
        description: "Removes a specific role grant from a user.",
        params: z.object({
          id: z.string().uuid(),
          assignmentId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            message: z.string(),
            revokedAssignmentId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { assignmentId } = request.params;
      const res = await repo.revokeRole(assignmentId);

      return reply.code(200).send({
        message: "Role assignment revoked successfully",
        revokedAssignmentId: res?.id ?? assignmentId,
      });
    }
  );
};
