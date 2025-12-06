import AddDisposalButton from '@/components/add-disposal-button'
import DisposalsTable from '@/components/disposals-table'
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/page-container'

const DisposalsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Descartes</PageTitle>
          <PageDescription>
            Gerencie seus descartes de forma eficiente e sustentável
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddDisposalButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DisposalsTable />
      </PageContent>
    </PageContainer>
  )
}

export default DisposalsPage
