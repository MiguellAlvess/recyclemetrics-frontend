import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
  EditUserSchema,
  LoginSchema,
  SignupSchema,
} from '@/forms/schemas/user'

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

export const useEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['editUser'],
    mutationFn: async (variables: EditUserSchema) => {
      return UserService.update(variables)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposals'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
