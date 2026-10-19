'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  SearchIcon,
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  EllipsisVerticalIcon,
  CopyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  UsersIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  ShieldIcon,
  MailIcon,
  PhoneIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  KeyRoundIcon,
  EyeIcon
} from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export interface GovernanceUser {
  id: string
  code: string
  fullName: string
  email: string
  phone?: string | null
  status: string
  zitadelId?: string
  countryId?: string | null
  createdAt?: string
  roles?: Array<{
    id: string
    code: string
    name: string
    scopeLevel?: string
  }>
}

const STANDARD_ROLES = [
  { id: 'SUPER_ADMIN', name: 'Super Administrator', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20' },
  { id: 'EXECUTIVE_OVERSIGHT', name: 'Executive Oversight', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
  { id: 'CONCESSIONAIRE_MANAGER', name: 'Concessionaire Manager', color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20' },
  { id: 'CONCESSIONAIRE_ADMIN', name: 'Concessionaire Admin', color: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20' },
  { id: 'CONCESSIONAIRE_BILLING', name: 'Concessionaire Billing', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
  { id: 'RATE_CARD_VERIFIER', name: 'Rate Card Verifier', color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20' },
  { id: 'FINANCE_OFFICER', name: 'Finance Officer', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  { id: 'FINANCE_APPROVER', name: 'Finance Approver', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
  { id: 'AUDITOR', name: 'Auditor General Lead', color: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20' },
  { id: 'SUPPORT_OFFICER', name: 'Dispute & Support Officer', color: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20' },
  { id: 'RATEPAYER', name: 'Citizen Ratepayer', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20' }
]

export function UserDirectoryView() {
  const [users, setUsers] = useState<GovernanceUser[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')

  // Selection & Pagination
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  // Create Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formCode, setFormCode] = useState('')
  const [formRole, setFormRole] = useState('SUPER_ADMIN')
  const [submitting, setSubmitting] = useState(false)

  // Edit Modal
  const [editRecord, setEditRecord] = useState<GovernanceUser | null>(null)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editStatus, setEditStatus] = useState('ACTIVE')
  const [editRole, setEditRole] = useState('SUPER_ADMIN')
  const [savingEdit, setSavingEdit] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/users')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setUsers(json.data)
      } else {
        toast.error(json.error || 'Failed to load user directory')
      }
    } catch {
      toast.error('Network error connecting to Platform Governance service')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Auto-generate code when name changes in create form
  const handleNameChange = (val: string) => {
    setFormName(val)
    if (!formCode || formCode.startsWith('USR-')) {
      const initials = val
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
      const rand = Math.floor(100 + Math.random() * 900)
      if (initials) {
        setFormCode(`USR-${initials}-${rand}`)
      }
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formEmail.trim()) {
      toast.error('Full Name and Email are required')
      return
    }

    try {
      setSubmitting(true)
      const finalCode = formCode.trim() || `USR-${Date.now().toString().slice(-4)}`
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: finalCode,
          fullName: formName.trim(),
          email: formEmail.trim(),
          phone: formPhone.trim() || null,
          roleCode: formRole
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success(`Officer "${formName}" registered successfully in Platform Governance`)
        setIsCreateOpen(false)
        setFormName('')
        setFormEmail('')
        setFormPhone('')
        setFormCode('')
        fetchUsers()
      } else {
        toast.error(json.error || 'Failed to register officer')
      }
    } catch {
      toast.error('Error connecting to governance service')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editRecord) return
    try {
      setSavingEdit(true)
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editRecord.id,
          fullName: editName.trim(),
          phone: editPhone.trim() || null,
          status: editStatus,
          roleCode: editRole
        })
      })
      const json = await res.json()
      if (json.success) {
        toast.success(`Officer "${editName}" updated successfully`)
        setEditRecord(null)
        fetchUsers()
      } else {
        toast.error(json.error || 'Failed to update officer')
      }
    } catch {
      toast.error('Error saving officer changes')
    } finally {
      setSavingEdit(false)
    }
  }

  const handleDeleteUser = async (user: GovernanceUser) => {
    if (confirm(`Remove officer "${user.fullName}" (${user.code}) from Platform Governance?`)) {
      try {
        const res = await fetch(`/api/users?id=${user.id}`, { method: 'DELETE' })
        const json = await res.json()
        if (json.success) {
          toast.success(`Officer "${user.fullName}" removed`)
          setUsers((prev) => prev.filter((u) => u.id !== user.id))
        } else {
          toast.error(json.error || 'Failed to delete officer')
        }
      } catch {
        toast.error('Network error deleting officer')
      }
    }
  }

  // Derive role based on user.roles or fallback
  const getUserRole = (user: GovernanceUser) => {
    if (user.roles && user.roles.length > 0) {
      const match = STANDARD_ROLES.find((r) => r.id === user.roles![0].code)
      if (match) return match
    }
    if (user.code.includes('SUPERADMIN') || user.email.includes('superuser')) return STANDARD_ROLES[0]
    if (user.code.includes('OVERSIGHT') || user.email.includes('oversight')) return STANDARD_ROLES[1]
    if (user.code.includes('FINANCE') || user.email.includes('finance')) return STANDARD_ROLES[2]
    if (user.code.includes('AUDIT') || user.email.includes('audit')) return STANDARD_ROLES[6]
    if (user.code.includes('CONCESSION') || user.email.includes('concession')) return STANDARD_ROLES[4]
    return STANDARD_ROLES[0]
  }

  // Stats calculation
  const stats = useMemo(() => {
    const total = users.length
    const active = users.filter((u) => (u.status || 'ACTIVE').toUpperCase() === 'ACTIVE').length
    const inactive = users.filter((u) => (u.status || 'ACTIVE').toUpperCase() !== 'ACTIVE').length
    return { total, active, inactive }
  }, [users])

  // Filtered dataset
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.code.toLowerCase().includes(search.toLowerCase()) ||
        (u.phone || '').includes(search)

      const status = (u.status || 'ACTIVE').toUpperCase()
      const matchesStatus = statusFilter === 'all' || status === statusFilter.toUpperCase()

      const role = getUserRole(u)
      const matchesRole = roleFilter === 'all' || role.id === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })
  }, [users, search, statusFilter, roleFilter])

  // Pagination calculation
  const totalEntries = filteredUsers.length
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1
  const validCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (validCurrentPage - 1) * rowsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage)
  const showingFrom = totalEntries === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + rowsPerPage, totalEntries)

  const allCurrentPageSelected =
    paginatedUsers.length > 0 && paginatedUsers.every((r) => selectedIds.has(r.id))

  const toggleSelectAll = () => {
    const next = new Set(selectedIds)
    if (allCurrentPageSelected) {
      paginatedUsers.forEach((r) => next.delete(r.id))
    } else {
      paginatedUsers.forEach((r) => next.add(r.id))
    }
    setSelectedIds(next)
  }

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">User Directory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage Central Platform oversight officers, revenue concessionaire liaisons, and audit personnel in Platform Governance (:3010).
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <Button size="sm" className="text-xs" onClick={() => setIsCreateOpen(true)}>
              <PlusIcon className="size-3.5 mr-1.5" />
              Register Officer
            </Button>
            <DialogContent className="sm:max-w-md">
              <form onSubmit={handleCreateUser}>
                <DialogHeader>
                  <DialogTitle className="text-base font-semibold">Register Oversight Officer</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Onboard a government administrator or revenue concessionaire staff member to Platform Governance.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3.5 py-4 text-xs">
                  <div className="grid gap-1.5">
                    <Label htmlFor="officer-name" className="text-xs font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="officer-name"
                      placeholder="e.g. Kwaku Mensah"
                      value={formName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="officer-email" className="text-xs font-medium">
                      Official Email Address
                    </Label>
                    <Input
                      id="officer-email"
                      type="email"
                      placeholder="e.g. kwaku.mensah@croip.gov.gh"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="officer-code" className="text-xs font-medium">
                        Officer Code
                      </Label>
                      <Input
                        id="officer-code"
                        placeholder="USR-KM-101"
                        value={formCode}
                        onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                        className="font-mono text-xs uppercase"
                        required
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <Label htmlFor="officer-phone" className="text-xs font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="officer-phone"
                        placeholder="+233 24 000 0000"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="officer-role" className="text-xs font-medium">
                      Designated Role
                    </Label>
                    <Select value={formRole} onValueChange={(val: string | null) => val && setFormRole(val)}>
                      <SelectTrigger id="officer-role" className="w-full text-xs">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {STANDARD_ROLES.map((r) => (
                          <SelectItem key={r.id} value={r.id} className="text-xs">
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter className="gap-3 sm:gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCreateOpen(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={submitting} className="text-xs">
                    {submitting ? 'Registering...' : 'Register Officer'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <UsersIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Staff</p>
              <p className="text-xl font-bold text-foreground">{stats.total} Configured</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2Icon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Officers</p>
              <p className="text-xl font-bold text-foreground">{stats.active} Operational</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <ClockIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Suspended / Inactive</p>
              <p className="text-xl font-bold text-foreground">{stats.inactive} Restricted</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheckIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Identity Federation</p>
              <p className="text-xl font-bold text-foreground">Zitadel OIDC</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table Section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Data table with Filters</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        {/* Top Filters */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Control 1: Search */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="search-user" className="text-sm font-medium">
                Search
              </Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-user"
                  placeholder="Search officer name, email, or code..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="text-sm"
                />
                {search && (
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('')
                        setCurrentPage(1)
                      }}
                      className="text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <XIcon className="size-3.5" />
                    </button>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>

            {/* Control 2: Select Status */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-status" className="text-sm font-medium">
                Select Status
              </Label>
              <Select
                value={statusFilter}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setStatusFilter(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-status" className="w-full">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                    <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Control 3: Select Role */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-role" className="text-sm font-medium">
                Select Role
              </Label>
              <Select
                value={roleFilter}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setRoleFilter(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-role" className="w-full">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Roles</SelectItem>
                    {STANDARD_ROLES.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12 pl-6">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all rows on current page"
                  />
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Officer
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Contact
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Role
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>

                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto py-8">
                      <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <UserPlusIcon className="size-6" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">No platform officers registered</h3>
                      <p className="text-xs text-muted-foreground">
                        The platform_governance database currently contains zero records. Click "Register Officer" above to onboard your first platform officer.
                      </p>
                      <Button size="sm" className="text-xs mt-2" onClick={() => setIsCreateOpen(true)}>
                        <PlusIcon className="size-3.5 mr-1.5" />
                        Register Officer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((row) => {
                  const isSelected = selectedIds.has(row.id)
                  const role = getUserRole(row)
                  const status = (row.status || 'ACTIVE').toUpperCase()
                  const initials = row.fullName
                    .split(/\s+/)
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)

                  return (
                    <TableRow
                      key={row.id}
                      data-state={isSelected ? 'selected' : undefined}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* Checkbox */}
                      <TableCell className="pl-6">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelectRow(row.id)}
                          aria-label={`Select ${row.fullName}`}
                        />
                      </TableCell>

                      {/* Name & Code */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-xs text-foreground">{row.fullName}</span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {row.code} • UUID: {row.id.slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact */}
                      <TableCell>
                        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MailIcon className="size-3 text-muted-foreground/70 shrink-0" />
                            <span>{row.email}</span>
                          </div>
                          {row.phone && (
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <PhoneIcon className="size-3 text-muted-foreground/70 shrink-0" />
                              <span>{row.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Role Badge */}
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] font-medium ${role.color}`}>
                          <ShieldIcon className="size-2.5 mr-1" />
                          {role.name}
                        </Badge>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        {status === 'ACTIVE' ? (
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium"
                          >
                            <CheckCircle2Icon className="size-2.5 mr-1" />
                            ACTIVE
                          </Badge>
                        ) : status === 'PENDING_ACTIVATION' ? (
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium"
                          >
                            <ClockIcon className="size-2.5 mr-1" />
                            PENDING INVITE
                          </Badge>
                        ) : status === 'SUSPENDED' || status === 'LOCKED_OUT' ? (
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium"
                          >
                            <ClockIcon className="size-2.5 mr-1" />
                            {status === 'LOCKED_OUT' ? 'LOCKED OUT' : 'SUSPENDED'}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium"
                          >
                            <XCircleIcon className="size-2.5 mr-1" />
                            INACTIVE
                          </Badge>
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-center pr-6">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            render={<Link href={`/apps/users/profile/${row.id}`} />}
                            nativeButton={false}
                            className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            title="View Profile"
                          >
                            <EyeIcon className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditRecord(row)
                              setEditName(row.fullName)
                              setEditPhone(row.phone || '')
                              setEditStatus((row.status || 'ACTIVE').toUpperCase())
                              setEditRole(getUserRole(row).id)
                            }}
                            className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            title="Edit Officer"
                          >
                            <PencilIcon className="size-4" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-muted-foreground hover:text-foreground"
                                  title="More options"
                                />
                              }
                            >
                              <EllipsisVerticalIcon className="size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditRecord(row)
                                  setEditName(row.fullName)
                                  setEditPhone(row.phone || '')
                                  setEditStatus((row.status || 'ACTIVE').toUpperCase())
                                  setEditRole(getUserRole(row).id)
                                }}
                              >
                                <PencilIcon className="size-4 mr-2" />
                                Edit Officer Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(row.id, 'UUID')}>
                                <CopyIcon className="size-4 mr-2" />
                                Copy Database UUID
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(row.email, 'Email')}>
                                <MailIcon className="size-4 mr-2" />
                                Copy Email Address
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(row)}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                              >
                                <Trash2Icon className="size-4 mr-2" />
                                Delete Record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer: Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-muted/10 text-sm">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Showing <span className="font-semibold text-foreground">{showingFrom}</span> to{' '}
            <span className="font-semibold text-foreground">{showingTo}</span> of{' '}
            <span className="font-semibold text-foreground">{totalEntries}</span> entries
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={validCurrentPage <= 1}
              className="gap-1 text-xs h-8"
            >
              <ChevronLeftIcon className="size-4" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = page === validCurrentPage
              return (
                <Button
                  key={page}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`size-8 p-0 text-xs ${
                    isActive ? 'font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {page}
                </Button>
              )
            })}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={validCurrentPage >= totalPages}
              className="gap-1 text-xs h-8"
            >
              Next
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Edit Modal Dialog */}
      <Dialog open={!!editRecord} onOpenChange={(open) => !open && setEditRecord(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Edit Officer Profile</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update officer name, contact telephone, and operational account status.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3.5 py-2 text-xs">
            <div className="grid gap-1.5">
              <Label htmlFor="edit-officer-code" className="text-xs font-medium">
                Officer Code
              </Label>
              <Input
                id="edit-officer-code"
                value={editRecord?.code || ''}
                disabled
                className="font-mono text-xs bg-muted/40 cursor-not-allowed uppercase"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="edit-officer-name" className="text-xs font-medium">
                Full Name
              </Label>
              <Input
                id="edit-officer-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Officer Name"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="edit-officer-phone" className="text-xs font-medium">
                Phone Number
              </Label>
              <Input
                id="edit-officer-phone"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="+233 24 000 0000"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="edit-officer-status" className="text-xs font-medium">
                Account Status
              </Label>
              <Select
                value={editStatus}
                onValueChange={(val: string | null) => {
                  if (val) setEditStatus(val)
                }}
              >
                <SelectTrigger id="edit-officer-status" className="w-full text-xs">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="edit-officer-role" className="text-xs font-medium">
                Designated Role
              </Label>
              <Select
                value={editRole}
                onValueChange={(val: string | null) => {
                  if (val) setEditRole(val)
                }}
              >
                <SelectTrigger id="edit-officer-role" className="w-full text-xs">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {STANDARD_ROLES.map((r) => (
                    <SelectItem key={r.id} value={r.id} className="text-xs">
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditRecord(null)}
              className="text-xs"
              disabled={savingEdit}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit} disabled={savingEdit} className="text-xs">
              {savingEdit ? <Spinner className="size-3 mr-1.5" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
