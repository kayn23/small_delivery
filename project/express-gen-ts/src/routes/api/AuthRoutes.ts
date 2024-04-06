import { useMysqlConnection } from '@src/repos/MysqlPool'
import { IRes } from '../types/express/misc'
import { IReq } from '../types/types'
import { IUser } from '@src/models/User'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import jwt from 'jsonwebtoken'
import EnvVars from '@src/constants/EnvVars'

async function signin(req: IReq<{ email: string; password: string }>, res: IRes) {
  const body = req.body
  const connection = await useMysqlConnection()
  console.log(`select * from users where email = '${body.email}' and password = '${body.password}'`)
  const [users] = await connection.query<IUser[]>(
    `select * from users where email = '${body.email}' and password = '${body.password}'`,
  )
  if (users.length !== 1) {
    return res.sendStatus(HttpStatusCodes.NOT_FOUND)
  }
  res.json({
    token: jwt.sign(
      {
        userId: users[0].id,
      },
      EnvVars.Jwt.Secret,
    ),
    id: users[0].id,
  })
}

export default {
  signin,
}
