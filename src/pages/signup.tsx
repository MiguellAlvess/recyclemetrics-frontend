import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'
import signupImage from '@/assets/images/signup-page-image.svg'
import PasswordInput from '@/components/password-input'

const SignupPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full items-center justify-center px-4 md:w-1/2">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex items-center justify-center text-center">
            <CardTitle>Crie sua conta</CardTitle>
            <CardDescription>
              Comece sua jornada rumo a um estilo de vida mais sustentável
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Digite seu nome" />
            <Input placeholder="Digite seu email" />
            <PasswordInput placeholder="Digite sua senha" />
            <PasswordInput placeholder="Confirme sua senha" />
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
