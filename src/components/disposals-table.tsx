import type { ColumnDef } from '@tanstack/react-table'

import { useGetDisposals } from '@/api/hooks/disposal'
import type { CreateDisposalResponse } from '@/api/services/disposal/types'

import { DataTable } from './ui/data-table'

type Disposal = CreateDisposalResponse

export const columns: ColumnDef<Disposal>[] = [
  {
    accessorKey: 'disposalProduct',
    header: 'Produto',
  },
  {
    accessorKey: 'materialType',
    header: 'Tipo de material',
  },
  {
    accessorKey: 'destination',
    header: 'Destino',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'disposalDate',
    header: 'Data do descarte',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
]

const DisposalsTable = () => {
  const { data: disposals = [] } = useGetDisposals()
  if (!disposals) return null
  return <DataTable columns={columns} data={disposals} />
}

export default DisposalsTable
