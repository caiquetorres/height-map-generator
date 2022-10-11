import appRouter from './app.router'

import express from 'express'

const app = express()

app.use(express.json())

app.use(appRouter)

app.listen(3000)
