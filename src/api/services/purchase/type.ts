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
