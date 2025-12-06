import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreateDisposalSchema } from '@/forms/schemas/disposal'

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

export const useGetDisposals = () => {
  return useQuery<CreateDisposalResponse[]>({
    queryKey: ['disposals'],
    queryFn: () => DisposalService.getAll(),
  })
}
