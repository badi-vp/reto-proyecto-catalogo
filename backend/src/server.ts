import { serve } from '@hono/node-server'
import { app } from './app.js'
import { env } from './config/env.js'

serve({
  fetch: app.fetch,
  port: env.PORT
})

console.log(`API ejecutándose en http://localhost:${env.PORT}`)
