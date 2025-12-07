import { protectedApi } from '@/lib/axios'

import type {
  CreatePurchaseInput,
  CreatePurchaseResponse,
  GetTotalPurchases30DaysResponse,
  MaterialChartData,
  MaterialSummaryResponse,
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
  getMaterialMetrics: async (): Promise<MaterialChartData[]> => {
    const response = await protectedApi.get<MaterialSummaryResponse>(
      '/purchases/purchases-material-summary-30-days'
    )
    const summary = response.data.materialAmountSummary
    return Object.entries(summary).map(([materialLabel, quantity]) => ({
      materialLabel,
      quantity,
    }))
  },
  getTotalPurchases30Days:
    async (): Promise<GetTotalPurchases30DaysResponse> => {
      const response = await protectedApi.get(
        '/purchases/total-itens-purchased-30-days'
      )
      return response.data
    },
}
