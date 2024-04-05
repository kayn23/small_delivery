import { NextFunction } from 'express'
import { IRes } from '../types/express/misc'
import { IReq } from '../types/types'
import { UserRole } from '@src/models/User'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'

export default function <T = void>(req: IReq<T>, res: IRes, next: NextFunction) {
  if (req.user && req.user.role_id === UserRole.admin) next()
  else res.sendStatus(HttpStatusCodes.FORBIDDEN)
}
