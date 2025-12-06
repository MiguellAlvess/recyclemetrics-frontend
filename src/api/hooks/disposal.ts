import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type {
  CreateDisposalSchema,
  EditDisposalSchema,
} from '@/forms/schemas/disposal'

import { DisposalService } from '../services/disposal/disposal'
import type { CreateDisposalResponse } from '../services/disposal/types'

export const useCreateDisposal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createDisposal'],
    mutationFn: (data: CreateDisposalSchema) => DisposalService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposals'] })
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
    },
  })
}

export const useGetDisposals = () => {
  return useQuery<CreateDisposalResponse[]>({
    queryKey: ['disposals'],
    queryFn: () => DisposalService.getAll(),
  })
}
