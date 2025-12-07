import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import UpdateUserForm from '@/components/update-user-form'
import { useAuthContext } from '@/context/auth'

const ProfilePage = () => {
  const { user } = useAuthContext()
  if (!user) return null

  const initials =
    user.name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join('') || 'US'

  return (
    <section className="flex w-full justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-3">
          <Avatar className="h-12 w-12 text-sm">
            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <CardTitle>Informações pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateUserForm user={user} />
        </CardContent>
      </Card>
    </section>
  )
}

export default ProfilePage
