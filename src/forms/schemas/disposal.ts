import z from 'zod'

export const createDisposalSchema = z.object({
  disposalProduct: z.string().trim().min(1, {
    message: 'O produto é obrigatório',
  }),
  materialType: z.enum([
    'PLASTIC',
    'PAPER',
    'GLASS',
    'ORGANIC',
    'METAL',
    'NOT_RECYCLABLE',
  ]),
  quantity: z.coerce.number().min(1, 'A quantidade é obrigatória'),
  destination: z.enum(['RECYCLING', 'COMPOSTING', 'WASTE', 'DONATION']),
  disposalDate: z.date({
    message: 'A data é obrigatória',
  }),
})

export type CreateDisposalSchema = z.infer<typeof createDisposalSchema>
