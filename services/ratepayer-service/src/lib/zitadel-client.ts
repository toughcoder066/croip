import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import type { AppConfig } from '../config.js';

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

let cached: CachedToken | null = null;

function postForm(tokenUrl: string, hostHeader: string, headers: Record<string, string>, body: string): Promise<{ status: number; body: string }> {
  const url = new URL(tokenUrl);
  const transport = url.protocol === 'https:' ? httpsRequest : httpRequest;

  return new Promise((resolve, reject) => {
    const req = transport(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: 'POST',
        headers: { ...headers, Host: hostHeader, 'Content-Length': Buffer.byteLength(body) }
      },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => resolve({ status: res.statusCode ?? 0, body: responseBody }));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

export async function getServiceAccessToken(config: AppConfig): Promise<string> {
  if (cached && Date.now() < cached.expiresAt) {
    return cached.accessToken;
  }

  const issuerHost = new URL(config.ZITADEL_ISSUER!).host;
  const projectId = config.ZITADEL_AUDIENCE!;
  // ZITADEL_AUDIENCE already *is* the Zitadel project ID by convention on every service —
  // this used to be a literal, hardcoded ID here, which silently went stale when the
  // Zitadel instance was rebuilt with a new project. See property-registry-service's
  // identical helper for the longer explanation of why `:aud` is needed at all.
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: `openid urn:zitadel:iam:org:project:id:${projectId}:roles urn:zitadel:iam:org:project:id:${projectId}:aud`
  }).toString();

  const { status, body: responseBody } = await postForm(config.ZITADEL_TOKEN_URL, issuerHost, {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${config.ZITADEL_CLIENT_ID}:${config.ZITADEL_CLIENT_SECRET}`).toString('base64')}`
  }, body);

  if (status !== 200) {
    throw new Error(`Zitadel client-credentials token request failed: ${status} ${responseBody}`);
  }

  const data = JSON.parse(responseBody) as { access_token: string; expires_in: number };

  cached = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000
  };

  return cached.accessToken;
}
