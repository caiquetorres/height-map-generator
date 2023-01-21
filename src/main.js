import { createApp } from './base'
import { Env } from './env/env'

function bootstrap() {
  Env.config()

  const app = createApp()
  app.listen(+Env.get('PORT'))
}
bootstrap()
