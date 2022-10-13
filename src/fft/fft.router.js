import { FftController } from './fft.controller'
import { Router } from 'express'
import multer from 'multer'

const upload = multer()
const router = Router()
const controller = new FftController()

router.post('/', upload.single('file'), (req, res, next) => {
  controller.transform(req, res).catch((error) => next(error))
})

export default router
