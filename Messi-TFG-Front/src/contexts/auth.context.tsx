import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode
} from 'react'
import { AuthService } from '../services/auth.service'

const authService = new AuthService()

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      authService
        .getCurrentUser()
        .then((response) => {
          if (response.status === 'ok') {
            setIsAuthenticated(true)
            setUser(response.user)
          }
        })
        .catch(() => {
          authService.logout()
          setIsAuthenticated(false)
          setUser(null)
        })
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    if (response.status === 'ok') {
      const userResponse = await authService.getCurrentUser()
      if (userResponse.status === 'ok') {
        setIsAuthenticated(true)
        setUser(userResponse.user)
      }
    } else {
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
