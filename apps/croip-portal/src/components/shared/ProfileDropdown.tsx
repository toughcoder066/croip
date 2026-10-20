'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface UserSession {
  id: string
  code: string
  email: string
  fullName: string
  role?: string
  roleName?: string
  department?: string
  imageUrl?: string
}

import { useUserSession } from '@/context/user-session-context'

const ProfileDropdown = () => {
  const { user } = useUserSession()
  const router = useRouter()

  const fullName = user?.fullName || 'Super Administrator'
  const email = user?.email || 'superuser@croip.com'
  const roleName = user?.roleName || user?.role || 'Super Administrator'
  const imageUrl = user?.imageUrl

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'SA'

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      const data = await res.json()

      toast.success('Signed out successfully')

      // Full navigation (not router.push) — this also ends the Zitadel-side session,
      // on Zitadel's own origin, before it redirects back here.
      window.location.href = data.redirectUrl || '/login'
    } catch {
      router.push('/login')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant='ghost' size='icon' className='relative rounded-full hover:bg-transparent' />}
      >
        <Avatar>
          {imageUrl && <AvatarImage src={imageUrl} alt={fullName} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-64'>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='flex items-center gap-3 px-2 py-2.5 font-normal'>
            <div className='relative shrink-0'>
              <Avatar className='size-10'>
                {imageUrl && <AvatarImage src={imageUrl} alt={fullName} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
            </div>
            <div className='flex flex-1 flex-col items-start overflow-hidden'>
              <span className='text-foreground truncate w-full text-sm font-semibold'>{fullName}</span>
              <span className='text-muted-foreground truncate w-full text-xs'>{email}</span>
              <span className='text-muted-foreground/75 truncate w-full text-[11px] font-medium'>{roleName}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href='/profile' />}>
            <UserIcon />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href='/settings' />}>
            <SettingsIcon />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant='destructive' onClick={handleLogout} className='cursor-pointer'>
            <LogOutIcon />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown

