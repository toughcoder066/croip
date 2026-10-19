import type { ReactNode } from 'react'

// Component Imports
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CediIcon } from '@/components/icons/CediIcon'

// Statistics card data type
type StatisticsCardProps = {
  icon: ReactNode
  value: string
  title: string
  changePercentage: string
  comparisonText?: string
  isCurrency?: boolean
  className?: string
}

const StatisticsCard = ({
  icon,
  value,
  title,
  changePercentage,
  comparisonText = 'vs previous fiscal period',
  isCurrency,
  className
}: StatisticsCardProps) => {
  const showCedi = isCurrency || value.includes('GH₵') || value.includes('₵')
  const displayValue = value.replace(/GH₵\s*|₵\s*/, '')

  return (
    <Card className={className}>
      <CardHeader className='flex items-center gap-3'>
        <div className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-sm'>
          {icon}
        </div>
        <div className='flex items-center gap-1 text-2xl font-bold'>
          {showCedi && <CediIcon className='size-5 text-primary shrink-0' />}
          <span>{displayValue}</span>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-1.5'>
        <span className='text-sm font-semibold text-foreground'>{title}</span>
        <p className='flex items-center gap-1.5 text-xs'>
          <span className='font-medium text-emerald-600 dark:text-emerald-400'>{changePercentage}</span>
          <span className='text-muted-foreground'>{comparisonText}</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
