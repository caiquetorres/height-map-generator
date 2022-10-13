import appRouter from './app.router'

import { errorHandler } from './common/errors/error.handler'
import cors from 'cors'
import express from 'express'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(appRouter)
  app.use(errorHandler)

  return app
}
