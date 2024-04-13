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
import CargoRepo from '@src/repos/CargoRepo'

const cargoRouter = Router()

cargoRouter.get(Paths.Cargo.Index, async (_req, res) => {
  res.json({
    cargoes: await CargoRepo.getAll(),
  })
})
cargoRouter.get(Paths.Cargo.Show, async (req, res) => {
  const id = req.params.cargo_id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  res.json({
    cargo: await CargoRepo.getOne(id),
  })
})
cargoRouter.post(Paths.Cargo.Create, isAuth, isAdmin, async (req: IReq<{ cargo: ICargo }>, res) => {
  const { cargo } = req.body
  const connection = await useMysqlConnection()
  const [result] = await connection.query<ResultSetHeader>('insert into cargoes(weight, invoice_id) value (?, ?)', [
    cargo.weight,
    cargo.invoice_id,
  ])
  res
    .json({
      cargo_id: result.insertId,
    })
    .status(HttpStatusCodes.CREATED)
})

cargoRouter.patch(Paths.Cargo.Update, isAuth, isAdmin, async (req: IReq<{ cargo: ICargo }>, res) => {
  const id = req.params.cargo_id,
    { cargo } = req.body
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  await connection.query('update cargoes set weight = ?, invoice_id = ? where id = ?', [
    cargo.weight,
    cargo.invoice_id,
    id,
  ])
  res.json({
    cargo_id: id,
  })
})

cargoRouter.delete(Paths.Cargo.Delete, isAuth, isAdmin, async (req: IReq, res) => {
  const id = req.params.cargo_id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  await connection.query('delete from cargoes where id = ?', [id])
  res.sendStatus(HttpStatusCodes.OK)
})

export default cargoRouter
