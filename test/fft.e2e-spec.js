import appRouter from '../src/app.router'

import { createApp } from '../src/base'
import Jimp from 'jimp'
import path from 'path'
import supertest from 'supertest'

describe('Fft (e2e)', () => {
  let app

  beforeEach(() => {
    app = createApp()
    app.use(appRouter)
  })

  describe('/POST /fft', () => {
    it('should convert an image to the frequency domain', async () => {
      const { body } = await supertest(app)
        .post('/fft')
        .attach('file', path.resolve(__dirname, '../assets/white-noise.png'))
        .expect(200)

      expect(body).toBeInstanceOf(Buffer)

      const expectedImage = await Jimp.read(
        path.resolve(__dirname, '../assets/white-noise-frequency-domain.png'),
      ).then((res) => res.bitmap.data)

      const receivedImage = await Jimp.read(body).then((res) => res.bitmap.data)

      expect(receivedImage).toEqual(expectedImage)
    })
  })
})
