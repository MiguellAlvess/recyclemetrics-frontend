import { protectedApi, publicApi } from '@/lib/axios'

import type { AuthResponse, User } from './types'

export const UserService = {
  signup: async (input: {
    name: string
    email: string
    password: string
  }): Promise<AuthResponse> => {
    const response = await publicApi.post('/users/auth/register', {
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
    const response = await publicApi.post('/users/auth/login', {
      email: input.email,
      password: input.password,
    })
    return response.data
  },

  me: async (): Promise<User> => {
    const response = await protectedApi.get('/users/me')
    return response.data
  },
}
