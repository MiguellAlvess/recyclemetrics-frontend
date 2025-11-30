import type { LoginSchema } from '@/pages/login'
import type { SignupSchema } from '@/pages/signup'

export type AuthUser = {
  userId: number
  name: string
  email: string
}

export type AuthContextData = {
  user: AuthUser | null
  login: (data: LoginSchema) => Promise<void>
  signup: (data: SignupSchema) => Promise<void>
  logout: () => void
}
