import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthService } from "../../services/auth.service"
import { Button, Input, Password } from "rizzui"

const authService = new AuthService()

const Register: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [surnames, setSurnames] = useState("")
  const [birthdate, setBirthdate] = useState("")

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
      if (response.status === "ok") {
        navigate("/login")
      } else {
        console.error(response.error)
      }
    } catch (error) {
      console.error("Error registering user:", error)
    }
  }

  return (
    <div className="flex justify-center items-center w-full screen-minus-navbar bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
      <div className="w-[80%] sm:w-[30rem]">
        <form
          onSubmit={handleSubmit}
          className="grid grid-col gap-y-6 gap-x-5 bg-slate-100 border-gray-600 px-7 pt-6 pb-8 rounded-lg shadow-xl"
        >
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
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nombre"
            placeholder="Nombre"
            required
          />
          <Input
            type="text"
            value={surnames}
            onChange={(e) => setSurnames(e.target.value)}
            label="Apellidos"
            placeholder="Apellidos"
            required
          />
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
            className="block w-full p-2 rounded my-2"
          >
            Registrate
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register
