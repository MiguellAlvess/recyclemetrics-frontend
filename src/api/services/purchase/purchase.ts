import { protectedApi } from '@/lib/axios'

import type {
  CreatePurchaseInput,
  CreatePurchaseResponse,
  UpdatePurchaseInput,
  UpdatePurchaseResponse,
} from './type'

export const PurchaseService = {
  create: async (
    input: CreatePurchaseInput
  ): Promise<CreatePurchaseResponse> => {
    const response = await protectedApi.post('/purchases', input)
    return response.data
  },
  update: async (
    input: UpdatePurchaseInput
  ): Promise<UpdatePurchaseResponse> => {
    const response = await protectedApi.patch(
      `/purchases/${input.purchaseId}`,
      input
    )
    return response.data
  },
  delete: async (purchaseId: number): Promise<void> => {
    await protectedApi.delete(`/purchases/${purchaseId}`)
  },
  getAll: async (): Promise<CreatePurchaseResponse[]> => {
    const response = await protectedApi.get('/purchases')
    return response.data
  },
}
