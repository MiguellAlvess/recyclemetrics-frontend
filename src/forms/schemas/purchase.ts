import z from 'zod'

export const createPurchaseSchema = z.object({
  purchaseProduct: z.string().trim().min(1, {
    message: 'O produto é obrigatório',
  }),
  materialType: z.enum(
    ['PLASTIC', 'PAPER', 'GLASS', 'ORGANIC', 'METAL', 'NOT_RECYCLABLE'],
    {
      message: 'O tipo de material é obrigatório',
    }
  ),
  quantity: z.coerce.number().min(1, 'A quantidade é obrigatória'),
  purchaseDate: z.date({
    message: 'A data é obrigatória',
  }),
})

export type CreatePurchaseSchema = z.infer<typeof createPurchaseSchema>

export const editPurchaseSchema = createPurchaseSchema.extend({
  purchaseId: z.number(),
})

export type EditPurchaseSchema = z.infer<typeof editPurchaseSchema>
