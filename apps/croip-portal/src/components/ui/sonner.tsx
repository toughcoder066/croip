'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position='bottom-center'
      className='toaster group'
      icons={{
        success: <CircleCheckIcon className='size-3.5 text-emerald-500' />,
        info: <InfoIcon className='size-3.5' />,
        warning: <TriangleAlertIcon className='size-3.5 text-amber-500' />,
        error: <OctagonXIcon className='size-3.5 text-destructive' />,
        loading: <Loader2Icon className='size-3.5 animate-spin' />
      }}
      style={
        {
          '--width': 'max-content',
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)'
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast !py-1.5 !px-3 !text-xs !gap-2 !rounded-md !shadow-sm',
          title: '!text-xs !font-medium',
          description: '!text-[11px] !text-muted-foreground',
          icon: '!size-3.5'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
