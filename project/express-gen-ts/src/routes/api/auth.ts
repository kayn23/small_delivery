import { Router } from 'express'
import Paths from '@src/constants/Paths'
import AuthRoutes from './AuthRoutes'

const authRouter = Router()

authRouter.post(Paths.Auth.SignIn, AuthRoutes.signin)

export default authRouter
