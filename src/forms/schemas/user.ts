import z from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .min(1, { message: 'Email é obrigatório' }),
  password: z.string().min(8, {
    message: 'Senha deve ter no mínimo 8 caracteres',
  }),
})

export type LoginSchema = z.infer<typeof loginSchema>
