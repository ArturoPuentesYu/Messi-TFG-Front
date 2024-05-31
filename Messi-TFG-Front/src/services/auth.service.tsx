import ApiService from './api.service'

class AuthService extends ApiService {
  constructor() {
    super()
  }

  private _getData = async (callAxios: Promise<any>) => {
    const { data, error } = await callAxios.catch(
      (err: { response: { data: { message: any } } }) => ({
        error: err.response.data.message
      })
    )
    if (error) {
      return { error }
    }
    return data
  }

  public async register(user: {
    email: string
    password: string
    name: string
    surnames: string
    birthdate: Date
  }) {
    try {
      const data = await this._getData(this.instance.post(`/auth/register`, user))
      return { status: 'ok', user: data }
    } catch (error) {
      console.error('Error registering user:', error)
      return { status: 'error', error: error }
    }
  }

  public async login(user: { email: string; password: string }) {
    try {
      const data = await this._getData(this.instance.post(`/auth/login`, user))
      if (data.token) {
        localStorage.setItem('token', data.token)
      }
      return { status: 'ok', user: data.user }
    } catch (error) {
      console.error('Error logging in:', error)
      return { status: 'error', error: error }
    }
  }

  public logout() {
    localStorage.removeItem('token')
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  public async getCurrentUser() {
    try {
      const token = this.getToken()
      if (!token) throw new Error('No token found')
      const data = await this._getData(
        this.instance.get(`/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
      return { status: 'ok', user: data }
    } catch (error) {
      console.error('Error fetching user data:', error)
      return { status: 'error', error: error }
    }
  }
}

export { AuthService }
