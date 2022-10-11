import appRouter from '../src/app.router'

import express from 'express'
import supertest from 'supertest'

describe('App (e2e)', () => {
  let app

  beforeEach(() => {
    app = express()
    app.use(appRouter)
  })

  it('/GET /ping', () => {
    return supertest(app).get('/ping').expect(200).expect('pong')
  })
})
