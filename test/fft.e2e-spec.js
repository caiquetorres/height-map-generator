import { createApp } from '../src/base'
import Jimp from 'jimp'
import path from 'path'
import supertest from 'supertest'

describe('Fft (e2e)', () => {
  let app

  beforeEach(() => {
    app = createApp()
  })

  describe('/POST /fft', () => {
    it('should convert an image to the frequency domain', async () => {
      const { body } = await supertest(app)
        .post('/fft')
        .attach('file', path.resolve(__dirname, '../assets/white-noise.jpg'))
        .expect(200)

      expect(body).toBeInstanceOf(Buffer)

      const expectedImage = await Jimp.read(
        path.resolve(__dirname, '../assets/white-noise-frequency-domain.jpg'),
      ).then((res) => res.bitmap.data)

      const receivedImage = await Jimp.read(body).then((res) => res.bitmap.data)

      expect(receivedImage).toEqual(expectedImage)
    })

    it('should get 400 (Bad Request) when trying to converting some image to the frequency domain without sending the file', async () => {
      const { body } = await supertest(app).post('/fft').expect(400)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })

    it('should get 415 (Unsupported Media Type) when trying to converting some image to the frequency domain sending an invalid file', async () => {
      const { body } = await supertest(app)
        .post('/fft')
        .attach('file', path.resolve(__dirname, '../package.json'))
        .expect(415)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })
  })
})
