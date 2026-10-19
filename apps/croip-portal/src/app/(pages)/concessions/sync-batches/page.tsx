'use client'

import { DatabaseZapIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export default function DataSyncBatchesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="pb-2 border-b border-border/40">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Data Sync Batches</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Bulk data synchronization jobs between concessionaire backends and Platform Governance.
        </p>
      </div>

      <Card className="shadow-2xs">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
            <DatabaseZapIcon className="size-6" />
          </div>
          <p className="text-sm font-medium text-foreground">Not available yet</p>
          <p className="text-xs text-muted-foreground max-w-md">
            Platform Governance (:3010) does not yet expose a data sync batch resource or endpoint. This screen will
            come online once the backend ships batch ingestion/export tracking for concessionaire data sync jobs.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
