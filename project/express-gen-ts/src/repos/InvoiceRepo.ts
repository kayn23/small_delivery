import { IInvoice, IInvoiceWithInfo } from '@src/models/Invoice'
import { useMysqlConnection } from './MysqlPool'
import showResultValidation from '@src/util/showResultValidation'
import UserRepo from './UserRepo'
import StockRepo from './StockRepo'
import filterPrepare, { IFilter, IResFilter } from '@src/util/filterPrepare'

async function getOneWithInfo(id: string | number, queit_mode = false): Promise<IInvoiceWithInfo | undefined> {
  let sql = 'select * from invoices where id = ?'
  const connection = await useMysqlConnection()
  const [invoices] = await connection.query<IInvoice[]>(sql, [id])
  const res = showResultValidation<IInvoice>(invoices, queit_mode)
  if (queit_mode) return undefined
  const [invoice] = res as IInvoiceWithInfo[]
  invoice.recipient_info = await UserRepo.getOne(invoice.recipient, true)
  invoice.sender_info = await UserRepo.getOne(invoice.sender, true)
  invoice.end_point_info = await StockRepo.getOne(invoice.end_point, true)
  return invoice
}

async function getAll(user_id: number, filter?: IFilter) {
  const connection = await useMysqlConnection()
  let sql = 'select * from invoices where '
  let filterprep: IResFilter
  if (filter) {
    filterprep = filterPrepare(filter)
  } else {
    filterprep = {
      values: [],
      sql: '',
    }
  }
  sql += filterprep.sql
  if (filter && Object.keys(filter).length !== 0) sql += ' and '
  sql += '(sender = ? or recipient = ?) order by status asc'
  const [invoices] = await connection.query<IInvoice[]>(sql, [...filterprep.values, user_id, user_id])
  return invoices
}

export default {
  getOneWithInfo,
  getAll,
}
