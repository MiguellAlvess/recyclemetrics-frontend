import { AvatarImage } from '@radix-ui/react-avatar'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import { Link } from 'react-router'

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
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center justify-between space-x-6">
            <h3 className="font-extrabold">
              Recycle
              <span className="font-extrabold text-primary">Metricis</span>
            </h3>
            <Link to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <p>Sergio Cunha</p>
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
