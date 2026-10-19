'use client'

// Third-party Imports
import type { ReactNode } from 'react'
import { Bar, BarChart, Label, Pie, PieChart } from 'recharts'

// Component Imports
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { CediIcon } from '@/components/icons/CediIcon'

export type MetricTile = { icon: ReactNode; title: string; value: string; isCurrency?: boolean }
export type DonutSlice = { key: string; label: string; value: number }
export type FooterHighlight = { icon: ReactNode; label: string }

const SLICE_SHADES = [
  'var(--primary)',
  'color-mix(in oklab, var(--primary) 65%, transparent)',
  'color-mix(in oklab, var(--primary) 40%, transparent)',
  'color-mix(in oklab, var(--primary) 20%, transparent)'
]

const TOTAL_BARS = 24

type SalesMetricsProps = {
  className?: string
  title: string
  badge?: string
  entityName: string
  entitySubtitle: string
  metrics: MetricTile[]
  donutTitle: string
  donutData: DonutSlice[]
  donutCenterValue: string
  donutCenterLabel: string
  donutFooterLabel: string
  donutFooterValue: string
  progressTitle: string
  progressPercentage: number
  progressCaption: string
  footerTitle: string
  footerDescription: string
  footerHighlights?: FooterHighlight[]
}

const SalesMetricsCard = ({
  className,
  title,
  badge = 'GH',
  entityName,
  entitySubtitle,
  metrics,
  donutTitle,
  donutData,
  donutCenterValue,
  donutCenterLabel,
  donutFooterLabel,
  donutFooterValue,
  progressTitle,
  progressPercentage,
  progressCaption,
  footerTitle,
  footerDescription,
  footerHighlights = []
}: SalesMetricsProps) => {
  const pct = Math.max(0, Math.min(100, Math.round(progressPercentage)))
  const filledBars = Math.round((pct * TOTAL_BARS) / 100)
  const progressBars = Array.from({ length: TOTAL_BARS }, (_, i) => ({ step: i + 1, value: i < filledBars ? 1 : 0.0001 }))

  const donutConfig = donutData.reduce<ChartConfig>(
    (acc, slice, i) => ({ ...acc, [slice.key]: { label: slice.label, color: SLICE_SHADES[i % SLICE_SHADES.length] } }),
    { value: { label: 'Count' } }
  )

  const pieData = donutData.filter(s => s.value > 0).map(s => ({ ...s, fill: `var(--color-${s.key})` }))

  return (
    <Card className={className}>
      <CardContent>
        <div className='grid gap-6 lg:grid-cols-5'>
          <div className='flex flex-col justify-between gap-7 lg:col-span-3'>
            <span className='text-lg font-semibold'>{title}</span>
            <div className='flex items-center gap-3'>
              <div className='bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl text-base font-bold shadow-xs'>
                {badge}
              </div>
              <div className='flex flex-col gap-0.5'>
                <span className='text-xl font-medium'>{entityName}</span>
                <span className='text-muted-foreground text-sm'>{entitySubtitle}</span>
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              {metrics.map((metric, index) => (
                <Card key={index} className='ring-foreground/10 py-2 shadow-none ring-1'>
                  <CardContent className='flex items-center gap-3 px-4'>
                    <Avatar className='rounded-sm after:border-0'>
                      <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>{metric.icon}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-0.5'>
                      <span className='text-muted-foreground text-sm font-medium'>{metric.title}</span>
                      <span className='inline-flex items-center gap-1 text-lg font-medium'>
                        {metric.isCurrency && <CediIcon className='text-primary size-4 shrink-0' />}
                        {metric.value}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className='ring-foreground/10 justify-between gap-4 shadow-none ring-1 lg:col-span-2'>
            <CardHeader className='gap-1'>
              <CardTitle className='text-lg font-semibold'>{donutTitle}</CardTitle>
            </CardHeader>

            <CardContent className='space-y-4'>
              <ChartContainer config={donutConfig} className='h-38.5 w-full'>
                <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey='key' />} />
                  <Pie
                    data={pieData.length ? pieData : [{ key: 'none', label: 'No data', value: 1, fill: 'var(--muted)' }]}
                    dataKey='value'
                    nameKey='key'
                    startAngle={300}
                    endAngle={660}
                    innerRadius={58}
                    outerRadius={75}
                    paddingAngle={2}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 12} className='fill-card-foreground text-lg font-medium'>
                                {donutCenterValue}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 19} className='fill-muted-foreground text-sm'>
                                {donutCenterLabel}
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className='flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs'>
                {donutData.map((slice, i) => (
                  <span key={slice.key} className='text-muted-foreground inline-flex items-center gap-1.5'>
                    <span className='size-2 rounded-full' style={{ background: SLICE_SHADES[i % SLICE_SHADES.length] }} />
                    {slice.label} ({slice.value})
                  </span>
                ))}
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground text-sm'>{donutFooterLabel}</span>
                <span className='text-lg font-semibold'>{donutFooterValue}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardContent>
        <Card className='ring-foreground/10 shadow-none ring-1'>
          <CardContent className='grid gap-6 md:grid-cols-12 items-center'>
            <div className='flex flex-col justify-center gap-2 md:col-span-4 border-b md:border-b-0 md:border-r border-border/50 pb-4 md:pb-0 md:pr-4'>
              <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>{progressTitle}</span>
              <span className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground'>{pct}%</span>
              <span className='text-muted-foreground text-xs leading-relaxed'>{progressCaption}</span>
            </div>
            <div className='flex flex-col gap-4 md:col-span-8'>
              <div>
                <span className='font-semibold text-sm sm:text-base text-foreground'>{footerTitle}</span>
                <p className='text-muted-foreground text-xs leading-relaxed mt-0.5'>{footerDescription}</p>
              </div>
              {footerHighlights.length > 0 && (
                <div className='grid gap-3 sm:grid-cols-2'>
                  {footerHighlights.map((h, i) => (
                    <div key={i} className='flex items-center gap-2 text-xs font-medium text-foreground'>
                      {h.icon}
                      <span className='truncate'>{h.label}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className='w-full space-y-1.5 pt-1'>
                <div className='h-2.5 w-full bg-primary/10 rounded-full overflow-hidden flex items-center p-0.5'>
                  <div
                    className='h-full bg-emerald-500 rounded-full transition-all duration-500'
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className='flex justify-between items-center text-[11px] text-muted-foreground font-mono'>
                  <span>Target SLA: 99.9%</span>
                  <span className='text-emerald-600 dark:text-emerald-400 font-semibold'>{pct}% Operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default SalesMetricsCard
