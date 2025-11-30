import { useMutation } from '@tanstack/react-query'
import { createContext, type ReactNode, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { type AuthResponse, UserService } from '@/api/services/user'
import { api } from '@/lib/axios'
import type { SignupSchema } from '@/pages/signup'

export type AuthUser = {
  userId: number
  name: string
  email: string
}

export type AuthContextData = {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupSchema) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  const signupMutation = useMutation<AuthResponse, unknown, SignupSchema>({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      return UserService.signup({
        name: variables.name,
        email: variables.email,
        password: variables.password,
      })
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        const acccessToken = localStorage.getItem('accessToken')
        if (!acccessToken) return

        const response = await api.get<AuthUser>('/users/me', {
          headers: {
            Authorization: `Bearer ${acccessToken}`,
          },
        })

        setUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const signup = async (data: SignupSchema) => {
    signupMutation.mutate(data, {
      onSuccess: (response) => {
        localStorage.setItem('accessToken', response.accessToken)
        setUser(response.user)
        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao criar conta')
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async () => {},
        signup,
        logout: () => {
          setUser(null)
          localStorage.removeItem('accessToken')
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
