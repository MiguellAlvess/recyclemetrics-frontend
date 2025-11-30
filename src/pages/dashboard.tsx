import { Navigate } from 'react-router'

import Navbar from '@/components/navbar'
import { useAuthContext } from '@/context/auth'

const DashboardPage = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) return null
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Navbar />
    </>
  )
}

export default DashboardPage
