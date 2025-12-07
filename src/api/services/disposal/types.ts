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

export type UpdateDisposalResponse = CreateDisposalResponse
