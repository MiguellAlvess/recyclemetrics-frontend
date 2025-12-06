import { protectedApi, publicApi } from '@/lib/axios'

import type {
  AuthResponse,
  LoginInput,
  SignupInput,
  UpdateUserInput,
  UpdateUserResponse,
  User,
} from './types'

export const UserService = {
  signup: async (input: SignupInput): Promise<AuthResponse> => {
    const response = await publicApi.post('/users/auth/register', input)
    return response.data
  },

  login: async (input: LoginInput): Promise<AuthResponse> => {
    const response = await publicApi.post('/users/auth/login', input)
    return response.data
  },

  update: async (
    userId: number,
    input: UpdateUserInput
  ): Promise<UpdateUserResponse> => {
    const response = await protectedApi.patch(`/users/${userId}`, input)
    return response.data
  },

  me: async (): Promise<User> => {
    const response = await protectedApi.get('/users/me')
    return response.data
  },
}
