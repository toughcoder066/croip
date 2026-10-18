import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';

export const prismaPlugin = fp(async (app) => {
  const prisma = new PrismaClient({
    log: app.log.level === 'debug' ? ['query', 'warn', 'error'] : ['warn', 'error']
  });
  await prisma.$connect();
  app.decorate('prisma', prisma);
  app.addHook('onClose', async () => prisma.$disconnect());
}, { name: 'prisma' });
