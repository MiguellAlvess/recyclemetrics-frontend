import { api } from '@/lib/axios'

export type AuthResponse = {
  accessToken: string
  expiresIn: number
  user: {
    userId: number
    name: string
    email: string
  }
}

export const UserService = {
  signup: async (input: {
    name: string
    email: string
    password: string
  }): Promise<AuthResponse> => {
    const response = await api.post('/users/auth/register', {
      name: input.name,
      email: input.email,
      password: input.password,
    })
    return response.data
  },

  login: async (input: {
    email: string
    password: string
  }): Promise<AuthResponse> => {
    const response = await api.post('/users/auth/login', {
      email: input.email,
      password: input.password,
    })
    return response.data
  },
}
