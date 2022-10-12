import { HeightMapService } from './height-map.service'

import { Router } from 'express'

const router = Router()

const service = new HeightMapService()

router.post('/', async (req, res) => {
  const { size, roughness, seed } = req.body

  const noiseImage = await service.generateHeighMap(size, seed, roughness)
  const buffer = await noiseImage.getBufferAsync('image/jpeg')

  res.set('Content-Type', 'image/jpeg').send(buffer)
})

export default router
