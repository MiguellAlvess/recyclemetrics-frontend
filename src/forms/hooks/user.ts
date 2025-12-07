import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useEditUser } from '@/api/hooks/user'
import type { UpdateUserResponse } from '@/api/services/user/types'

import {
  type EditUserSchema,
  editUserSchema,
  type LoginSchema,
  loginSchema,
  type SignupSchema,
  signupSchema,
} from '../schemas/user'

export const useLoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return { form }
}

export const useSignupForm = () => {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  return { form }
}

const getEditUserFormDefaultValues = (user: UpdateUserResponse) => {
  return {
    userId: user.userId,
    name: user.name,
    email: user.email,
    password: '',
    passwordConfirmation: '',
  }
}

type UseEditUserFormParams = {
  user: UpdateUserResponse
  onSuccess?: () => void
  onError?: () => void
}

export const useEditUserForm = ({
  user,
  onSuccess,
  onError,
}: UseEditUserFormParams) => {
  const { mutateAsync: updateUser } = useEditUser()
  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: getEditUserFormDefaultValues(user),
    shouldUnregister: true,
  })

  useEffect(() => {
    form.reset(getEditUserFormDefaultValues(user))
    form.setValue('userId', user.userId)
  }, [user, form])

  const handleSubmit = async (data: EditUserSchema) => {
    try {
      await updateUser(data)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      onError?.()
    }
  }

  return { form, handleSubmit }
}
