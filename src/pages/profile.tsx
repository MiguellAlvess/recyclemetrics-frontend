import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuthContext } from '@/context/auth'

const ProfilePage = () => {
  const { user } = useAuthContext()
  return (
    <h1>
      <section className="flex flex-col items-center justify-start space-y-4 p-8">
        <Card className="w-[40vw]">
          <CardHeader className="flex flex-col items-start justify-start gap-1">
            <CardTitle>Informações pessoais</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <Avatar>
              <AvatarFallback>
                {user?.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase() || 'US'}
              </AvatarFallback>
            </Avatar>
            <Separator />
            <h1>Formulário</h1>
          </CardContent>
        </Card>
      </section>
    </h1>
  )
}

export default ProfilePage
