/**
 * CROIP Email Service
 * Supports:
 * 1. 'local' -> Sends to local Mailpit container (port 8025 / 1025) viewable at http://localhost:8025
 * 2. 'arkesel' -> Sends to Akasel (Arkesel Ghana) transactional communications API
 */

export interface SendEmailOptions {
  to: string
  toName?: string
  subject: string
  html: string
  text?: string
}

export interface SendTwoFactorOtpOptions {
  to: string
  userName?: string
  code: string
}

export const emailService = {
  async sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const provider = process.env.EMAIL_PROVIDER || 'local'
    const fromEmail = process.env.ARKESEL_EMAIL_FROM || 'no-reply@croip.gov.gh'
    const fromName = 'CROIP Central Platform'

    // 1. Akasel (Arkesel Ghana) Production Provider
    if (provider === 'arkesel' && process.env.ARKESEL_API_KEY) {
      try {
        const res = await fetch(`${process.env.ARKESEL_BASE_URL || 'https://sms.arkesel.com/api/v2'}/email/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.ARKESEL_API_KEY
          },
          body: JSON.stringify({
            sender: fromEmail,
            sender_name: fromName,
            recipient: options.to,
            subject: options.subject,
            content: options.html
          })
        })

        if (!res.ok) {
          const errText = await res.text()
          console.warn('[Arkesel Email API Warning]:', errText)
          // Fall back gracefully
        } else {
          const data = await res.json()
          return { success: true, messageId: data.id || 'arkesel-sent' }
        }
      } catch (err) {
        console.error('[Arkesel Email Dispatch Failed]:', err)
      }
    }

    // 2. Local Development Provider (Mailpit Container on localhost:8025)
    try {
      const mailpitUrl = process.env.MAILPIT_API_URL || 'http://localhost:8025'
      const res = await fetch(`${mailpitUrl}/api/v1/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          From: { Email: fromEmail, Name: fromName },
          To: [{ Email: options.to, Name: options.toName || options.to }],
          Subject: options.subject,
          HTML: options.html,
          Text: options.text || options.subject
        })
      })

      if (res.ok) {
        const result = await res.json()
        console.info(`[Email Service - Local Mailpit] Sent to ${options.to} (View at http://localhost:8025)`)
        return { success: true, messageId: result.ID }
      }
    } catch (mailpitErr) {
      console.warn('[Mailpit dispatch failed, falling back to console log]:', mailpitErr)
    }

    // 3. Fallback Console Logger (Guaranteed delivery visibility)
    console.info('================ [CROIP EMAIL DISPATCH] ================')
    console.info(`To: ${options.to}`)
    console.info(`Subject: ${options.subject}`)
    console.info(`Body: ${options.text || options.html}`)
    console.info('========================================================')

    return { success: true, messageId: 'console-log-fallback' }
  },

  async sendTwoFactorOtp(options: SendTwoFactorOtpOptions) {
    const subject = 'Your CROIP Two-Factor Verification Code'
    const digits = (options.code || '000000').split('')

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06); overflow: hidden;">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding: 28px 32px 20px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <div style="display: inline-flex; align-items: center; gap: 10px;">
                      <!-- CROIP Geometric Mark -->
                      <svg width="32" height="32" viewBox="0 0 328 329" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle;">
                        <rect y="0.5" width="328" height="328" rx="164" fill="#0f172a" />
                        <path d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288" stroke="#ffffff" stroke-width="20" />
                        <path d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771" stroke="#ffffff" stroke-width="20" />
                        <line x1="238.136" y1="98.8184" x2="196.76" y2="139.707" stroke="#ffffff" stroke-width="20" />
                        <line x1="135.688" y1="200.957" x2="94.3128" y2="241.845" stroke="#ffffff" stroke-width="20" />
                        <line x1="133.689" y1="137.524" x2="92.5566" y2="96.3914" stroke="#ffffff" stroke-width="20" />
                        <line x1="237.679" y1="241.803" x2="196.547" y2="200.671" stroke="#ffffff" stroke-width="20" />
                      </svg>
                      <span style="font-size: 17px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em; vertical-align: middle; margin-left: 8px;">
                        CROIP
                      </span>
                      <span style="display: inline-block; background-color: #f1f5f9; color: #475569; font-size: 11px; font-weight: 500; padding: 2px 7px; border-radius: 6px; border: 1px solid #e2e8f0; margin-left: 6px; vertical-align: middle;">
                        Security
                      </span>
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">
                      Ghana Revenue Platform
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card Content Body -->
          <tr>
            <td style="padding: 32px 32px 28px;">
              <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em;">
                Two-Step Verification
              </h1>
              <p style="margin: 0 0 24px; font-size: 13.5px; line-height: 22px; color: #64748b;">
                Hello <strong>${options.userName || 'Administrator'}</strong>,<br/>
                Please use the following 6-digit one-time code to confirm your identity and complete your two-factor security configuration:
              </p>

              <!-- OTP Digits Box Grid (Matching InputOTP UI) -->
              <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin: 28px auto;">
                <tr>
                  ${digits
                    .map(
                      d => `
                    <td style="padding: 0 4px;">
                      <div style="width: 44px; height: 50px; background-color: #f8fafc; border: 1.5px solid #0f172a; border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 26px; font-weight: 700; line-height: 50px; text-align: center; color: #0f172a; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                        ${d}
                      </div>
                    </td>
                  `
                    )
                    .join('')}
                </tr>
              </table>

              <!-- Security Notice Banner -->
              <div style="margin: 28px 0 20px; padding: 14px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12.5px; line-height: 19px; color: #475569;">
                <div style="font-weight: 600; color: #0f172a; margin-bottom: 2px;">
                  Security Notice
                </div>
                This verification code will expire in <strong>10 minutes</strong>. Never share this code with anyone. Platform support will never request your code.
              </div>

              <!-- Context Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 12px;">
                <tr>
                  <td style="padding: 4px 0; color: #94a3b8;">Target Account</td>
                  <td align="right" style="padding: 4px 0; color: #0f172a; font-weight: 500;">${options.to}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #94a3b8;">Verification Method</td>
                  <td align="right" style="padding: 4px 0; color: #0f172a; font-weight: 500;">Email Security Passcode</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px 24px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 11.5px; font-weight: 600; color: #475569;">
                Central Revenue Operations & Integrity Platform (CROIP)
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Republic of Ghana &bull; Ministry of Finance &bull; Automated Security Transmission
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    return this.sendEmail({
      to: options.to,
      toName: options.userName,
      subject,
      html,
      text: `Your CROIP Two-Factor Verification Code is: ${options.code}. This code expires in 10 minutes.`
    })
  }
}
