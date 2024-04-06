import Paths from '@src/constants/Paths'
import { IStock, IStockInfo } from '@src/models/Stock'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import { Router } from 'express'
import { IRes } from '../types/express/misc'
import { IReq } from '../types/types'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import isAuth from '../middleware/isAuth'
import isAdmin from '../middleware/isAdmin'
import { ResultSetHeader } from 'mysql2'
import StockRepo from '@src/repos/StockRepo'

const stockRouter = Router()

stockRouter.get(Paths.Stock.Index, async (_req: IReq, res: IRes) => {
  const connections = await useMysqlConnection()
  const [stocks] = await connections.query<IStockInfo[]>(
    'select s.*, c.name as city from stocks as s left join cities as c on c.id = s.city_id',
  )
  res.json({
    stocks: [...stocks],
  })
})

stockRouter.get(Paths.Stock.Show, async (_req: IReq, res: IRes) => {
  const id = _req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const stock = await StockRepo.getOne(id)
  res.json({
    stock,
  })
})

stockRouter.post(Paths.Stock.Create, isAuth, isAdmin, async (req: IReq<{ stock: IStock }>, res) => {
  const { stock } = req.body
  const connections = await useMysqlConnection()
  const [result] = await connections.query<ResultSetHeader>(
    `insert into stocks(name, address, city_id) values (?,?,?)`,
    [stock.name, stock.address, stock.city_id],
  )
  res
    .json({
      stock_id: result.insertId,
    })
    .status(HttpStatusCodes.CREATED)
})
stockRouter.patch(Paths.Stock.Update, isAuth, isAdmin, async (req: IReq<{ stock: IStock }>, res) => {
  const { stock } = req.body
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connections = await useMysqlConnection()
  await connections.query(
    `update stocks set
    name = ?,
    address = ?,
    city_id = ?
    where id = ?
  `,
    [stock.name, stock.address, stock.city_id, id],
  )
  res.json({
    stock_id: id,
  })
})

stockRouter.delete(Paths.Stock.Delete, isAuth, isAdmin, async (req, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  connection.query(`delete from stocks where id = ?`, [id])
  res.sendStatus(HttpStatusCodes.OK)
})

export default stockRouter
