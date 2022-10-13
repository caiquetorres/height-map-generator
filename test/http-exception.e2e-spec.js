import { HttpException } from '../src/common/errors/http.exception'

import { errorHandler } from '../src/common/errors/error.handler'
import express from 'express'
import supertest from 'supertest'

describe('HttpException (e2e)', () => {
  let app
  let fakeConsoleError

  beforeAll(() => {
    fakeConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  beforeEach(() => {
    app = express()
  })

  afterEach(() => {
    fakeConsoleError.mockClear()
  })

  afterAll(() => {
    fakeConsoleError.mockRestore()
  })

  describe('/GET', () => {
    it('should get 500 (Internal Server Error) when raising some uncaught error inside the application', async () => {
      app.get('/', () => {
        throw new Error('Error thrown inside the application')
      })

      app.use(errorHandler)

      const { body } = await supertest(app).get('/').expect(500)

      expect(fakeConsoleError).toHaveBeenCalled()
      expect(body).toEqual({
        statusCode: 500,
        message: 'Error thrown inside the application',
      })
    })

    it('should get 404 (Not Found) when raising the HttpException class with the status code 404', async () => {
      app.get('/', () => {
        throw new HttpException(404, 'Not found')
      })

      app.use(errorHandler)

      const { body } = await supertest(app).get('/').expect(404)

      expect(fakeConsoleError).not.toHaveBeenCalled()
      expect(body).toEqual({
        statusCode: 404,
        message: 'Not found',
      })
    })
  })
})
