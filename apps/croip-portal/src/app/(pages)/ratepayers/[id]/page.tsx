'use client'

import { use } from 'react'

import { RatepayerDetailView } from '@/views/ratepayers/ratepayer-detail-view'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function RatepayerDetailPage({ params }: PageProps) {
  const { id } = use(params)

  return <RatepayerDetailView ratepayerId={id} />
}
