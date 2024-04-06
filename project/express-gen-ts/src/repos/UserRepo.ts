import { BadRequestEx, NotFoundEx } from '@src/util/exceptions'
import { useMysqlConnection } from './MysqlPool'
import { IUser } from '@src/models/User'
import { ResultSetHeader } from 'mysql2'

async function getOne(id: string | number, quiet_mode = false): Promise<IUser | undefined> {
  const connection = await useMysqlConnection()
  const [users] = await connection.query<IUser[]>(`select * from users where id = '${id}'`)
  if (quiet_mode) {
    if (users.length !== 1) return undefined
  } else {
    if (users.length === 0) throw new NotFoundEx()
    if (users.length !== 1) throw new BadRequestEx()
  }
  const user = users[0]
  delete user.password
  return user
}

async function createUser(user: IUser) {
  const connection = await useMysqlConnection()
  const [result] = await connection.query<ResultSetHeader>(
    `insert into users(name,surname,lastname,email,document_number,password,role_id) values ('${user.name}', '${user.surname}', '${user.lastname}', '${user.email}', '${user.document_number}',
  '${user.password ?? '***null***'}', 1)`,
  )
  return result.insertId
}

export default {
  getOne,
  createUser,
}
