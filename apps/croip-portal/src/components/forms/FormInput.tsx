'use client'

import React from 'react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface FormInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  className?: string
  id?: string
  autoComplete?: string
  disabled?: boolean
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  required,
  className,
  id,
  autoComplete,
  disabled
}: FormInputProps<TFieldValues>) {
  const inputId = id || name

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={cn('gap-2', className)} data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={inputId} className='leading-5'>
              {label}
              {required && '*'}
            </FieldLabel>
          )}
          <Input
            {...field}
            id={inputId}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
