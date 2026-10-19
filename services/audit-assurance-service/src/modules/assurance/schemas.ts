export const problemSchema = {
  type: 'object',
  required: ['type', 'title', 'status', 'code', 'requestId'],
  properties: {
    type: { type: 'string' },
    title: { type: 'string' },
    status: { type: 'integer' },
    code: { type: 'string' },
    requestId: { type: 'string' },
    details: {}
  }
};

export const auditRecordSchema = {
  type: 'object',
  required: ['id', 'occurredAt', 'actorId', 'action', 'resourceType', 'outcome', 'recordHash'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    occurredAt: { type: 'string', format: 'date-time' },
    actorId: { type: 'string' },
    actorType: { type: 'string' },
    concessionId: { type: ['string', 'null'], format: 'uuid' },
    assemblyId: { type: ['string', 'null'], format: 'uuid' },
    action: { type: 'string' },
    resourceType: { type: 'string' },
    resourceId: { type: ['string', 'null'] },
    requestId: { type: 'string' },
    outcome: { type: 'string' },
    recordHash: { type: 'string' }
  }
};

export const verifyResponseSchema = {
  type: 'object',
  required: ['batchId', 'eventCount', 'merkleRoot', 'status', 'verified', 'verifiedAt'],
  properties: {
    batchId: { type: 'string' },
    eventCount: { type: 'integer' },
    merkleRoot: { type: 'string' },
    status: { type: 'string' },
    verified: { type: 'boolean' },
    verifiedAt: { type: 'string', format: 'date-time' }
  }
};

export const traceResponseSchema = {
  type: 'object',
  required: ['targetId', 'tracedAt', 'evidenceChain', 'integrityVerified'],
  properties: {
    targetId: { type: 'string' },
    tracedAt: { type: 'string', format: 'date-time' },
    evidenceChain: { type: 'array', items: { type: 'object' } },
    integrityVerified: { type: 'boolean' }
  }
};
