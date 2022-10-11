import appRouter from './app.router'

import { createApp } from './base'

const app = createApp()

app.use(appRouter)

app.listen(3000)
