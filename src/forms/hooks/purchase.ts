import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreatePurchase } from '@/api/hooks/purchase'

import {
  type CreatePurchaseSchema,
  createPurchaseSchema,
} from '../schemas/purchase'

type CreatePurchaseFormParams = {
  onSuccess?: () => void
  onError?: () => void
}

export const useCreatePurchaseForm = ({
  onSuccess,
  onError,
}: CreatePurchaseFormParams) => {
  const { mutateAsync: createDisposal } = useCreatePurchase()
  const form = useForm({
    resolver: zodResolver(createPurchaseSchema),
    defaultValues: {
      purchaseProduct: '',
      materialType: undefined,
      quantity: 1,
      purchaseDate: undefined,
    },
    shouldUnregister: true,
  })

  const handleSubmit = async (data: CreatePurchaseSchema) => {
    try {
      await createDisposal(data)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return { form, handleSubmit }
}
