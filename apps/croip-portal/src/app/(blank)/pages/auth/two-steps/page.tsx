import { Suspense } from 'react'
import TwoSteps from '@/views/pages/auth/two-steps'

const TwoStepsPage = () => {
  return (
    <Suspense fallback={<div className='flex min-h-screen items-center justify-center text-sm text-muted-foreground'>Loading verification...</div>}>
      <TwoSteps />
    </Suspense>
  )
}

export default TwoStepsPage
