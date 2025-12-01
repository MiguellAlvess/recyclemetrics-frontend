import { Plus } from 'lucide-react'

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/page-container'
import { Button } from '@/components/ui/button'

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
          <Button>
            <Plus />
            Adicionar descarte
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>Descartes</PageContent>
    </PageContainer>
  )
}

export default DisposalsPage
