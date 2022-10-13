import { createApp } from '../src/base'
import Jimp from 'jimp/'
import path from 'path'
import supertest from 'supertest'

describe('Noise (e2e)', () => {
  let app

  beforeEach(() => {
    app = createApp()
  })

  describe('/POST /noises/white-noise', () => {
    it('should generate a white noise of resolution 128x128 pixels', async () => {
      const { body } = await supertest(app)
        .post('/noises/white-noise')
        .send({
          size: 128,
          seed: 'frequency domain',
        })
        .expect(200)

      expect(body).toBeInstanceOf(Buffer)

      const expectedImage = await Jimp.read(
        path.resolve(__dirname, '../assets/white-noise.jpg'),
      ).then((res) => res.bitmap.data)

      const receivedImage = await Jimp.read(body).then((res) => res.bitmap.data)

      expect(receivedImage).toEqual(expectedImage)
    })
  })
})
