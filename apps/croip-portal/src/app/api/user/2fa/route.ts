import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { emailService } from '@/lib/email-service'
import { generateBase32Secret, generateBackupCodes, verifyTotp } from '@/lib/totp'

export type TwoFactorMethodType = 'email' | 'phone' | 'authenticator'

interface PendingOtp {
  code: string
  secret?: string
  method: TwoFactorMethodType
  expiresAt: number
}

// Global in-memory map keyed by user + method
const pendingOtps = new Map<string, PendingOtp>()

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')
    let user = {
      email: 'superuser@croip.com',
      phone: '+233 20 000 0000',
      twoFactorEnabled: false,
      twoFactorMethods: {
        email: false,
        phone: false,
        authenticator: false
      } as Record<TwoFactorMethodType, boolean>
    }

    if (sessionCookie?.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value)
        user = { ...user, ...parsed }
        if (!user.twoFactorMethods) {
          user.twoFactorMethods = {
            email: Boolean(user.twoFactorEnabled),
            phone: false,
            authenticator: false
          }
        }
      } catch {
        // fallback
      }
    }

    return NextResponse.json({
      enabled: Boolean(user.twoFactorEnabled),
      methods: user.twoFactorMethods,
      email: user.email,
      phone: user.phone
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve 2FA status' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body
    const method: TwoFactorMethodType =
      body.method === 'phone' ? 'phone' : body.method === 'authenticator' ? 'authenticator' : 'email'

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    let user = {
      email: 'superuser@croip.com',
      fullName: 'CROIP Super Administrator',
      phone: '+233 20 000 0000',
      twoFactorEnabled: false,
      twoFactorMethods: {
        email: false,
        phone: false,
        authenticator: false
      } as Record<TwoFactorMethodType, boolean>
    }

    if (sessionCookie?.value) {
      try {
        user = { ...user, ...JSON.parse(sessionCookie.value) }
        if (!user.twoFactorMethods) {
          user.twoFactorMethods = {
            email: Boolean(user.twoFactorEnabled),
            phone: false,
            authenticator: false
          }
        }
      } catch {
        // fallback
      }
    }

    const otpKey = `${user.email.toLowerCase()}:${method}`

    // 1. SETUP ACTION
    if (action === 'setup') {
      if (method === 'authenticator') {
        // Reuse existing unexpired pending secret if already generated and of proper 32-char standard length
        let pending = pendingOtps.get(otpKey)
        let secret = pending?.secret
        if (!secret || !pending || Date.now() > pending.expiresAt || secret.length !== 32 || body.force) {
          secret = generateBase32Secret(20) // generates 20 bytes = 32 Base32 characters
          pending = {
            code: '',
            secret,
            method: 'authenticator',
            expiresAt: Date.now() + 15 * 60 * 1000 // 15 mins
          }
          pendingOtps.set(otpKey, pending)
        }

        const otpauthUri = `otpauth://totp/CROIP:${encodeURIComponent(user.email)}?secret=${secret}&issuer=CROIP&algorithm=SHA1&digits=6&period=30`
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(otpauthUri)}`

        return NextResponse.json({
          success: true,
          method: 'authenticator',
          secret,
          qrCodeUrl,
          message: 'Scan the QR code with your authenticator app.'
        })
      } else if (method === 'phone') {
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        pendingOtps.set(otpKey, {
          code,
          method: 'phone',
          expiresAt: Date.now() + 10 * 60 * 1000 // 10 mins
        })

        console.info(`[SMS Dispatch] Verification code ${code} sent to ${user.phone}`)

        return NextResponse.json({
          success: true,
          method: 'phone',
          phone: user.phone,
          message: `Verification code sent via SMS to ${user.phone}.`
        })
      } else {
        // Email OTP
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        pendingOtps.set(otpKey, {
          code,
          method: 'email',
          expiresAt: Date.now() + 10 * 60 * 1000 // 10 mins
        })

        await emailService.sendTwoFactorOtp({
          to: user.email,
          userName: user.fullName,
          code
        })

        return NextResponse.json({
          success: true,
          method: 'email',
          email: user.email,
          message: `Verification code sent to ${user.email}.`
        })
      }
    }

    // 2. VERIFY ACTION
    if (action === 'verify') {
      const inputCode = String(body.code || '').trim()
      const pending = pendingOtps.get(otpKey)

      if (!inputCode) {
        return NextResponse.json({ error: 'Please enter the 6-digit code' }, { status: 400 })
      }

      let isValid = false

      if (method === 'authenticator') {
        const secretToTest = body.secret || pending?.secret
        if (secretToTest && verifyTotp(inputCode, secretToTest)) {
          isValid = true
        } else if (pending?.secret && verifyTotp(inputCode, pending.secret)) {
          isValid = true
        }
        console.info('[2FA Authenticator Verify]', {
          inputCode,
          secretLength: secretToTest?.length,
          hasBodySecret: Boolean(body.secret),
          hasPendingSecret: Boolean(pending?.secret),
          isValid
        })
      } else if (pending && Date.now() < pending.expiresAt) {
        if (pending.method === 'email' || pending.method === 'phone') {
          isValid = pending.code === inputCode
        }
      }

      // Allow master developer code in local dev environment
      if (!isValid && process.env.NODE_ENV !== 'production' && inputCode === '123456') {
        isValid = true
      }

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid or expired verification code. Please check and try again.' },
          { status: 400 }
        )
      }

      // Clean pending state for this method
      pendingOtps.delete(otpKey)

      const backupCodes = generateBackupCodes(6)

      const updatedMethods = {
        ...user.twoFactorMethods,
        [method]: true
      }

      const updatedUser = {
        ...user,
        twoFactorEnabled: true,
        twoFactorMethods: updatedMethods,
        twoFactorBackupCodes: backupCodes
      }

      cookieStore.set('croip_session', JSON.stringify(updatedUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })

      return NextResponse.json({
        success: true,
        method,
        methods: updatedMethods,
        message: 'Two-factor authentication method successfully activated!',
        backupCodes
      })
    }

    // 3. RESET ACTION (Individual method reset)
    if (action === 'reset' || action === 'disable') {
      const updatedMethods = {
        ...user.twoFactorMethods,
        [method]: false
      }

      const anyActive = Object.values(updatedMethods).some(Boolean)

      const updatedUser = {
        ...user,
        twoFactorEnabled: anyActive,
        twoFactorMethods: updatedMethods
      }

      cookieStore.set('croip_session', JSON.stringify(updatedUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })

      return NextResponse.json({
        success: true,
        method,
        methods: updatedMethods,
        message: 'Two-factor method has been reset.'
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('2FA error:', error)
    return NextResponse.json({ error: 'Failed to process 2FA request' }, { status: 500 })
  }
}
