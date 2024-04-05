import { RowDataPacket } from 'mysql2'

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 'with the appropriate user keys.'

// **** Types **** //

export enum UserRole {
  client = 1,
  admin = 2,
}

export interface IUser extends RowDataPacket {
  id: number
  name: string
  surname: string
  lastname: string
  email: string
  document_number: string
  role_id: UserRole
  password?: string
}

// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  name?: string,
  lastname?: string,
  surname?: string,
  email?: string,
  documentNumber?: string,
  id?: number, // id last cause usually set by db
  role_id?: number,
  password?: string,
): IUser {
  return {
    id: id ?? -1,
    name: name ?? '',
    lastname: lastname ?? '',
    surname: surname ?? '',
    email: email ?? '',
    document_number: documentNumber ?? '',
    role_id: role_id ?? 1,
    password,
  } as IUser
}

/**
 * Get user instance from object.
 */
function fromObject(param: object): IUser {
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM)
  }
  const p = param as IUser
  return new_(p.name, p.surname, p.lastname, p.email, p.document_number, p.id, p.role_id, p.password)
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    typeof arg.id === 'number' &&
    'email' in arg &&
    typeof arg.email === 'string' &&
    'name' in arg &&
    typeof arg.name === 'string' &&
    'surname' in arg &&
    typeof arg.surname === 'string' &&
    'lastname' in arg &&
    typeof arg.lastname === 'string' &&
    'documentNumber' in arg &&
    typeof arg.documentNumber === 'string'
  )
}

// **** Export default **** //

export default {
  new: new_,
  fromObject,
  isUser,
} as const
