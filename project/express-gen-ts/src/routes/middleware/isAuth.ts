import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { IRes } from '../types/express/misc'
import { IReq } from '../types/types'
import { NextFunction } from 'express'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import EnvVars from '@src/constants/EnvVars'
import { IUser } from '@src/models/User'

export default async function <T = void>(req: IReq<T>, res: IRes, next: NextFunction) {
  const token = req.headers.authorization
  if (!token) {
    return res.sendStatus(HttpStatusCodes.UNAUTHORIZED)
  }

  const payload: JwtPayload = jwt.verify(token, EnvVars.Jwt.Secret) as JwtPayload
  const connection = await useMysqlConnection()
  const [users] = await connection.query<IUser[]>(`select * from users where id = '${payload.userId}'`)
  if (users.length !== 1) {
    return res.sendStatus(HttpStatusCodes.UNAUTHORIZED)
  }
  req.user = users[0]
  next()
}
