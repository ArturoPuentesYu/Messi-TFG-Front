const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-500 to-pink-500 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-sm">&copy; 2024 Messi. All rights reserved.</div>
        <nav className="flex space-x-4">
          <a href="/terms" className="hover:underline">
            Términos y condiciones
          </a>
          <a href="/privacy" className="hover:underline">
            Política de privacidad
          </a>
          <a href="/contact" className="hover:underline">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
