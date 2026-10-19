'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { toast } from 'sonner'

// Type Imports
import type { AppUser } from '@/types/apps/user-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface SecurityTabProps {
  user: AppUser
}

export function SecurityTab({ user }: SecurityTabProps) {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(user.twoFactorEnabled ?? false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const defaultDevices = [
    {
      id: 'session-1',
      browser: 'Chrome on macOS',
      device: 'MacBook Pro',
      location: 'Accra, Greater Accra, Ghana',
      lastActive: 'Active now',
      isCurrentDevice: true
    },
    {
      id: 'session-2',
      browser: 'Safari on iPhone',
      device: 'iPhone 15 Pro',
      location: 'Accra, Greater Accra, Ghana',
      lastActive: '2 hours ago',
      isCurrentDevice: false
    }
  ]

  const recentDevices = (user.recentDevices && user.recentDevices.length > 0) ? user.recentDevices : defaultDevices

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword) {
      toast.error('Please enter your current password.')
      return
    }

    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.')
      return
    }

    setIsSavingPassword(true)
    try {
      // Simulate/call API update
      await new Promise(resolve => setTimeout(resolve, 600))
      toast.success('Account password updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      toast.error('Failed to update password. Please try again.')
    } finally {
      setIsSavingPassword(false)
    }
  }

  const handleToggle2FA = async (enabled: boolean) => {
    setIsTwoFactorEnabled(enabled)
    try {
      const res = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: enabled ? 'setup' : 'disable',
          method: 'email'
        })
      })
      const data = await res.json()
      if (data.success) {
        toast.success(enabled ? 'Two-factor authentication enabled.' : 'Two-factor authentication disabled.')
      } else {
        toast.info(enabled ? 'Two-factor verification requested.' : 'Two-factor updated.')
      }
    } catch {
      toast.error('Network error updating 2FA preference.')
    }
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='current-password'>Current Password</Label>
                <Input
                  id='current-password'
                  type='password'
                  placeholder='············'
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='new-password'>New Password</Label>
                <Input
                  id='new-password'
                  type='password'
                  placeholder='············'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='space-y-2 md:max-w-md'>
              <Label htmlFor='confirm-password'>Confirm New Password</Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='············'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <ul className='text-muted-foreground list-inside list-disc space-y-1 text-sm'>
              <li>Minimum 8 characters long — the more, the better</li>
              <li>At least one lowercase & one uppercase character</li>
              <li>At least one number, symbol, or whitespace character</li>
            </ul>
            <Button type='submit' disabled={isSavingPassword}>
              {isSavingPassword ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between gap-4'>
          <div>
            <CardTitle className='text-base'>2FA (Two-Factor Authentication)</CardTitle>
            <p className='text-muted-foreground mt-1 text-sm'>Keep your administrative session secure with an extra verification step.</p>
          </div>
          <Switch
            checked={isTwoFactorEnabled}
            onCheckedChange={handleToggle2FA}
            aria-label='Two-step verification'
          />
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>
            {isTwoFactorEnabled
              ? 'Two-factor authentication is enabled for this account.'
              : 'Two-factor authentication is not enabled yet.'}
          </p>
        </CardContent>
      </Card>

      <Card className='gap-0 py-0'>
        <CardHeader className='border-b px-6 py-4'>
          <CardTitle className='text-base'>Recent Devices</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='text-muted-foreground pl-6'>Browser</TableHead>
              <TableHead className='text-muted-foreground'>Device</TableHead>
              <TableHead className='text-muted-foreground'>Location</TableHead>
              <TableHead className='text-muted-foreground pr-6 text-right'>Recent Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDevices.map(device => (
              <TableRow key={device.id}>
                <TableCell className='pl-6 font-medium'>{device.browser}</TableCell>
                <TableCell className='text-muted-foreground'>{device.device}</TableCell>
                <TableCell className='text-muted-foreground'>{device.location}</TableCell>
                <TableCell className='pr-6 text-right'>
                  {device.isCurrentDevice ? (
                    <span className='text-primary text-sm font-medium'>{device.lastActive}</span>
                  ) : (
                    <span className='text-muted-foreground text-sm'>{device.lastActive}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
