/**
 * JSON Schema representations for Fastify Swagger / OpenAPI UI
 */

export const RegisterPropertyBodySchema = {
  type: 'object',
  required: ['propertyName', 'polygonCoordinates', 'centroidGhanapostGps', 'buildingStatus'],
  properties: {
    propertyName: {
      type: 'string',
      minLength: 2,
      maxLength: 255,
      description: 'Descriptive name or title of the property',
      example: 'East Legon Executive Court'
    },
    polygonCoordinates: {
      type: 'string',
      description: 'Minimum 4 lat,lng pairs defining the closed boundary polygon of the parcel/structure',
      example: '5.6350,-0.1540; 5.6360,-0.1530; 5.6355,-0.1520; 5.6345,-0.1530'
    },
    centroidGhanapostGps: {
      type: 'string',
      description: 'Centroid GhanaPost GPS digital address formatted as XX-000-0000 or XX-0000-0000',
      example: 'GA-492-1002'
    },
    streetName: {
      type: 'string',
      nullable: true,
      description: 'Optional street name (leave null or omit if the area has no designated street name)',
      example: 'Lagos Avenue'
    },
    houseNumber: {
      type: 'string',
      nullable: true,
      description: 'Optional house or plot number (leave null or omit if unnumbered)',
      example: 'EL-88'
    },
    numberOfFloors: {
      type: 'integer',
      minimum: 1,
      default: 1,
      description: 'Number of floors / storeys (1 for ground floor only, 2 for 2 storeys, etc.)',
      example: 3
    },
    buildingStatus: {
      type: 'string',
      enum: ['COMPLETED', 'UNDER_CONSTRUCTION', 'UNCOMPLETED_SHELL', 'DILAPIDATED'],
      description: 'Physical condition/construction status of the building',
      example: 'COMPLETED'
    },
    unit: {
      type: 'object',
      description: 'Initial sectional unit details under Land Act 1043 (e.g. whole building, apartment, shop)',
      properties: {
        unitIdentifier: {
          type: 'string',
          default: 'Main Building',
          description: 'Identifier for the unit (e.g. Suite 3A, Flat 2, Ground Floor Shop)',
          example: 'Suite 3A'
        },
        unitType: {
          type: 'string',
          enum: ['WHOLE_BUILDING', 'APARTMENT', 'FLAT', 'SHOP', 'OFFICE', 'WAREHOUSE'],
          default: 'WHOLE_BUILDING',
          example: 'APARTMENT'
        },
        floorLevel: {
          type: 'integer',
          default: 0,
          description: 'Floor level (0 = Ground Floor, 1 = 1st Floor, etc.)',
          example: 3
        },
        ownershipType: {
          type: 'string',
          enum: ['OWNER', 'LANDLORD', 'CARETAKER', 'TENANT'],
          default: 'OWNER',
          example: 'OWNER'
        },
        ownershipPercentage: {
          type: 'number',
          minimum: 0.01,
          maximum: 100.0,
          default: 100.0,
          description: 'Percentage of ownership held in this unit (e.g. 100% or 50% for co-owners)',
          example: 100.0
        },
        isPrimaryBillingContact: {
          type: 'boolean',
          default: true,
          description: 'Whether municipal property rate bills should be routed to this contact',
          example: true
        }
      }
    },
    photos: {
      type: 'array',
      description: 'Optional media photographs of the property',
      items: {
        type: 'object',
        required: ['photoType', 'mediaUrl'],
        properties: {
          photoType: {
            type: 'string',
            enum: ['FRONT_VIEW', 'SIDE_VIEW', 'ROOF_VIEW', 'INTERIOR'],
            example: 'FRONT_VIEW'
          },
          mediaUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://cdn.croip.gh/photos/east-legon-front.jpg'
          }
        }
      }
    }
  }
};

export const ClaimUnitBodySchema = {
  type: 'object',
  properties: {
    ownershipType: {
      type: 'string',
      enum: ['OWNER', 'LANDLORD', 'CARETAKER', 'TENANT'],
      default: 'OWNER',
      description: 'Relationship of caller to this sectional unit',
      example: 'OWNER'
    },
    ownershipPercentage: {
      type: 'number',
      minimum: 0.01,
      maximum: 100.0,
      default: 100.0,
      description: 'Ownership interest percentage (0.01 to 100.00)',
      example: 100.0
    },
    isPrimaryBillingContact: {
      type: 'boolean',
      default: true,
      description: 'Whether caller is designated as primary billing contact',
      example: true
    }
  }
};

export const AdminPropertyQueryFastifySchema = {
  type: 'object',
  properties: {
    page: {
      type: 'integer',
      minimum: 1,
      default: 1,
      description: 'Page number for pagination',
      example: 1
    },
    limit: {
      type: 'integer',
      minimum: 1,
      maximum: 100,
      default: 20,
      description: 'Page size limit (maximum 100)',
      example: 20
    },
    search: {
      type: 'string',
      description: 'Search string matching property name, system code, GhanaPost GPS, or street',
      example: 'Legon'
    },
    buildingStatus: {
      type: 'string',
      enum: ['COMPLETED', 'UNDER_CONSTRUCTION', 'UNCOMPLETED_SHELL', 'DILAPIDATED'],
      description: 'Filter by physical building status'
    }
  }
};

export const PropertyIdParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique UUID of the property',
      example: '7a5506a5-a36b-4a6a-aba9-f80f875feaad'
    }
  }
};

export const ClaimUnitParamsSchema = {
  type: 'object',
  required: ['id', 'unitId'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique UUID of the parent property',
      example: '7a5506a5-a36b-4a6a-aba9-f80f875feaad'
    },
    unitId: {
      type: 'string',
      format: 'uuid',
      description: 'Unique UUID of the sectional unit to claim',
      example: 'd9b71e16-1f6e-41a4-9727-c817293b6e82'
    }
  }
};
