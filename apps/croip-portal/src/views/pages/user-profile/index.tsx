'use client'

// React Imports
import { Suspense, useEffect, useState } from 'react'

// Third-party Imports
import { BriefcaseBusinessIcon, CalendarDaysIcon, CheckCircle2Icon, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import UserProfileTabs from '@/views/pages/user-profile/user-profile-tabs'

interface UserSession {
  fullName: string
  email: string
  roleName?: string
  role?: string
  department?: string
  imageUrl?: string
  status?: string
  createdAt?: string
}

const UserProfile = () => {
  const [user, setUser] = useState<UserSession | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user) {
          setUser(data.user)
        }
      })
      .catch(() => {})
  }, [])

  const displayName = user?.fullName || 'CROIP Super Administrator'
  const roleDisplay = user?.roleName || user?.role || 'Super Administrator'
  const department = user?.department || 'Executive Oversight & Platform Governance'
  const rawStatus = user?.status || 'ACTIVE'
  const statusLabel = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase()

  let joinedDate = 'October 2026'
  if (user?.createdAt) {
    try {
      joinedDate = format(new Date(user.createdAt), 'MMMM yyyy')
    } catch {
      joinedDate = 'October 2026'
    }
  }

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'SA'

  return (
    <div>
      <div className='mb-4 md:mb-6 lg:mb-10'>
        <Card className='py-0 pb-6'>
          <div className='bg-muted relative h-44 overflow-hidden'>
            <div className='absolute inset-0'>
              <BackgroundRippleEffect cellSize={45} rows={8} activeSquares={18} cols={45} />
            </div>
          </div>

          <CardContent>
            <div className='flex items-end gap-4 pb-1 max-md:flex-col max-md:items-center md:flex-nowrap md:gap-6'>
              <Avatar className='ring-card z-3 -mt-12 size-28 overflow-hidden rounded-xl ring-4 after:rounded-xl md:-mt-14'>
                <AvatarImage
                  src={user?.imageUrl || '/images/avatars/avatar-1.webp'}
                  alt={displayName}
                  className='size-full !rounded-none object-cover'
                />
                <AvatarFallback className='size-full !rounded-none text-2xl font-semibold'>{initials}</AvatarFallback>
              </Avatar>

              <div className='min-w-0 flex-1 space-y-2 text-center md:text-left'>
                <h2 className='text-2xl font-medium'>{displayName}</h2>
                <div className='text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 max-md:justify-center'>
                  <span className='inline-flex items-center gap-2'>
                    <BriefcaseBusinessIcon className='size-4.5' />
                    {roleDisplay}
                  </span>
                  <span className='inline-flex items-center gap-2'>
                    <MapPinIcon className='size-4.5' />
                    {department}
                  </span>
                  <span className='inline-flex items-center gap-2'>
                    <CalendarDaysIcon className='size-4.5' />
                    Joined {joinedDate}
                  </span>
                </div>
              </div>

              <Button className='md:ml-auto md:self-end gap-2'>
                <CheckCircle2Icon className='size-4' />
                {statusLabel}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Suspense>
        <UserProfileTabs />
      </Suspense>
    </div>
  )
}

export default UserProfile
