'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'
import { UsersIcon, PhoneIcon, PlusIcon, EyeIcon, SearchIcon, XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { PageLoader } from '@/components/ui/spinner'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { RegisterPersonnelForm } from '@/views/concessions/register-personnel-form'

interface ConcessionRecord {
  id: string
  code: string
  name: string
}

interface PersonnelRow {
  id: string
  externalStaffRef: string
  fullName: string
  phone: string
  status: string
  concessionId: string
  concessionName: string
}

export default function ConcessionPersonnelPage() {
  const router = useRouter()

  const [concessions, setConcessions] = useState<ConcessionRecord[]>([])
  const [rows, setRows] = useState<PersonnelRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const [selectedConcessionId, setSelectedConcessionId] = useState('')

  const loadAll = async () => {
    setLoading(true)

    try {
      const concRes = await fetch('/api/concessions')
      const concJson = await concRes.json()

      if (!concJson.success || !Array.isArray(concJson.data)) {
        toast.error(concJson.error || 'Failed to load concessions')
        setLoading(false)

        return
      }

      const concessionList: ConcessionRecord[] = concJson.data

      setConcessions(concessionList)

      // Platform Governance only exposes personnel per concession (GET /v1/concessions/:id/personnel) —
      // aggregate across every onboarded concession to build this directory.
      const results = await Promise.all(
        concessionList.map(async c => {
          const res = await fetch(`/api/concessions/${c.id}/personnel`)
          const json = await res.json()

          if (!json.success || !Array.isArray(json.data)) return []

          return json.data.map((p: any) => ({ ...p, concessionId: c.id, concessionName: c.name })) as PersonnelRow[]
        })
      )

      setRows(results.flat())
    } catch {
      toast.error('Failed to load concession personnel')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const filteredRows = useMemo(() => {
    const q = search.toLowerCase()

    return rows.filter(
      r =>
        r.fullName.toLowerCase().includes(q) ||
        r.externalStaffRef.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.concessionName.toLowerCase().includes(q)
    )
  }, [rows, search])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Concession Personnel</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            External field agents registered across all onboarded concessionaires.
          </p>
        </div>

        <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
          <Button
            size="sm"
            className="text-xs"
            onClick={() => setRegisterDialogOpen(true)}
            disabled={concessions.length === 0}
          >
            <PlusIcon className="size-3.5 mr-1.5" />
            Register Agent
          </Button>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">Register Field Personnel</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Choose the concessionaire this agent works for.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-1.5">
              <Label htmlFor="personnel-concession" className="text-xs font-medium">Concessionaire</Label>
              <Select value={selectedConcessionId} onValueChange={val => val && setSelectedConcessionId(val)}>
                <SelectTrigger id="personnel-concession" className="w-full text-xs">
                  <SelectValue placeholder="Select a concessionaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {concessions.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.code} — {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {selectedConcessionId && (
              <RegisterPersonnelForm
                concessionId={selectedConcessionId}
                onRegistered={() => {
                  loadAll()
                  setRegisterDialogOpen(false)
                  setSelectedConcessionId('')
                }}
                onCancel={() => setRegisterDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <div className="border-b p-6">
          <div className="flex w-full flex-col gap-2 sm:max-w-sm">
            <Label htmlFor="search-personnel" className="text-sm font-medium">Search</Label>
            <InputGroup className="w-full">
              <InputGroupAddon align="inline-start">
                <SearchIcon className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                id="search-personnel"
                placeholder="Search by name, staff ref, phone, or concession..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-sm"
              />
              {search && (
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </InputGroupAddon>
              )}
            </InputGroup>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">Agent</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Concession</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Staff Reference</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                    No field personnel match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map(p => (
                  <TableRow key={`${p.concessionId}-${p.id}`} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                        <UsersIcon className="size-3.5 text-primary" />
                        {p.fullName}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.concessionName}</TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">{p.externalStaffRef}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <PhoneIcon className="size-3 text-muted-foreground" />
                        {p.phone}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-medium">
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => router.push(`/concessions/${p.concessionId}`)}
                        title="View Concession"
                      >
                        <EyeIcon className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
