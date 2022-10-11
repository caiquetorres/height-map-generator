import appRouter from '../src/app.router'

import { createApp } from '../src/base'
import supertest from 'supertest'

describe('App (e2e)', () => {
  let app

  beforeEach(() => {
    app = createApp()
    app.use(appRouter)
  })

  it('/GET /ping', () => {
    return supertest(app).get('/ping').expect(200).expect('pong')
  })
})
