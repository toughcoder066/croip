export const resourceResponseSchema = {
  type: 'object',
  required: ['id', 'concessionId', 'assemblyId', 'name', 'status', 'version', 'createdAt', 'updatedAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    concessionId: { type: 'string', format: 'uuid' },
    assemblyId: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    status: { type: 'string' },
    version: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
} as const;

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
} as const;
