import { protectedApi } from '@/lib/axios'

import type {
  CreateDisposalInput,
  CreateDisposalResponse,
  UpdateDisposalInput,
  UpdateDisposalResponse,
} from './types'

export const DisposalService = {
  create: async (
    input: CreateDisposalInput
  ): Promise<CreateDisposalResponse> => {
    const response = await protectedApi.post('/disposals', input)
    return response.data
  },
  getAll: async (): Promise<CreateDisposalResponse[]> => {
    const response = await protectedApi.get('/disposals')
    return response.data
  },

  update: async (
    input: UpdateDisposalInput
  ): Promise<UpdateDisposalResponse> => {
    const response = await protectedApi.patch(
      `/disposals/${input.disposalId}`,
      input
    )
    return response.data
  },
  delete: async (disposalId: number): Promise<void> => {
    await protectedApi.delete(`/disposals/${disposalId}`)
  },
}
