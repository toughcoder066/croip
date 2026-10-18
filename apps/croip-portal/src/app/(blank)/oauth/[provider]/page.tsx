'use client'

// React Imports
import { use, useState } from 'react'

// Next Imports
import { useSearchParams } from 'next/navigation'

// Third-party Imports
import { ArrowLeftIcon, CheckIcon, KeyRoundIcon, ShieldCheckIcon, UserPlusIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PageProps {
  params: Promise<{ provider: string }>
}

export default function OAuthScreen({ params }: PageProps) {
  const resolvedParams = use(params)
  const provider = resolvedParams.provider?.toLowerCase() || 'google'
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') || '/profile?view=connections'

  const [selectedAccount, setSelectedAccount] = useState<string>('')
  const [customEmail, setCustomEmail] = useState('')
  const [isUsingCustom, setIsUsingCustom] = useState(false)
  const [showLiveSetup, setShowLiveSetup] = useState(false)
  const [liveClientId, setLiveClientId] = useState('')
  const [liveClientSecret, setLiveClientSecret] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const handleSaveLiveOAuth = async (targetProvider: string) => {
    if (!liveClientId.trim()) return
    setIsSubmitting(true)
    setStatusMessage('Saving credentials & redirecting...')

    try {
      await fetch('/api/auth/oauth/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: targetProvider,
          clientId: liveClientId.trim(),
          clientSecret: liveClientSecret.trim()
        })
      })

      window.location.href = `/api/auth/oauth/${targetProvider}/login`
    } catch {
      setIsSubmitting(false)
      setStatusMessage('Failed to save credentials.')
    }
  }

  const handleAuthorize = async (emailToUse: string) => {
    setIsSubmitting(true)
    setStatusMessage('Authenticating identity...')

    try {
      const res = await fetch('/api/user/social-connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          action: 'connect',
          email: emailToUse
        })
      })

      const data = await res.json()

      if (data.success) {
        setStatusMessage('Authorized! Returning to CROIP...')

        setTimeout(() => {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(
              {
                type: 'OAUTH_SUCCESS',
                provider,
                providerName:
                  provider === 'google'
                    ? 'Google'
                    : provider === 'microsoft'
                      ? 'Microsoft 365'
                      : provider === 'github'
                        ? 'GitHub'
                        : 'Apple',
                email: emailToUse
              },
              '*'
            )
            window.close()
          } else {
            window.location.href = returnTo
          }
        }, 600)
      } else {
        setIsSubmitting(false)
        setStatusMessage('Authorization failed. Please try again.')
      }
    } catch {
      setIsSubmitting(false)
      setStatusMessage('Network error during authorization.')
    }
  }

  const handleCancel = () => {
    if (window.opener && !window.opener.closed) {
      window.close()
    } else {
      window.location.href = returnTo
    }
  }

  // ==========================================
  // GOOGLE OAUTH STATE & WORKFLOW
  // ==========================================
  const [googleStep, setGoogleStep] = useState<'select' | 'enter_email' | 'enter_password' | 'consent'>('select')
  const [googleAccount, setGoogleAccount] = useState<{ name: string; email: string; initials: string; color: string }>({
    name: 'Nana Kofi Djan',
    email: 'realkofi.d@gmail.com',
    initials: 'NK',
    color: '#0B57D0'
  })
  const [googlePassword, setGooglePassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const handleSelectGoogleAccount = (acc: { name: string; email: string; initials: string; color: string }) => {
    setGoogleAccount(acc)
    setPasswordError('')
    setGooglePassword('')
    setGoogleStep('enter_password')
  }

  const handleGoogleEmailNext = () => {
    if (!customEmail.trim() || !customEmail.includes('@')) {
      return
    }
    const cleanEmail = customEmail.trim()
    const namePart = cleanEmail.split('@')[0]
    const initials = namePart.substring(0, 2).toUpperCase()
    setGoogleAccount({
      name: namePart,
      email: cleanEmail,
      initials,
      color: '#0B57D0'
    })
    setPasswordError('')
    setGooglePassword('')
    setGoogleStep('enter_password')
  }

  const handleGooglePasswordNext = () => {
    if (!googlePassword.trim()) {
      setPasswordError('Enter your password')
      return
    }
    setPasswordError('')
    setGoogleStep('consent')
  }

  // ==========================================
  // 1. GOOGLE OAUTH CONSENT SCREEN
  // ==========================================
  if (provider === 'google') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#F0F4F9] dark:bg-[#1E1F20] p-4 font-sans text-[#1F1F1F] dark:text-[#E3E3E3]'>
        <div className='w-full max-w-[460px] rounded-[28px] bg-white dark:bg-[#131314] p-8 shadow-sm border border-[#E0E2E6] dark:border-[#333538] transition-all'>
          {/* Google Logo */}
          <div className='mb-4 flex items-center justify-between'>
            <svg className='size-8' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z'
              />
              <path
                fill='#34A853'
                d='M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z'
              />
              <path
                fill='#FBBC05'
                d='M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z'
              />
              <path
                fill='#EA4335'
                d='M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z'
              />
            </svg>

            {googleStep !== 'select' && (
              <button
                type='button'
                onClick={() => setGoogleStep('select')}
                className='text-xs text-[#0B57D0] dark:text-[#7Cacf8] hover:underline flex items-center gap-1 cursor-pointer'
              >
                <ArrowLeftIcon className='size-3.5' /> Switch account
              </button>
            )}
          </div>

          {isSubmitting ? (
            <div className='py-12 text-center space-y-4'>
              <div className='size-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto' />
              <div className='space-y-1'>
                <p className='text-sm font-medium text-foreground'>{statusMessage}</p>
                <p className='text-xs text-muted-foreground'>Connecting to CROIP Central Platform...</p>
              </div>
            </div>
          ) : googleStep === 'select' ? (
            /* STEP 1: ACCOUNT PICKER */
            <>
              <h1 className='text-2xl font-normal tracking-tight mb-2'>Sign in with Google</h1>
              <p className='text-sm text-[#444746] dark:text-[#C4C7C5] mb-6'>
                Choose an account to continue to <span className='font-medium text-[#1F1F1F] dark:text-white'>CROIP Central Platform</span>
              </p>

              <div className='divide-y divide-[#E0E2E6] dark:divide-[#333538] border-y border-[#E0E2E6] dark:border-[#333538] -mx-8 px-8'>
                {/* Account 1 */}
                <button
                  type='button'
                  onClick={() =>
                    handleSelectGoogleAccount({
                      name: 'Nana Kofi Djan',
                      email: 'realkofi.d@gmail.com',
                      initials: 'NK',
                      color: '#0B57D0'
                    })
                  }
                  className='w-full flex items-center gap-3.5 py-3.5 text-left hover:bg-[#F8FAFD] dark:hover:bg-[#1E1F20] transition-colors -mx-4 px-4 rounded-xl cursor-pointer group'
                >
                  <div className='size-10 rounded-full bg-[#0B57D0] text-white flex items-center justify-center text-sm font-medium shadow-xs'>
                    NK
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium text-foreground group-hover:text-[#0B57D0] transition-colors'>
                      Nana Kofi Djan
                    </p>
                    <p className='text-xs text-[#444746] dark:text-[#C4C7C5] font-mono truncate'>realkofi.d@gmail.com</p>
                  </div>
                </button>

                {/* Account 2 */}
                <button
                  type='button'
                  onClick={() =>
                    handleSelectGoogleAccount({
                      name: 'CROIP Super Administrator',
                      email: 'superuser@croip.com',
                      initials: 'SA',
                      color: '#059669'
                    })
                  }
                  className='w-full flex items-center gap-3.5 py-3.5 text-left hover:bg-[#F8FAFD] dark:hover:bg-[#1E1F20] transition-colors -mx-4 px-4 rounded-xl cursor-pointer group'
                >
                  <div className='size-10 rounded-full bg-[#059669] text-white flex items-center justify-center text-sm font-medium shadow-xs'>
                    SA
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium text-foreground group-hover:text-[#059669] transition-colors'>
                      CROIP Super Administrator
                    </p>
                    <p className='text-xs text-[#444746] dark:text-[#C4C7C5] font-mono truncate'>superuser@croip.com</p>
                  </div>
                </button>

                {/* Use Another Account */}
                <button
                  type='button'
                  onClick={() => setGoogleStep('enter_email')}
                  className='w-full flex items-center gap-3.5 py-3.5 text-left hover:bg-[#F8FAFD] dark:hover:bg-[#1E1F20] transition-colors -mx-4 px-4 rounded-xl cursor-pointer text-[#0B57D0] dark:text-[#7Cacf8]'
                >
                  <div className='size-10 rounded-full border border-current flex items-center justify-center'>
                    <UserPlusIcon className='size-4.5' />
                  </div>
                  <span className='text-sm font-medium'>Use another account</span>
                </button>
              </div>

              {/* Optional Live Google Cloud Client ID Input */}
              <div className='mt-5 pt-4 border-t border-[#E0E2E6] dark:border-[#333538]'>
                {showLiveSetup ? (
                  <div className='rounded-xl border bg-muted/20 p-3.5 space-y-3 text-xs'>
                    <p className='font-semibold text-foreground text-xs'>Configure Google Cloud Live OAuth (accounts.google.com)</p>
                    <div className='space-y-1'>
                      <label className='font-medium text-muted-foreground'>Google OAuth Client ID</label>
                      <Input
                        value={liveClientId}
                        onChange={e => setLiveClientId(e.target.value)}
                        placeholder='your-client-id.apps.googleusercontent.com'
                        className='h-8 text-xs font-mono'
                      />
                    </div>
                    <div className='space-y-1'>
                      <label className='font-medium text-muted-foreground'>Google OAuth Client Secret</label>
                      <Input
                        type='password'
                        value={liveClientSecret}
                        onChange={e => setLiveClientSecret(e.target.value)}
                        placeholder='GOCSPX-...'
                        className='h-8 text-xs font-mono'
                      />
                    </div>
                    <div className='flex gap-2 justify-end pt-1'>
                      <Button variant='ghost' size='sm' className='h-8 text-xs' onClick={() => setShowLiveSetup(false)}>
                        Cancel
                      </Button>
                      <Button
                        size='sm'
                        className='h-8 text-xs bg-[#0B57D0] text-white hover:bg-[#0842A0]'
                        disabled={!liveClientId.trim()}
                        onClick={() => handleSaveLiveOAuth('google')}
                      >
                        Save & Open accounts.google.com
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <span>Have a Google Cloud Client ID?</span>
                    <button
                      type='button'
                      onClick={() => setShowLiveSetup(true)}
                      className='text-[#0B57D0] dark:text-[#7Cacf8] font-medium hover:underline cursor-pointer'
                    >
                      Connect live accounts.google.com
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : googleStep === 'enter_email' ? (
            /* STEP 2: ENTER EMAIL */
            <div className='space-y-4'>
              <h1 className='text-2xl font-normal tracking-tight'>Sign in</h1>
              <p className='text-sm text-[#444746] dark:text-[#C4C7C5]'>to continue to CROIP Central Platform</p>

              <div className='space-y-1.5 pt-2'>
                <label className='text-xs font-medium text-foreground'>Email or phone</label>
                <Input
                  value={customEmail}
                  onChange={e => setCustomEmail(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleGoogleEmailNext()
                  }}
                  placeholder='name@gmail.com'
                  className='h-12 rounded-xl text-base'
                  autoFocus
                />
              </div>

              <div className='text-xs'>
                <a href='#' className='text-[#0B57D0] dark:text-[#7Cacf8] font-medium hover:underline'>
                  Forgot email?
                </a>
              </div>

              <p className='text-xs text-muted-foreground pt-1'>
                Not your computer? Use Guest mode to sign in privately.
              </p>

              <div className='flex items-center justify-between pt-6'>
                <Button variant='ghost' size='sm' onClick={() => setGoogleStep('select')}>
                  Back
                </Button>
                <Button
                  className='rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white px-7 h-10 font-medium'
                  disabled={!customEmail.trim() || !customEmail.includes('@')}
                  onClick={handleGoogleEmailNext}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : googleStep === 'enter_password' ? (
            /* STEP 3: ENTER PASSWORD */
            <div className='space-y-5'>
              {/* Selected Account Pill */}
              <button
                type='button'
                onClick={() => setGoogleStep('select')}
                className='inline-flex items-center gap-2 rounded-full border border-[#E0E2E6] dark:border-[#333538] px-3 py-1 text-xs hover:bg-muted/30 transition-colors cursor-pointer'
              >
                <div
                  className='size-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold'
                  style={{ backgroundColor: googleAccount.color }}
                >
                  {googleAccount.initials}
                </div>
                <span className='font-medium text-foreground'>{googleAccount.email}</span>
                <ArrowLeftIcon className='size-3 text-muted-foreground rotate-270' />
              </button>

              <div>
                <h1 className='text-2xl font-normal tracking-tight'>Welcome</h1>
                <p className='text-sm text-[#444746] dark:text-[#C4C7C5] mt-1'>
                  To continue, first verify it's you
                </p>
              </div>

              <div className='space-y-2 pt-1'>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={googlePassword}
                    onChange={e => {
                      setGooglePassword(e.target.value)
                      if (passwordError) setPasswordError('')
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleGooglePasswordNext()
                    }}
                    placeholder='Enter your password'
                    className={`h-12 rounded-xl text-base pr-10 ${passwordError ? 'border-destructive ring-1 ring-destructive' : ''}`}
                    autoFocus
                  />
                </div>
                {passwordError && (
                  <p className='text-xs text-destructive font-medium'>{passwordError}</p>
                )}

                <div className='flex items-center gap-2 pt-1'>
                  <input
                    type='checkbox'
                    id='showPwd'
                    checked={showPassword}
                    onChange={e => setShowPassword(e.target.checked)}
                    className='size-4 rounded accent-[#0B57D0] cursor-pointer'
                  />
                  <label htmlFor='showPwd' className='text-xs text-foreground cursor-pointer select-none'>
                    Show password
                  </label>
                </div>
              </div>

              <div className='flex items-center justify-between pt-4'>
                <button
                  type='button'
                  onClick={() => {
                    // Quick-pass option for developer test
                    setGooglePassword('••••••••')
                    handleGooglePasswordNext()
                  }}
                  className='text-xs text-[#0B57D0] dark:text-[#7Cacf8] hover:underline cursor-pointer'
                >
                  Forgot password?
                </button>
                <Button
                  className='rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white px-7 h-10 font-medium'
                  onClick={handleGooglePasswordNext}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            /* STEP 4: GOOGLE OAUTH CONSENT / PERMISSIONS */
            <div className='space-y-5'>
              {/* Account Pill */}
              <div className='inline-flex items-center gap-2 rounded-full border border-[#E0E2E6] dark:border-[#333538] px-3 py-1 text-xs'>
                <div
                  className='size-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold'
                  style={{ backgroundColor: googleAccount.color }}
                >
                  {googleAccount.initials}
                </div>
                <span className='font-medium text-foreground'>{googleAccount.email}</span>
              </div>

              <div>
                <h1 className='text-xl font-normal tracking-tight'>
                  CROIP Central Platform wants to access your Google Account
                </h1>
                <p className='text-xs text-[#444746] dark:text-[#C4C7C5] mt-1.5'>
                  This will allow <span className='font-semibold text-foreground'>CROIP Central Platform</span> to:
                </p>
              </div>

              <div className='rounded-2xl border border-[#E0E2E6] dark:border-[#333538] bg-muted/20 p-4 space-y-3.5'>
                <div className='flex items-start gap-3 text-xs'>
                  <CheckIcon className='size-4 text-[#0B57D0] shrink-0 mt-0.5' />
                  <div>
                    <p className='font-medium text-foreground'>See your primary Google Account email address</p>
                    <p className='text-muted-foreground mt-0.5'>Used to securely bind and link your CROIP officer identity.</p>
                  </div>
                </div>

                <div className='flex items-start gap-3 text-xs'>
                  <CheckIcon className='size-4 text-[#0B57D0] shrink-0 mt-0.5' />
                  <div>
                    <p className='font-medium text-foreground'>See your personal info</p>
                    <p className='text-muted-foreground mt-0.5'>Includes your name, language preferences, and profile avatar.</p>
                  </div>
                </div>
              </div>

              <p className='text-[11.5px] text-[#444746] dark:text-[#C4C7C5] leading-relaxed'>
                Make sure you trust CROIP Central Platform. You may review or revoke access at any time in your Google Account security settings.
              </p>

              <div className='flex items-center justify-end gap-3 pt-4 border-t border-[#E0E2E6] dark:border-[#333538]'>
                <Button variant='ghost' size='sm' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  className='rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white px-7 h-10 font-medium'
                  onClick={() => handleAuthorize(googleAccount.email)}
                >
                  Allow
                </Button>
              </div>
            </div>
          )}

          <p className='text-[11.5px] text-[#444746] dark:text-[#C4C7C5] mt-6 leading-relaxed'>
            To continue, Google will share your name, email address, language preference, and profile picture with
            CROIP Central Platform.
          </p>

          <div className='mt-6 pt-4 border-t border-[#E0E2E6] dark:border-[#333538] flex items-center justify-between text-xs text-[#444746] dark:text-[#C4C7C5]'>
            <span>English (United States)</span>
            <div className='flex gap-4'>
              <button type='button' onClick={handleCancel} className='hover:underline cursor-pointer'>
                Cancel
              </button>
              <a href='#' className='hover:underline'>Privacy</a>
              <a href='#' className='hover:underline'>Terms</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // 2. GITHUB OAUTH AUTHORIZATION SCREEN
  // ==========================================
  if (provider === 'github') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#F6F8FA] dark:bg-[#0D1117] p-4 font-sans text-[#1F2328] dark:text-[#E6EDF3]'>
        <div className='w-full max-w-[480px] rounded-2xl bg-white dark:bg-[#161B22] p-8 shadow-sm border border-[#D0D7DE] dark:border-[#30363D]'>
          {/* App Authorization Header */}
          <div className='flex items-center justify-center gap-6 mb-6'>
            <div className='size-14 rounded-2xl border bg-primary text-primary-foreground flex items-center justify-center shadow-xs font-bold text-lg'>
              CROIP
            </div>
            <div className='text-muted-foreground flex items-center gap-1.5'>
              <div className='h-0.5 w-6 bg-border' />
              <ShieldCheckIcon className='size-5 text-emerald-500' />
              <div className='h-0.5 w-6 bg-border' />
            </div>
            <div className='size-14 rounded-2xl border bg-black text-white flex items-center justify-center shadow-xs'>
              <svg className='size-8 fill-current' viewBox='0 0 24 24'>
                <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
              </svg>
            </div>
          </div>

          <h1 className='text-center text-xl font-semibold mb-1'>Authorize CROIP Central Platform</h1>
          <p className='text-center text-xs text-muted-foreground mb-6'>
            by <span className='font-medium text-foreground'>Central Revenue Operations Platform</span>
          </p>

          {isSubmitting ? (
            <div className='py-8 text-center space-y-3'>
              <div className='size-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto' />
              <p className='text-sm text-muted-foreground'>{statusMessage}</p>
            </div>
          ) : (
            <div className='space-y-5'>
              <div className='rounded-xl border border-[#D0D7DE] dark:border-[#30363D] p-4 space-y-3 bg-[#F6F8FA]/60 dark:bg-[#161B22]/60'>
                <p className='text-xs font-semibold text-foreground'>This application will be able to:</p>
                <div className='space-y-2 text-xs'>
                  <div className='flex items-start gap-2.5'>
                    <CheckIcon className='size-4 text-emerald-600 shrink-0 mt-0.5' />
                    <div>
                      <p className='font-medium text-foreground'>user:email</p>
                      <p className='text-muted-foreground'>Read your public and verified private email addresses.</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-2.5'>
                    <CheckIcon className='size-4 text-emerald-600 shrink-0 mt-0.5' />
                    <div>
                      <p className='font-medium text-foreground'>read:user</p>
                      <p className='text-muted-foreground'>Access your GitHub profile, handle, and avatar for identity verification.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='rounded-xl border p-3 flex items-center justify-between text-xs'>
                <div className='flex items-center gap-2.5'>
                  <div className='size-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold'>
                    KD
                  </div>
                  <div>
                    <p className='font-medium text-foreground'>Signed in as</p>
                    <p className='text-muted-foreground font-mono'>realkofidjan</p>
                  </div>
                </div>
                <span className='text-emerald-600 dark:text-emerald-400 font-medium text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded'>
                  Active
                </span>
              </div>

              <div className='flex gap-3 pt-2'>
                <Button variant='outline' className='w-1/2' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  className='w-1/2 bg-[#1F883D] hover:bg-[#1A7F37] text-white font-medium shadow-xs'
                  onClick={() => handleAuthorize('realkofidjan@users.noreply.github.com')}
                >
                  Authorize CROIP
                </Button>
              </div>

              <p className='text-[11px] text-center text-muted-foreground pt-2'>
                Authorizing will redirect back to <span className='font-mono'>http://localhost:3050</span>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ==========================================
  // 3. MICROSOFT 365 / ENTRA ID SCREEN
  // ==========================================
  if (provider === 'microsoft') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#F3F2F1] dark:bg-[#1B1A19] p-4 font-sans text-[#242424] dark:text-[#E0E0E0]'>
        <div className='w-full max-w-[440px] rounded-sm bg-white dark:bg-[#292827] p-10 shadow-md border border-[#E1DFDD] dark:border-[#3B3A39]'>
          {/* Microsoft 4-box logo */}
          <div className='mb-4'>
            <svg className='size-6' viewBox='0 0 23 23'>
              <path fill='#f35325' d='M1 1h10v10H1z' />
              <path fill='#81bc06' d='M12 1h10v10H12z' />
              <path fill='#05a6f0' d='M1 12h10v10H1z' />
              <path fill='#ffba08' d='M12 12h10v10H12z' />
            </svg>
          </div>

          <h1 className='text-2xl font-semibold mb-1'>Pick an account</h1>
          <p className='text-sm text-muted-foreground mb-6'>
            to sign in to <span className='font-medium text-foreground'>CROIP Government Portal</span>
          </p>

          {isSubmitting ? (
            <div className='py-8 text-center space-y-3'>
              <div className='size-8 border-3 border-[#0067B8] border-t-transparent rounded-full animate-spin mx-auto' />
              <p className='text-sm text-muted-foreground'>{statusMessage}</p>
            </div>
          ) : (
            <div className='space-y-3'>
              <button
                type='button'
                onClick={() => handleAuthorize('nana.djan@croip.gov.gh')}
                className='w-full flex items-center gap-3.5 p-3 text-left hover:bg-[#F3F2F1] dark:hover:bg-[#3B3A39] border border-transparent hover:border-[#E1DFDD] rounded-none transition-colors cursor-pointer'
              >
                <div className='size-10 rounded-full bg-[#0067B8] text-white flex items-center justify-center text-sm font-semibold'>
                  ND
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-semibold'>Nana Kofi Djan</p>
                  <p className='text-xs text-muted-foreground font-mono truncate'>nana.djan@croip.gov.gh</p>
                  <p className='text-[11px] text-muted-foreground'>Connected to Windows</p>
                </div>
              </button>

              <button
                type='button'
                onClick={() => handleAuthorize('superuser@m365.croip.gov.gh')}
                className='w-full flex items-center gap-3.5 p-3 text-left hover:bg-[#F3F2F1] dark:hover:bg-[#3B3A39] border border-transparent hover:border-[#E1DFDD] rounded-none transition-colors cursor-pointer'
              >
                <div className='size-10 rounded-full bg-[#0078D4] text-white flex items-center justify-center text-sm font-semibold'>
                  SA
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-semibold'>Super Administrator</p>
                  <p className='text-xs text-muted-foreground font-mono truncate'>superuser@m365.croip.gov.gh</p>
                </div>
              </button>

              <div className='pt-6 border-t flex justify-end gap-3'>
                <Button variant='outline' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  className='bg-[#0067B8] hover:bg-[#005DA6] text-white rounded-none px-6'
                  onClick={() => handleAuthorize('nana.djan@croip.gov.gh')}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ==========================================
  // 4. APPLE SIGN-IN SCREEN
  // ==========================================
  return (
    <div className='flex min-h-screen items-center justify-center bg-[#F5F5F7] dark:bg-[#000000] p-4 font-sans text-[#1D1D1F] dark:text-[#F5F5F7]'>
      <div className='w-full max-w-[420px] rounded-3xl bg-white dark:bg-[#1D1D1F] p-8 shadow-2xl border border-border/40'>
        {/* Apple Icon */}
        <div className='flex justify-center mb-4'>
          <svg className='size-10 fill-current' viewBox='0 0 24 24'>
            <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.87.96-2.96-.93.04-2.06.62-2.73 1.4-.59.68-1.11 1.77-.97 2.83 1.04.08 2.1-.5 2.74-1.27z' />
          </svg>
        </div>

        <h1 className='text-center text-xl font-semibold mb-2'>Sign in with Apple</h1>
        <p className='text-center text-xs text-muted-foreground mb-6'>
          Do you want to sign in to <span className='font-semibold text-foreground'>CROIP Central Platform</span> with your Apple ID?
        </p>

        {isSubmitting ? (
          <div className='py-8 text-center space-y-3'>
            <div className='size-8 border-3 border-foreground border-t-transparent rounded-full animate-spin mx-auto' />
            <p className='text-sm text-muted-foreground'>{statusMessage}</p>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='rounded-2xl border bg-muted/20 p-4 space-y-2'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold'>
                  NK
                </div>
                <div>
                  <p className='text-sm font-semibold'>Nana Kofi Djan</p>
                  <p className='text-xs text-muted-foreground font-mono'>realkofi.d@privaterelay.appleid.com</p>
                </div>
              </div>
            </div>

            <div className='rounded-xl border p-3 flex items-center gap-3 text-xs text-muted-foreground'>
              <KeyRoundIcon className='size-4 text-primary shrink-0' />
              <span>Passkey & Secure Enclave biometric validation enabled.</span>
            </div>

            <div className='pt-2 space-y-2.5'>
              <Button
                className='w-full rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium h-11'
                onClick={() => handleAuthorize('realkofi.d@privaterelay.appleid.com')}
              >
                Continue with Passkey
              </Button>
              <Button variant='ghost' className='w-full text-xs text-muted-foreground' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
