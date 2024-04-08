export enum UserRole {
  client = 1,
  admin = 2,
}

export interface IUser {
  id?: number
  name: string
  surname: string
  lastname: string
  email: string
  role_id?: UserRole
  password?: string
}

export enum UserType {
  sender,
  recipient,
}
