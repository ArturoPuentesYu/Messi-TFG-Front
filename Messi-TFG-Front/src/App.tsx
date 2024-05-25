import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/index/page"
import Estadisticas from "./pages/stats/page"
import NavBar from "./components/navBar"
import Footer from "./components/footer"
import Register from "./pages/register/page"
import Login from "./pages/login/page"
import { AuthProvider } from "./contexts/auth.context"
import Foro from "./pages/forum/page"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/foro" element={<Foro />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
