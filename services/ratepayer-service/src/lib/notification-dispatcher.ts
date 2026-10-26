/**
 * Notification & OTP Dispatcher for Ratepayer Core Service.
 *
 * Dispatches one-time verification codes (OTPs):
 * - Email channel: Dispatched directly to local/dev Mailpit container (viewable at http://localhost:8025)
 * - SMS channel: Stubbed for upcoming Arkasel integration (Akasel SMS/OTP gateway).
 *
 * Every message is white-labeled as the ratepayer's own concession, never as CROIP — a
 * ratepayer only ever deals with the concession's own branding; CROIP is back-office
 * government infrastructure they're never meant to see or know about. Callers pass
 * `issuerName` (resolved via lib/concession-lookup.ts) when known; when it isn't (no
 * concession on file for this ratepayer), messages fall back to a neutral, non-CROIP label
 * rather than ever naming the platform itself.
 */

const NEUTRAL_FALLBACK_ISSUER = 'Ratepayer Services';

export interface DispatchOtpInput {
  destination: string;
  channel: 'EMAIL' | 'SMS';
  code: string;
  ratepayerName?: string | undefined;
  purpose?: string | undefined;
  issuerName?: string | undefined;
  log?: {
    info: (obj: any, msg?: string) => void;
    warn: (obj: any, msg?: string) => void;
    error: (obj: any, msg?: string) => void;
  } | undefined;
}

export interface DispatchOtpResult {
  success: boolean;
  channel: 'EMAIL' | 'SMS';
  destination: string;
  provider: 'mailpit' | 'arkasel_stub';
  messageId?: string | undefined;
  error?: string | undefined;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

/**
 * Dispatches an email OTP to the Mailpit SMTP/REST relay.
 *
 * Styling deliberately mirrors the CROIP portal's own design system (app/globals.css) —
 * near-black header/background, neutral grayscale body text, Geist's sans-serif stack,
 * ~10px card radius — rather than an arbitrary email template, so a ratepayer's inbox and
 * the portal they (or their concession's own app) came from feel like one product. The
 * issuer name is the only "brand" element; it is the concession's, never CROIP's.
 */
async function sendEmailOtpViaMailpit(
  to: string,
  code: string,
  ratepayerName: string | undefined,
  purpose: string = 'Registration',
  issuerName: string | undefined,
  log?: DispatchOtpInput['log'] | undefined
): Promise<{ success: boolean; messageId?: string | undefined; error?: string | undefined }> {
  const mailpitUrls = [
    process.env.MAILPIT_API_URL,
    'http://mailpit:8025',
    'http://localhost:8025'
  ].filter(Boolean) as string[];

  const issuer = issuerName?.trim() || NEUTRAL_FALLBACK_ISSUER;
  const displayName = ratepayerName || to.split('@')[0] || 'there';
  const subject = `${issuer}: your verification code is ${code}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(issuer)} verification code</title>
  <style>
    body { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5; color: #0a0a0a; margin: 0; padding: 24px; }
    .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e5e5e5; overflow: hidden; }
    .header { background: #0a0a0a; padding: 22px 28px; }
    .issuer { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; color: #fafafa; }
    .content { padding: 28px; }
    .greeting { font-size: 14px; font-weight: 600; color: #0a0a0a; margin-bottom: 10px; }
    .lead { font-size: 13px; color: #525252; line-height: 1.6; margin-bottom: 22px; }
    .otp-box { text-align: center; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 10px; padding: 18px; margin: 20px 0; }
    .otp-code { font-family: ui-monospace, 'SF Mono', 'Geist Mono', Menlo, monospace; font-size: 32px; font-weight: 700; letter-spacing: 7px; color: #0a0a0a; margin: 0; }
    .otp-expiry { font-size: 11px; color: #737373; margin-top: 8px; }
    .footer { padding: 16px 28px; background: #fafafa; border-top: 1px solid #e5e5e5; font-size: 11px; color: #a3a3a3; text-align: center; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="issuer">${escapeHtml(issuer)}</div>
    </div>
    <div class="content">
      <div class="greeting">Hello, ${escapeHtml(displayName)}</div>
      <div class="lead">
        Use the following one-time code to complete your <strong>${escapeHtml(purpose)}</strong>:
      </div>
      <div class="otp-box">
        <div class="otp-code">${escapeHtml(code)}</div>
        <div class="otp-expiry">Valid for 5 minutes. Do not share this code with anyone.</div>
      </div>
      <div class="lead" style="font-size: 12px; color: #737373; margin-bottom: 0;">
        If you did not request this, you can safely ignore this email.
      </div>
    </div>
    <div class="footer">
      Sent via local development relay (Mailpit) — not a production mail delivery.
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
${issuer}
${'='.repeat(issuer.length)}
Hello ${displayName},

Your one-time code for ${purpose} is:

    ${code}

This code is valid for 5 minutes. Do not share this code with anyone.
  `.trim();

  let lastError = 'No Mailpit endpoint reachable';

  for (const baseUrl of mailpitUrls) {
    try {
      const url = `${baseUrl.replace(/\/$/, '')}/api/v1/send`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // The issuer's display name is the only branding a ratepayer sees here — the
          // underlying send-from address is shared platform infrastructure (deferred to the
          // real production mail service), not something we multi-tenant per concession yet.
          From: { Email: 'noreply@notifications.gov.gh', Name: issuer },
          To: [{ Email: to, Name: displayName }],
          Subject: subject,
          Text: text,
          HTML: html
        })
      });

      if (res.ok) {
        const body: any = await res.json().catch(() => ({}));
        log?.info({ to, subject, provider: 'mailpit', messageId: body.ID, url, issuer }, `[Mailpit] OTP email dispatched to ${to}`);
        return { success: true, messageId: body.ID };
      }

      lastError = `Mailpit responded with status ${res.status}`;
    } catch (err: any) {
      lastError = err.message || 'Fetch error';
    }
  }

  log?.warn({ to, lastError }, `[Mailpit] Unable to deliver OTP to ${to}: ${lastError}`);
  return { success: false, error: lastError };
}

/**
 * Sends SMS OTP via Arkasel (Akasel SMS/OTP Gateway).
 * Currently stubbed as requested ("we'd wire up the akasel later").
 */
async function sendSmsOtpViaArkasel(
  phone: string,
  code: string,
  purpose: string = 'Registration',
  issuerName: string | undefined,
  log?: DispatchOtpInput['log'] | undefined
): Promise<{ success: boolean; messageId?: string | undefined }> {
  // Arkasel API Integration Placeholder
  // When Arkasel credentials (API key, sender ID) are provided:
  // POST https://sms.arkasel.com/api/v2/sms/send
  // Headers: { 'api-key': process.env.ARKASEL_API_KEY }
  // Body: { sender: issuer (truncated to Arkasel's sender-id length limit), recipients: [phone], message: `Your ${issuer} code is ${code}. Valid for 5 mins.` }
  const issuer = issuerName?.trim() || NEUTRAL_FALLBACK_ISSUER;

  log?.info(
    { phone, purpose, code, issuer, provider: 'arkasel_stub' },
    `[Arkasel SMS Stub] OTP ${code} generated for ${phone} (${purpose}, issuer: ${issuer}) - Arkasel gateway to be wired up.`
  );

  return { success: true, messageId: `arkasel_stub_${Date.now()}` };
}

/**
 * Unified OTP Dispatcher.
 * Automatically routes email destinations to Mailpit and phone destinations to Arkasel.
 */
export async function dispatchOtp(input: DispatchOtpInput): Promise<DispatchOtpResult> {
  if (input.channel === 'EMAIL' || input.destination.includes('@')) {
    const res = await sendEmailOtpViaMailpit(
      input.destination,
      input.code,
      input.ratepayerName,
      input.purpose,
      input.issuerName,
      input.log
    );
    return {
      success: res.success,
      channel: 'EMAIL',
      destination: input.destination,
      provider: 'mailpit',
      messageId: res.messageId,
      error: res.error
    };
  }

  const res = await sendSmsOtpViaArkasel(
    input.destination,
    input.code,
    input.purpose,
    input.issuerName,
    input.log
  );
  return {
    success: res.success,
    channel: 'SMS',
    destination: input.destination,
    provider: 'arkasel_stub',
    messageId: res.messageId
  };
}
