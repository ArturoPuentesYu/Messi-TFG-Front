import ApiService from './api.service'

class UserService extends ApiService {
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

  public async getUser(id: string) {
    try {
      const data = await this._getData(this.instance.get(`/users/${id}`))
      return { status: 'ok', user: data }
    } catch (error) {
      console.error('Error fetching user data:', error)
      return { status: 'error', error: error }
    }
  }
  public async getAllUsers() {
    try {
      const data = await this._getData(this.instance.get(`/users/allUsers`))
      return { status: 'ok', users: data }
    } catch (error) {
      console.error('Error fetching user data:', error)
      return { status: 'error', error: error }
    }
  }
}

export { UserService }
