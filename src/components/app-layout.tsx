import { Outlet } from 'react-router-dom'

import AppSidebar from '@/components/sidebar' // o seu sidebar completo
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
