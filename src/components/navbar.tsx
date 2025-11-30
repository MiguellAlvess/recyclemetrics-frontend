import { AvatarImage } from '@radix-ui/react-avatar'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import { Link } from 'react-router'

import logoImage from '@/assets/images/logo.svg'
import { useAuthContext } from '@/context/auth'

import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'

const Navbar = () => {
  const { user, logout } = useAuthContext()
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center justify-between space-x-6">
            <img src={logoImage} alt="Logo Recycle Metrics" />
            <Link to="/dashboard">
              <span className="font-semibold">Dashboard</span>
            </Link>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="space-x-2 font-semibold">
                  <Avatar className="h-8 w-8">
                    <AvatarImage />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                  <p>{user?.name}</p>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={logout}
                  >
                    <LogOutIcon />
                    Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

export default Navbar
