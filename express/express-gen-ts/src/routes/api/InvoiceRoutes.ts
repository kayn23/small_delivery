import Paths from '@src/constants/Paths'
import { Router } from 'express'
import isAuth from '../middleware/isAuth'
import { IReq } from '../types/types'
import isAdmin from '../middleware/isAdmin'
import { IInvoice } from '@src/models/Invoice'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import { ResultSetHeader } from 'mysql2'
import { UserRole } from '@src/models/User'
import showResultValidation from '@src/util/showResultValidation'

const invoiceRouter = Router()

invoiceRouter.get(Paths.Invoice.Index, isAuth, async (req: IReq, res) => {
  // todo need filters
  const { user } = req
  if (!user) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED)
  const connection = await useMysqlConnection()
  const [invoices] = await connection.query<IInvoice[]>('select * from invoices where sender = ? or recipient = ?', [
    user.id,
    user.id,
  ])
  res.json({
    invoices: [...invoices],
  })
})
invoiceRouter.get(Paths.Invoice.Show, isAuth, async (req: IReq, res) => {
  const { user } = req
  if (!user) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED)
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  let sql = 'select * from invoices where id = ?'
  const connection = await useMysqlConnection()
  const [invoices] = await connection.query<IInvoice[]>(sql, [id])
  if (!showResultValidation(invoices, res)) return
  const [invoice] = invoices
  if ((invoice.recipient !== user.id || invoice.sender !== user.id) && user.role_id !== UserRole.admin)
    return res.sendStatus(HttpStatusCodes.FORBIDDEN)
  res.json({
    invoice: invoice,
  })
})

invoiceRouter.post(Paths.Invoice.Create, isAuth, async (req: IReq<{ invoice: IInvoice }>, res) => {
  const { user } = req
  const { invoice } = req.body
  if (!user) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED)
  const connection = await useMysqlConnection()
  let sql = 'insert into invoices(sender, recipient, end_point, status) values (?,?,?,1)'
  const [result] = await connection.query<ResultSetHeader>(sql, [
    invoice?.sender ?? user.id,
    invoice.recipient,
    invoice.end_point,
    invoice.price,
  ])
  res
    .json({
      invoice_id: result.insertId,
    })
    .status(HttpStatusCodes.CREATED)
})
invoiceRouter.patch(Paths.Invoice.Create, isAuth, isAdmin, async (req: IReq<{ invoice: IInvoice }>, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const { invoice } = req.body
  const connection = await useMysqlConnection()
  await connection.query('update invoices set sender = ?, recipient = ?, end_point = ?, status = ?, price = ?', [
    invoice.sender,
    invoice.recipient,
    invoice.end_point,
    invoice.status,
    invoice.price,
  ])
  res.json({
    invoice_id: id,
  })
})
invoiceRouter.delete(Paths.Invoice.Create, isAuth, isAdmin, async (req, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  await connection.query('delete from invoices where id = ?', [id])
  res.sendStatus(HttpStatusCodes.OK)
})

export default invoiceRouter
