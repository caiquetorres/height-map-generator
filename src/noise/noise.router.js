import { NoiseService } from './noise.service'

import { NoiseController } from './noise.controller'
import { Router } from 'express'

/**
 * Property that defines an object that contains all the default noise related routes.
 */
const router = Router()

const controller = new NoiseController()

router.post('/white-noise', (req, res, next) => {
  controller.generateWhiteNoiseImage(req, res).catch((error) => next(error))
})

export default router
