'use client'

import { use } from 'react'

import { PropertyDetailView } from '@/views/properties/property-detail-view'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PropertyDetailPage({ params }: PageProps) {
  const { id } = use(params)

  return <PropertyDetailView propertyId={id} />
}
