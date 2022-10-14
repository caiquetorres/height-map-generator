import { MapController } from './map.controller'
import { Router } from 'express'

const router = Router()

const controller = new MapController()

router.post('/height-map', (req, res, next) => {
  controller.generateHeightMap(req, res).catch((error) => next(error))
})

router.post('/color-map', (req, res, next) => {
  controller.generateColorMap(req, res).catch((error) => next(error))
})

export default router
