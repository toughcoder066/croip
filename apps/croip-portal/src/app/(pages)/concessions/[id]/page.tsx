'use client'

import { useParams } from 'next/navigation'

import { ConcessionDetailView } from '@/views/concessions/concession-detail-view'

export default function ConcessionDetailPage() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  return <ConcessionDetailView concessionId={id} />
}
