import { protectedApi } from '@/lib/axios'

import type { CreatePurchaseInput, CreatePurchaseResponse } from './type'

export const PurchaseService = {
  create: async (
    input: CreatePurchaseInput
  ): Promise<CreatePurchaseResponse> => {
    const response = await protectedApi.post('/purchases', input)
    return response.data
  },
}
