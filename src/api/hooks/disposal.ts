import { useMutation } from '@tanstack/react-query'

import type { CreateDisposalSchema } from '@/forms/schemas/disposal'

import { DisposalService } from '../services/disposal/disposal'

export const useCreateDisposal = () => {
  return useMutation({
    mutationKey: ['createDisposal'],
    mutationFn: async (variables: CreateDisposalSchema) => {
      return DisposalService.create({
        disposalProduct: variables.disposalProduct,
        quantity: variables.quantity,
        materialType: variables.materialType,
        destination: variables.destination,
        disposalDate: variables.disposalDate,
      })
    },
  })
}
