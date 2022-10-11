import { NoiseService } from './noise.service'

import { Router } from 'express'

/**
 * Property that defines an object that contains all the default noise related routes.
 */
const router = Router()

/**
 * Property that defines the noise service, responsible for handling all the business logic related with noises.
 */
const service = new NoiseService()

router.post('/white-noise', async (req, res) => {
  const { size, seed } = req.body

  const noiseImage = await service.generateWhiteNoiseImage(size, seed)

  const mimetype = noiseImage.getMIME()
  const buffer = await noiseImage.getBufferAsync(mimetype)

  res.set('Content-Type', mimetype).send(buffer)
})

export default router
