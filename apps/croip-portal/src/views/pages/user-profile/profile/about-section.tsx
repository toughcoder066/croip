'use client'

// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import {
  Building2Icon,
  CheckCheckIcon,
  CheckIcon,
  FlagIcon,
  GlobeIcon,
  HashIcon,
  LanguagesIcon,
  type LucideIcon,
  MailIcon,
  PhoneIcon,
  ServerIcon,
  ShieldCheckIcon,
  StarIcon,
  UserIcon
} from 'lucide-react'

// Components Imports
import { Card, CardContent } from '@/components/ui/card'

interface UserSession {
  id?: string
  code?: string
  email?: string
  fullName?: string
  phone?: string
  role?: string
  roleName?: string
  department?: string
  permissions?: string[]
  status?: string
  country?: string
  languages?: string
}

type AboutItem = {
  label: string
  value: string
  icon?: LucideIcon
}

type SectionData = {
  title: string
  items: AboutItem[]
}

function AboutSection() {
  const [user, setUser] = useState<UserSession>({
    fullName: 'CROIP Super Administrator',
    status: 'ACTIVE',
    roleName: 'Super Administrator',
    department: 'Executive Oversight & Platform Governance',
    code: 'USR-SUPERADMIN',
    country: 'Ghana',
    languages: 'English, Twi',
    phone: '+233 20 000 0000',
    email: 'superuser@croip.com',
    permissions: ['*']
  })

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(prev => ({ ...prev, ...data.user }))
        }
      })
      .catch(() => {})
  }, [])

  const sections: SectionData[] = [
    {
      title: 'About',
      items: [
        { icon: UserIcon, label: 'Full Name', value: user.fullName || 'CROIP Super Administrator' },
        { icon: CheckCheckIcon, label: 'Status', value: user.status === 'ACTIVE' ? 'Active' : (user.status || 'Active') },
        { icon: StarIcon, label: 'Role', value: user.roleName || 'Super Administrator' },
        { icon: Building2Icon, label: 'Department', value: user.department || 'Executive Oversight & Platform Governance' },
        { icon: HashIcon, label: 'Officer Code', value: user.code || 'USR-SUPERADMIN' },
        { icon: FlagIcon, label: 'Country', value: user.country || 'Ghana' },
        { icon: LanguagesIcon, label: 'Languages', value: user.languages || 'English, Twi' }
      ]
    },
    {
      title: 'Contacts',
      items: [
        { icon: PhoneIcon, label: 'Phone', value: user.phone || '+233 20 000 0000' },
        { icon: MailIcon, label: 'Email', value: user.email || 'superuser@croip.com' },
        { icon: GlobeIcon, label: 'Jurisdiction', value: 'National Platform (All Assemblies)' }
      ]
    },
    {
      title: 'Platform Access',
      items: [
        { icon: ShieldCheckIcon, label: 'Permissions', value: 'All System Capabilities (*)' },
        { icon: ServerIcon, label: 'Active Services', value: '9 Microservices Online' },
        { icon: CheckIcon, label: 'Access Level', value: 'Level 10 Sovereign Oversight' }
      ]
    }
  ]

  return (
    <Card>
      <CardContent className='space-y-6'>
        {sections.map(section => (
          <div className='space-y-2' key={section.title}>
            <p className='text-muted-foreground text-xs font-semibold uppercase tracking-wider'>{section.title}</p>
            <ul className='space-y-3'>
              {section.items.map(item => {
                const Icon = item.icon

                return (
                  <li className='flex items-center gap-2' key={item.label}>
                    {Icon ? <Icon className='text-muted-foreground size-4 shrink-0' /> : null}
                    <span className='text-sm font-medium whitespace-nowrap'>{item.label}:</span>
                    <span className='text-muted-foreground text-sm truncate'>{item.value}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default AboutSection

