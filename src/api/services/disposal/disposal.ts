import { protectedApi } from '@/lib/axios'

import type { CreateDisposalInput, CreateDisposalResponse } from './types'

export const DisposalService = {
  async create(input: CreateDisposalInput): Promise<CreateDisposalResponse> {
    const response = await protectedApi.post('/disposals', input)
    return response.data
  },
  async getAll(): Promise<CreateDisposalResponse[]> {
    const response = await protectedApi.get('/disposals')
    return response.data
  },
}
