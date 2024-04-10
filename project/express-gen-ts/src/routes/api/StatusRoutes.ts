import Paths from '@src/constants/Paths'
import statusRepo from '@src/repos/statusRepo'
import { Router } from 'express'

const statusRouter = Router()

statusRouter.get(Paths.Status.Index, async (_req, res) => {
  res.json({
    ...(await statusRepo.getAll()),
  })
})

export default statusRouter
