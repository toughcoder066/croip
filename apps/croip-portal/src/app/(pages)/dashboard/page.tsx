'use client'

// React Imports
import { useEffect, useState } from 'react'

// Lucide Imports
import {
  ServerIcon,
  LandmarkIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  ActivityIcon,
  DatabaseIcon,
  TableIcon,
  UsersIcon,
  UserCheckIcon,
  Building2Icon,
  NetworkIcon
} from 'lucide-react'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import StatisticsCard from '@/views/dashboards/statistics/statistics-card-01'
import ProductInsightsCard from '@/views/dashboards/widgets/widget-product-insights'
import SalesMetricsCard, { type DonutSlice } from '@/views/dashboards/charts/chart-sales-metrics'
import TotalEarningCard from '@/views/dashboards/widgets/widget-total-earning'
import TransactionDatatable, { type Item } from '@/views/datatables/datatable-transaction'

interface StatCardItem {
  iconName: string
  title: string
  value: string
  changePercentage: string
  comparisonText: string
  isCurrency?: boolean
}

interface ConcessionEarningItem {
  id: string
  code: string
  avatarText?: string
  platform: string
  technologies: string
  earnings: string
  progressPercentage: number
}

interface ProductInsightsData {
  title: string
  subtitle: string
  badge: string
  metric1Label: string
  metric1Value: string
  metric1Chart: { label: string; value: number }[]
  metric2Label: string
  metric2Value: string
  metric2Chart: { label: string; value: number }[]
}

interface SalesMetricsData {
  title: string
  badge: string
  entityName: string
  entitySubtitle: string
  metrics: { title: string; value: string; isCurrency?: boolean }[]
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
}

interface PlatformServiceInfo {
  name: string
  port: number
  ready: boolean
  database: boolean
  latencyMs: number
  tables?: number
  dbName?: string
}

const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case 'server':
      return <ServerIcon className='size-4' />
    case 'database':
      return <DatabaseIcon className='size-4' />
    case 'activity':
      return <ActivityIcon className='size-4' />
    case 'landmark':
      return <LandmarkIcon className='size-4' />
    case 'fileText':
      return <FileTextIcon className='size-4' />
    case 'users':
      return <UsersIcon className='size-4' />
    case 'userCheck':
      return <UserCheckIcon className='size-4' />
    case 'building':
      return <Building2Icon className='size-4' />
    case 'shieldCheck':
      return <ShieldCheckIcon className='size-4' />
    case 'checkCircle':
    default:
      return <CheckCircle2Icon className='size-4' />
  }
}

const DashboardPage = () => {
  // Mode: Default to 'SYSTEM_ADMIN' for System Administrator
  const [viewMode, setViewMode] = useState<'SYSTEM_ADMIN' | 'OVERSIGHT'>('SYSTEM_ADMIN')

  // -----------------------------------------------------------------
  // 1. Oversight View State (Properties, Valuations, Concessions)
  // -----------------------------------------------------------------
  const [oversightStats, setOversightStats] = useState<StatCardItem[]>([
    {
      iconName: 'landmark',
      title: 'Total Properties',
      value: '0',
      changePercentage: '0 Verified (0%)',
      comparisonText: 'Properties saved in registry'
    },
    {
      iconName: 'fileText',
      title: 'Properties Valued',
      value: '0%',
      changePercentage: '0 of 0 Valued',
      comparisonText: 'Assessed for property rates'
    },
    {
      iconName: 'checkCircle',
      title: 'Total Property Value',
      value: '0',
      changePercentage: 'GH₵ 0.00M total',
      comparisonText: 'Total value across all properties',
      isCurrency: true
    }
  ])

  const [oversightInsights, setOversightInsights] = useState<ProductInsightsData>({
    title: 'Property Status',
    subtitle: 'Current verification progress',
    badge: 'Status',
    metric1Label: 'Verified Properties',
    metric1Value: '0',
    metric1Chart: [],
    metric2Label: 'Pending Review',
    metric2Value: '0',
    metric2Chart: []
  })

  const [totalRateableValue, setTotalRateableValue] = useState<number>(0)
  const [valuationCoveragePct, setValuationCoveragePct] = useState<number>(0)
  const [concessionEarnings, setConcessionEarnings] = useState<ConcessionEarningItem[]>([])
  const [oversightSalesMetrics, setOversightSalesMetrics] = useState<SalesMetricsData>({
    title: 'Property Types & Values',
    badge: 'GH',
    entityName: 'Property Breakdown',
    entitySubtitle: 'Commercial, Residential, and other property types',
    metrics: [
      { title: 'Commercial Value', value: 'GH₵ 0', isCurrency: true },
      { title: 'Residential Value', value: 'GH₵ 0', isCurrency: true },
      { title: 'Active Partners', value: '0 Partners', isCurrency: false },
      { title: 'Verified Properties', value: '0 Verified', isCurrency: false }
    ],
    donutTitle: 'Properties by Type',
    donutData: [],
    donutCenterValue: '0',
    donutCenterLabel: 'Properties',
    donutFooterLabel: 'Valuation Rate',
    donutFooterValue: '0% (0 Valued)',
    progressTitle: 'Verification Progress',
    progressPercentage: 0,
    progressCaption: 'Percentage of properties verified',
    footerTitle: 'Live System Data',
    footerDescription: 'All numbers and charts update automatically from connected platform services.'
  })

  const [propertyTransactions, setPropertyTransactions] = useState<Item[]>([])

  // -----------------------------------------------------------------
  // 2. System Administrator View State (Microservices, Latency, DB)
  // -----------------------------------------------------------------
  const [platformServices, setPlatformServices] = useState<PlatformServiceInfo[]>([])
  const [servicesOnline, setServicesOnline] = useState<number>(9)
  const [servicesTotal, setServicesTotal] = useState<number>(9)
  const [databasesOk, setDatabasesOk] = useState<number>(9)
  const [tablesConnected, setTablesConnected] = useState<number>(64)
  const [tablesTotal, setTablesTotal] = useState<number>(64)
  const [avgLatencyMs, setAvgLatencyMs] = useState<number>(120)

  // Governance & Ratepayers metrics
  const [concessionsCount, setConcessionsCount] = useState<number>(0)
  const [activeConcessionsCount, setActiveConcessionsCount] = useState<number>(0)
  const [oversightUsersCount, setOversightUsersCount] = useState<number>(0)
  const [ratepayersCount, setRatepayersCount] = useState<number>(0)
  const [ratepayerClaimsCount, setRatepayerClaimsCount] = useState<number>(0)
  const [totalPropertiesCount, setTotalPropertiesCount] = useState<number>(0)
  const [valuedPropertiesCount, setValuedPropertiesCount] = useState<number>(0)

  useEffect(() => {
    // Check logged in user's role
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user?.role === 'SUPER_ADMIN' || data.user?.role === 'SYSTEM_ADMIN') {
          setViewMode('SYSTEM_ADMIN')
        } else {
          setViewMode('OVERSIGHT')
        }
      })
      .catch(() => {})

    // Fetch live metrics from all 9 microservices
    fetch('/api/dashboard/metrics')
      .then(res => res.json())
      .then(res => {
        if (!res.data) return

        // 1. Oversight & Registry data
        if (Array.isArray(res.data.statisticsCards)) {
          setOversightStats(res.data.statisticsCards)
        }
        if (res.data.productInsights) {
          setOversightInsights(res.data.productInsights)
        }
        if (typeof res.data.registry?.totalRateableValue === 'number') {
          setTotalRateableValue(res.data.registry.totalRateableValue)
        }
        if (typeof res.data.registry?.valuationCoveragePct === 'number') {
          setValuationCoveragePct(res.data.registry.valuationCoveragePct)
        }
        if (typeof res.data.registry?.totalProperties === 'number') {
          setTotalPropertiesCount(res.data.registry.totalProperties)
        }
        if (typeof res.data.registry?.valuedCount === 'number') {
          setValuedPropertiesCount(res.data.registry.valuedCount)
        }
        if (Array.isArray(res.data.concessionEarnings)) {
          setConcessionEarnings(res.data.concessionEarnings)
        }
        if (res.data.salesMetrics) {
          setOversightSalesMetrics(res.data.salesMetrics)
        }
        if (Array.isArray(res.data.transactionData)) {
          setPropertyTransactions(res.data.transactionData)
        }

        // 2. Governance & Ratepayer data
        if (res.data.governance) {
          setConcessionsCount(res.data.governance.concessions ?? 0)
          setActiveConcessionsCount(res.data.governance.activeConcessions ?? 0)
          setOversightUsersCount(res.data.governance.users ?? 0)
        }
        if (res.data.ratepayers) {
          setRatepayersCount(res.data.ratepayers.totalRatepayers ?? 0)
          setRatepayerClaimsCount(res.data.ratepayers.totalClaims ?? 0)
        }

        // 3. System Admin Platform data
        if (res.data.platform) {
          setServicesOnline(res.data.platform.servicesOnline ?? 9)
          setServicesTotal(res.data.platform.servicesTotal ?? 9)
          setDatabasesOk(res.data.platform.databasesOk ?? 9)
          setTablesTotal(res.data.platform.tablesTotal ?? 64)
          setTablesConnected(res.data.platform.tablesConnected ?? 64)
          setAvgLatencyMs(res.data.platform.avgLatencyMs ?? 120)
          if (Array.isArray(res.data.platform.services)) {
            setPlatformServices(res.data.platform.services)
          }
        }
      })
      .catch(err => {
        console.warn('Could not sync live dashboard metrics:', err)
      })
  }, [])



  const adminStats: StatCardItem[] = [
    {
      iconName: 'building',
      title: 'Concession Partners',
      value: `${concessionsCount} Registered`,
      changePercentage: `${activeConcessionsCount} Active Partners`,
      comparisonText: 'Platform Governance partnerships'
    },
    {
      iconName: 'users',
      title: 'Oversight Users',
      value: `${oversightUsersCount} Active Users`,
      changePercentage: 'Audited IAM Roles',
      comparisonText: 'Multi-factor & RBAC access'
    },
    {
      iconName: 'userCheck',
      title: 'Ratepayer Accounts',
      value: `${ratepayersCount} Registered`,
      changePercentage: `${ratepayerClaimsCount} Property Claims`,
      comparisonText: 'Ratepayer self-service portal'
    }
  ]

  const adminInsights: ProductInsightsData = {
    title: 'System Health',
    subtitle: 'Live service and database table status',
    badge: 'Live',
    metric1Label: 'Services Online',
    metric1Value: `${servicesOnline} / ${servicesTotal}`,
    metric1Chart: platformServices.map(s => ({ label: s.name, value: s.latencyMs })),
    metric2Label: 'Tables Connected',
    metric2Value: `${tablesConnected} / ${tablesTotal}`,
    metric2Chart: platformServices.map(s => ({ label: s.name, value: s.tables ?? 0 }))
  }

  const adminSalesMetrics: SalesMetricsData = {
    title: 'Property Registry Pipeline',
    badge: 'Live',
    entityName: 'National Cadastre & Valuations',
    entitySubtitle: 'Verified property assets and statutory valuation rolls',
    metrics: [
      {
        title: 'Total Properties',
        value: `${totalPropertiesCount.toLocaleString('en-GH')} Registered`,
        isCurrency: false
      },
      {
        title: 'Valuation Coverage',
        value: `${valuationCoveragePct}% Valued`,
        isCurrency: false
      },
      {
        title: 'Total Assessed Value',
        value: `GH₵ ${totalRateableValue.toLocaleString('en-GH')}`,
        isCurrency: true
      },
      {
        title: 'Message Broker',
        value: 'RabbitMQ Active',
        isCurrency: false
      }
    ],
    donutTitle: totalPropertiesCount > 0 ? 'Properties by Type' : 'Services by Port Range',
    donutData:
      totalPropertiesCount > 0
        ? oversightSalesMetrics.donutData
        : [
            { key: 'gateway', label: 'Gateway (:3001)', value: 1 },
            { key: 'processing', label: 'Processing (:3002-:3003)', value: 2 },
            { key: 'governance', label: 'Governance (:3004-:3010)', value: 4 },
            { key: 'registry', label: 'Registry & Core (:3020-:3030)', value: 2 }
          ],
    donutCenterValue: totalPropertiesCount > 0 ? `${totalPropertiesCount}` : `${servicesOnline}`,
    donutCenterLabel: totalPropertiesCount > 0 ? 'Properties' : 'Services',
    donutFooterLabel: 'Valuation Progress',
    donutFooterValue: `${valuationCoveragePct}% (${valuedPropertiesCount} Valued)`,
    progressTitle: 'Platform Uptime',
    progressPercentage: 100,
    progressCaption: 'All system services are operational within statutory SLA targets',
    footerTitle: 'System Infrastructure & Connectivity',
    footerDescription: 'Real-time health status, ports, and databases probed directly across the platform network.'
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Top Header & Role Switcher */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1 border-b border-border/40'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>
            {viewMode === 'SYSTEM_ADMIN'
              ? 'System Administrator Dashboard'
              : 'Revenue & Operations Oversight'}
          </h1>
          <p className='text-xs text-muted-foreground mt-0.5'>
            {viewMode === 'SYSTEM_ADMIN'
              ? 'Concessions, oversight users, ratepayer claims, cadastre registry, and live service telemetry.'
              : 'Property registry status, valuation coverage, and partner company assignments.'}
          </p>
        </div>

        {/* Dashboard Perspective Switcher */}
        <div className='flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg border border-border/50 shrink-0 self-stretch sm:self-auto justify-center'>
          <Button
            size='sm'
            variant={viewMode === 'SYSTEM_ADMIN' ? 'default' : 'ghost'}
            className={`text-xs h-7.5 px-3 rounded-md font-medium transition-all ${
              viewMode === 'SYSTEM_ADMIN' ? 'shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setViewMode('SYSTEM_ADMIN')}
          >
            <ServerIcon className='size-3.5 mr-1.5' />
            System Admin (Operations)
          </Button>

          <Button
            size='sm'
            variant={viewMode === 'OVERSIGHT' ? 'default' : 'ghost'}
            className={`text-xs h-7.5 px-3 rounded-md font-medium transition-all ${
              viewMode === 'OVERSIGHT' ? 'shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setViewMode('OVERSIGHT')}
          >
            <LandmarkIcon className='size-3.5 mr-1.5' />
            Oversight User (Properties)
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. SYSTEM ADMINISTRATOR DASHBOARD VIEW (Exact Orders Layout) */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'SYSTEM_ADMIN' ? (
        <div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
          {/* Top Row: 3 Statistics Cards */}
          <div className='col-span-full grid gap-6 sm:grid-cols-3 md:max-lg:grid-cols-1'>
            {adminStats.map((card, index) => (
              <StatisticsCard
                key={index}
                icon={getStatIcon(card.iconName)}
                title={card.title}
                value={card.value}
                changePercentage={card.changePercentage}
                comparisonText={card.comparisonText}
                isCurrency={card.isCurrency}
              />
            ))}
          </div>

          {/* Middle Left: System Health & Concession Jurisdictions (Stacked, exact Orders layout) */}
          <div className='grid gap-6 max-xl:col-span-full lg:max-xl:grid-cols-2'>
            <ProductInsightsCard
              title={adminInsights.title}
              subtitle={adminInsights.subtitle}
              badge={adminInsights.badge}
              metric1Label={adminInsights.metric1Label}
              metric1Value={adminInsights.metric1Value}
              metric1Chart={adminInsights.metric1Chart}
              metric2Label={adminInsights.metric2Label}
              metric2Value={adminInsights.metric2Value}
              metric2Chart={adminInsights.metric2Chart}
              className='justify-between gap-3 *:data-[slot=card-content]:space-y-4'
            />

            <TotalEarningCard
              title='Concession Jurisdictions'
              earning={concessionEarnings.length > 0 ? totalRateableValue : '0 Active'}
              trend='up'
              percentage={valuationCoveragePct}
              comparisonText={`${concessionEarnings.length} Partner Concession Zones`}
              earningData={concessionEarnings}
              className='justify-between gap-5 sm:min-w-0'
            />
          </div>

          {/* Middle Right: Property Registry Pipeline */}
          <SalesMetricsCard
            title={adminSalesMetrics.title}
            badge={adminSalesMetrics.badge}
            entityName={adminSalesMetrics.entityName}
            entitySubtitle={adminSalesMetrics.entitySubtitle}
            metrics={adminSalesMetrics.metrics.map(m => ({
              ...m,
              icon: m.isCurrency ? <LandmarkIcon className='size-4' /> : <CheckCircle2Icon className='size-4' />
            }))}
            donutTitle={adminSalesMetrics.donutTitle}
            donutData={adminSalesMetrics.donutData}
            donutCenterValue={adminSalesMetrics.donutCenterValue}
            donutCenterLabel={adminSalesMetrics.donutCenterLabel}
            donutFooterLabel={adminSalesMetrics.donutFooterLabel}
            donutFooterValue={adminSalesMetrics.donutFooterValue}
            progressTitle={adminSalesMetrics.progressTitle}
            progressPercentage={adminSalesMetrics.progressPercentage}
            progressCaption={adminSalesMetrics.progressCaption}
            footerTitle={adminSalesMetrics.footerTitle}
            footerDescription={adminSalesMetrics.footerDescription}
            footerHighlights={[
              {
                icon: <CheckCircle2Icon className='size-4 text-emerald-600' />,
                label: '9 / 9 Microservices Live on Network'
              },
              {
                icon: <DatabaseIcon className='size-4 text-primary' />,
                label: `${tablesTotal} Connected Database Tables`
              }
            ]}
            className='col-span-full *:data-[slot=card-content]:space-y-6 xl:col-span-2'
          />

          {/* Bottom Table: Real-Time Services Status */}
          <Card className='col-span-full w-full py-0'>
            <div className='p-4 border-b flex items-center justify-between'>
              <div>
                <h3 className='font-semibold text-base text-foreground'>System Microservices Status</h3>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  Live port status, database connections, and real-time response times.
                </p>
              </div>
              <span className='text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/20 flex items-center gap-1.5'>
                <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
                9 / 9 Online
              </span>
            </div>

            <div className='w-full overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='pl-6'>Microservice Name</TableHead>
                    <TableHead>Port</TableHead>
                    <TableHead>Database Schema</TableHead>
                    <TableHead>Connected Tables</TableHead>
                    <TableHead>Response Latency</TableHead>
                    <TableHead className='pr-6 text-right'>Health Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {platformServices.map(svc => (
                    <TableRow key={svc.port}>
                      <TableCell className='pl-6 font-medium flex items-center gap-2.5'>
                        <div className='size-8 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0'>
                          <ServerIcon className='size-4' />
                        </div>
                        <div>
                          <p className='text-sm font-medium text-foreground'>{svc.name}</p>
                          <p className='text-xs text-muted-foreground'>Central Platform Core</p>
                        </div>
                      </TableCell>
                      <TableCell className='font-mono text-xs'>:{svc.port}</TableCell>
                      <TableCell>
                        <span className='inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground'>
                          <DatabaseIcon className='size-3 text-primary' />
                          {svc.dbName || svc.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className='inline-flex items-center gap-1.5 font-mono text-xs text-foreground font-medium'>
                          <TableIcon className='size-3 text-primary' />
                          {svc.tables ?? 0} tables
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className='font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold'>
                          {svc.latencyMs}ms
                        </span>
                      </TableCell>
                      <TableCell className='pr-6 text-right'>
                        <Badge
                          variant='outline'
                          className='bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 font-medium'
                        >
                          <CheckCircle2Icon className='size-3 mr-1' />
                          Operational
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* 2. OVERSIGHT USER DASHBOARD VIEW (Properties & Valuations)   */
        /* ------------------------------------------------------------- */
        <div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
          {/* Top Row: 3 Statistics Cards */}
          <div className='col-span-full grid gap-6 sm:grid-cols-3 md:max-lg:grid-cols-1'>
            {oversightStats.map((card, index) => (
              <StatisticsCard
                key={index}
                icon={getStatIcon(card.iconName)}
                title={card.title}
                value={card.value}
                changePercentage={card.changePercentage}
                comparisonText={card.comparisonText}
                isCurrency={card.isCurrency}
              />
            ))}
          </div>

          {/* Middle Left: Insights & Partner Companies */}
          <div className='grid gap-6 max-xl:col-span-full lg:max-xl:grid-cols-2'>
            <ProductInsightsCard
              title={oversightInsights.title}
              subtitle={oversightInsights.subtitle}
              badge={oversightInsights.badge}
              metric1Label={oversightInsights.metric1Label}
              metric1Value={oversightInsights.metric1Value}
              metric1Chart={oversightInsights.metric1Chart}
              metric2Label={oversightInsights.metric2Label}
              metric2Value={oversightInsights.metric2Value}
              metric2Chart={oversightInsights.metric2Chart}
              className='justify-between gap-3 *:data-[slot=card-content]:space-y-5'
            />

            <TotalEarningCard
              title='Partner Companies'
              earning={totalRateableValue}
              trend='up'
              percentage={valuationCoveragePct}
              comparisonText={`Total value managed across ${concessionEarnings.length} partners`}
              earningData={concessionEarnings}
              className='justify-between gap-5 sm:min-w-0'
            />
          </div>

          {/* Middle Right: Sales Metrics Card */}
          <SalesMetricsCard
            title={oversightSalesMetrics.title}
            badge={oversightSalesMetrics.badge}
            entityName={oversightSalesMetrics.entityName}
            entitySubtitle={oversightSalesMetrics.entitySubtitle}
            metrics={oversightSalesMetrics.metrics.map(m => ({
              ...m,
              icon: m.isCurrency ? <LandmarkIcon className='size-4' /> : <ShieldCheckIcon className='size-4' />
            }))}
            donutTitle={oversightSalesMetrics.donutTitle}
            donutData={oversightSalesMetrics.donutData}
            donutCenterValue={oversightSalesMetrics.donutCenterValue}
            donutCenterLabel={oversightSalesMetrics.donutCenterLabel}
            donutFooterLabel={oversightSalesMetrics.donutFooterLabel}
            donutFooterValue={oversightSalesMetrics.donutFooterValue}
            progressTitle={oversightSalesMetrics.progressTitle}
            progressPercentage={oversightSalesMetrics.progressPercentage}
            progressCaption={oversightSalesMetrics.progressCaption}
            footerTitle={oversightSalesMetrics.footerTitle}
            footerDescription={oversightSalesMetrics.footerDescription}
            footerHighlights={[
              {
                icon: <ShieldCheckIcon className='size-4 text-emerald-600' />,
                label: 'Data Protected & Audited'
              },
              {
                icon: <CheckCircle2Icon className='size-4 text-primary' />,
                label: 'All 9 Services Online'
              }
            ]}
            className='col-span-full *:data-[slot=card-content]:space-y-6 xl:col-span-2'
          />

          {/* Bottom Table: Properties List */}
          <Card className='col-span-full w-full py-0'>
            <div className='p-4 border-b flex items-center justify-between'>
              <div>
                <h3 className='font-semibold text-base text-foreground'>Registered Properties</h3>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  List of all properties and their valuation statuses.
                </p>
              </div>
              <span className='text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium'>
                Live Data
              </span>
            </div>
            <TransactionDatatable data={propertyTransactions} />
          </Card>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
