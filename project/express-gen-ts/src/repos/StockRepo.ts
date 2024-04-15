import { IStock, IStockInfo } from '@src/models/Stock'
import { useMysqlConnection } from './MysqlPool'
import { BadRequestEx, NotFoundEx } from '@src/util/exceptions'
import filterPrepare, { IFilter, IResFilter } from '@src/util/filterPrepare'

async function getAll(filter?: IFilter) {
  let sql = ''
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

  const connections = await useMysqlConnection()
  const [stocks] = await connections.query<IStockInfo[]>(
    `select s.*, c.name as city from stocks as s left join cities as c on c.id = s.city_id ${sql} order by s.deleted`,
    [...filterprep.values],
  )
  return stocks
}
async function getAllWithDeleted() {
  const connections = await useMysqlConnection()
  const [stocks] = await connections.query<IStockInfo[]>(
    'select s.*, c.name as city from stocks as s left join cities as c on c.id = s.city_id',
  )
  return stocks
}
async function getOne(id: string | number, quiet_mode: boolean = false): Promise<IStockInfo | undefined> {
  const connections = await useMysqlConnection()
  const [stocks] = await connections.query<IStockInfo[]>(
    'select s.*, c.name as city from stocks as s left join cities as c on c.id = s.city_id where s.id = ' + `'${id}'`,
  )
  if (quiet_mode) {
    if (stocks.length !== 1) return undefined
  } else {
    if (stocks.length === 0) throw new NotFoundEx()
    if (stocks.length !== 1) throw new BadRequestEx()
  }
  return stocks[0]
}
async function destroy(id: string | number) {
  const connection = await useMysqlConnection()
  connection.query(`update stocks set deleted = true where id = ?`, [id])
}
async function update(id: string | number, stock: IStock) {
  const connections = await useMysqlConnection()
  console.log(stock)
  await connections.query(
    `update stocks set
    name = ?,
    address = ?,
    city_id = ?,
    deleted = ?
    where id = ?
  `,
    [stock.name, stock.address, stock.city_id, stock.deleted, id],
  )
}

export default {
  getOne,
  destroy,
  getAll,
  getAllWithDeleted,
  update,
}
