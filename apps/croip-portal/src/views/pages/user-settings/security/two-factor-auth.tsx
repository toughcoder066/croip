'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import { toast } from 'sonner'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type MethodKey = 'email' | 'phone' | 'authenticator'

function EmailLogo({ className = 'size-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32' height='32' rx='8' fill='url(#email-grad)' />
      <path
        d='M7.5 11C7.5 9.89543 8.39543 9 9.5 9H22.5C23.6046 9 24.5 9.89543 24.5 11V21C24.5 22.1046 23.6046 23 22.5 23H9.5C8.39543 23 7.5 22.1046 7.5 21V11Z'
        fill='white'
        fillOpacity='0.18'
      />
      <path
        d='M8 11.5L16 17.5L24 11.5'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect x='8' y='10.5' width='16' height='11' rx='2.5' stroke='white' strokeWidth='2' />
      <defs>
        <linearGradient id='email-grad' x1='0' y1='0' x2='32' y2='32' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#38BDF8' />
          <stop offset='1' stopColor='#2563EB' />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PhoneLogo({ className = 'size-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32' height='32' rx='8' fill='url(#phone-grad)' />
      <path
        d='M21.5 18.2c-.5-.3-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.4.1-.2 0-.3 0-.5-.1-.2-.6-1.5-.9-2-.3-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.6s1 3 1.2 3.2c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.8.7.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.5-.4z'
        fill='white'
      />
      <defs>
        <linearGradient id='phone-grad' x1='0' y1='0' x2='32' y2='32' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#34D399' />
          <stop offset='1' stopColor='#059669' />
        </linearGradient>
      </defs>
    </svg>
  )
}

function AuthenticatorLogo({ className = 'size-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32' height='32' rx='8' fill='#1E293B' />
      <circle cx='16' cy='16' r='9' stroke='#334155' strokeWidth='2.2' />
      <path d='M16 7A9 9 0 0 1 25 16' stroke='#4285F4' strokeWidth='2.2' strokeLinecap='round' />
      <path d='M25 16A9 9 0 0 1 16 25' stroke='#34A853' strokeWidth='2.2' strokeLinecap='round' />
      <path d='M16 25A9 9 0 0 1 7 16' stroke='#FBBC05' strokeWidth='2.2' strokeLinecap='round' />
      <path d='M7 16A9 9 0 0 1 16 7' stroke='#EA4335' strokeWidth='2.2' strokeLinecap='round' />
      <circle cx='16' cy='16' r='3.5' fill='white' />
    </svg>
  )
}

export function TwoFactorAuth() {
  const router = useRouter()
  const [methods, setMethods] = useState<Record<MethodKey, boolean>>({
    email: false,
    phone: false,
    authenticator: false
  })
  const [loadingMethod, setLoadingMethod] = useState<string | null>(null)

  const fetchStatus = () => {
    fetch('/api/user/2fa')
      .then(res => res.json())
      .then(data => {
        if (data.methods) {
          setMethods({
            email: Boolean(data.methods.email),
            phone: Boolean(data.methods.phone),
            authenticator: Boolean(data.methods.authenticator)
          })
        } else if (data.enabled) {
          setMethods(prev => ({ ...prev, email: true }))
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const handleSetUp = async (method: MethodKey) => {
    if (method === 'authenticator') {
      router.push('/pages/auth/two-steps?method=authenticator&returnTo=/settings?setting=security')
      return
    }

    setLoadingMethod(method)
    try {
      const res = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup', method })
      })

      const data = await res.json()

      if (data.success) {
        if (method === 'phone') {
          toast.success('A verification code has been sent via SMS.')
        } else {
          toast.success('A verification code has been sent to your registered email address.')
        }

        router.push(
          `/pages/auth/two-steps?method=${method}&returnTo=${encodeURIComponent(
            '/settings?setting=security'
          )}`
        )
      } else {
        toast.error(data.error || 'Failed to start setup.')
      }
    } catch {
      toast.error('Network error during setup.')
    } finally {
      setLoadingMethod(null)
    }
  }

  const handleReset = async (method: MethodKey) => {
    setLoadingMethod(method)
    try {
      const res = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset', method })
      })

      const data = await res.json()

      if (data.success) {
        setMethods(prev => ({ ...prev, [method]: false }))
        const label =
          method === 'phone' ? 'Phone number' : method === 'authenticator' ? 'Authenticator app' : 'Email'
        toast.success(`${label} verification has been reset.`)
      } else {
        toast.error(data.error || 'Failed to reset method.')
      }
    } catch {
      toast.error('Network error while resetting.')
    } finally {
      setLoadingMethod(null)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
      {/* Left Column Description */}
      <div className='flex flex-col space-y-1'>
        <h3 className='text-base font-semibold'>Two-Factor Authentication</h3>
        <p className='text-muted-foreground text-sm'>
          Add an extra layer of security to prevent unauthorized access to your account.
        </p>
      </div>

      {/* Content Column */}
      <div className='space-y-6 lg:col-span-2'>
        <Card>
          <CardContent>
            {/* 1. Email */}
            <div className='flex items-center justify-between gap-4 max-sm:flex-wrap'>
              <div className='flex items-center gap-4'>
                <EmailLogo className='size-8 shrink-0 rounded-lg shadow-2xs' />
                <p className='text-muted-foreground text-sm'>
                  <span className='font-medium text-sky-600 dark:text-sky-400'>Email</span>{' '}
                  verification codes sent to your registered email address.
                </p>
              </div>

              {methods.email ? (
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground text-sm font-medium'>Connected</span>
                  <Button
                    variant='outline'
                    size='sm'
                    type='button'
                    disabled={loadingMethod === 'email'}
                    onClick={() => handleReset('email')}
                  >
                    Reset
                  </Button>
                </div>
              ) : (
                <Button
                  variant='outline'
                  size='sm'
                  disabled={loadingMethod === 'email'}
                  onClick={() => handleSetUp('email')}
                >
                  {loadingMethod === 'email' ? 'Starting...' : 'Set Up'}
                </Button>
              )}
            </div>

            <Separator className='my-4' />

            {/* 2. Phone Number */}
            <div className='flex items-center justify-between gap-4 max-sm:flex-wrap'>
              <div className='flex items-center gap-4'>
                <PhoneLogo className='size-8 shrink-0 rounded-lg shadow-2xs' />
                <p className='text-muted-foreground text-sm'>
                  <span className='font-medium text-sky-600 dark:text-sky-400'>Phone number</span>{' '}
                  SMS one-time passcodes and mobile voice verification.
                </p>
              </div>

              {methods.phone ? (
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground text-sm font-medium'>Connected</span>
                  <Button
                    variant='outline'
                    size='sm'
                    type='button'
                    disabled={loadingMethod === 'phone'}
                    onClick={() => handleReset('phone')}
                  >
                    Reset
                  </Button>
                </div>
              ) : (
                <Button
                  variant='outline'
                  size='sm'
                  disabled={loadingMethod === 'phone'}
                  onClick={() => handleSetUp('phone')}
                >
                  {loadingMethod === 'phone' ? 'Starting...' : 'Set Up'}
                </Button>
              )}
            </div>

            <Separator className='my-4' />

            {/* 3. Authenticator App */}
            <div className='flex items-center justify-between gap-4 max-sm:flex-wrap'>
              <div className='flex items-center gap-4'>
                <AuthenticatorLogo className='size-8 shrink-0 rounded-lg shadow-2xs' />
                <p className='text-muted-foreground text-sm'>
                  <span className='font-medium text-sky-600 dark:text-sky-400'>Authenticator app</span>{' '}
                  time-based passcodes via Google Authenticator or 1Password.
                </p>
              </div>

              {methods.authenticator ? (
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground text-sm font-medium'>Connected</span>
                  <Button
                    variant='outline'
                    size='sm'
                    type='button'
                    disabled={loadingMethod === 'authenticator'}
                    onClick={() => handleReset('authenticator')}
                  >
                    Reset
                  </Button>
                </div>
              ) : (
                <Button
                  variant='outline'
                  size='sm'
                  disabled={loadingMethod === 'authenticator'}
                  onClick={() => handleSetUp('authenticator')}
                >
                  {loadingMethod === 'authenticator' ? 'Starting...' : 'Set Up'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TwoFactorAuth
