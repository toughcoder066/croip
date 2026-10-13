# @croip/property-management-service

Central Platform Property Management & Sectional Titling Microservice for CROIP.

## Features
- **Ratepayer Property Registration**: Allows authenticated ratepayers to register property boundaries with flexible polygon coordinates (minimum 4 coordinate pairs) and centroid GhanaPost GPS digital addresses.
- **Sectional Titling (Ghana Land Act 1043)**: Fully normalized in 3NF to support multi-unit complexes (apartments, flats, commercial shops, or whole buildings) and multi-ratepayer co-ownership links.
- **Optional Attributes**: Handles properties without formal street names or house numbers.
- **Transactional Outbox**: Emits domain events (`property.registered.v1`, `property.unit.claimed.v1`) to synchronize with the Central Platform event bus.
- **Tenant Isolation**: Ratepayers can only access properties they hold verified or pending interests in.

## Endpoints
### CROIP Administrator Oversight
- `GET /v1/admin/properties` - Nationwide property directory with pagination, search, and status filtering.
- `GET /v1/admin/properties/:id` - Full nationwide property and sectional unit details.

### Ratepayer Self-Service
- \`POST /v1/ratepayer/properties\` - Register property, primary sectional unit, and ownership link.
- \`GET /v1/ratepayer/properties\` - List all properties associated with authenticated ratepayer.
- \`GET /v1/ratepayer/properties/:id\` - Retrieve property details and sectional units.
- \`POST /v1/ratepayer/properties/:id/units/:unitId/claim\` - Submit a claim or interest for a sectional unit.
- \`GET /health/live\` & \`GET /health/ready\` - Health check probes.
- \`GET /docs\` - OpenAPI Swagger UI documentation.
