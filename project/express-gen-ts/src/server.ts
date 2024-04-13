/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
import helmet from 'helmet'
import express, { Request, Response, NextFunction } from 'express'
import logger from 'jet-logger'

import 'express-async-errors'

import BaseRouter from '@src/routes/api'
import Paths from '@src/constants/Paths'

import EnvVars from '@src/constants/EnvVars'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import { NodeEnvs } from '@src/constants/misc'
import { RouteError } from '@src/other/classes'
import cors from 'cors'
import { BadRequestEx, ForbiddenEx, NotFoundEx, UnauthorizedEx } from './util/exceptions'
import useUser from './routes/middleware/useUser'

// **** Variables **** //

const app = express()

// **** Setup **** //

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(EnvVars.CookieProps.Secret))
app.use(cors())

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'))
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet())
}

app.use('*', useUser)

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter)

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true)
    }
    let status = HttpStatusCodes.BAD_REQUEST
    if (err instanceof RouteError) {
      status = err.status
    }
    if (err instanceof BadRequestEx) {
      status = HttpStatusCodes.BAD_REQUEST
    }
    if (err instanceof NotFoundEx) {
      status = HttpStatusCodes.NOT_FOUND
    }
    if (err instanceof ForbiddenEx) {
      status = HttpStatusCodes.FORBIDDEN
    }
    if (err instanceof UnauthorizedEx) {
      status = HttpStatusCodes.UNAUTHORIZED
    }
    return res.status(status).json({ error: err.message })
  },
)

// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views')
app.set('views', viewsDir)

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))

// // Nav to users pg by default
// app.get('/', (_: Request, res: Response) => {
//   return res.redirect('/users')
// })

// // Redirect to login if not logged in.
// app.get('/users', (_: Request, res: Response) => {
//   return res.sendFile('users.html', { root: viewsDir })
// })

// **** Export default **** //

export default app
