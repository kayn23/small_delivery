import { IStatus } from '@src/models/Status'
import { useMysqlConnection } from './MysqlPool'

async function getAll() {
  const connection = await useMysqlConnection()
  const [statuses] = await connection.query<IStatus[]>('select * from statuses')
  return {
    statuses,
  }
}

export default {
  getAll,
}
