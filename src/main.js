import express from 'express'
import appRouter from './app.router'

const app = express()
app.use(appRouter)

app.listen(3000)
