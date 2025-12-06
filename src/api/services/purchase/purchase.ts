import { protectedApi } from '@/lib/axios'

import type { CreatePurchaseInput, CreatePurchaseResponse } from './type'

export const PurchaseService = {
  create: async (
    input: CreatePurchaseInput
  ): Promise<CreatePurchaseResponse> => {
    const response = await protectedApi.post('/purchases', input)
    return response.data
  },
  getAll: async (): Promise<CreatePurchaseResponse[]> => {
    const response = await protectedApi.get('/purchases')
    return response.data
  },
  delete: async (purchaseId: number): Promise<void> => {
    await protectedApi.delete(`/purchases/${purchaseId}`)
  },
}
