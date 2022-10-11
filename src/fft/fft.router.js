import { FftService } from '../fft/fft.service'

import { Router } from 'express'
import multer from 'multer'

const upload = multer()
const router = Router()
const service = new FftService()

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file
  const contrast = req.body.contrast ? +req.body.contrast : 9e-3

  // TODO: Map the contrast property

  const image = await service.transform(file.buffer.buffer, contrast)

  const mimetype = image.getMIME()
  const buffer = await image.getBufferAsync(mimetype)

  res.set('Content-Type', mimetype).send(buffer)
})

export default router
