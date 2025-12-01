import { useMutation } from '@tanstack/react-query'

import type { LoginSchema, SignupSchema } from '@/forms/schemas/user'

import { UserService } from '../services/user/user'

export const signupMutationKey = ['signup']

export const useSignup = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables: SignupSchema) => {
      return UserService.signup({
        name: variables.name,
        email: variables.email,
        password: variables.password,
      })
    },
  })
}

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables: LoginSchema) => {
      return UserService.login({
        email: variables.email,
        password: variables.password,
      })
    },
  })
}
