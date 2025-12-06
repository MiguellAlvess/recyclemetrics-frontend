import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ExternalLinkIcon } from 'lucide-react'

import { useGetDisposals } from '@/api/hooks/disposal'
import type { CreateDisposalResponse } from '@/api/services/disposal/types'

import { Button } from './ui/button'
import { DataTable } from './ui/data-table'

type Disposal = CreateDisposalResponse

export const columns: ColumnDef<Disposal>[] = [
  {
    accessorKey: 'disposalProduct',
    header: 'Produto',
  },
  {
    accessorKey: 'materialType',
    header: 'Mateiral',
    cell: ({ row: { original: disposal } }) => {
      if (disposal.materialType === 'PLASTIC') return 'Plástico'
      if (disposal.materialType === 'METAL') return 'Metal'
      if (disposal.materialType === 'GLASS') return 'Vidro'
      if (disposal.materialType === 'PAPER') return 'Papel'
      if (disposal.materialType === 'ORGANIC') return 'Orgânico'
      if (disposal.materialType === 'NOT_RECYCLABLE') return 'Não reciclável'
      return disposal.materialType
    },
  },
  {
    accessorKey: 'destination',
    header: 'Destino',
    cell: ({ row: { original: disposal } }) => {
      if (disposal.destination === 'RECYCLING') return 'Reciclagem'
      if (disposal.destination === 'COMPOSTING') return 'Compostagem'
      if (disposal.destination === 'WASTE') return 'Rejeito'
      if (disposal.destination === 'DONATION') return 'Doação'
      return disposal.destination
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'disposalDate',
    header: 'Data do descarte',
    cell: ({ row: { original: disposal } }) => {
      return format(new Date(disposal.disposalDate), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: () => {
      return (
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon />
        </Button>
      )
    },
  },
]

const DisposalsTable = () => {
  const { data: disposals = [] } = useGetDisposals()
  if (!disposals) return null
  return <DataTable columns={columns} data={disposals} />
}

export default DisposalsTable
