import { BillDetailView } from '@/views/billing/bill-detail-view'

interface PageProps {
  params: Promise<{ billNumber: string }>
}

export default async function BillDetailPage({ params }: PageProps) {
  const { billNumber } = await params
  return <BillDetailView billNumber={billNumber} />
}
