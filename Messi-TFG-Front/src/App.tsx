import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/index/page'
import Estadisticas from './pages/stats/page'
import NavBar from './components/navBar'
import Footer from './components/footer'
import Register from './pages/register/page'
import Login from './pages/login/page'
import { AuthProvider } from './contexts/auth.context'
import Foro from './pages/forum/page'
import Tema from './pages/tema/page'
import MiCarrera from './pages/carrera/page'
import Admin from './pages/admin/page'
import Terms from './pages/terms/page'
import Privacy from './pages/privacy/page'
import Contact from './pages/contact/page'
const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="*" element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/mi-carrera" element={<MiCarrera />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/foro/:id" element={<Tema />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
