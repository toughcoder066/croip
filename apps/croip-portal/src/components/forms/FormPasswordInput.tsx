'use client'

import React, { useState } from 'react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

export interface FormPasswordInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  required?: boolean
  className?: string
  id?: string
  autoComplete?: string
  disabled?: boolean
}

export function FormPasswordInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = '••••••••••••••••',
  required,
  className,
  id,
  autoComplete = 'current-password',
  disabled
}: FormPasswordInputProps<TFieldValues>) {
  const [isVisible, setIsVisible] = useState(false)
  const inputId = id || name

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={cn('w-full gap-2', className)} data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={inputId} className='leading-5'>
              {label}
              {required && '*'}
            </FieldLabel>
          )}
          <InputGroup>
            <InputGroupInput
              {...field}
              id={inputId}
              type={isVisible ? 'text' : 'password'}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              autoComplete={autoComplete}
              disabled={disabled}
            />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
