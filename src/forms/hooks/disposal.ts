import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useEditDisposal } from '@/api/hooks/disposal'

import {
  createDisposalSchema,
  type EditDisposalSchema,
  editDisposalSchema,
} from '../schemas/disposal'

export const useCreateDisposalForm = () => {
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

  return { form }
}

export const useEditCreateDisposalForm = ({
  disposal,
  onSuccess,
  onError,
}: UseEditDisposalFormParams) => {
  const { mutateAsync: updateDisposal } = useEditDisposal()
  const form = useForm({
    resolver: zodResolver(editDisposalSchema),
    defaultValues: {
      disposalId: disposal.disposalId,
      disposalProduct: disposal.disposalProduct,
      materialType: disposal.materialType,
      quantity: disposal.quantity,
      destination: disposal.destination,
      disposalDate: disposal.disposalDate,
    },
    shouldUnregister: true,
  })

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

type UseEditDisposalFormParams = {
  disposal: EditDisposalSchema
  onSuccess?: () => void
  onError?: () => void
}
