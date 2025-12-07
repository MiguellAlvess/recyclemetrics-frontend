import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CreateDisposalSchema,
  EditDisposalSchema,
} from '@/forms/schemas/disposal'

import { DisposalService } from '../services/disposal/disposal'
import type {
  CreateDisposalResponse,
  DestinationChartData,
  GetMostUsedDestinationResponse,
  GetPercentageRecycledItemsDisposalsResponse,
  GetTotalDisposals30DaysResponse,
} from '../services/disposal/types'

export const useCreateDisposal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createDisposal'],
    mutationFn: (data: CreateDisposalSchema) => DisposalService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useEditDisposal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['editDisposal'],
    mutationFn: async (variables: EditDisposalSchema) => {
      return DisposalService.update(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useDeleteDisposal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteDisposal'],
    mutationFn: async (variables: { disposalId: number }) => {
      return DisposalService.delete(variables.disposalId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposals'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useGetDisposals = () => {
  return useQuery<CreateDisposalResponse[]>({
    queryKey: ['disposals'],
    queryFn: () => DisposalService.getAll(),
  })
}

export const useGetMostUsedDestination = () => {
  return useQuery<GetMostUsedDestinationResponse>({
    queryKey: ['dashboard', 'mostUsedDestination'],
    queryFn: () => DisposalService.getMostUsedDestination(),
  })
}

export const useGetDestinationMetrics = () => {
  return useQuery<DestinationChartData[]>({
    queryKey: ['dashboard', 'destinationMetrics'],
    queryFn: () => DisposalService.getDestinationMetrics(),
  })
}

export const useGetTotalDisposals30Days = () => {
  return useQuery<GetTotalDisposals30DaysResponse>({
    queryKey: ['dashboard', 'totalDisposals30Days'],
    queryFn: () => DisposalService.getTotalDisposals30Days(),
  })
}

export const useGetPercentageRecycledItemsDisposals30Days = () => {
  return useQuery<GetPercentageRecycledItemsDisposalsResponse>({
    queryKey: ['dashboard', 'percentageRecycledItems30Days'],
    queryFn: () => DisposalService.getPercentageRecycledItemsDisposals30Days(),
  })
}
