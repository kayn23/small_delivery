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
apiRouter.use(Paths.Stock.Base, stockRouter)
apiRouter.use(Paths.City.Base, cityRouter)
apiRouter.use(Paths.Cargo.Base, cargoRouter)
apiRouter.use(Paths.Invoice.Base, invoiceRouter)

// **** Export default **** //

export default apiRouter