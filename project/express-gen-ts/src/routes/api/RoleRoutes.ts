import Paths from '@src/constants/Paths'
import RoleRepo from '@src/repos/RoleRepo'
import { Router } from 'express'

const roleRouter = Router()

roleRouter.get(Paths.Role.Index, async (_req, res) => {
  res.json({
    roles: await RoleRepo.getAll(),
  })
})

export default roleRouter
