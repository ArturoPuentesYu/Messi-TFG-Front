import axios, { AxiosInstance } from 'axios';

class ApiService {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_PUBLIC_API_URL,
    });


    // Añadir interceptores de respuesta si es necesario
    this.instance.interceptors.response.use(
      response => response,
      this.errorHandler
    );
  }

  errorHandler = (error: any) => {
    // Manejo de errores (podrías usar la misma lógica que en respuestas anteriores)
    if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      throw new Error(error.response.data?.message || 'Unknown API error');
    } else if (error.request) {
      console.error('API Error: No response received from server');
      throw new Error('No response received');
    } else {
      console.error(`API Setup Error: ${error.message}`);
      throw error;
    }
  };
}

export default ApiService;
