import ApiService from './api.service'; // Importa la clase base si necesitas extender o usar config base

class PlayerService extends ApiService {
  constructor() {
    super();
  }

  private _getData = async (callAxios: Promise<any>) => {
    const { data, error } = await callAxios.catch(
      (err: { response: { data: { message: any } } }) => ({
        error: err.response.data.message,
      })
    );
    if (error) {
      return { error };
    }
    return data;
  };

  public async getMessiStats() {
    try {
      const data = await this._getData(
        this.instance.get(`/data/getMessiStats`)
      );
      return { status: 'ok', transactions: data };
    } catch (error) {
      console.error('Error getting player data:', error);
      return { status: 'error', error: error };
    }
  }

  // Puedes añadir más métodos aquí, por ejemplo, para actualizar o eliminar jugadores
}

export { PlayerService };
