import { IUser } from "./user.type"
// Definir el tipo para los comentarios
export interface IComment {
  _id: string
  content: string
  createdBy: IUser
  createdAt: Date
  updatedAt: Date
  likes?: number
  dislikes?: number
}

// Definir el tipo para los temas
export interface ITopic {
  _id: string
  title: string
  content: string
  createdBy: IUser
  createdAt: Date
  updatedAt: Date
  likes?: number
  dislikes?: number
  comments?: IComment[]
}
