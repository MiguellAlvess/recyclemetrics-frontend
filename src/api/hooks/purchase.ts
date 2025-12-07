import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CreatePurchaseSchema,
  EditPurchaseSchema,
} from '@/forms/schemas/purchase'

import { PurchaseService } from '../services/purchase/purchase'
import type {
  CreatePurchaseResponse,
  GetTotalPurchases30DaysResponse,
  MaterialChartData,
} from '../services/purchase/type'

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

export const useEditPurchase = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['editPurchase'],
    mutationFn: async (variables: EditPurchaseSchema) => {
      return PurchaseService.update(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
    },
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

export const useGetPurchases = () => {
  return useQuery<CreatePurchaseResponse[]>({
    queryKey: ['purchases'],
    queryFn: () => PurchaseService.getAll(),
  })
}

export const useGetMaterialMetrics = () => {
  return useQuery<MaterialChartData[]>({
    queryKey: ['dashboard', 'materialMetrics'],
    queryFn: () => PurchaseService.getMaterialMetrics(),
  })
}

export const useGetTotalPurchases30Days = () => {
  return useQuery<GetTotalPurchases30DaysResponse>({
    queryKey: ['dashboard', 'totalPurchases30Days'],
    queryFn: () => PurchaseService.getTotalPurchases30Days(),
  })
}
