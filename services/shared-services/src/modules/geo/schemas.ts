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

export const regionResponseSchema = {
  type: 'object',
  required: ['id', 'code', 'name', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    name: { type: 'string' },
    polygonGeoJson: {},
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

export const assemblyResponseSchema = {
  type: 'object',
  required: ['id', 'regionId', 'code', 'name', 'category', 'createdAt'],
  properties: {
    id: { type: 'string', format: 'uuid' },
    regionId: { type: 'string', format: 'uuid' },
    code: { type: 'string' },
    name: { type: 'string' },
    category: { type: 'string' },
    polygonGeoJson: {},
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

export const createRegionBodySchema = {
  type: 'object',
  required: ['code', 'name'],
  properties: {
    code: { type: 'string', minLength: 1, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 100 },
    polygonGeoJson: { type: 'object' }
  }
};

export const updateRegionBoundaryBodySchema = {
  type: 'object',
  required: ['polygonGeoJson'],
  properties: {
    polygonGeoJson: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: { type: { type: 'string', enum: ['Polygon', 'MultiPolygon'] }, coordinates: { type: 'array' } }
    }
  }
};

export const createAssemblyBodySchema = {
  type: 'object',
  required: ['regionId', 'code', 'name'],
  properties: {
    regionId: { type: 'string', format: 'uuid' },
    code: { type: 'string', minLength: 1, maxLength: 50 },
    name: { type: 'string', minLength: 1, maxLength: 150 },
    category: { type: 'string', enum: ['METROPOLITAN', 'MUNICIPAL', 'DISTRICT'], default: 'DISTRICT' },
    polygonGeoJson: { type: 'object' }
  }
};

export const updateAssemblyBoundaryBodySchema = updateRegionBoundaryBodySchema;

export const detectZoneBodySchema = {
  type: 'object',
  required: ['latitude', 'longitude'],
  properties: {
    latitude: { type: 'number', minimum: -90, maximum: 90 },
    longitude: { type: 'number', minimum: -180, maximum: 180 }
  }
};

export const detectZoneResponseSchema = {
  type: 'object',
  required: ['matched'],
  properties: {
    matched: { type: 'boolean' },
    assembly: { anyOf: [assemblyResponseSchema, { type: 'null' }] },
    region: { anyOf: [regionResponseSchema, { type: 'null' }] }
  }
};

export const detectZoneForPolygonBodySchema = {
  type: 'object',
  required: ['polygonGeoJson'],
  properties: {
    polygonGeoJson: { type: 'object', additionalProperties: true }
  }
};

export const detectZoneForPolygonResponseSchema = {
  type: 'object',
  required: ['status'],
  properties: {
    status: { type: 'string', enum: ['MATCHED', 'NO_MATCH', 'CONFLICT'] },
    assembly: { anyOf: [assemblyResponseSchema, { type: 'null' }] },
    region: { anyOf: [regionResponseSchema, { type: 'null' }] },
    matchedAssemblies: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: true
      }
    }
  }
};
