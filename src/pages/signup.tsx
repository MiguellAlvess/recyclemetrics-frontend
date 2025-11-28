import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'

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

const signupSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: 'Nome é obrigatório',
    }),
    email: z
      .string()
      .email({
        message: 'Email inválido',
      })
      .min(1, {
        message: 'Email é obrigatório',
      }),
    password: z.string().trim().min(8, {
      message: 'Senha deve ter no mínimo 8 caracteres',
    }),
    passwordConfirmation: z.string().trim().min(8, {
      message: 'Confirmação deve ter no mínimo 8 caracteres',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation'],
  })

const SignupPage = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      const response = await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      return response.data
    },
  })

  const handleSubmit = (data: z.infer<typeof signupSchema>) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Conta criada com sucesso!')
        form.reset()
      },
      onError: (error) => {
        toast.error('Erro ao criar conta')
        console.log(error)
      },
    })
  }
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full items-center justify-center px-4 md:w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader className="flex items-center justify-center text-center">
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>
                  Comece sua jornada rumo a um estilo de vida mais sustentável
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirme sua senha</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirme sua senha"
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
                  Criar conta
                </Button>
                <div className="flex items-center justify-center text-sm">
                  <p className="text-muted-foreground">Já tem uma conta?</p>
                  <Button variant="link" className="ml-1 p-0 text-sm" asChild>
                    <Link to="/login">Faça login</Link>
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

export default SignupPage
