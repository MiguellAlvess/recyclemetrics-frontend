import { protectedApi } from '@/lib/axios'

import type {
  CreateDisposalInput,
  CreateDisposalResponse,
  DestinationChartData,
  DestinationSummaryResponse,
  GetMostDescartedMaterialResponse,
  GetMostUsedDestinationResponse,
  GetPercentageRecycledItemsDisposalsResponse,
  GetTotalDisposals30DaysResponse,
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
  delete: async (disposalId: number): Promise<void> => {
    await protectedApi.delete(`/disposals/${disposalId}`)
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
  getAll: async (): Promise<CreateDisposalResponse[]> => {
    const response = await protectedApi.get('/disposals')
    return response.data
  },

  getMostUsedDestination: async (): Promise<GetMostUsedDestinationResponse> => {
    const response = await protectedApi.get('/disposals/metrics/destination')
    return response.data
  },
  getDestinationMetrics: async (): Promise<DestinationChartData[]> => {
    const response = await protectedApi.get<DestinationSummaryResponse>(
      '/disposals/disposals-destination-summary-30-days'
    )
    const summary = response.data.destinationAmountSummary
    return Object.entries(summary).map(([destinationLabel, quantity]) => ({
      destinationLabel,
      quantity,
    }))
  },
  getTotalDisposals30Days:
    async (): Promise<GetTotalDisposals30DaysResponse> => {
      const response = await protectedApi.get(
        '/disposals/total-itens-disposed-30-days'
      )
      return response.data
    },
  getPercentageRecycledItemsDisposals30Days:
    async (): Promise<GetPercentageRecycledItemsDisposalsResponse> => {
      const response = await protectedApi.get(
        '/disposals/percentage-disposals-items-30-days'
      )
      return response.data
    },
  getMostDescartedMaterial30Days:
    async (): Promise<GetMostDescartedMaterialResponse> => {
      const response = await protectedApi.get(
        '/disposals/disposals-most-discarded-material'
      )
      return response.data
    },
}
