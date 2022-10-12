import appRouter from '../src/app.router'

import { createApp } from '../src/base'
import Jimp from 'jimp'
import path from 'path'
import supertest from 'supertest'

describe('HeightMap (e2e)', () => {
  let app

  beforeEach(() => {
    app = createApp()
    app.use(appRouter)
  })

  describe('/POST /height-map', () => {
    it('should create a height map based on a seed', async () => {
      const { body } = await supertest(app)
        .post('/height-map')
        .send({
          size: 128,
          seed: 'fourier transform',
        })
        .expect(200)

      expect(body).toBeInstanceOf(Buffer)

      const expectedImage = await Jimp.read(
        path.resolve(__dirname, '../assets/height-map.jpg'),
      ).then((res) => res.bitmap.data)

      const receivedImage = await Jimp.read(body).then((res) => res.bitmap.data)

      expect(receivedImage).toEqual(expectedImage)
    })
  })
})
