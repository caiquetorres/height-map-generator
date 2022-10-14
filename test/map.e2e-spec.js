import { createApp } from '../src/base'
import Jimp from 'jimp'
import path from 'path'
import supertest from 'supertest'

describe('HeightMap (e2e)', () => {
  let app

  beforeEach(() => {
    app = createApp()
  })

  describe('/POST /maps/height-map', () => {
    it('should create a height map based on a seed', async () => {
      const { body } = await supertest(app)
        .post('/maps/height-map')
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

    it('should get 400 (Bad Request) when trying to generate a new height map without sending the size', async () => {
      const { body } = await supertest(app)
        .post('/maps/height-map')
        .send({
          // expected size
          seed: 'fourier transform',
        })
        .expect(400)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })

    it('should get 400 (Bad Request) when trying to generate a new height map without sending an invalid size', async () => {
      let body = await supertest(app)
        .post('/maps/height-map')
        .send({
          size: 'invalid size', // expected number
        })
        .expect(400)
        .then((res) => res.body)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')

      body = await supertest(app)
        .post('/maps/height-map')
        .send({
          size: 63, // expected power of two
        })
        .expect(400)
        .then((res) => res.body)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })

    it('should get 400 (Bad Request) when trying to generate a new height map sending an invalid seed', async () => {
      const { body } = await supertest(app)
        .post('/maps/height-map')
        .send({
          size: 64,
          seed: {},
        })
        .expect(400)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })

    it('should get 400 (Bad Request) when trying to generate a new height map roughness an invalid seed', async () => {
      const { body } = await supertest(app)
        .post('/maps/height-map')
        .send({
          size: 64,
          roughness: 'test',
        })
        .expect(400)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })
  })

  describe('/POST /maps/color-map', () => {
    it('should create a color map based on a seed', async () => {
      const { body } = await supertest(app)
        .post('/maps/color-map')
        .send({
          size: 128,
          seed: 'fourier transform',
        })
        .expect(200)

      expect(body).toBeInstanceOf(Buffer)
    })

    it('should get 400 (Bad Request) when trying to generate a new color map without sending the size', async () => {
      const { body } = await supertest(app)
        .post('/maps/color-map')
        .send({
          // expected size
          seed: 'fourier transform',
        })
        .expect(400)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })

    it('should get 400 (Bad Request) when trying to generate a new color map without sending an invalid size', async () => {
      let body = await supertest(app)
        .post('/maps/color-map')
        .send({
          size: 'invalid size', // expected number
        })
        .expect(400)
        .then((res) => res.body)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')

      body = await supertest(app)
        .post('/maps/color-map')
        .send({
          size: 63, // expected power of two
        })
        .expect(400)
        .then((res) => res.body)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })

    it('should get 400 (Bad Request) when trying to generate a new color map sending an invalid seed', async () => {
      const { body } = await supertest(app)
        .post('/maps/color-map')
        .send({
          size: 64,
          seed: {},
        })
        .expect(400)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })

    it('should get 400 (Bad Request) when trying to generate a new color map roughness an invalid seed', async () => {
      const { body } = await supertest(app)
        .post('/maps/color-map')
        .send({
          size: 64,
          roughness: 'test',
        })
        .expect(400)

      expect(body).toHaveProperty('statusCode')
      expect(body).toHaveProperty('message')
    })
  })
})
