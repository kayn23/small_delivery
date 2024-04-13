import filterPrepare, { IFilter, IResFilter } from '@src/util/filterPrepare'
import { useMysqlConnection } from './MysqlPool'
import { ICargo } from '@src/models/Cargo'
import showResultValidation from '@src/util/showResultValidation'
import { BadRequestEx, NotFoundEx } from '@src/util/exceptions'

async function getAll(filters?: IFilter) {
  const connection = await useMysqlConnection()
  let sql = 'select * from cargoes '
  let filterprep: IResFilter
  if (filters) {
    filterprep = filterPrepare(filters, 'or')
  } else {
    filterprep = {
      values: [],
      sql: '',
    }
  }
  if (filterprep.sql !== '') sql += `where ${filterprep.sql}`
  const [cargoes] = await connection.query<ICargo[]>(sql, filterprep?.values || [])
  return cargoes
}

async function getOne(id: string | number, quiet_mode = false) {
  const connection = await useMysqlConnection()
  const [cargoes] = await connection.query<ICargo[]>('select * from cargoes where id = ?', [id])
  if (quiet_mode) {
    if (cargoes.length !== 1) return undefined
  } else {
    if (cargoes.length === 0) throw new NotFoundEx()
    if (cargoes.length !== 1) throw new BadRequestEx()
  }
  return cargoes[0]
}

export default {
  getAll,
  getOne,
}
