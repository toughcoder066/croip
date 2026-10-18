// Each response schema carries a stable $id and is registered once via app.addSchema()
// (see routes.ts) rather than being inlined by object reference at every usage site.
// Fastify/fast-json-stringify compile a serializer per route from these objects, and reusing
// the same object reference in different shapes across routes (e.g. once as a plain 200
// response and once wrapped as `{ type: 'array', items: disputeResponseSchema }` elsewhere)
// corrupts the compiled serializer for an unrelated route — $ref avoids that entirely.
export const problemSchema = {
  $id: 'Problem',
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

export const evidenceResponseSchema = {
  $id: 'DisputeEvidence',
  type: 'object',
  required: ['id', 'disputeId', 'mediaUrl', 'uploadedByActorType', 'uploadedByActorId', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    disputeId: { type: 'string', format: 'uuid' },
    mediaUrl: { type: 'string' },
    uploadedByActorType: { type: 'string' },
    uploadedByActorId: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const commentResponseSchema = {
  $id: 'DisputeComment',
  type: 'object',
  required: ['id', 'disputeId', 'actorType', 'actorId', 'body', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    disputeId: { type: 'string', format: 'uuid' },
    actorType: { type: 'string' },
    actorId: { type: 'string' },
    body: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

export const disputeResponseSchema = {
  $id: 'Dispute',
  type: 'object',
  required: ['id', 'code', 'disputeType', 'raisedByRatepayerId', 'status', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    disputeType: { type: 'string' },
    propertyId: { type: ['string', 'null'], format: 'uuid' },
    billId: { type: ['string', 'null'], format: 'uuid' },
    raisedByRatepayerId: { type: 'string', format: 'uuid' },
    status: { type: 'string' },
    assignedToPersonnelId: { type: ['string', 'null'], format: 'uuid' },
    slaDueAt: { type: ['string', 'null'], format: 'date-time' },
    resolution: { type: ['string', 'null'] },
    resolvedAt: { type: ['string', 'null'], format: 'date-time' },
    createdAt: { type: 'string', format: 'date-time' },
    evidence: { type: 'array', items: { $ref: 'DisputeEvidence#' } },
    comments: { type: 'array', items: { $ref: 'DisputeComment#' } }
  }
};

export const raiseDisputeBodySchema = {
  type: 'object',
  required: ['disputeType', 'note'],
  properties: {
    disputeType: { type: 'string', enum: ['BILLING', 'BOUNDARY', 'VALUATION'] },
    propertyId: { type: 'string', format: 'uuid' },
    billId: { type: 'string', format: 'uuid' },
    note: { type: 'string', minLength: 1, maxLength: 4000 }
  }
};

export const updateDisputeStatusBodySchema = {
  type: 'object',
  required: ['status'],
  properties: {
    status: { type: 'string', enum: ['UNDER_REVIEW', 'RESOLVED', 'REJECTED'] },
    resolution: { type: 'string', maxLength: 4000 }
  }
};

export const addEvidenceBodySchema = {
  type: 'object',
  required: ['mediaUrl'],
  properties: {
    mediaUrl: { type: 'string', minLength: 1, maxLength: 500 }
  }
};

export const addCommentBodySchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: { type: 'string', minLength: 1, maxLength: 4000 }
  }
};
