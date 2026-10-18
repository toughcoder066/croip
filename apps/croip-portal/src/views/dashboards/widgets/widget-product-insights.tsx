'use client'

// Third-party Imports
import { Bar, BarChart, XAxis } from 'recharts'

// Component Imports
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

export type InsightBar = { label: string; value: number }

const primaryChartConfig = {
  value: { label: 'Count', color: 'var(--primary)' }
} satisfies ChartConfig

const mutedChartConfig = {
  value: { label: 'Count', color: 'color-mix(in oklab, var(--primary) 25%, transparent)' }
} satisfies ChartConfig

type ProductInsightsProps = {
  className?: string
  title: string
  subtitle: string
  badge?: string
  metric1Label: string
  metric1Value: string
  metric1Chart?: InsightBar[]
  metric2Label: string
  metric2Value: string
  metric2Chart?: InsightBar[]
}

const MiniBars = ({ data, config }: { data: InsightBar[]; config: ChartConfig }) =>
  data.length ? (
    <ChartContainer config={config} className='min-h-13 max-w-24'>
      <BarChart accessibilityLayer data={data} barSize={8}>
        <XAxis dataKey='label' hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator />} />
        <Bar dataKey='value' fill='var(--color-value)' radius={2} />
      </BarChart>
    </ChartContainer>
  ) : null

const ProductInsightsCard = ({
  className,
  title,
  subtitle,
  badge = 'CROIP',
  metric1Label,
  metric1Value,
  metric1Chart = [],
  metric2Label,
  metric2Value,
  metric2Chart = []
}: ProductInsightsProps) => {
  return (
    <Card className={className}>
      <CardHeader className='flex justify-between pb-3'>
        <div className='flex flex-col gap-1'>
          <span className='text-lg font-semibold'>{title}</span>
          <span className='text-muted-foreground text-sm'>{subtitle}</span>
        </div>
        <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl text-xs font-bold'>
          {badge}
        </div>
      </CardHeader>
      <div className='px-6'>
        <Separator />
      </div>
      <CardContent className='pt-4 space-y-4'>
        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>{metric1Label}</span>
            <span className='text-2xl font-semibold'>{metric1Value}</span>
          </div>
          <MiniBars data={metric1Chart} config={primaryChartConfig} />
        </div>

        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>{metric2Label}</span>
            <span className='text-2xl font-semibold'>{metric2Value}</span>
          </div>
          <MiniBars data={metric2Chart} config={mutedChartConfig} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductInsightsCard
