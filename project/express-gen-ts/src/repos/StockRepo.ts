import { IStock, IStockInfo } from '@src/models/Stock'
import { useMysqlConnection } from './MysqlPool'
import { BadRequestEx, NotFoundEx } from '@src/util/exceptions'

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

export default {
  getOne,
}
