import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getDb, IamRepository } from "@croip/db";

export const rolesRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  const repo = new IamRepository(getDb());

  app.get(
    "/v1/roles",
    {
      schema: {
        tags: ["Access Control & RBAC"],
        summary: "List Standard Roles",
        description: "Retrieves standard roles available within the CROIP ecosystem.",
        response: {
          200: z.object({
            data: z.array(
              z.object({
                id: z.string(),
                role_type: z.string(),
                name: z.string(),
                description: z.string().nullable(),
                is_system_role: z.boolean(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const roles = await repo.listRoles();
      return { data: roles };
    }
  );

  app.get(
    "/v1/permissions",
    {
      schema: {
        tags: ["Access Control & RBAC"],
        summary: "List Platform Permissions",
        description: "Retrieves all atomic permissions enforced across platform endpoints and RLS policies.",
        response: {
          200: z.object({
            data: z.array(
              z.object({
                id: z.string(),
                category: z.string(),
                display_name: z.string(),
                description: z.string().nullable(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const permissions = await repo.listPermissions();
      return { data: permissions };
    }
  );
};
