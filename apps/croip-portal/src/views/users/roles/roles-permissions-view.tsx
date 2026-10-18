'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  SearchIcon,
  XIcon,
  DatabaseIcon,
  SlidersHorizontalIcon,
  RefreshCwIcon,
  CheckCircle2Icon,
  InfoIcon,
  FilterIcon,
  LayersIcon,
  UsersIcon,
  Building2Icon
} from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageLoader } from '@/components/ui/spinner'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

export interface MatrixRole {
  id: string
  code: string
  name: string
  description?: string
  scopeLevel: string
  isSystem: boolean
  userCount: number
}

export interface MatrixResource {
  id: string
  code: string
  name: string
  description?: string
}

export interface MatrixPermission {
  id: string
  resourceId: string
  action: 'VIEW' | 'EDIT' | 'CREATE' | 'DELETE'
  code: string
}

export interface MatrixGrant {
  roleId: string
  permissionId: string
}

export interface RbacMatrixData {
  actions: Array<'VIEW' | 'EDIT' | 'CREATE' | 'DELETE'>
  roles: MatrixRole[]
  resources: MatrixResource[]
  permissions: MatrixPermission[]
  grants: MatrixGrant[]
}

type RoleGroupFilter = 'all' | 'oversight' | 'concessions' | 'ratepayers'

export function RolesPermissionsView() {
  const [data, setData] = useState<RbacMatrixData | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeView, setActiveView] = useState<'matrix' | 'erd'>('matrix')
  const [roleGroup, setRoleGroup] = useState<RoleGroupFilter>('all')
  const [updatingKey, setUpdatingKey] = useState<string | null>(null)

  const fetchMatrix = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/rbac')
      const json = await res.json()
      if (json.success && json.data) {
        setData(json.data)
      } else {
        toast.error(json.error || 'Failed to load RBAC permissions matrix')
      }
    } catch {
      toast.error('Network error contacting Platform Governance service')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatrix()
  }, [])

  // Fast grant lookup set: "roleId:permissionId"
  const grantSet = useMemo(() => {
    if (!data) return new Set<string>()
    return new Set(data.grants.map((g) => `${g.roleId}:${g.permissionId}`))
  }, [data])

  // Map of (resourceId + action) -> permissionId
  const permMap = useMemo(() => {
    const map = new Map<string, MatrixPermission>()
    if (!data) return map
    for (const p of data.permissions) {
      map.set(`${p.resourceId}:${p.action}`, p)
    }
    return map
  }, [data])

  const toggleGrant = async (role: MatrixRole, resource: MatrixResource, action: 'VIEW' | 'EDIT' | 'CREATE' | 'DELETE') => {
    const perm = permMap.get(`${resource.id}:${action}`)
    if (!perm) return

    const key = `${role.id}:${perm.id}`
    const currentlyGranted = grantSet.has(key)
    const nextGranted = !currentlyGranted

    if (!nextGranted && role.code === 'SUPER_ADMIN' && resource.code === 'ROLE_ACCESS') {
      toast.error('Super Administrator cannot lose Roles & Access Control permissions')
      return
    }

    setUpdatingKey(key)

    // Optimistic UI update
    setData((prev) => {
      if (!prev) return prev
      const nextGrants = nextGranted
        ? [...prev.grants, { roleId: role.id, permissionId: perm.id }]
        : prev.grants.filter((g) => !(g.roleId === role.id && g.permissionId === perm.id))
      return { ...prev, grants: nextGrants }
    })

    try {
      const res = await fetch('/api/rbac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleId: role.id,
          permissionId: perm.id,
          granted: nextGranted
        })
      })
      const json = await res.json()
      if (!json.success) {
        fetchMatrix()
        toast.error(json.error || 'Failed to update grant')
      } else {
        toast.success(
          `${nextGranted ? 'Granted' : 'Revoked'} ${action} on ${resource.name} for ${role.name}`
        )
      }
    } catch {
      fetchMatrix()
      toast.error('Network error updating permission')
    } finally {
      setUpdatingKey(null)
    }
  }

  // Filtered Roles based on group selector
  const displayedRoles = useMemo(() => {
    if (!data) return []
    if (roleGroup === 'all') return data.roles
    if (roleGroup === 'oversight') {
      return data.roles.filter((r) =>
        ['SUPER_ADMIN', 'EXECUTIVE_OVERSIGHT', 'RATE_CARD_VERIFIER', 'FINANCE_OFFICER', 'FINANCE_APPROVER', 'AUDITOR'].includes(r.code)
      )
    }
    if (roleGroup === 'concessions') {
      return data.roles.filter((r) =>
        ['CONCESSIONAIRE_MANAGER', 'CONCESSIONAIRE_ADMIN', 'CONCESSIONAIRE_BILLING'].includes(r.code)
      )
    }
    if (roleGroup === 'ratepayers') {
      return data.roles.filter((r) =>
        ['RATEPAYER', 'SUPPORT_OFFICER'].includes(r.code)
      )
    }
    return data.roles
  }, [data, roleGroup])

  const filteredResources = useMemo(() => {
    if (!data) return []
    if (!search.trim()) return data.resources
    const s = search.toLowerCase()
    return data.resources.filter(
      (r) => r.name.toLowerCase().includes(s) || r.code.toLowerCase().includes(s)
    )
  }, [data, search])

  if (loading) {
    return <PageLoader />
  }

  const rolesCount = data?.roles.length || 0
  const resourcesCount = data?.resources.length || 0
  const grantsCount = data?.grants.length || 0

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 max-w-full overflow-x-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Permissions</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Overview of all roles and their associated resource permissions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Switcher: Matrix vs ERD */}
          <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-lg">
            <Button
              size="sm"
              variant={activeView === 'matrix' ? 'default' : 'ghost'}
              className="text-xs h-7 px-3 gap-1.5"
              onClick={() => setActiveView('matrix')}
            >
              <SlidersHorizontalIcon className="size-3.5" />
              Permissions Matrix
            </Button>
            <Button
              size="sm"
              variant={activeView === 'erd' ? 'default' : 'ghost'}
              className="text-xs h-7 px-3 gap-1.5"
              onClick={() => setActiveView('erd')}
            >
              <DatabaseIcon className="size-3.5" />
              ER Diagram (Postgres)
            </Button>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7 gap-1.5"
            onClick={fetchMatrix}
            title="Refresh from DB"
          >
            <RefreshCwIcon className="size-3" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards — Matching screenshot */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6 shadow-2xs bg-card/60 border border-border/50">
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">{rolesCount}</span>
            <span className="text-xs text-muted-foreground font-medium">Roles</span>
          </div>
        </Card>

        <Card className="p-6 shadow-2xs bg-card/60 border border-border/50">
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">{resourcesCount}</span>
            <span className="text-xs text-muted-foreground font-medium">Resources</span>
          </div>
        </Card>

        <Card className="p-6 shadow-2xs bg-card/60 border border-border/50">
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">{grantsCount}</span>
            <span className="text-xs text-muted-foreground font-medium">Active Permissions</span>
          </div>
        </Card>
      </div>

      {activeView === 'matrix' ? (
        /* Matrix View */
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          {/* Controls: Search + Role Group Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="w-full sm:max-w-xs">
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-xs"
                />
                {search && (
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="text-muted-foreground hover:text-foreground p-0.5 rounded-full cursor-pointer"
                    >
                      <XIcon className="size-3.5" />
                    </button>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>

            {/* Role Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <span className="text-[11px] text-muted-foreground font-medium mr-1.5 flex items-center gap-1 shrink-0">
                <FilterIcon className="size-3" /> Filter Roles:
              </span>
              <Button
                size="sm"
                variant={roleGroup === 'all' ? 'default' : 'outline'}
                className="text-xs h-7 px-2.5 shrink-0"
                onClick={() => setRoleGroup('all')}
              >
                All Roles ({rolesCount})
              </Button>
              <Button
                size="sm"
                variant={roleGroup === 'oversight' ? 'default' : 'outline'}
                className="text-xs h-7 px-2.5 shrink-0"
                onClick={() => setRoleGroup('oversight')}
              >
                Oversight Staff (6)
              </Button>
              <Button
                size="sm"
                variant={roleGroup === 'concessions' ? 'default' : 'outline'}
                className="text-xs h-7 px-2.5 shrink-0"
                onClick={() => setRoleGroup('concessions')}
              >
                Concessions (3)
              </Button>
              <Button
                size="sm"
                variant={roleGroup === 'ratepayers' ? 'default' : 'outline'}
                className="text-xs h-7 px-2.5 shrink-0"
                onClick={() => setRoleGroup('ratepayers')}
              >
                Ratepayers & Citizens (2)
              </Button>
            </div>
          </div>

          {/* Matrix Table with sticky Resource column and internal horizontal scroll */}
          <Card className="shadow-2xs overflow-hidden py-0 gap-0 border border-border/50 w-full min-w-0 max-w-full">
            <div className="overflow-x-auto w-full max-w-full scrollbar-thin">
              <table className="w-full text-left border-collapse table-auto min-w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/20">
                    {/* Sticky Resource Header */}
                    <th className="py-3.5 px-5 text-xs font-semibold text-foreground tracking-wide sticky left-0 bg-background/95 backdrop-blur-sm z-20 shadow-[4px_0_8px_-3px_rgba(0,0,0,0.12)] border-r border-border/60 min-w-56 max-w-64">
                      Resource
                    </th>
                    {displayedRoles.map((role) => (
                      <th
                        key={role.id}
                        className="py-3.5 px-3 text-left min-w-[130px] border-l border-border/30"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground tracking-tight whitespace-nowrap">
                            {role.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-normal">
                            {role.userCount} {role.userCount === 1 ? 'user' : 'users'}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/40 text-xs">
                  {filteredResources.map((resource) => (
                    <tr
                      key={resource.id}
                      className="hover:bg-muted/15 transition-colors group"
                    >
                      {/* Sticky Resource Cell */}
                      <td className="py-3.5 px-5 font-medium text-foreground sticky left-0 bg-background/95 backdrop-blur-sm z-10 shadow-[4px_0_8px_-3px_rgba(0,0,0,0.12)] border-r border-border/60 min-w-56 max-w-64">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-semibold text-foreground">{resource.name}</span>
                          {resource.description && (
                            <span className="text-[11px] text-muted-foreground font-normal line-clamp-1">
                              {resource.description}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Role Action Pills */}
                      {displayedRoles.map((role) => {
                        const viewPerm = permMap.get(`${resource.id}:VIEW`)
                        const editPerm = permMap.get(`${resource.id}:EDIT`)
                        const createPerm = permMap.get(`${resource.id}:CREATE`)
                        const deletePerm = permMap.get(`${resource.id}:DELETE`)

                        const hasView = viewPerm ? grantSet.has(`${role.id}:${viewPerm.id}`) : false
                        const hasEdit = editPerm ? grantSet.has(`${role.id}:${editPerm.id}`) : false
                        const hasCreate = createPerm ? grantSet.has(`${role.id}:${createPerm.id}`) : false
                        const hasDelete = deletePerm ? grantSet.has(`${role.id}:${deletePerm.id}`) : false

                        return (
                          <td
                            key={role.id}
                            className="py-2.5 px-3 border-l border-border/30 align-middle"
                          >
                            <div className="inline-flex items-center gap-1 p-1 rounded-md bg-muted/40 border border-border/60 shrink-0">
                              {/* VIEW */}
                              <button
                                type="button"
                                onClick={() => toggleGrant(role, resource, 'VIEW')}
                                title={`View ${resource.name}: ${hasView ? 'Granted' : 'Revoked'} (click to toggle)`}
                                className={`size-7 rounded flex items-center justify-center transition-all cursor-pointer ${
                                  hasView
                                    ? 'bg-background text-foreground shadow-xs border border-border/50'
                                    : 'text-muted-foreground/35 hover:text-muted-foreground/70'
                                }`}
                              >
                                <EyeIcon className="size-3.5" />
                              </button>

                              {/* EDIT */}
                              <button
                                type="button"
                                onClick={() => toggleGrant(role, resource, 'EDIT')}
                                title={`Edit ${resource.name}: ${hasEdit ? 'Granted' : 'Revoked'} (click to toggle)`}
                                className={`size-7 rounded flex items-center justify-center transition-all cursor-pointer ${
                                  hasEdit
                                    ? 'bg-background text-foreground shadow-xs border border-border/50'
                                    : 'text-muted-foreground/35 hover:text-muted-foreground/70'
                                }`}
                              >
                                <PencilIcon className="size-3.5" />
                              </button>

                              {/* CREATE */}
                              <button
                                type="button"
                                onClick={() => toggleGrant(role, resource, 'CREATE')}
                                title={`Create ${resource.name}: ${hasCreate ? 'Granted' : 'Revoked'} (click to toggle)`}
                                className={`size-7 rounded flex items-center justify-center transition-all cursor-pointer ${
                                  hasCreate
                                    ? 'bg-background text-foreground shadow-xs border border-border/50'
                                    : 'text-muted-foreground/35 hover:text-muted-foreground/70'
                                }`}
                              >
                                <PlusIcon className="size-3.5" />
                              </button>

                              {/* DELETE */}
                              <button
                                type="button"
                                onClick={() => toggleGrant(role, resource, 'DELETE')}
                                title={`Delete ${resource.name}: ${hasDelete ? 'Granted' : 'Revoked'} (click to toggle)`}
                                className={`size-7 rounded flex items-center justify-center transition-all cursor-pointer ${
                                  hasDelete
                                    ? 'bg-background text-foreground shadow-xs border border-border/50'
                                    : 'text-muted-foreground/35 hover:text-muted-foreground/70'
                                }`}
                              >
                                <Trash2Icon className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border/40 bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <InfoIcon className="size-3.5 text-primary shrink-0" />
                <span>
                  Action icons in each cell:{' '}
                  <strong className="text-foreground">Eye</strong> (View),{' '}
                  <strong className="text-foreground">Pencil</strong> (Edit),{' '}
                  <strong className="text-foreground">Plus</strong> (Create),{' '}
                  <strong className="text-foreground">Trash</strong> (Delete). Click any icon to grant/revoke in Postgres (:3010).
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px] shrink-0">
                <span>Database Sync:</span>
                <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                  <CheckCircle2Icon className="size-2.5 mr-1" />
                  Live Sync Active
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* ER Diagram View */
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <Card className="p-6 shadow-2xs border border-border/50 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">RBAC Relational Schema & ER Diagram</h3>
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                  PostgreSQL · platform_governance
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Normalized database architecture: Users ⟷ UserRoles ⟷ Roles ⟷ RolePermissions ⟷ Permissions ⟶ Resources, with Concessionaires and Ratepayer integrations.
              </p>
            </div>

            {/* Visual Schema Flow */}
            <div className="grid gap-4 md:grid-cols-5 items-stretch">
              {/* Box 1: Users */}
              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground font-mono">users</span>
                  <Badge variant="secondary" className="text-[10px]">Entity</Badge>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                  <div className="text-primary font-semibold">id: UUID (PK)</div>
                  <div>code: VARCHAR(50) (UK)</div>
                  <div>email: VARCHAR(255) (UK)</div>
                  <div>full_name: VARCHAR(150)</div>
                  <div>status: VARCHAR(20)</div>
                  <div className="pt-1 text-[10px] text-muted-foreground/80">Links: Government, Concessions, Ratepayers</div>
                </div>
              </div>

              {/* Box 2: User Roles */}
              <div className="p-4 rounded-xl border border-primary/40 bg-primary/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary font-mono">user_roles</span>
                  <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">Junction</Badge>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                  <div className="text-primary font-semibold">id: UUID (PK)</div>
                  <div>user_id: UUID (FK)</div>
                  <div>role_id: UUID (FK)</div>
                  <div>scope_level: VARCHAR(20)</div>
                  <div>scope_ref_id: UUID?</div>
                  <div>assigned_at: TIMESTAMPTZ</div>
                </div>
              </div>

              {/* Box 3: Roles */}
              <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-500/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-purple-600 dark:text-purple-400 font-mono">roles (11)</span>
                  <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-600">Entity</Badge>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                  <div className="text-purple-600 font-semibold">id: UUID (PK)</div>
                  <div>code: VARCHAR(50) (UK)</div>
                  <div>name: VARCHAR(100)</div>
                  <div>scope_level: VARCHAR(20)</div>
                  <div>is_system: BOOLEAN</div>
                </div>
              </div>

              {/* Box 4: Role Permissions */}
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-mono">role_permissions</span>
                  <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600">Junction</Badge>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                  <div className="text-emerald-600 font-semibold">(role_id, permission_id) (PK)</div>
                  <div>role_id: UUID (FK)</div>
                  <div>permission_id: UUID (FK)</div>
                  <div>granted_by: VARCHAR(100)</div>
                  <div>granted_at: TIMESTAMPTZ</div>
                </div>
              </div>

              {/* Box 5: Permissions & Resources */}
              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground font-mono">permissions & resources (16)</span>
                  <Badge variant="secondary" className="text-[10px]">Catalog</Badge>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                  <div className="text-primary font-semibold">permissions.id: UUID (PK)</div>
                  <div>resource_id: UUID (FK)</div>
                  <div>action: VARCHAR(20)</div>
                  <div>code: VARCHAR(100) (UK)</div>
                  <div className="pt-1 border-t border-border/40 text-foreground font-semibold">resources.id: UUID (PK)</div>
                  <div>code: VARCHAR(50) (UK)</div>
                  <div>name: VARCHAR(100)</div>
                </div>
              </div>
            </div>

            {/* Matrix Concept Explanation */}
            <div className="p-4 rounded-lg border border-border/40 bg-muted/10 flex flex-col gap-2">
              <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <SlidersHorizontalIcon className="size-3.5 text-primary" />
                How the Matrix Works
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every cell in the matrix represents a unique triple: <code className="text-foreground font-mono">(Role, Resource, Action)</code>.
                When you click an action icon (Eye, Pencil, Plus, Trash), the portal calls the Platform Governance API to insert or remove a row in <code className="text-foreground font-mono">role_permissions</code>.
                This controls authorization for internal government oversight officers, partner concessionaires, and citizen ratepayers across the CROIP platform.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
