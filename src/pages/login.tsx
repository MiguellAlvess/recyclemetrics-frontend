import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { type AuthResponse, UserService } from '@/api/services/user'
import signupImage from '@/assets/images/signup-page-image.svg'
import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email inválido' })
    .min(1, { message: 'Email é obrigatório' }),
  password: z.string().min(8, {
    message: 'Senha deve ter no mínimo 8 caracteres',
  }),
})

const LoginPage = () => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables: z.infer<typeof loginSchema>) => {
      return UserService.login({
        email: variables.email,
        password: variables.password,
      })
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        console.error(error)
      }
    }
    init()
  })
  const handleSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data, {
      onSuccess: (response: AuthResponse) => {
        const accessToken = response.accessToken
        localStorage.setItem('accessToken', accessToken)
        setUser(response.user)
        toast.success('Login realizado com sucesso!')
        form.reset()
      },
      onError: (error) => {
        toast.error('Email ou senha inválidos')
        console.log(error)
      },
    })
  }

  if (user) return <h1>Olá, {user.name} você tem uma conta</h1>

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full items-center justify-center px-4 md:w-1/2 md:justify-end md:pr-10 lg:pr-16">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full max-w-md"
          >
            <Card className="w-full shadow-lg">
              <CardHeader className="text-center">
                <CardTitle>Bem vindo de volta!</CardTitle>
                <CardDescription>Entre com suas credenciais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Digite sua senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
                <div className="flex items-center justify-center text-sm">
                  <p className="text-muted-foreground">Não tem conta?</p>
                  <Button variant="link" className="ml-1 p-0 text-sm" asChild>
                    <Link to="/sign-up">Criar agora</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src={signupImage}
          alt="Reciclagem"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage
