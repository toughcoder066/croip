import type { PrismaClient } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { AuthContext } from '../plugins/auth.js';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    serviceInfo: { name: string };
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requirePermissions: (permissions: string[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    auth: AuthContext;
  }
}

export {};
