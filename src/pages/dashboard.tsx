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
          totalDisposals={10}
          recyclingPercentage={15}
          totalPurchase={10}
          mostUsedDestination="Reciclagem"
        />
      </PageContent>
    </PageContainer>
  )
}

export default DashboardPage
