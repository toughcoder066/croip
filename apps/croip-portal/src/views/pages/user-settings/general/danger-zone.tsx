'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import { LockIcon, ShieldAlertIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const DangerZone = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setIsSuperAdmin(
            data.user.role === 'SUPER_ADMIN' ||
              data.user.code === 'USR-SUPERADMIN' ||
              data.user.email === 'superuser@croip.com'
          )
        }
      })
      .catch(() => {})
  }, [])

  const handleDelete = async () => {
    if (isSuperAdmin) {
      toast.error('The Super Administrator account cannot be deleted.')
      return
    }

    try {
      const res = await fetch('/api/user/profile', { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        toast.success('Account deleted. Redirecting...')
        window.location.href = '/login'
      } else {
        toast.error(data.error || 'Failed to delete account.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    }
  }

  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
      {/* Vertical Tabs List */}
      <div className='flex flex-col space-y-1'>
        <h3 className='text-base font-semibold'>Danger Zone</h3>
        <p className='text-muted-foreground text-sm'>
          Irreversible account operations and termination controls.
        </p>
      </div>

      {/* Content */}
      <div className='space-y-6 lg:col-span-2'>
        <Card>
          <CardContent>
            <div className='flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-start'>
              <div className='space-y-1'>
                <h3 className='text-sm font-medium'>Delete Account</h3>
                <p className='text-muted-foreground text-sm'>
                  {isSuperAdmin
                    ? 'The primary administrator account is root protected. Deletion of this account is prohibited.'
                    : 'Delete your account permanently. This action will remove all your data and cannot be undone.'}
                </p>
              </div>

              {isSuperAdmin ? (
                <TooltipProvider delay={100}>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <div
                          className='inline-flex cursor-not-allowed max-lg:w-full'
                          title='This field is locked and cannot be edited.'
                        />
                      }
                    >
                      <Button
                        variant='outline'
                        disabled
                        className='pointer-events-none cursor-not-allowed opacity-60 max-lg:w-full'
                      >
                        <LockIcon className='size-4' />
                        Delete Account
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This account is locked and cannot be deleted.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        variant='outline'
                        className='border-destructive! text-destructive! hover:bg-destructive/10! focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 max-lg:w-full'
                      />
                    }
                  >
                    <Trash2Icon />
                    Delete Account
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader className='space-y-2'>
                      <DialogTitle className='flex items-center gap-2 text-destructive'>
                        <ShieldAlertIcon className='size-5' />
                        Confirm Permanent Account Deletion
                      </DialogTitle>
                      <div className='text-muted-foreground text-sm'>
                        This action will terminate your officer credentials permanently and revoke platform access.
                      </div>
                    </DialogHeader>
                    <div className='flex flex-col-reverse gap-4 sm:flex-row sm:justify-end'>
                      <DialogClose render={<Button variant='outline' />}>Cancel</DialogClose>
                      <Button variant='destructive' onClick={handleDelete}>
                        Delete Permanently
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DangerZone
