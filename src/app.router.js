import fftRouter from './fft/fft.router'
import mapRouter from './map/map.router'
import noiseRouter from './noise/noise.router'

import { AppService } from './app.service'

import { Router } from 'express'

/**
 * Property that defines an object that contains all the default app
 * routes.
 */
const router = Router()

/**
 * Property that defines the noise service, responsible for handling all the business logic related with the default app.
 */
const service = new AppService()

router.get('/ping', (_, res) => {
  res.send(service.ping())
})

router.use('/noises', noiseRouter)
router.use('/fft', fftRouter)
router.use('/maps', mapRouter)

export default router
