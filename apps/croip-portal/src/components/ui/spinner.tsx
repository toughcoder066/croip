import * as React from 'react'
import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export function SpinnerCustom({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <div className="flex items-center gap-4">
      <Spinner className={className} {...props} />
    </div>
  )
}

export function PageLoader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-1 min-h-[calc(100dvh-12rem)] w-full items-center justify-center',
        className
      )}
      {...props}
    >
      <Spinner className="size-8 text-primary" />
    </div>
  )
}

