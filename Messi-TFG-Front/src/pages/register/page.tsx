import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../../services/auth.service'
import { Button, Input, Password, Title } from 'rizzui'

const authService = new AuthService()

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [surnames, setSurnames] = useState('')
  const [birthdate, setBirthdate] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return

    const birthdateObj = new Date(birthdate)
    const age = new Date().getFullYear() - birthdateObj.getFullYear()
    if (age < 18) return

    try {
      const response = await authService.register({
        email,
        password,
        name,
        surnames,
        birthdate: birthdateObj
      })
      if (response.status === 'ok') {
        navigate('/login')
      } else {
        console.error(response.error)
      }
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  return (
    <div className="screen-minus-navbar flex w-full items-center justify-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
      <div className="w-[80%] sm:w-[30rem]">
        <form
          onSubmit={handleSubmit}
          className="grid-col grid gap-x-5 gap-y-6 rounded-lg border-gray-600 bg-slate-100 px-7 pb-8 pt-6 shadow-xl"
        >
          <Title as="h1">Regístrate</Title>
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
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            placeholder="Contraseña"
            required
          />
          <Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la contraseña"
            required
          />
          <div className="flex flex-col gap-x-5 gap-y-6 sm:flex-row sm:items-center sm:justify-between">
            <Input
              className="w-full"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nombre"
              placeholder="Nombre"
              required
            />
            <Input
              className="w-full"
              type="text"
              value={surnames}
              onChange={(e) => setSurnames(e.target.value)}
              label="Apellidos"
              placeholder="Apellidos"
              required
            />
          </div>
          <Input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            label="Fecha de nacimiento"
            placeholder="Birthdate"
            required
          />
          <Button
            type="submit"
            color="primary"
            className="my-2 block w-full rounded p-2"
          >
            Crear una nueva cuenta
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
