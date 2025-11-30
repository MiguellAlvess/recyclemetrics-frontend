import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

import { useLoginMutation, useSignup } from '@/api/hooks/user'
import { UserService } from '@/api/services/user/user'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage'
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
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken)
}

const removeAccessToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitializing, setInitializing] = useState(true)
  const signupMutation = useSignup()
  const loginMutation = useLoginMutation()

  useEffect(() => {
    const init = async () => {
      try {
        setInitializing(true)
        const acccessToken = localStorage.getItem('accessToken')
        if (!acccessToken) return
        const user = await UserService.me()
        setUser(user)
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
