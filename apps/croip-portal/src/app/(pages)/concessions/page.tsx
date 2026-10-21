'use client'

import { useEffect, useState } from 'react'

import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { PageLoader } from '@/components/ui/spinner'
import { PurgeConfirmDialog } from '@/components/admin/purge-confirm-dialog'

import { ConcessionsDataTable, type ConcessionRecord } from '@/views/concessions/concessions-data-table'
import { CreateConcessionWizard } from '@/views/concessions/create-concession-wizard'

export default function ConcessionsRegistryPage() {
  const [concessions, setConcessions] = useState<ConcessionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [wizardOpen, setWizardOpen] = useState(false)

  const fetchConcessions = () => {
    setLoading(true)
    fetch('/api/concessions')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setConcessions(res.data)
        } else {
          toast.error(res.error || 'Failed to load concessions')
        }
      })
      .catch(() => toast.error('Failed to connect to Platform Governance'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchConcessions()
  }, [])

  if (loading && concessions.length === 0) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Concession Registry</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Partner revenue concessionaires onboarded in Platform Governance (:3010).
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <PurgeConfirmDialog
            target="concessions"
            onSuccess={fetchConcessions}
          />
          <Button size="sm" className="text-xs" onClick={() => setWizardOpen(true)}>
            <PlusIcon className="size-3.5 mr-1.5" />
            Onboard Concession
          </Button>
        </div>
      </div>


      <ConcessionsDataTable data={concessions} loading={loading} onRefresh={fetchConcessions} />

      <CreateConcessionWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        onComplete={fetchConcessions}
      />
    </div>
  )
}
