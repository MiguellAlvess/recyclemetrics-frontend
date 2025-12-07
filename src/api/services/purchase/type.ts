export type CreatePurchaseInput = {
  purchaseProduct: string
  quantity: number
  materialType: string
  purchaseDate: Date
}

export type CreatePurchaseResponse = {
  purchaseId: number
  purchaseProduct: string
  purchaseDate: Date
  quantity: number
  materialType: string
}

export type UpdatePurchaseInput = {
  purchaseId: number
  purchaseProduct: string
  quantity: number
  materialType: string
  purchaseDate: Date
}

export type MaterialSummaryResponse = {
  materialAmountSummary: Record<string, number>
}

export type MaterialChartData = {
  materialLabel: string
  quantity: number
}

export type GetTotalPurchases30DaysResponse = {
  totalPurchasesCurrentMonth: number
}

export type UpdatePurchaseResponse = CreatePurchaseResponse
