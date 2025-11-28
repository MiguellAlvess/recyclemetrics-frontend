import { api } from '@/lib/axios'

export const UserService = {
  signup: async (input: { name: string; email: string; password: string }) => {
    const response = await api.post('/users', {
      name: input.name,
      email: input.email,
      password: input.password,
    })
    return response.data
  },
}
