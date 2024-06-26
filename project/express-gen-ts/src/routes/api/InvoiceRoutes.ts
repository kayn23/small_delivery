import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import Paths from '@src/constants/Paths'
import Invoice, { IInvoice } from '@src/models/Invoice'
import InvoiceRepo from '@src/repos/InvoiceRepo'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import { NextFunction, Router } from 'express'
import { ResultSetHeader } from 'mysql2'
import isAdmin from '../middleware/isAdmin'
import isAuth from '../middleware/isAuth'
import { IReq, IReqQuery } from '../types/types'
import { IFilter } from '@src/util/filterPrepare'
import { BadRequestEx, NotFoundEx, UnauthorizedEx } from '@src/util/exceptions'
import CargoRepo from '@src/repos/CargoRepo'
import { IRes } from '../types/express/misc'

const invoiceRouter = Router()

const subRouter = Router({ mergeParams: true })
subRouter.get(Paths.Invoice.Cargoes.Index, isAuth, async (req: IReq, res) => {
  if (!req.params.invoice_id) throw new NotFoundEx()
  const cargoes = await CargoRepo.getAll({
    invoice_id_eq: req.params.invoice_id,
  })
  res.json({
    cargoes: cargoes.map((item) => {
      return {
        ...item,
        qr: JSON.stringify({ invoice_id: item.invoices_id }),
      }
    }),
  })
})

function withInvId(req: IReq, _res: IRes, next: NextFunction) {
  req.invoice_id = req.params.invoice_id
  next()
}
invoiceRouter.use(Paths.Invoice.Cargoes.Base, subRouter)

invoiceRouter.get(Paths.Invoice.Index, isAuth, async (req: IReqQuery<IFilter>, res) => {
  // todo need filters
  const { user } = req
  const query = req.query
  if (!user) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED)
  const invoices = await InvoiceRepo.getAll(user.id, query)
  res.json({
    invoices: [...invoices],
  })
})
invoiceRouter.get(Paths.Invoice.Show, isAuth, async (req: IReq, res) => {
  const { user } = req
  if (!user) throw new UnauthorizedEx()
  const id = req.params.invoice_id
  if (!id) throw new NotFoundEx()
  const invoice = await InvoiceRepo.getOneWithInfo(id)
  if (invoice) Invoice.checkRight(invoice, user)
  res.json({
    invoice,
  })
})

invoiceRouter.post(Paths.Invoice.Create, isAuth, async (req: IReq<{ invoice: IInvoice }>, res) => {
  const { user } = req
  const { invoice } = req.body
  if (!user) throw new UnauthorizedEx()
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
invoiceRouter.patch(Paths.Invoice.Update, isAuth, isAdmin, async (req: IReq<{ invoice: IInvoice }>, res) => {
  const id = req.params.invoice_id
  if (!id) throw new BadRequestEx()
  const { invoice } = req.body
  const connection = await useMysqlConnection()
  await connection.query(
    'update invoices set sender = ?, recipient = ?, end_point = ?, status = ?, price = ? where id = ?',
    [invoice.sender, invoice.recipient, invoice.end_point, invoice.status, invoice.price, id],
  )
  res.json({
    invoice_id: id,
  })
})
invoiceRouter.delete(Paths.Invoice.Create, isAuth, isAdmin, async (req, res) => {
  const id = req.params.invoice_id
  if (!id) throw new BadRequestEx()
  const connection = await useMysqlConnection()
  await connection.query('delete from invoices where id = ?', [id])
  res.sendStatus(HttpStatusCodes.OK)
})
export default invoiceRouter
