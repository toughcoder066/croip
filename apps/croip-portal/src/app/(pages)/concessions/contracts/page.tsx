'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'
import { LandmarkIcon, PlusIcon, EyeIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
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

import { AssignAssemblyForm } from '@/views/concessions/assign-assembly-form'

interface ConcessionRecord {
  id: string
  code: string
  name: string
}

interface AssignmentRecord {
  id: string
  concessionId: string
  assemblyId: string
  contractStart: string
  contractEnd: string
}

export default function ContractsAndAgreementsPage() {
  const router = useRouter()

  const [concessions, setConcessions] = useState<ConcessionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [assignments, setAssignments] = useState<AssignmentRecord[]>([])

  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedConcessionId, setSelectedConcessionId] = useState('')

  // No endpoint lists contracts across all concessions at once, so we fetch each
  // concession's assignments individually and flatten — same N+1 pattern already used by
  // src/app/api/dashboard/metrics/route.ts for cross-resource aggregates in this app.
  const refreshAssignments = (list: ConcessionRecord[]) => {
    Promise.all(
      list.map(c =>
        fetch(`/api/concessions/${c.id}/assemblies`)
          .then(res => res.json())
          .then(res => (res.success && Array.isArray(res.data) ? res.data.map((a: AssignmentRecord) => ({ ...a, concessionId: c.id })) : []))
          .catch(() => [])
      )
    ).then(results => setAssignments(results.flat()))
  }

  useEffect(() => {
    setLoading(true)
    fetch('/api/concessions')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setConcessions(res.data)
          refreshAssignments(res.data)
        } else {
          toast.error(res.error || 'Failed to load concessions')
        }
      })
      .catch(() => toast.error('Failed to connect to Platform Governance'))
      .finally(() => setLoading(false))
  }, [])

  const concessionById = useMemo(() => {
    const map = new Map<string, ConcessionRecord>()

    concessions.forEach(c => map.set(c.id, c))

    return map
  }, [concessions])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Contracts & Agreements</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            MMDA territory contracts assigned to onboarded concessionaires.
          </p>
        </div>

        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <Button
            size="sm"
            className="text-xs"
            onClick={() => setAssignDialogOpen(true)}
            disabled={concessions.length === 0}
          >
            <PlusIcon className="size-3.5 mr-1.5" />
            Assign MMDA to Concession
          </Button>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">Assign MMDA Contract</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Pick the concessionaire, then the MMDA territory and contract dates.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-1.5">
              <Label htmlFor="contracts-concession" className="text-xs font-medium">Concessionaire</Label>
              <Select value={selectedConcessionId} onValueChange={val => val && setSelectedConcessionId(val)}>
                <SelectTrigger id="contracts-concession" className="w-full text-xs">
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
              <AssignAssemblyForm
                concessionId={selectedConcessionId}
                onAssigned={() => {
                  refreshAssignments(concessions)
                  setAssignDialogOpen(false)
                  setSelectedConcessionId('')
                }}
                onCancel={() => setAssignDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">Concessionaire</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">MMDA</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contract Start</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contract End</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-sm text-muted-foreground">
                    No MMDA contracts assigned yet.
                  </TableCell>
                </TableRow>
              ) : (
                assignments.map(a => (
                  <TableRow key={a.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 text-xs font-medium text-foreground">
                      {concessionById.get(a.concessionId)?.name ?? a.concessionId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <LandmarkIcon className="size-3.5 text-primary" />
                        <span className="font-mono">{a.assemblyId.slice(0, 8)}…</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(a.contractStart).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(a.contractEnd).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-center pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => router.push(`/concessions/${a.concessionId}`)}
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
