import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import Paths from '@src/constants/Paths'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import showResultValidation from '@src/util/showResultValidation'
import { Router } from 'express'
import { ResultSetHeader } from 'mysql2'
import isAuth from '../middleware/isAuth'
import isAdmin from '../middleware/isAdmin'
import { IReq } from '../types/types'
import { ICargo } from '@src/models/Cargo'

const cargoRouter = Router()

cargoRouter.get(Paths.Cargo.Index, async (_req, res) => {
  const connection = await useMysqlConnection()
  const [cargoes] = await connection.query<ICargo[]>('select * from cargoes')
  res.json({
    cargoes: [...cargoes],
  })
})
cargoRouter.get(Paths.Cargo.Show, async (req, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  const [cargoes] = await connection.query<ICargo[]>('select * from cargoes where id = ?', [id])
  if (!showResultValidation(cargoes, res)) return
  res.json({
    cargo: {
      ...cargoes[0],
    },
  })
})
cargoRouter.post(Paths.Cargo.Create, isAuth, isAdmin, async (req: IReq<{ cargo: ICargo }>, res) => {
  const { cargo } = req.body
  const connection = await useMysqlConnection()
  const [result] = await connection.query<ResultSetHeader>('insert into cargoes(weight, invoices_id) value (?)', [
    cargo.weight,
    cargo.invoices_id,
  ])
  res
    .json({
      cargo_id: result.insertId,
    })
    .status(HttpStatusCodes.CREATED)
})

cargoRouter.patch(Paths.Cargo.Update, isAuth, isAdmin, async (req: IReq<{ cargo: ICargo }>, res) => {
  const id = req.params.id,
    { cargo } = req.body
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  await connection.query('update cargoes set weight = ?, invoices_id = ? where id = ?', [
    cargo.weight,
    cargo.invoices_id,
    id,
  ])
  res.json({
    cargo_id: id,
  })
})

cargoRouter.delete(Paths.Cargo.Delete, isAuth, isAdmin, async (req: IReq, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  await connection.query('delete from cargoes where id = ?', [id])
  res.sendStatus(HttpStatusCodes.OK)
})

export default cargoRouter
