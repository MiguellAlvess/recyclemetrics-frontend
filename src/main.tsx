import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes } from 'react-router'
import { Route } from 'react-router'
import NotFoundPage from './pages/notfound'
import SignupPage from './pages/signup'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
