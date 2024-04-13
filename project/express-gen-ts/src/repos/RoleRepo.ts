import { IRole } from '@src/models/Role'
import { useMysqlConnection } from './MysqlPool'

async function getAll() {
  const connection = await useMysqlConnection()
  const [roles] = await connection.query<IRole[]>('select * from roles')
  return roles
}

export default {
  getAll,
}
