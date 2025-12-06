import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import { useDeletePurchase } from '@/api/hooks/purchase'

import { Button } from './ui/button'

type DeletePurchaseButtonButtonProps = {
  purchaseId: number
}

const DeletePurchaseButton = ({
  purchaseId,
}: DeletePurchaseButtonButtonProps) => {
  const { mutateAsync: deletePurchase } = useDeletePurchase()

  const handleSubmit = async () => {
    try {
      await deletePurchase({ purchaseId })
      toast.success('Compra deletada com sucesso!')
    } catch (error) {
      toast.error('Erro ao deletar compra')
      console.error(error)
    }
  }
  return (
    <Button variant="ghost" size="icon" onClick={() => handleSubmit()}>
      <Trash />
    </Button>
  )
}

export default DeletePurchaseButton
