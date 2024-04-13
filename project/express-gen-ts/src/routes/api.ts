import { Router } from 'express'
import jetValidator from 'jet-validator'

import Paths from '../constants/Paths'
// import User from '@src/models/User'
import UserRoutes from './api/UserRoutes'
import authRouter from './api/auth'
import stockRouter from './api/StockRoutes'
import cityRouter from './api/CityRoutes'
import cargoRouter from './api/CargoRoutes'
import invoiceRouter from './api/InvoiceRoutes'
import QRCode from 'qrcode'
import isAuth from './middleware/isAuth'
import isAdmin from './middleware/isAdmin'
import UserRepo from '@src/repos/UserRepo'
import statusRouter from './api/StatusRoutes'
import roleRouter from './api/RoleRoutes'
import { IReqQuery } from './types/types'
import { IFilter } from '@src/util/filterPrepare'

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator()

// ** Add UserRouter ** //

// const userRouter = Router()
//
// // Get all users
// userRouter.get(Paths.Users.Get, UserRoutes.getAll)
//
// // Add one user
// userRouter.post(Paths.Users.Add, validate(['user', User.isUser]), UserRoutes.add)
//
// // Update one user
// userRouter.put(Paths.Users.Update, validate(['user', User.isUser]), UserRoutes.update)
//
// // Delete one user
// userRouter.delete(Paths.Users.Delete, validate(['id', 'number', 'params']), UserRoutes.delete)
//
// Add UserRouter
// apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Auth.Base, authRouter)
apiRouter.use(Paths.NewUsers.Base, UserRoutes)
apiRouter.get(Paths.NewUsers.All, isAuth, isAdmin, async (req: IReqQuery<IFilter>, res) => {
  const query = req.query
  res.json({
    users: await UserRepo.getAll(query),
  })
})
apiRouter.use(Paths.Stock.Base, stockRouter)
apiRouter.use(Paths.City.Base, cityRouter)
apiRouter.use(Paths.Cargo.Base, cargoRouter)
apiRouter.use(Paths.Invoice.Base, invoiceRouter)
apiRouter.use(Paths.Status.Base, statusRouter)
apiRouter.use(Paths.Role.Base, roleRouter)

// **** Export default **** //

export default apiRouter
