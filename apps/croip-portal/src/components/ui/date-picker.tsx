'use client'

import * as React from 'react'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface DatePickerProps {
  id?: string

  /** ISO date string (YYYY-MM-DD) — the same shape every date field in this app already
   * sends to the backend, so callers never have to think in terms of Date objects. */
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean

  /** Disables every date before this one (e.g. "today" for a contract end date). */
  minDate?: Date
  className?: string
}

function parseIsoDate(value?: string): Date | undefined {
  if (!value) return undefined
  const parsed = new Date(`${value}T00:00:00`)

  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function DatePicker({ id, value, onChange, placeholder = 'Pick a date', disabled, minDate, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const selected = parseIsoDate(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn('w-full justify-start text-left font-normal text-sm', !selected && 'text-muted-foreground', className)}
          />
        }
      >
        <CalendarIcon className="size-4 mr-2 shrink-0" />
        {selected ? format(selected, 'PPP') : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={date => {
            if (!date) return
            onChange(toIsoDate(date))
            setOpen(false)
          }}
          disabled={minDate ? { before: minDate } : undefined}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
