import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../../services/auth.service'
import { Button, Input, Password, Title } from 'rizzui'
import { useAuth } from '../../contexts/auth.context'

const authService = new AuthService()

const Login: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await authService.login({ email, password })
      if (response.status === 'ok') {
        login(email, password)
        navigate('/')
      } else {
        setErrorMessage('El correo electrónico o contraseña son incorrectas.')
        console.error(response.error)
      }
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <div className="screen-minus-navbar flex items-center justify-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
      <div className="w-[80%] sm:w-[30rem]">
        <form
          onSubmit={handleSubmit}
          className="grid-col grid gap-x-5 gap-y-6 rounded-lg border-gray-600 bg-slate-100 px-7 pb-8 pt-6 shadow-xl"
        >
          <Title as="h1">Iniciar sesión</Title>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Correo electrónico"
            placeholder="Correo electrónico"
            required
          />
          <Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrorMessage('')
            }}
            label="Contraseña"
            placeholder="Contraseña"
            required
          />
          {errorMessage && <p className="font-size-12 text-red">{errorMessage}</p>}
          <Button type="submit" color="primary" className="block w-full rounded p-2">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
