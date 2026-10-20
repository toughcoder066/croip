'use client'

// React Imports
import { useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Third-party Imports
import { ShieldCheckIcon } from 'lucide-react'
import { toast } from 'sonner'

// Components Import
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// SVG Import
import AuthBackgroundShape from '@/assets/svg/auth-background-shape'

const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  invalid_request: 'The sign-in request was invalid — please try again.',
  state_mismatch: 'Your sign-in session expired — please try again.',
  token_exchange_failed: 'CROIP ID could not complete sign-in. Please try again.',
  invalid_id_token: 'CROIP ID returned an invalid token. Please try again.',
  inactivity: 'Your session has ended due to inactivity. Please sign in again.',
  session_expired: 'Your session has expired. Please sign in again to continue.'
}

const Login = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    const reason = searchParams.get('reason')

    if (error) {
      toast.error(LOGIN_ERROR_MESSAGES[error] || 'Sign-in failed. Please try again.')
    } else if (reason) {
      toast.info(LOGIN_ERROR_MESSAGES[reason] || 'Please sign in to continue.')
    }
  }, [searchParams])

  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full gap-6 py-6 sm:max-w-lg'>
        <CardHeader className='gap-6 px-6'>
          <Link href='/'>
            <Logo className='gap-3' />
          </Link>

          <div>
            <CardTitle className='mb-2 text-2xl font-semibold'>Sign in to CROIP</CardTitle>
            <CardDescription className='text-base'>
              Central Revenue Oversight &amp; Integration Platform
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          <Button
            className='w-full gap-2'
            size='lg'
            render={<a href='/api/auth/oauth/zitadel/login' />}
            nativeButton={false}
          >
            <ShieldCheckIcon className='size-4.5' />
            Sign in with CROIP ID
          </Button>
          <p className='text-muted-foreground mt-3 text-center text-sm'>
            Authenticated by CROIP&apos;s identity provider.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
