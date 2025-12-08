import z from 'zod'

export const addPromptSchema = z.object({
  message: z.string().trim().min(1, {
    message: 'Envie uma pergunta pra nossa inteligência artificial!',
  }),
})

export type AddPromptSchema = z.infer<typeof addPromptSchema>
