import { BadRequestEx, NotFoundEx } from '@src/util/exceptions'
import { useMysqlConnection } from './MysqlPool'
import User, { IUser } from '@src/models/User'
import { ResultSetHeader } from 'mysql2'
import filterPrepare, { IFilter, IResFilter } from '@src/util/filterPrepare'

async function getOne(id: string | number, quiet_mode = false, with_pass = false): Promise<IUser | undefined> {
  const connection = await useMysqlConnection()
  const [users] = await connection.query<IUser[]>(`select * from users where id = '${id}'`)
  if (quiet_mode) {
    if (users.length !== 1) return undefined
  } else {
    if (users.length === 0) throw new NotFoundEx()
    if (users.length !== 1) throw new BadRequestEx()
  }
  const user = users[0]
  if (!with_pass) delete user.password
  return user
}

async function getAll(filter?: IFilter): Promise<IUser[]> {
  let sql = 'select * from users '
  let filterprep: IResFilter
  if (filter) {
    filterprep = filterPrepare(filter, 'or')
  } else {
    filterprep = {
      values: [],
      sql: '',
    }
  }
  if (filterprep.sql !== '') sql += `where ${filterprep.sql}`
  const connection = await useMysqlConnection()
  const [users] = await connection.query<IUser[]>(sql, filterprep?.values || [])
  return users
}

async function createUser(user: IUser) {
  const connection = await useMysqlConnection()
  const [result] = await connection.query<ResultSetHeader>(
    `insert into users(name,surname,lastname,email,password) values (?,?,?,?,?)`,
    [user.name, user.surname, user.lastname, user.email, User.genPassword(), 1],
  )
  return result.insertId
}

async function updateUser(id: string | number, user: IUser) {
  const connection = await useMysqlConnection()
  const [result] = await connection.query<ResultSetHeader>(
    `update users set 
    name = ?,
    surname = ?,
    lastname = ?,
    email = ?,
    role_id = ?
    where id = ?`,
    [user.name, user.surname, user.lastname, user.email, user.role_id, id],
  )
  if (result.affectedRows === 0) throw new NotFoundEx()
}

export default {
  getOne,
  createUser,
  updateUser,
  getAll,
}
