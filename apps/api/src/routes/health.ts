import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get(
    "/health",
    {
      schema: {
        tags: ["System"],
        summary: "Health Check Probe",
        description: "Returns platform uptime, timestamp, and service status.",
        response: {
          200: z.object({
            status: z.literal("healthy"),
            service: z.string(),
            version: z.string(),
            timestamp: z.string(),
          }),
        },
      },
    },
    async () => {
      return {
        status: "healthy" as const,
        service: "@croip/api",
        version: "0.1.0",
        timestamp: new Date().toISOString(),
      };
    }
  );
};
