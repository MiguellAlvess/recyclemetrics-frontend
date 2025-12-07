export type CreateDisposalInput = {
  disposalProduct: string
  quantity: number
  materialType: string
  destination: string
  disposalDate: Date
}

export type CreateDisposalResponse = {
  disposalId: number
  disposalProduct: string
  disposalDate: Date
  quantity: number
  materialType: string
  destination: string
}

export type UpdateDisposalInput = {
  disposalId: number
  disposalProduct: string
  quantity: number
  materialType: string
  destination: string
  disposalDate: Date
}

export type GetMostUsedDestinationResponse = {
  destination: string
  quantity: number
}

export type DestinationSummaryResponse = {
  destinationAmountSummary: Record<string, number>
}

export type DestinationChartData = {
  destinationLabel: string
  quantity: number
}

export type GetTotalDisposals30DaysResponse = {
  totalDisposalsCurrentMonth: number
}

export type GetPercentageRecycledItemsDisposalsResponse = {
  percentageDisposalRecycled: number
}

export type UpdateDisposalResponse = CreateDisposalResponse
