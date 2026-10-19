import { jwtVerify } from 'jose';

export interface RatepayerTokenClaims {
  sub: string;
  code: string;
  phone: string;
  assemblyId: string;
  regionId: string;
  actorType: 'RATEPAYER';
}

const ISSUER = 'croip-ratepayer-service';
const AUDIENCE = 'croip-platform';

// Ratepayers are a separate identity population from staff (who authenticate via
// Zitadel/OIDC) — ratepayer-service issues a small self-signed HS256 session token
// after phone/email + password + OTP login, instead of a second OIDC provider. This
// service only verifies it (for self-service property creation), using the same
// RATEPAYER_JWT_SECRET ratepayer-service signs with.
export async function verifyRatepayerToken(token: string, secret: string): Promise<RatepayerTokenClaims> {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key, { issuer: ISSUER, audience: AUDIENCE, algorithms: ['HS256'] });
  return {
    sub: String(payload.sub),
    code: String(payload.code),
    phone: String(payload.phone),
    assemblyId: String(payload.assemblyId),
    regionId: String(payload.regionId),
    actorType: 'RATEPAYER'
  };
}
