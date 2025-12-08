import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AppLayout } from './components/app-layout'
import { AuthContextProvider } from './context/auth'
import DashboardPage from './pages/dashboard'
import DisposalsPage from './pages/disposals'
import LoginPage from './pages/login'
import NotFoundPage from './pages/notfound'
import ProfilePage from './pages/profile'
import PurchasesPage from './pages/purchases'
import SignupPage from './pages/signup'
import VirtualAssistantPage from './pages/virtual-assistant'
import { PrivateRoute } from './routes/private-routes'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/disposals" element={<DisposalsPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/virtual-assistant"
                  element={<VirtualAssistantPage />}
                />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthContextProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
)
