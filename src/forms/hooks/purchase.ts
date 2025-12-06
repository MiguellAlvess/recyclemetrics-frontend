import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useCreatePurchase, useEditPurchase } from '@/api/hooks/purchase'
import type { CreatePurchaseResponse } from '@/api/services/purchase/type'

import {
  type CreatePurchaseSchema,
  createPurchaseSchema,
  type EditPurchaseSchema,
  editPurchaseSchema,
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

const getEditDisposalFormDefaultValues = (disposal: CreatePurchaseResponse) => {
  return {
    purchaseId: disposal.purchaseId,
    purchaseProduct: disposal.purchaseProduct,
    materialType: disposal.materialType as EditPurchaseSchema['materialType'],
    quantity: disposal.quantity,
    purchaseDate: new Date(disposal.purchaseDate),
  }
}

type UseEditPurchaseFormParams = {
  purchase: CreatePurchaseResponse
  onSuccess?: () => void
  onError?: () => void
}

export const useEditPurchaseForm = ({
  purchase,
  onSuccess,
  onError,
}: UseEditPurchaseFormParams) => {
  const { mutateAsync: updatePurchase } = useEditPurchase()
  const form = useForm({
    resolver: zodResolver(editPurchaseSchema),
    defaultValues: getEditDisposalFormDefaultValues(purchase),
    shouldUnregister: true,
  })

  useEffect(() => {
    form.reset(getEditDisposalFormDefaultValues(purchase))
    form.setValue('purchaseId', purchase.purchaseId)
  }, [purchase, form])

  const onSubmit = async (data: EditPurchaseSchema) => {
    try {
      await updatePurchase(data)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return { form, onSubmit }
}
