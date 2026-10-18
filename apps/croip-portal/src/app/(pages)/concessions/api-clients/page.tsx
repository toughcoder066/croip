'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'
import { KeyRoundIcon, EyeIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

import { ProvisionApiClientDialog } from '@/views/concessions/provision-api-client-dialog'

interface ConcessionRecord {
  id: string
  code: string
  name: string
}

interface ApiClientRecord {
  id: string
  concessionId: string
  clientId: string
  status: string
  expiresAt: string
}

export default function ApiClientsAndKeysPage() {
  const router = useRouter()

  const [concessions, setConcessions] = useState<ConcessionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<ApiClientRecord[]>([])
  const [provisionConcessionId, setProvisionConcessionId] = useState('')

  // No endpoint lists API clients across all concessions at once, so we fetch each
  // concession's clients individually and flatten — same N+1 pattern already used by
  // src/app/api/dashboard/metrics/route.ts for cross-resource aggregates in this app.
  // Secrets are never part of this response — see provision-api-client-dialog.tsx.
  const refreshClients = (list: ConcessionRecord[]) => {
    Promise.all(
      list.map(c =>
        fetch(`/api/concessions/${c.id}/api-clients`)
          .then(res => res.json())
          .then(res => (res.success && Array.isArray(res.data) ? res.data.map((cl: ApiClientRecord) => ({ ...cl, concessionId: c.id })) : []))
          .catch(() => [])
      )
    ).then(results => setClients(results.flat()))
  }

  useEffect(() => {
    setLoading(true)
    fetch('/api/concessions')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setConcessions(res.data)
          refreshClients(res.data)
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">API Clients & Keys</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Machine-to-machine credentials issued to concessionaire backends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={provisionConcessionId} onValueChange={val => val && setProvisionConcessionId(val)}>
            <SelectTrigger className="w-56 text-xs">
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
          {provisionConcessionId && (
            <ProvisionApiClientDialog
              concessionId={provisionConcessionId}
              buttonLabel="Provision New Client"
              onProvisioned={() => refreshClients(concessions)}
            />
          )}
        </div>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">Client ID</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Concessionaire</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expires</TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-sm text-muted-foreground">
                    No API clients issued yet.
                  </TableCell>
                </TableRow>
              ) : (
                clients.map(c => (
                  <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-foreground">
                        <KeyRoundIcon className="size-3.5 text-primary" />
                        {c.clientId}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {concessionById.get(c.concessionId)?.name ?? c.concessionId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-medium">
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(c.expiresAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-center pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => router.push(`/concessions/${c.concessionId}`)}
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
