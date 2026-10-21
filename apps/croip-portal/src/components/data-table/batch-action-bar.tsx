'use client'

import { Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export interface BatchActionBarProps {
  selectedCount: number
  onDelete: () => void | Promise<void>
  onClear: () => void
  isDeleting?: boolean
  entityName?: string
  actionLabel?: string
}

export function BatchActionBar({
  selectedCount,
  onDelete,
  onClear,
  isDeleting = false,
  entityName = 'item',
  actionLabel
}: BatchActionBarProps) {
  if (selectedCount <= 0) return null

  const noun = selectedCount === 1 ? entityName : `${entityName}s`
  const deleteBtnText = actionLabel || `Delete Selected (${selectedCount})`

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-2.5 bg-muted/60 border-b animate-in fade-in duration-200 transition-all">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          {selectedCount}
        </span>
        <span className="text-foreground">
          {selectedCount} {noun} selected
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          size="sm"
          disabled={isDeleting}
          onClick={onDelete}
          className="h-8 gap-1.5 text-xs font-semibold cursor-pointer"
        >
          {isDeleting ? <Spinner className="size-3.5 mr-1" /> : <Trash2Icon className="size-3.5" />}
          {isDeleting ? 'Deleting...' : deleteBtnText}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={isDeleting}
          onClick={onClear}
          className="h-8 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
