import { useGetMostUsedDestination } from '@/api/hooks/disposal'
import { useGetMaterialMetrics } from '@/api/hooks/purchase'
import MaterialChart from '@/components/material-chart'
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/page-container'
import StatsCards from '@/components/stats-card'

const DashboardPage = () => {
  const { data: mostUsedDestination } = useGetMostUsedDestination()
  const { data: materialMetrics = [] } = useGetMaterialMetrics()
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Métricas das suas compras e descartes dos últimos 30 dias
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <StatsCards
          totalDisposals={mostUsedDestination?.quantity || 0}
          recyclingPercentage={15}
          totalPurchase={10}
          mostUsedDestination={mostUsedDestination?.destination || 'N/A'}
        />
        <div className="grid grid-cols-[2.25fr_1fr]">
          <MaterialChart data={materialMetrics} />
        </div>
      </PageContent>
    </PageContainer>
  )
}

export default DashboardPage
