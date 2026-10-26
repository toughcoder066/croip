/**
 * Notification dispatcher for Platform Governance Service.
 *
 * Delivers a newly-provisioned or rotated API client's credentials to a concessionaire's
 * registered contact email — the one time they ever appear outside this one HTTP response.
 * Dispatched directly to the local/dev Mailpit container (viewable at http://localhost:8025),
 * mirroring ratepayer-service's identical OTP dispatcher.
 */

export interface DispatchApiCredentialsInput {
  to: string;
  concessionName: string;
  clientId: string;
  clientSecret: string;
  expiresAt: string;
  log?: {
    info: (obj: any, msg?: string) => void;
    warn: (obj: any, msg?: string) => void;
  } | undefined;
}

export interface DispatchApiCredentialsResult {
  success: boolean;
  messageId?: string | undefined;
  error?: string | undefined;
}

export async function dispatchApiCredentials(input: DispatchApiCredentialsInput): Promise<DispatchApiCredentialsResult> {
  const mailpitUrls = [
    process.env.MAILPIT_API_URL,
    'http://mailpit:8025',
    'http://localhost:8025'
  ].filter(Boolean) as string[];

  const subject = `Your CROIP API credentials — ${input.concessionName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CROIP API Credentials</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 24px; text-align: center; color: #ffffff; }
    .logo { font-size: 18px; font-weight: 800; letter-spacing: 1px; color: #38bdf8; }
    .sub { font-size: 12px; color: #94a3b8; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
    .lead { font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 20px; }
    .cred-box { background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 10px; padding: 18px 20px; margin: 16px 0; }
    .cred-row { margin-bottom: 10px; }
    .cred-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
    .cred-value { font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: 700; color: #0f172a; word-break: break-all; }
    .warning { font-size: 12px; color: #b45309; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; margin-top: 16px; }
    .footer { padding: 18px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">CROIP GHANA</div>
      <div class="sub">Central Revenue Oversight &amp; Integration Platform</div>
    </div>
    <div class="content">
      <div class="greeting">Hello, ${input.concessionName}</div>
      <div class="lead">
        Here are the API credentials for your CROIP integration. Use them to authenticate
        your backend's calls via the client_credentials grant.
      </div>
      <div class="cred-box">
        <div class="cred-row">
          <div class="cred-label">Client ID</div>
          <div class="cred-value">${input.clientId}</div>
        </div>
        <div class="cred-row">
          <div class="cred-label">Client Secret</div>
          <div class="cred-value">${input.clientSecret}</div>
        </div>
        <div class="cred-row">
          <div class="cred-label">Expires</div>
          <div class="cred-value">${input.expiresAt}</div>
        </div>
      </div>
      <div class="warning">
        This secret is shown only once, here and in the original API response. Store it
        securely — CROIP cannot show it to you again. If it is ever exposed or compromised,
        use your API client's rotate endpoint to revoke it and issue a new one immediately.
      </div>
    </div>
    <div class="footer">
      Republic of Ghana &bull; Ministry of Local Government &bull; Central Revenue System<br/>
      Sent via Local Development Relay (Mailpit)
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
CROIP GHANA - API Credentials
==============================
Hello ${input.concessionName},

Here are the API credentials for your CROIP integration:

Client ID:     ${input.clientId}
Client Secret: ${input.clientSecret}
Expires:       ${input.expiresAt}

This secret is shown only once, here and in the original API response. Store it securely —
CROIP cannot show it to you again. If it is ever exposed or compromised, use your API
client's rotate endpoint to revoke it and issue a new one immediately.

Republic of Ghana - Central Revenue Oversight & Integration Platform
  `.trim();

  let lastError = 'No Mailpit endpoint reachable';

  for (const baseUrl of mailpitUrls) {
    try {
      const url = `${baseUrl.replace(/\/$/, '')}/api/v1/send`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          From: { Email: 'noreply@croip.gov.gh', Name: 'CROIP Ghana Platform' },
          To: [{ Email: input.to, Name: input.concessionName }],
          Subject: subject,
          Text: text,
          HTML: html
        })
      });

      if (res.ok) {
        const body: any = await res.json().catch(() => ({}));
        input.log?.info({ to: input.to, subject, provider: 'mailpit', messageId: body.ID, url }, `[Mailpit] API credentials email dispatched to ${input.to}`);
        return { success: true, messageId: body.ID };
      }

      lastError = `Mailpit responded with status ${res.status}`;
    } catch (err: any) {
      lastError = err.message || 'Fetch error';
    }
  }

  input.log?.warn({ to: input.to, lastError }, `[Mailpit] Unable to deliver API credentials to ${input.to}: ${lastError}`);
  return { success: false, error: lastError };
}
