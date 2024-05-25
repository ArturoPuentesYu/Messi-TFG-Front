// Definir el tipo para los usuarios
export interface IUser {
  _id: string
  email: string
  password: string // Aunque en la mayoría de los casos, no se maneja el password en el frontend
  name: string
  surnames?: string
  birthdate: Date
  is_admin?: Boolean
}
