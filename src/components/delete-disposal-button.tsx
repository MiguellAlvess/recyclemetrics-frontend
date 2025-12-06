import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import { useDeleteDisposal } from '@/api/hooks/disposal'

import { Button } from './ui/button'

type DeleteDisposalButtonProps = {
  disposalId: number
}

const DeleteDisposalButton = ({ disposalId }: DeleteDisposalButtonProps) => {
  const { mutateAsync: deleteDisposal } = useDeleteDisposal()

  const handleSubmit = async () => {
    try {
      await deleteDisposal({ disposalId })
      toast.success('Descarte deletado com sucesso!')
    } catch (error) {
      toast.error('Erro ao adicionar descarte. Tente novamente.')
      console.error(error)
    }
  }
  return (
    <Button variant="ghost" size="icon" onClick={() => handleSubmit()}>
      <Trash />
    </Button>
  )
}

export default DeleteDisposalButton
