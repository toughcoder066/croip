import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { ForbiddenError } from '../../lib/errors.js';
import { disputeService, type RaiseDisputeInput, type UpdateDisputeStatusInput } from './service.js';
import {
  problemSchema,
  disputeResponseSchema,
  evidenceResponseSchema,
  commentResponseSchema,
  raiseDisputeBodySchema,
  updateDisputeStatusBodySchema,
  addEvidenceBodySchema,
  addCommentBodySchema
} from './schemas.js';

const problemRef = { $ref: 'Problem#' };
const disputeRef = { $ref: 'Dispute#' };
const evidenceRef = { $ref: 'DisputeEvidence#' };
const commentRef = { $ref: 'DisputeComment#' };

export const disputeRoutes: FastifyPluginAsync = async (app) => {
  // Register each response schema once by $id; routes below reference them via $ref so no
  // route shares a raw schema object reference with another (see schemas.ts for why).
  app.addSchema(problemSchema);
  app.addSchema(evidenceResponseSchema);
  app.addSchema(commentResponseSchema);
  app.addSchema(disputeResponseSchema);

  const service = disputeService(app);

  // Evidence and comments may be added either by the ratepayer who raised the dispute
  // or by a reviewing officer — requirePermissions() requires ALL listed permissions,
  // so an explicit OR check is needed here.
  async function requireRaiseOrReview(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    await app.authenticate(request, reply);
    const allowed = request.auth.permissions.includes('disputes:raise') || request.auth.permissions.includes('disputes:review');
    if (!allowed) throw new ForbiddenError('Required permissions: disputes:raise or disputes:review');
  }

  app.post<{ Body: Omit<RaiseDisputeInput, 'raisedByRatepayerId' | 'concessionId' | 'assemblyId'> }>('/disputes', {
    preHandler: app.requirePermissions(['disputes:raise']),
    schema: {
      tags: ['Disputes'],
      summary: 'Raise a billing, boundary, or valuation dispute',
      body: raiseDisputeBodySchema,
      response: { 201: disputeRef, 400: problemRef, 401: problemRef, 403: problemRef }
    }
  }, async (request, reply) => {
    const dispute = await service.raiseDispute({
      ...request.body,
      raisedByRatepayerId: request.auth.subject,
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyIds[0] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9' // TODO: single-assembly limitation, see property-registry-service
    });
    return reply.code(201).send(dispute);
  });

  app.get('/me/disputes', {
    preHandler: app.requirePermissions(['disputes:read']),
    schema: {
      tags: ['Disputes'],
      summary: "List the caller's own disputes",
      response: { 200: { type: 'array', items: disputeRef }, 401: problemRef, 403: problemRef }
    }
  }, async (request) => {
    return service.listMyDisputes(request.auth.subject);
  });

  app.get<{ Querystring: { status?: string; assignedToPersonnelId?: string; raisedByRatepayerId?: string } }>('/disputes', {
    preHandler: app.requirePermissions(['disputes:read']),
    schema: {
      tags: ['Disputes'],
      summary: 'Review queue: list disputes, optionally filtered by status, assignee, or ratepayer',
      querystring: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'] },
          assignedToPersonnelId: { type: 'string', format: 'uuid' },
          raisedByRatepayerId: { type: 'string', format: 'uuid' }
        }
      },
      response: { 200: { type: 'array', items: disputeRef }, 401: problemRef, 403: problemRef }
    }
  }, async (request) => {
    return service.listDisputes(request.query ?? {});
  });

  app.get<{ Params: { code: string } }>('/disputes/:code', {
    preHandler: app.requirePermissions(['disputes:read']),
    schema: {
      tags: ['Disputes'],
      summary: 'Retrieve a dispute with its evidence and comments',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      response: { 200: disputeRef, 401: problemRef, 403: problemRef, 404: problemRef }
    }
  }, async (request) => {
    return service.getDisputeByCode(request.params.code);
  });

  app.patch<{ Params: { code: string }; Body: Omit<UpdateDisputeStatusInput, 'code' | 'concessionId' | 'assemblyId'> }>('/disputes/:code/status', {
    preHandler: app.requirePermissions(['disputes:review']),
    schema: {
      tags: ['Disputes'],
      summary: 'Officer transitions a dispute forward through review to resolution',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      body: updateDisputeStatusBodySchema,
      response: { 200: disputeRef, 400: problemRef, 401: problemRef, 403: problemRef, 404: problemRef }
    }
  }, async (request) => {
    return service.updateStatus({
      ...request.body,
      code: request.params.code,
      concessionId: request.auth.concessionId,
      assemblyId: request.auth.assemblyIds[0] ?? '01c23cab-b1b2-4dae-b99b-32ea574632d9' // TODO: single-assembly limitation, see property-registry-service
    });
  });

  app.post<{ Params: { code: string }; Body: { mediaUrl: string } }>('/disputes/:code/evidence', {
    preHandler: requireRaiseOrReview,
    schema: {
      tags: ['Disputes'],
      summary: 'Attach evidence media to a dispute',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      body: addEvidenceBodySchema,
      response: { 201: evidenceRef, 400: problemRef, 401: problemRef, 403: problemRef, 404: problemRef }
    }
  }, async (request, reply) => {
    const uploadedByActorType = request.auth.permissions.includes('disputes:review') ? 'PERSONNEL' : 'RATEPAYER';
    const evidence = await service.addEvidence({
      code: request.params.code,
      mediaUrl: request.body.mediaUrl,
      uploadedByActorType,
      uploadedByActorId: request.auth.subject
    });
    return reply.code(201).send(evidence);
  });

  app.post<{ Params: { code: string }; Body: { body: string } }>('/disputes/:code/comments', {
    preHandler: requireRaiseOrReview,
    schema: {
      tags: ['Disputes'],
      summary: 'Add a comment to a dispute thread',
      params: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
      body: addCommentBodySchema,
      response: { 201: commentRef, 400: problemRef, 401: problemRef, 403: problemRef, 404: problemRef }
    }
  }, async (request, reply) => {
    const actorType = request.auth.permissions.includes('disputes:review') ? 'PERSONNEL' : 'RATEPAYER';
    const comment = await service.addComment({
      code: request.params.code,
      body: request.body.body,
      actorType,
      actorId: request.auth.subject
    });
    return reply.code(201).send(comment);
  });

  app.post('/disputes/purge', {
    preHandler: app.requirePermissions(['disputes:review']),
    schema: {
      tags: ['Disputes'],
      summary: 'Admin purge all disputes, evidence, and comments'
    }
  }, async () => {
    return service.purgeDisputes();
  });
};

