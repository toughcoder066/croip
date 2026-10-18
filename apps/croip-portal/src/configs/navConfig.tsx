// Third-party Imports
import type * as Icon from 'lucide-react'

type IconName = keyof typeof Icon

export type MenuLeafSubItem = {
  label: string
  href: string
  activePath?: string
  badge?: string
  badgeClassName?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  roles?: string[]
}

export type MenuGroupSubItem = {
  label: string
  childItems: MenuLeafSubItem[]
  roles?: string[]
}

export type MenuSubItem = MenuLeafSubItem | MenuGroupSubItem

export type MenuItem = {
  icon: IconName
  label: string
  roles?: string[]
} & (
  | {
      href: string
      badge?: string
      badgeClassName?: string
      childItems?: never
      target?: '_blank' | '_self' | '_parent' | '_top'
    }
  | {
      href?: never
      badge?: string
      badgeClassName?: string
      childItems: MenuSubItem[]
    }
)

export type NavItem = {
  groupLabel?: string
  roles?: string[]
  items: MenuItem[]
}

export const navItems: NavItem[] = [
  // ==========================================
  // 1. DASHBOARD & SYSTEM MONITORING
  // ==========================================
  {
    groupLabel: 'Core Platform',
    items: [
      {
        icon: 'LayoutDashboard',
        label: 'Dashboard',
        href: '/dashboard'
      }
    ]
  },

  // ==========================================
  // 2. CONCESSIONS & PROPERTIES
  // ==========================================
  {
    groupLabel: 'Operations & Assets',
    items: [
      {
        icon: 'Building2',
        label: 'Concessions',
        childItems: [
          {
            label: 'Concession Registry',
            href: '/concessions'
          },
          {
            label: 'Contracts & Agreements',
            href: '/concessions/contracts'
          },
          {
            label: 'Concession Personnel',
            href: '/concessions/personnel'
          },
          {
            label: 'API Clients & Keys',
            href: '/concessions/api-clients',
            roles: ['SUPER_ADMIN']
          },
          {
            label: 'Data Sync Batches',
            href: '/concessions/sync-batches',
            roles: ['SUPER_ADMIN']
          }
        ]
      },
      {
        icon: 'Landmark',
        label: 'Properties',
        childItems: [
          {
            label: 'All Registered Properties',
            href: '/properties'
          },
          {
            label: 'Bills',
            href: '/properties/bills'
          },
          {
            label: 'Valuation Rolls',
            href: '/properties/valuation-lists'
          },
          {
            label: 'Cadastral & Spatial Map',
            href: '/properties/cadastral-map'
          }
        ]
      },
      {
        icon: 'Users',
        label: 'Ratepayers',
        roles: ['SUPER_ADMIN'], // Strictly hidden from EXECUTIVE_OVERSIGHT (Zero PII)
        childItems: [
          {
            label: 'Ratepayer Directory',
            href: '/ratepayers'
          },
          {
            label: 'KYC & ID Verifications',
            href: '/ratepayers/verifications'
          },
          {
            label: 'Dispute Mediation',
            href: '/ratepayers/disputes'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. OVERSIGHT, AUDIT & ASSURANCE
  // ==========================================
  {
    groupLabel: 'Governance & Assurance',
    items: [
      {
        icon: 'Scale',
        label: 'Oversight & Reconciliation',
        childItems: [
          {
            label: 'Reconciliation Runs',
            href: '/oversight/reconciliation-runs'
          },
          {
            label: 'Exceptions & Discrepancies',
            href: '/oversight/exceptions'
          },
          {
            label: 'Independent Evidence',
            href: '/oversight/evidence'
          },
          {
            label: 'Compliance & Recovery',
            href: '/oversight/compliance'
          }
        ]
      },
      {
        icon: 'UserCog',
        label: 'Users & Access',
        roles: ['SUPER_ADMIN'], // Admin only
        childItems: [
          {
            label: 'User Directory',
            href: '/apps/users/list'
          },
          {
            label: 'Roles & Permissions',
            href: '/users/roles'
          },
          {
            label: 'Active Sessions & Security',
            href: '/users/security'
          }
        ]
      },
      {
        icon: 'ScrollText',
        label: 'Audit Trail',
        childItems: [
          {
            label: 'System Audit Logs',
            href: '/audit/logs'
          },
          {
            label: 'Event Outbox Queue',
            href: '/audit/outbox',
            roles: ['SUPER_ADMIN']
          },
          {
            label: 'Security & Access Events',
            href: '/audit/security'
          },
          {
            label: 'Forensic Reports & Exports',
            href: '/audit/reports'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 4. CONFIGURATION & SETTINGS
  // ==========================================
  {
    groupLabel: 'Administration',
    roles: ['SUPER_ADMIN'],
    items: [
      {
        icon: 'Settings',
        label: 'Configuration',
        roles: ['SUPER_ADMIN'],
        childItems: [
          {
            label: 'Assemblies (MMDAs)',
            href: '/configuration/assemblies'
          },
          {
            label: 'Regions & Jurisdictions',
            href: '/configuration/regions'
          },
          {
            label: 'Communication & Gateways',
            href: '/configuration/gateways'
          },
          {
            label: 'System Parameters',
            href: '/configuration/system'
          }
        ]
      },
      {
        icon: 'Map',
        label: 'Zones & Boundaries',
        roles: ['SUPER_ADMIN'],
        childItems: [
          {
            label: 'GIS Boundary Editor',
            href: '/configuration/zones'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 5. PERSONAL ACCOUNT & TOOLS
  // ==========================================
  {
    groupLabel: 'Account & Tools',
    items: [
      {
        icon: 'User',
        label: 'Officer Profile',
        href: '/profile'
      },
      {
        icon: 'Sliders',
        label: 'Account Settings',
        href: '/settings'
      },
      {
        icon: 'Mail',
        label: 'Official Mailbox',
        href: '/apps/mail'
      },
      {
        icon: 'Calendar',
        label: 'Schedule Calendar',
        href: '/apps/calendar'
      }
    ]
  }
]
