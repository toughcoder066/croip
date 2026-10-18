import { EllipsisVerticalIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react'

// Component Imports
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { CediIcon } from '@/components/icons/CediIcon'

const listItems = ['Export MMDA Report', 'Refresh Data', 'Audit Breakdown']

type Props = {
  title: string
  earning: number | string
  trend: 'up' | 'down'
  percentage: number
  comparisonText: string
  earningData: {
    img?: string
    avatarText?: string
    platform: string
    technologies: string
    earnings: string
    progressPercentage: number
  }[]
  className?: string
}

const TotalEarningCard = ({ earningData, title, earning, trend, percentage, comparisonText, className }: Props) => {
  return (
    <Card className={className}>
      <CardContent className='flex flex-col gap-6'>
        <span className='flex items-center justify-between'>
          <div className='text-lg font-semibold'>{title}</div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant='ghost' size='icon' className='text-muted-foreground size-6 rounded-full' />}
            >
              <EllipsisVerticalIcon />
              <span className='sr-only'>Menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuGroup>
                {listItems.map((item, index) => (
                  <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <span className='text-2xl font-semibold inline-flex items-center gap-1.5'>
              <CediIcon className='size-5 text-primary shrink-0' />
              <span>{typeof earning === 'number' ? earning.toLocaleString('en-GH') : earning}</span>
            </span>
            <span className='flex items-center gap-1'>
              {trend === 'up' ? <ChevronUpIcon className='size-4 text-emerald-600' /> : <ChevronDownIcon className='size-4 text-destructive' />}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-destructive'}`}>{percentage}%</span>
            </span>
          </div>
          <span className='text-muted-foreground text-sm'>{comparisonText}</span>
        </div>
      </CardContent>
      <CardContent className='flex flex-1 flex-col gap-4'>
        {earningData.length > 0 ? (
          <div className='flex flex-1 flex-col justify-evenly gap-4'>
            {earningData.map((item, index) => (
              <div key={index} className='flex items-center justify-between gap-2.5'>
                <div className='flex items-center justify-between gap-2.5'>
                  <Avatar className='size-11 rounded-sm after:rounded-[inherit] after:border-0 border border-border/50'>
                    <AvatarFallback className='bg-primary/10 text-primary font-bold text-xs shrink-0 rounded-sm'>
                      {item.img ? (
                        <img src={item.img} alt={item.platform} className='size-6' />
                      ) : (
                        item.avatarText || 'GH'
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col gap-1'>
                    <span className='text-base font-medium'>{item.platform}</span>
                    <span className='text-muted-foreground text-sm'>{item.technologies}</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <p className='text-sm font-semibold flex items-center justify-end gap-1'>
                    <CediIcon className='size-3 text-muted-foreground shrink-0' />
                    <span>{item.earnings.replace(/^GH₵\s*/, '')}</span>
                  </p>
                  <Progress value={item.progressPercentage} className='w-36 **:data-[slot=progress-track]:h-1.5' />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-1 flex-col items-center justify-center py-6 text-center text-muted-foreground text-sm'>
            <span>No concessionaires registered in Platform Governance.</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TotalEarningCard
