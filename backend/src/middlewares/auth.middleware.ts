import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import { env } from '../config/env.js'
import type { AppEnv, AdminSession } from '../types/http.js'

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const authorization = c.req.header('Authorization')
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : undefined
  if (!token) return c.json({ error: { codigo: 'UNAUTHORIZED', mensaje: 'Autenticación requerida' } }, 401)

  try {
    const payload = await verify(token, env.JWT_SECRET, 'HS256')
    if (!payload.sub || typeof payload.usuario !== 'string') throw new Error('Invalid payload')
    c.set('admin', payload as AdminSession)
    await next()
  } catch {
    return c.json({ error: { codigo: 'INVALID_TOKEN', mensaje: 'La sesión no es válida o expiró' } }, 401)
  }
})
