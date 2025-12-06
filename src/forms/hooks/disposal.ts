import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateDisposal, useEditDisposal } from '@/api/hooks/disposal'
import type { CreateDisposalResponse } from '@/api/services/disposal/types'

import {
  type CreateDisposalSchema,
  createDisposalSchema,
  type EditDisposalSchema,
  editDisposalSchema,
} from '../schemas/disposal'

type CreateDisposalFormParams = {
  onSuccess?: () => void
  onError?: () => void
}

export const useCreateDisposalForm = ({
  onSuccess,
  onError,
}: CreateDisposalFormParams) => {
  const { mutateAsync: createDisposal } = useCreateDisposal()
  const form = useForm({
    resolver: zodResolver(createDisposalSchema),
    defaultValues: {
      disposalProduct: '',
      materialType: undefined,
      quantity: 1,
      destination: undefined,
      disposalDate: undefined,
    },
    shouldUnregister: true,
  })

  const handleSubmit = async (data: CreateDisposalSchema) => {
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

const getEditDisposalFormDefaultValues = (disposal: CreateDisposalResponse) => {
  return {
    disposalId: disposal.disposalId,
    disposalProduct: disposal.disposalProduct,
    materialType: disposal.materialType as EditDisposalSchema['materialType'],
    quantity: disposal.quantity,
    destination: disposal.destination as EditDisposalSchema['destination'],
    disposalDate: new Date(disposal.disposalDate),
  }
}

type UseEditDisposalFormParams = {
  disposal: CreateDisposalResponse
  onSuccess?: () => void
  onError?: () => void
}

export const useEditDisposalForm = ({
  disposal,
  onSuccess,
  onError,
}: UseEditDisposalFormParams) => {
  const { mutateAsync: updateDisposal } = useEditDisposal()
  const form = useForm({
    resolver: zodResolver(editDisposalSchema),
    defaultValues: getEditDisposalFormDefaultValues(disposal),
    shouldUnregister: true,
  })
  useEffect(() => {
    form.reset(getEditDisposalFormDefaultValues(disposal))
    form.setValue('disposalId', disposal.disposalId)
  }, [disposal, form])
  const onSubmit = async (data: EditDisposalSchema) => {
    try {
      await updateDisposal(data)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return { form, onSubmit }
}
