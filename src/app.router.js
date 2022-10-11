import { Router } from 'express'
import { AppService } from './app.service'

/**
 * Property that defines an object that contains all the default app
 * routes.
 */
const router = Router()

/**
 * Property that defines an object that contains the default application
 * controller.
 */
const service = new AppService()

router.get('/ping', (_, res) => {
  res.send(service.ping())
})

export default router
