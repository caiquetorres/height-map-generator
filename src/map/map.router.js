import { MapController } from './map.controller'
import { Router } from 'express'

const router = Router()

const controller = new MapController()

router.post('/height-map', async (req, res, next) => {
  controller.generateHeightMap(req, res).catch((error) => next(error))
})

router.post('/color-map', async (req, res, next) => {
  controller.generateColorMap(req, res).then((error) => next(error))
})

export default router
