'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldErrors } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

// Config Imports
import themeConfig from '@/configs/themeConfig'

// Components Import
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { FormInput, FormPasswordInput } from '@/components/forms'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      const data = await res.json()
      if (!res.ok) {
        const errorMsg = data.error || 'Failed to sign in'
        toast.error(errorMsg)
        setIsLoading(false)
        return
      }

      toast.success('Signed in successfully', {
        description: data.message || 'Welcome back to CROIP',
        duration: 3000
      })

      router.push(themeConfig.homePageUrl)
      router.refresh()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error'
      toast.error(msg)
      setIsLoading(false)
    }
  }

  const onInvalid = (errors: FieldErrors<LoginFormValues>) => {
    const firstErrorMessage =
      errors.email?.message || errors.password?.message || 'Please fill in all required fields'
    toast.error(firstErrorMessage)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
      <FieldGroup className='gap-4'>
        {/* Email */}
        <FormInput
          name='email'
          control={form.control}
          label='Email address'
          type='email'
          id='userEmail'
          placeholder='Enter your email address'
          autoComplete='email'
          required
        />

        {/* Password */}
        <FormPasswordInput
          name='password'
          control={form.control}
          label='Password'
          id='password'
          placeholder='••••••••••••••••'
          autoComplete='current-password'
          required
        />

        {/* Remember Me and Forgot Password */}
        <div className='flex items-center justify-between gap-y-2'>
          <Field orientation='horizontal' className='flex items-center gap-2'>
            <Checkbox id='rememberMe' />
            <FieldLabel htmlFor='rememberMe' className='text-muted-foreground'>
              {' '}
              Remember Me
            </FieldLabel>
          </Field>
          <Link href='/pages/auth/forgot-password' className='text-base text-nowrap hover:underline'>
            Forgot Password?
          </Link>
        </div>

        <Field>
          <Button className='w-full' type='submit' disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in to Shadcn Studio'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm


