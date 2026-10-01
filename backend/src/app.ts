import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { env } from './config/env.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { authRoutes } from './routes/auth.routes.js'
import { motosRoutes } from './routes/motos.routes.js'
import type { AppEnv } from './types/http.js'

export const app = new Hono<AppEnv>()

app.use('*', cors({
  origin: (origin) => {
    if (!origin) return env.FRONTEND_ORIGINS[0]
    return env.FRONTEND_ORIGINS.includes(origin) ? origin : undefined
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.onError(errorMiddleware)

app.get('/', (c) => c.json({ mensaje: 'API de catálogo de motos funcionando' }))
app.get('/health', (c) => c.json({ estado: 'ok', entorno: env.NODE_ENV }))

app.route('/api/auth', authRoutes)
app.route('/api/motos', motosRoutes)

app.notFound((c) => c.json({ error: { codigo: 'NOT_FOUND', mensaje: 'Ruta no encontrada' } }, 404))
