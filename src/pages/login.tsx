import { Loader2Icon } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'

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
import { useAuthContext } from '@/context/auth'
import { useLoginForm } from '@/forms/hooks/user'
import type { LoginSchema } from '@/forms/schemas/user'

const LoginPage = () => {
  const { user, login, isInitializing } = useAuthContext()
  const { form } = useLoginForm()
  const handleSubmit = async (data: LoginSchema) => {
    await login(data)
  }
  if (isInitializing) return null
  if (user) {
    return <Navigate to="/dashboard" />
  }
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
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
