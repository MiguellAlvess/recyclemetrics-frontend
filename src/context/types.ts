import type { LoginSchema, SignupSchema } from '@/forms/schemas/user'

export type AuthUser = {
  userId: number
  name: string
  email: string
}

export type AuthContextData = {
  user: AuthUser | null
  isInitializing: boolean
  login: (data: LoginSchema) => Promise<void>
  signup: (data: SignupSchema) => Promise<void>
  logout: () => void
}
