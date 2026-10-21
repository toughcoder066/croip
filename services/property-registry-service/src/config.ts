import { z } from 'zod';

const booleanString = z.enum(['true', 'false']).transform((value) => value === 'true');

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  SERVICE_NAME: z.string().min(1).default('property-registry-service'),
  SERVICE_VERSION: z.string().min(1).default('0.0.0'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3020),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  DATABASE_URL: z.string().min(1),
  AUTH_MODE: z.enum(['zitadel', 'disabled']).default('zitadel'),
  ZITADEL_ISSUER: z.string().url().optional(),
  ZITADEL_AUDIENCE: z.string().min(1).optional(),
  ZITADEL_JWKS_URI: z.string().url().optional(),
  ZITADEL_ROLES_CLAIM: z.string().default('urn:zitadel:iam:org:project:roles'),
  IDARMS_CONTEXT_CLAIM: z.string().default('urn:idarms:context'),
  // This service's own machine identity in Zitadel, used only for the one internal
  // call to Shared Services' zone-lookup endpoint (see getServiceAccessToken).
  ZITADEL_TOKEN_URL: z.string().url().optional(),
  ZITADEL_CLIENT_ID: z.string().min(1).optional(),
  ZITADEL_CLIENT_SECRET: z.string().min(1).optional(),
  // Accepts a ratepayer's own session token (issued by ratepayer-service's phone/email +
  // password + OTP login) as an alternate auth path for self-service property creation —
  // see the dual-auth preHandler on POST /properties.
  RATEPAYER_JWT_SECRET: z.string().min(32).default('a1ad815520d1c65d7f6f262a37b891b4081ac164aa687d9277bfaa4990735893'),
  // Called right after a ratepayer self-registers a property, to link it to their own
  // profile on the ratepayer-service side (see assertZoneMembership's sibling call in
  // service.ts's createProperty).
  RATEPAYER_SERVICE_URL: z.string().url().default('http://ratepayer-service:3030'),
  BILLING_SERVICE_URL: z.string().url().default('http://billing-payments-service:3007'),
  // Platform Governance Service provides concessionaire assignments and MMDA boundary authorizations
  PLATFORM_GOVERNANCE_URL: z.string().url().default('http://platform-governance-service:3010'),
  RABBITMQ_URL: z.string().min(1),
  RABBITMQ_EXCHANGE: z.string().min(1).default('croip.domain.v1'),
  // Shared Services owns MMDA boundary geometry; property registration calls its
  // zone-membership check synchronously to reject properties that fall outside every drawn
  // boundary or that straddle more than one (see propertyService.createProperty).
  SHARED_SERVICES_URL: z.string().url().default('http://shared-services:3004'),
  OUTBOX_POLL_INTERVAL_MS: z.coerce.number().int().min(100).default(500),
  OUTBOX_BATCH_SIZE: z.coerce.number().int().min(1).max(500).default(50),
  CORS_ORIGINS: z.string().default(''),
  REQUEST_BODY_LIMIT_BYTES: z.coerce.number().int().positive().default(1_048_576),
  SHUTDOWN_GRACE_MS: z.coerce.number().int().positive().default(10_000),
  TRUST_PROXY: booleanString.default(false)
}).superRefine((value, ctx) => {
  if (value.AUTH_MODE === 'disabled' && value.NODE_ENV === 'production') {
    ctx.addIssue({ code: 'custom', path: ['AUTH_MODE'], message: 'AUTH_MODE=disabled is forbidden in production' });
  }
  if (value.AUTH_MODE === 'zitadel') {
    for (const key of ['ZITADEL_ISSUER', 'ZITADEL_AUDIENCE', 'ZITADEL_JWKS_URI'] as const) {
      if (!value[key]) ctx.addIssue({ code: 'custom', path: [key], message: `${key} is required for ZITADEL authentication` });
    }
  }
});

export type AppConfig = z.infer<typeof schema> & { corsOrigins: string[] };

export function loadConfig(source: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = schema.parse(source);
  return {
    ...parsed,
    corsOrigins: parsed.CORS_ORIGINS.split(',').map((value) => value.trim()).filter(Boolean)
  };
}
