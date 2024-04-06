import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { IUser } from '@src/models/User'
import { useMysqlConnection } from '@src/repos/MysqlPool'
import { Router } from 'express'
import isAdmin from '../middleware/isAdmin'
import isAuth from '../middleware/isAuth'
import { IReq, IRes } from '../types/express/misc'
import { IReq as IReqWith } from '../types/types'
import { ResultSetHeader } from 'mysql2'
import Paths from '@src/constants/Paths'
import UserRepo from '@src/repos/UserRepo'

const userRouter = Router()

userRouter.get(Paths.NewUsers.Index, isAuth, (req: IReqWith, res: IRes) => {
  delete req.user?.password
  res.json({
    user: req.user,
  })
})

userRouter.get(Paths.NewUsers.Show, isAuth, isAdmin, async (req: IReq, res: IRes) => {
  const id = req.params.id
  const user = await UserRepo.getOne(id)
  res.json({
    user,
  })
})

userRouter.post(Paths.NewUsers.Create, isAuth, isAdmin, async (req: IReqWith<{ user: IUser }>, res: IRes) => {
  const { user } = req.body
  const user_id = UserRepo.createUser(user)
  res
    .json({
      user_id,
    })
    .status(HttpStatusCodes.CREATED)
})

userRouter.patch(Paths.NewUsers.Update, isAuth, isAdmin, async (req: IReq<{ user: IUser }>, res: IRes) => {
  const id = req.params.id
  const { user } = req.body
  const connection = await useMysqlConnection()
  const [result] = await connection.query<ResultSetHeader>(
    `update users set 
    name = '${user.name}',
    surname = '${user.surname}',
    lastname = '${user.lastname}',
    email = '${user.email}',
    document_number = '${user.document_number}',
    role_id = '${user.role_id}'
    where id = '${id}' where id = ?`,
    [id],
  )
  if (result.affectedRows === 0) return res.sendStatus(HttpStatusCodes.NOT_FOUND)
  res.json({
    user_id: id,
  })
})

userRouter.delete(Paths.NewUsers.Delete, isAuth, isAdmin, async (req, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(HttpStatusCodes.BAD_REQUEST)
  const connection = await useMysqlConnection()
  connection.query('delete from users where id = ?', [id])
  res.sendStatus(HttpStatusCodes.OK)
})

export default userRouter
