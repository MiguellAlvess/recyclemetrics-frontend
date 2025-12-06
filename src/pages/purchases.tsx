import AddPurchaseButton from '@/components/add-purchase-button'
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/page-container'
import PurchasesTable from '@/components/purchases-table'

const PurchasesPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Compras</PageTitle>
          <PageDescription>
            Gerencie suas compras de forma eficiente e sustentável
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPurchaseButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <PurchasesTable />
      </PageContent>
    </PageContainer>
  )
}

export default PurchasesPage
