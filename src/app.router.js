import { Router } from 'express'
import { AppController } from './app.controller'

const router = Router()
const controller = new AppController()

router.get('/ping', (_, res) => {
  res.send(controller.ping())
})

export default router
