import { Navigate } from 'react-router'

import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth'

const DashboardPage = () => {
  const { user, isInitializing, logout } = useAuthContext()
  if (isInitializing) return null
  if (!user) return <Navigate to="/login" />
  return (
    <>
      <Navbar />
      <h1>Olá, {user.name}</h1>
      <Button onClick={logout}>Sair</Button>
    </>
  )
}

export default DashboardPage
