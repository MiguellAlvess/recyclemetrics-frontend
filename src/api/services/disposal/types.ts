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
