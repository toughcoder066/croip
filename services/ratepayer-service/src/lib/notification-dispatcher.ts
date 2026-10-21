/**
 * Notification & OTP Dispatcher for Ratepayer Core Service.
 *
 * Dispatches one-time verification codes (OTPs):
 * - Email channel: Dispatched directly to local/dev Mailpit container (viewable at http://localhost:8025)
 * - SMS channel: Stubbed for upcoming Arkasel integration (Akasel SMS/OTP gateway).
 */

export interface DispatchOtpInput {
  destination: string;
  channel: 'EMAIL' | 'SMS';
  code: string;
  ratepayerName?: string | undefined;
  purpose?: string | undefined;
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

/**
 * Dispatches an email OTP to the Mailpit SMTP/REST relay.
 */
async function sendEmailOtpViaMailpit(
  to: string,
  code: string,
  ratepayerName?: string | undefined,
  purpose: string = 'Registration',
  log?: DispatchOtpInput['log'] | undefined
): Promise<{ success: boolean; messageId?: string | undefined; error?: string | undefined }> {
  const mailpitUrls = [
    process.env.MAILPIT_API_URL,
    'http://mailpit:8025',
    'http://localhost:8025'
  ].filter(Boolean) as string[];

  const subject = `Your CROIP Ratepayer Verification Code: ${code}`;
  const displayName = ratepayerName || to.split('@')[0];

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CROIP Ratepayer Verification</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 24px; text-align: center; color: #ffffff; }
    .logo { font-size: 18px; font-weight: 800; letter-spacing: 1px; color: #38bdf8; }
    .sub { font-size: 12px; color: #94a3b8; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
    .lead { font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
    .otp-box { text-align: center; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 10px; padding: 20px; margin: 20px 0; }
    .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0f172a; margin: 0; }
    .otp-expiry { font-size: 11px; color: #64748b; margin-top: 8px; font-weight: 500; }
    .footer { padding: 18px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; line-height: 1.5; }
    .highlight { color: #0284c7; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">CROIP GHANA</div>
      <div class="sub">Central Revenue Oversight & Integration Platform</div>
    </div>
    <div class="content">
      <div class="greeting">Hello, ${displayName}</div>
      <div class="lead">
        Thank you for accessing the <strong>CROIP Citizen & Ratepayer Portal</strong>.
        Please use the following One-Time Password (OTP) to complete your <strong>${purpose}</strong>:
      </div>
      <div class="otp-box">
        <div class="otp-code">${code}</div>
        <div class="otp-expiry">Valid for 5 minutes. Do not share this code with anyone.</div>
      </div>
      <div class="lead" style="font-size: 12px; color: #64748b;">
        If you did not initiate this request, you can safely ignore this email.
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
CROIP GHANA - Ratepayer Verification
====================================
Hello ${displayName},

Your One-Time Password (OTP) for ${purpose} is:

    ${code}

This code is valid for 5 minutes. Do not share this code with anyone.
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
          From: { Email: 'noreply@croip.gov.gh', Name: 'CROIP Ghana Ratepayer Portal' },
          To: [{ Email: to, Name: displayName }],
          Subject: subject,
          Text: text,
          HTML: html
        })
      });

      if (res.ok) {
        const body: any = await res.json().catch(() => ({}));
        log?.info({ to, subject, provider: 'mailpit', messageId: body.ID, url }, `[Mailpit] OTP email dispatched to ${to}`);
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
  log?: DispatchOtpInput['log'] | undefined
): Promise<{ success: boolean; messageId?: string | undefined }> {
  // Arkasel API Integration Placeholder
  // When Arkasel credentials (API key, sender ID) are provided:
  // POST https://sms.arkasel.com/api/v2/sms/send
  // Headers: { 'api-key': process.env.ARKASEL_API_KEY }
  // Body: { sender: 'CROIP', recipients: [phone], message: `Your CROIP OTP is ${code}. Valid for 5 mins.` }

  log?.info(
    { phone, purpose, code, provider: 'arkasel_stub' },
    `[Arkasel SMS Stub] OTP ${code} generated for ${phone} (${purpose}) - Arkasel gateway to be wired up.`
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
