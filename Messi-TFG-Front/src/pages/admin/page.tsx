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
      <div className="w-[80%] sm:w-[30rem]">
        {users.map((user) => (
          <>
            <div
              key={user._id}
              className="flex w-[80%] flex-col justify-between rounded-lg bg-white/50 px-6 py-4 shadow-md hover:bg-slate-300/50 hover:shadow-2xl"
            >
              <div className="flex flex-row justify-between">
                <Title as="h2" className="hover:underline">
                  {user.name}
                </Title>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Admin
