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

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: 'Nome é obrigatório',
    }),
    email: z
      .string()
      .email({
        message: 'Email inválido',
      })
      .min(1, {
        message: 'Email é obrigatório',
      }),
    password: z.string().trim().min(8, {
      message: 'Senha deve ter no mínimo 8 caracteres',
    }),
    passwordConfirmation: z.string().trim().min(8, {
      message: 'Confirmação deve ter no mínimo 8 caracteres',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation'],
  })

export type SignupSchema = z.infer<typeof signupSchema>

export const editUserSchema = z
  .object({
    userId: z.number(),
    name: signupSchema.shape.name.optional(),
    email: signupSchema.shape.email.optional(),
    password: signupSchema.shape.password.optional(),
    passwordConfirmation: signupSchema.shape.passwordConfirmation.optional(),
  })
  .refine(
    (data) =>
      (!data.password && !data.passwordConfirmation) ||
      data.password === data.passwordConfirmation,
    {
      message: 'Senhas não conferem',
      path: ['passwordConfirmation'],
    }
  )

export type EditUserSchema = z.infer<typeof editUserSchema>
