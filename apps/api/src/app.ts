import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { healthRoutes } from "./routes/health.js";
import { ratepayerRoutes } from "./routes/ratepayer.js";
import { authRoutes } from "./routes/auth.js";
import { adminRoutes } from "./routes/admin.js";
import { userRoutes } from "./routes/users.js";
import { rolesRoutes } from "./routes/roles.js";

export interface BuildAppOptions {
  logger?: boolean | object;
}

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? (process.env.NODE_ENV === "test" ? false : { level: "info" }),
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(sensible);
  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(cors, {
    origin: true,
    credentials: false,
    allowedHeaders: ["authorization", "content-type", "x-actor-user-id", "x-request-id"],
  });

  // OpenAPI 3.1 & Interactive Documentation
  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "CROIP Core API Gateway",
        version: "0.1.0",
        description:
          "Central Revenue Oversight & Integration Platform - Unified Ratepayer Registration, Two-Factor Authentication, Government Staff IAM Onboarding, and Scoped RBAC Engine",
      },
      servers: [
        {
          url: "http://localhost:4000",
          description: "Local Development Server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });

  // Register Route Modules
  await app.register(healthRoutes);
  await app.register(ratepayerRoutes);
  await app.register(authRoutes);
  await app.register(adminRoutes);
  await app.register(userRoutes);
  await app.register(rolesRoutes);

  return app;
}
