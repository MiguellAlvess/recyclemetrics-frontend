import { useMutation } from '@tanstack/react-query'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

import { UserService } from '@/api/services/user'
import { api } from '@/lib/axios'
import type { LoginSchema } from '@/pages/login'
import type { SignupSchema } from '@/pages/signup'

import type { AuthContextData, AuthUser } from './types'

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isInitializing: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

const removeAccessToken = () => {
  localStorage.removeItem('accessToken')
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitializing, setInitializing] = useState(true)

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables: SignupSchema) => {
      return UserService.signup({
        name: variables.name,
        email: variables.email,
        password: variables.password,
      })
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables: LoginSchema) => {
      return UserService.login({
        email: variables.email,
        password: variables.password,
      })
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        setInitializing(true)
        const acccessToken = localStorage.getItem('accessToken')
        if (!acccessToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${acccessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        setUser(null)
        removeAccessToken()
        console.error(error)
      } finally {
        setInitializing(false)
      }
    }

    init()
  }, [])

  const signup = async (data: SignupSchema) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setAccessToken(createdUser.accessToken)
        setUser(createdUser.user)
        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        removeAccessToken()
        toast.error('Erro ao criar conta')
        console.log(signupMutation.error)
      },
    })
  }

  const login = async (data: LoginSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        const accessToken = loggedUser.accessToken
        setAccessToken(accessToken)
        setUser(loggedUser.user)
        toast.success('Login realizado com sucesso!')
      },
      onError: (error) => {
        removeAccessToken()
        toast.error('Email ou senha inválidos')
        console.log(error)
      },
    })
  }

  const logout = () => {
    setUser(null)
    removeAccessToken()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitializing,
        login: login,
        signup: signup,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
