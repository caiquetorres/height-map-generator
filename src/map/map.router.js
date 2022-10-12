import { MapService } from './map.service'

import { Router } from 'express'

const router = Router()

const service = new MapService()

router.post('/height-map', async (req, res) => {
  const { size, roughness, seed } = req.body

  const noiseImage = await service.generateHeighMap(size, seed, roughness)
  const buffer = await noiseImage.getBufferAsync('image/jpeg')

  res.set('Content-Type', 'image/jpeg').send(buffer)
})

router.post('/color-map', async (req, res) => {
  const { size, roughness, seed } = req.body

  const noiseImage = await service.generateColorMap(size, seed, roughness)
  const buffer = await noiseImage.getBufferAsync('image/jpeg')

  res.set('Content-Type', 'image/jpeg').send(buffer)
})

export default router
