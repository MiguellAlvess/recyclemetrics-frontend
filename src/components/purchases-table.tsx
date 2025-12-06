import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { useGetPurchases } from '@/api/hooks/purchase'
import type { CreatePurchaseResponse } from '@/api/services/purchase/type'

import DeletePurchaseButton from './delete-purchase-button'
import EditPurchaseButton from './edit-purchase-button'
import { DataTable } from './ui/data-table'
import { ScrollArea } from './ui/scroll-area'

export type Purchase = CreatePurchaseResponse

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: 'purchaseProduct',
    header: 'Produto',
  },
  {
    accessorKey: 'materialType',
    header: 'Mateiral',
    cell: ({ row: { original: purchase } }) => {
      if (purchase.materialType === 'PLASTIC') return 'Plástico'
      if (purchase.materialType === 'METAL') return 'Metal'
      if (purchase.materialType === 'GLASS') return 'Vidro'
      if (purchase.materialType === 'PAPER') return 'Papel'
      if (purchase.materialType === 'ORGANIC') return 'Orgânico'
      if (purchase.materialType === 'NOT_RECYCLABLE') return 'Não reciclável'
      return purchase.materialType
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Data da compra',
    cell: ({ row: { original: purchase } }) => {
      return format(new Date(purchase.purchaseDate), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: purchase } }) => {
      return (
        <div className="flex items-center gap-2">
          <EditPurchaseButton purchase={purchase} />
          <DeletePurchaseButton purchaseId={purchase.purchaseId} />
        </div>
      )
    },
  },
]

const PurchasesTable = () => {
  const { data: purchases = [] } = useGetPurchases()
  if (!purchases) return null
  return (
    <ScrollArea className="h-[550px] max-h-[550px] rounded-md">
      <DataTable columns={columns} data={purchases} />
    </ScrollArea>
  )
}

export default PurchasesTable
