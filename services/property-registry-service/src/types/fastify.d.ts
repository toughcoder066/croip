import type { PrismaClient } from '../generated/prisma-client/index.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { AuthContext, RatepayerTokenClaims } from '../plugins/auth.js';
import type { AppConfig } from '../config.js';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    serviceInfo: { name: string };
    config: AppConfig;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requirePermissions: (permissions: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authenticateConcession: (permissions: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authenticateRatepayer: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    auth: AuthContext;
    ratepayerAuth: RatepayerTokenClaims;
  }
}

export {};
