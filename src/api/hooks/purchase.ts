import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreatePurchaseSchema } from '@/forms/schemas/purchase'

import { PurchaseService } from '../services/purchase/purchase'

export const useCreatePurchase = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createDisposal'],
    mutationFn: (data: CreatePurchaseSchema) => PurchaseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
    },
  })
}
