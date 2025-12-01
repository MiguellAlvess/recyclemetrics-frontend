import { Navigate, Outlet } from 'react-router'

import { useAuthContext } from '@/context/auth'

export const PrivateRoute = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) return null
  if (!user) return <Navigate to="/login" />
  return <Outlet />
}
