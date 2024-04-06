import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import Paths from '@src/constants/Paths'
import { ICity } from '@src/models/City'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import showResultValidation from '@src/util/showResultValidation'
import { Router } from 'express'
import isAuth from '../middleware/isAuth'
import isAdmin from '../middleware/isAdmin'
import { IReq } from '../types/types'
import { ResultSetHeader } from 'mysql2'

const cityRouter = Router()

cityRouter.get(Paths.City.Index, async (_req, res) => {
  const connection = await useMysqlConnection()
  const [cities] = await connection.query<ICity[]>('select * from cities')
  res.json({
    cities: [...cities],
  })
})
cityRouter.get(Paths.City.Show, async (req, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  const [cities] = await connection.query<ICity[]>('select * from cities where id = ?', [id])
  showResultValidation(cities)
  res.json({
    city: {
      ...cities[0],
    },
  })
})
cityRouter.post(Paths.City.Create, isAuth, isAdmin, async (req: IReq<{ city: ICity }>, res) => {
  const { city } = req.body
  const connection = await useMysqlConnection()
  const [result] = await connection.query<ResultSetHeader>('insert into cities(name) value (?)', [city.name])
  res
    .json({
      city_id: result.insertId,
    })
    .status(HttpStatusCodes.CREATED)
})

cityRouter.patch(Paths.City.Update, isAuth, isAdmin, async (req: IReq<{ city: ICity }>, res) => {
  const id = req.params.id,
    { city } = req.body
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  await connection.query('update cities set name = ? where id = ?', [city.name, id])
  res.json({
    city_id: id,
  })
})

cityRouter.delete(Paths.City.Delete, isAuth, isAdmin, async (req: IReq, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  await connection.query('delete from cities where id = ?', [id])
  res.sendStatus(HttpStatusCodes.OK)
})

export default cityRouter
