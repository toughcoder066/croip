'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Third-party Imports
import { CopyIcon, MailIcon, ShieldCheckIcon, SmartphoneIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const TwoStepsForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const method = (searchParams.get('method') || 'email') as 'email' | 'phone' | 'authenticator'
  const returnTo = searchParams.get('returnTo') || '/settings?setting=security'

  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [authDetails, setAuthDetails] = useState<{ qrCodeUrl?: string; secret?: string } | null>(null)

  useEffect(() => {
    if (method === 'authenticator') {
      fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup', method: 'authenticator' })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setAuthDetails({ qrCodeUrl: data.qrCodeUrl, secret: data.secret })
          }
        })
        .catch(() => {})
    }
  }, [method])

  const copySecret = () => {
    if (authDetails?.secret) {
      navigator.clipboard?.writeText(authDetails.secret)
      toast.success('Setup key copied to clipboard.')
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      const res = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup', method, force: method === 'authenticator' })
      })
      const data = await res.json()
      if (data.success) {
        if (method === 'authenticator') {
          setAuthDetails({ qrCodeUrl: data.qrCodeUrl, secret: data.secret })
          toast.success('Generated a new Authenticator QR code and setup key.')
        } else {
          toast.success(
            method === 'phone'
              ? 'A new verification code has been sent via SMS.'
              : 'A new verification code has been sent to your email.'
          )
        }
      } else {
        toast.error(data.error || 'Failed to resend code.')
      }
    } catch {
      toast.error('Network error resending code.')
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (code.length !== 6) {
      toast.error('Please enter the complete 6-digit code')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          code,
          method,
          secret: authDetails?.secret
        })
      })

      const data = await res.json()

      if (data.success) {
        const label =
          method === 'phone' ? 'Phone number' : method === 'authenticator' ? 'Authenticator app' : 'Email'
        toast.success(`${label} verification has been successfully activated.`)
        router.push(returnTo)
      } else {
        toast.error(data.error || 'Invalid verification code. Please try again.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className='gap-5'>
        {/* Method-specific notification banner */}
        {method === 'authenticator' ? (
          <div className='space-y-4'>
            <div className='bg-primary/5 border-primary/20 text-foreground flex items-center gap-3 rounded-lg border p-3 text-xs'>
              <ShieldCheckIcon className='text-primary size-4 shrink-0' />
              <span>Scan this QR code with Google Authenticator or 1Password, then enter the code below.</span>
            </div>

            {authDetails?.qrCodeUrl && (
              <div className='flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted/20 p-4'>
                <img
                  src={authDetails.qrCodeUrl}
                  alt='Authenticator QR Code'
                  className='size-44 rounded-lg border bg-white p-2 shadow-xs'
                />
                {authDetails.secret && (
                  <button
                    type='button'
                    onClick={copySecret}
                    className='text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs font-mono transition-colors'
                  >
                    <span>Key: {authDetails.secret}</span>
                    <CopyIcon className='size-3' />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : method === 'phone' ? (
          <div className='bg-primary/5 border-primary/20 text-foreground flex items-center gap-3 rounded-lg border p-3 text-xs'>
            <SmartphoneIcon className='text-primary size-4 shrink-0' />
            <span>A 6-digit verification code has been sent via SMS to your registered mobile number.</span>
          </div>
        ) : (
          <div className='bg-primary/5 border-primary/20 text-foreground flex items-center gap-3 rounded-lg border p-3 text-xs'>
            <MailIcon className='text-primary size-4 shrink-0' />
            <span>A 6-digit verification code has been sent to your account email address.</span>
          </div>
        )}

        <Field className='gap-4'>
          <div className='flex items-center justify-between gap-1'>
            <FieldLabel htmlFor='recoveryCode' className='text-base'>
              Code*
            </FieldLabel>
            <Link href={returnTo} className='text-sm font-medium text-muted-foreground hover:text-foreground'>
              Cancel
            </Link>
          </div>

          <InputOTP
            id='recoveryCode'
            maxLength={6}
            value={code}
            onChange={val => {
              setCode(val)
              if (val.length === 6) {
                setTimeout(() => {
                  const form = document.querySelector('form')
                  form?.requestSubmit()
                }, 100)
              }
            }}
            autoFocus
          >
            <InputOTPGroup className='w-full justify-center gap-4 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border'>
              <InputOTPSlot index={0} className='input-size-lg' />
              <InputOTPSlot index={1} className='input-size-lg' />
              <InputOTPSlot index={2} className='input-size-lg' />
              <InputOTPSlot index={3} className='input-size-lg' />
              <InputOTPSlot index={4} className='input-size-lg' />
              <InputOTPSlot index={5} className='input-size-lg' />
            </InputOTPGroup>
          </InputOTP>
        </Field>

        <Field>
          <Button size='lg' className='w-full' type='submit' disabled={isSubmitting || code.length !== 6}>
            {isSubmitting ? 'Verifying...' : 'Verify Code'}
          </Button>
        </Field>

        {/* Resend / Regenerate action */}
        {method === 'authenticator' ? (
          <div className='flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground'>
            <span>Trouble scanning?</span>
            <button
              type='button'
              disabled={isResending}
              onClick={handleResend}
              className='font-medium text-primary hover:underline disabled:opacity-50 cursor-pointer'
            >
              {isResending ? 'Generating...' : 'Generate New QR Code'}
            </button>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground'>
            <span>Didn&apos;t receive the code?</span>
            <button
              type='button'
              disabled={isResending}
              onClick={handleResend}
              className='font-medium text-primary hover:underline disabled:opacity-50 cursor-pointer'
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </div>
        )}
      </FieldGroup>
    </form>
  )
}

export default TwoStepsForm
