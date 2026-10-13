export {
  CreateConcessionaireSchema,
  UpdateConcessionaireStatusSchema,
  CreateMunicipalAssemblySchema,
  AssignConcessionSchema,
  CreateApiClientSchema,
  type CreateConcessionaireInput,
  type UpdateConcessionaireStatusInput,
  type CreateMunicipalAssemblyInput,
  type AssignConcessionInput,
  type CreateApiClientInput,
} from '@croip/contracts';

/**
 * Fastify / Swagger JSON Schema definition for registering a new Concessionaire.
 */
export const CreateConcessionaireFastifySchema = {
  type: 'object',
  required: ['name', 'registrationNumber', 'contactEmail', 'contactPhone'],
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 100,
      description: 'Corporate business name of the concessionaire',
      example: 'RevTech Solutions Ghana Ltd'
    },
    registrationNumber: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      description: 'Official Registrar General Department registration number',
      example: 'CS123452026'
    },
    contactEmail: {
      type: 'string',
      format: 'email',
      description: 'Official correspondence email address',
      example: 'partners@revtech.gh'
    },
    contactPhone: {
      type: 'string',
      minLength: 9,
      maxLength: 20,
      description: 'Primary administrative contact phone number',
      example: '233241002000'
    }
  }
};

/**
 * Fastify / Swagger JSON Schema definition for updating Concessionaire lifecycle status.
 */
export const UpdateConcessionaireStatusFastifySchema = {
  type: 'object',
  required: ['status'],
  properties: {
    status: {
      type: 'string',
      enum: ['ACTIVE', 'SUSPENDED', 'OFFBOARDED'],
      description: 'Operational lifecycle status',
      example: 'ACTIVE'
    }
  }
};

/**
 * Fastify / Swagger JSON Schema definition for registering an MMDA assembly.
 */
export const CreateMunicipalAssemblyFastifySchema = {
  type: 'object',
  required: ['code', 'name', 'region'],
  properties: {
    code: {
      type: 'string',
      minLength: 2,
      maxLength: 20,
      description: 'Standard MMDA code (e.g. AMA, KMA, TEMA, GA_EAST)',
      example: 'AMA'
    },
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 100,
      description: 'Full official name of the Metropolitan/Municipal Assembly',
      example: 'Accra Metropolitan Assembly'
    },
    region: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      description: 'Administrative region in Ghana',
      example: 'Greater Accra'
    }
  }
};

/**
 * Fastify / Swagger JSON Schema definition for assigning an MMDA to a Concessionaire.
 */
export const AssignConcessionFastifySchema = {
  type: 'object',
  required: ['assemblyId', 'contractStartDate', 'contractEndDate'],
  properties: {
    assemblyId: {
      type: 'string',
      format: 'uuid',
      description: 'UUID of the target Metropolitan, Municipal, or District Assembly',
      example: '7a5506a5-a36b-4a6a-aba9-f80f875feaad'
    },
    contractStartDate: {
      type: 'string',
      format: 'date-time',
      description: 'Contract commencement date/time in ISO 8601 format',
      example: '2026-01-01T00:00:00.000Z'
    },
    contractEndDate: {
      type: 'string',
      format: 'date-time',
      description: 'Contract expiry date/time in ISO 8601 format',
      example: '2028-12-31T23:59:59.000Z'
    }
  }
};

/**
 * Fastify / Swagger JSON Schema definition for provisioning M2M API credentials.
 */
export const CreateApiClientFastifySchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 100,
      description: 'Descriptive application or service name for this credential set',
      example: 'Accra Field Enumeration Engine'
    },
    allowedIps: {
      type: 'array',
      items: { type: 'string' },
      description: 'Optional list of allowed CIDR IP addresses or single IPv4/IPv6 addresses',
      example: ['197.251.12.0/24', '154.160.22.10']
    },
    rateLimitPerMinute: {
      type: 'integer',
      minimum: 10,
      maximum: 10000,
      default: 600,
      description: 'Maximum permitted API calls per minute',
      example: 600
    }
  }
};

/**
 * Fastify / Swagger JSON Schema definition for querying concessionaires.
 */
export const AdminConcessionaireQueryFastifySchema = {
  type: 'object',
  properties: {
    page: {
      type: 'integer',
      minimum: 1,
      default: 1,
      description: 'Pagination page number',
      example: 1
    },
    limit: {
      type: 'integer',
      minimum: 1,
      maximum: 100,
      default: 20,
      description: 'Number of records per page',
      example: 20
    },
    search: {
      type: 'string',
      description: 'Search string matching company name, registration number, or email',
      example: 'RevTech'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'SUSPENDED', 'OFFBOARDED'],
      description: 'Filter by operational status'
    }
  }
};

/**
 * Fastify / Swagger JSON Schema for concessionaire UUID route param.
 */
export const ConcessionaireIdParamFastifySchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique UUID of the concessionaire',
      example: '7a5506a5-a36b-4a6a-aba9-f80f875feaad'
    }
  }
};

/**
 * Fastify / Swagger JSON Schema for concession assignment UUID route param.
 */
export const AssignmentIdParamFastifySchema = {
  type: 'object',
  required: ['assignmentId'],
  properties: {
    assignmentId: {
      type: 'string',
      format: 'uuid',
      description: 'Unique UUID of the concession assignment contract',
      example: '3f671eb6-6d26-44c1-8408-724bc2488a03'
    }
  }
};

/**
 * Fastify / Swagger JSON Schema for API client route params.
 */
export const ApiClientParamsFastifySchema = {
  type: 'object',
  required: ['id', 'clientId'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique UUID of the concessionaire',
      example: '7a5506a5-a36b-4a6a-aba9-f80f875feaad'
    },
    clientId: {
      type: 'string',
      description: 'Unique Client ID (e.g. crp_live_...)',
      example: 'crp_live_3f671eb66d2644c18408724bc2488a03'
    }
  }
};
