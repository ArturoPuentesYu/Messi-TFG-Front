import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../../services/auth.service'
import { Button, Input, Password, Title } from 'rizzui'
import { useAuth } from '../../contexts/auth.context'
import { UserService } from '../../services/user.service'

const Admin: React.FC = () => {
  const { isAdmin } = useAuth()
  const userService = new UserService()
  const [users, setUsers] = useState<any[]>([])
  if (!isAdmin) {
    const Navigate = useNavigate()
    Navigate('/')
  }
  useEffect(() => {
    userService.getAllUsers().then((response) => {
      if (response.status === 'ok') {
        setUsers(response.users)
      }
    })
  }, [])
  return (
    <div className="screen-minus-navbar flex items-center justify-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
      <div className="w-[80%] sm:w-[30rem]">{users.map((user) => user)}</div>
    </div>
  )
}

export default Admin
