import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreatePurchaseSchema } from '@/forms/schemas/purchase'

import { PurchaseService } from '../services/purchase/purchase'
import type { CreatePurchaseResponse } from '../services/purchase/type'

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

export const useGetPurchases = () => {
  return useQuery<CreatePurchaseResponse[]>({
    queryKey: ['purchases'],
    queryFn: () => PurchaseService.getAll(),
  })
}

export const useDeletePurchase = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteDisposal'],
    mutationFn: async (variables: { purchaseId: number }) => {
      return PurchaseService.delete(variables.purchaseId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
    },
  })
}
