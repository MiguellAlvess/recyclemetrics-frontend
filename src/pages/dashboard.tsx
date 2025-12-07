import {
  useGetDestinationMetrics,
  useGetMostUsedDestination,
  useGetTotalDisposals30Days,
} from '@/api/hooks/disposal'
import {
  useGetMaterialMetrics,
  useGetTotalPurchases30Days,
} from '@/api/hooks/purchase'
import DestinationChart from '@/components/destination-chart'
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
  const { data: destinationMetrics = [] } = useGetDestinationMetrics()
  const { data: totalDisposals30Days } = useGetTotalDisposals30Days()
  const { data: totalPurchases30Days } = useGetTotalPurchases30Days()
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
          totalDisposals30Days={totalDisposals30Days?.totalDisposals30Days || 0}
          totalPurchase30Days={
            totalPurchases30Days?.totalPurchasesCurrentMonth || 0
          }
          recyclingPercentage30Days={15}
          mostUsedDestination30Days={mostUsedDestination?.destination || 'N/A'}
        />
        <div className="grid grid-cols-[2.25fr_1fr] gap-5">
          <MaterialChart data={materialMetrics} />
          <DestinationChart data={destinationMetrics} />
        </div>
      </PageContent>
    </PageContainer>
  )
}

export default DashboardPage
