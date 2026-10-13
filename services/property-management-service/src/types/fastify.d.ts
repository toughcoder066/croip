import type { PrismaClient } from '../generated/prisma-client/index.js';
import type { AuthContext } from '../plugins/auth.js';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requirePermissions: (required: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    auth: AuthContext;
  }
}
