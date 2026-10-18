'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import { CheckIcon, ShieldAlertIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface SocialProvider {
  id: 'google' | 'microsoft' | 'github' | 'apple'
  name: string
  subtitle: string
  isConnected: boolean
  accountEmail?: string | null
  connectedAt?: string | null
  idpType: string
}

function ProviderLogo({ id, className = 'size-5' }: { id: string; className?: string }) {
  if (id === 'google') {
    return (
      <svg className={className} viewBox='0 0 24 24'>
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
    )
  }

  if (id === 'microsoft') {
    return (
      <svg className={className} viewBox='0 0 23 23'>
        <path fill='#f35325' d='M1 1h10v10H1z' />
        <path fill='#81bc06' d='M12 1h10v10H12z' />
        <path fill='#05a6f0' d='M1 12h10v10H1z' />
        <path fill='#ffba08' d='M12 12h10v10H12z' />
      </svg>
    )
  }

  if (id === 'github') {
    return (
      <svg className={`${className} fill-current text-foreground`} viewBox='0 0 24 24'>
        <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
      </svg>
    )
  }

  // Apple
  return (
    <svg className={`${className} fill-current text-foreground`} viewBox='0 0 24 24'>
      <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.87.96-2.96-.93.04-2.06.62-2.73 1.4-.59.68-1.11 1.77-.97 2.83 1.04.08 2.1-.5 2.74-1.27z' />
    </svg>
  )
}

const ConnectedAccount = () => {
  const [providers, setProviders] = useState<SocialProvider[]>([])
  const [disconnectingProvider, setDisconnectingProvider] = useState<SocialProvider | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchConnections = () => {
    fetch('/api/user/social-connections')
      .then(res => res.json())
      .then(data => {
        if (data.providers) {
          setProviders(data.providers)
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    fetchConnections()

    // Listen for OAuth completion from popup window
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_SUCCESS') {
        toast.success(`${event.data.providerName || 'Account'} connected successfully!`)
        fetchConnections()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Open the authentic auth screen of the service in question
  const handleOpenAuthScreen = (provider: SocialProvider) => {
    const width = 520
    const height = 680
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const popup = window.open(
      `/api/auth/oauth/${provider.id}/login`,
      `oauth_${provider.id}`,
      `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`
    )

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      window.location.href = `/api/auth/oauth/${provider.id}/login?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`
    }
  }

  const handleConfirmDisconnect = async () => {
    if (!disconnectingProvider) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/user/social-connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: disconnectingProvider.id,
          action: 'disconnect'
        })
      })

      const data = await res.json()

      if (data.success) {
        setProviders(prev =>
          prev.map(p =>
            p.id === disconnectingProvider.id
              ? {
                  ...p,
                  isConnected: false,
                  accountEmail: null,
                  connectedAt: null
                }
              : p
          )
        )
        toast.info(`${disconnectingProvider.name} has been disconnected.`)
        setDisconnectingProvider(null)
      } else {
        toast.error(data.error || 'Failed to disconnect provider.')
      }
    } catch {
      toast.error('Network error disconnecting account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
        {/* Vertical Tabs List */}
        <div className='flex flex-col space-y-1'>
          <h3 className='text-base font-semibold'>Connected Accounts</h3>
          <p className='text-muted-foreground text-sm'>
            Manage your federated social and enterprise identity logins.
          </p>
        </div>

        {/* Content */}
        <div className='space-y-4 lg:col-span-2'>
          <div className='grid grid-cols-1 gap-3.5 sm:grid-cols-2'>
            {providers.map(provider => {
              return (
                <div
                  key={provider.id}
                  className='bg-card hover:bg-muted/40 border-border flex items-center justify-between gap-3.5 rounded-xl border p-3.5 shadow-2xs transition-colors'
                >
                  <div className='flex min-w-0 items-center gap-3'>
                    <div className='bg-background flex size-11 shrink-0 items-center justify-center rounded-xl border p-2 shadow-2xs'>
                      <ProviderLogo id={provider.id} className='size-5' />
                    </div>
                    <div className='min-w-0'>
                      <div className='flex items-center gap-2'>
                        <p className='truncate text-sm font-semibold text-foreground'>{provider.name}</p>
                        {provider.isConnected && (
                          <span className='inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400'>
                            <CheckIcon className='size-3 stroke-[2.5]' />
                            Linked
                          </span>
                        )}
                      </div>
                      <p className='text-muted-foreground line-clamp-1 text-xs'>{provider.subtitle}</p>
                      {provider.isConnected && provider.accountEmail && (
                        <p className='text-emerald-600 dark:text-emerald-400 truncate text-[11px] font-mono mt-0.5'>
                          {provider.accountEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  {provider.isConnected ? (
                    <Button
                      size='sm'
                      variant='outline'
                      className='min-w-20 shrink-0 font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors'
                      onClick={() => setDisconnectingProvider(provider)}
                    >
                      Connected
                    </Button>
                  ) : (
                    <Button
                      size='sm'
                      variant='default'
                      className='min-w-20 shrink-0 font-medium'
                      onClick={() => handleOpenAuthScreen(provider)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          <p className='text-muted-foreground text-xs'>
            Connected accounts allow you to sign in quickly and securely using verified Single Sign-On (SSO).
          </p>
        </div>
      </div>

      {/* Disconnect Confirmation Modal */}
      <Dialog
        open={Boolean(disconnectingProvider)}
        onOpenChange={open => {
          if (!open) setDisconnectingProvider(null)
        }}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <div className='flex items-center gap-3'>
              <div className='bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-xl border border-destructive/20'>
                <ShieldAlertIcon className='size-5' />
              </div>
              <div>
                <DialogTitle className='text-base font-semibold'>
                  Disconnect {disconnectingProvider?.name}?
                </DialogTitle>
                <DialogDescription className='text-xs'>
                  You will no longer be able to use {disconnectingProvider?.accountEmail || 'this account'} for Single Sign-On.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className='gap-2 sm:gap-0'>
            <Button variant='outline' onClick={() => setDisconnectingProvider(null)}>
              Keep Connected
            </Button>
            <Button variant='destructive' disabled={isSubmitting} onClick={handleConfirmDisconnect}>
              {isSubmitting ? 'Disconnecting...' : 'Disconnect Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ConnectedAccount
