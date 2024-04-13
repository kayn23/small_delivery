import { NextFunction } from 'express'
import { IReq } from '../types/types'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import { JwtPayload } from 'jsonwebtoken'
import EnvVars from '@src/constants/EnvVars'
import { IUser } from '@src/models/User'
import jwt from 'jsonwebtoken'
import { IRes } from '../types/express/misc'

export default async function <T = void>(req: IReq<T>, _res: IRes, next: NextFunction) {
  const token = req.headers.authorization
  if (token) {
    const connection = await useMysqlConnection()
    const payload: JwtPayload = jwt.verify(token, EnvVars.Jwt.Secret) as JwtPayload
    const [users] = await connection.query<IUser[]>(`select * from users where id = '${payload.userId}'`)
    if (users.length === 1) req.user = users[0]
  }
  next()
}
