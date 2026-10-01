import type { Context } from 'hono'
import { loginSchema } from '../schemas/auth.schema.js'
import { authenticate } from '../services/auth.service.js'
import type { AppEnv } from '../types/http.js'

export async function loginController(c: Context<AppEnv>) {
  const body = loginSchema.parse(await c.req.json())
  const session = await authenticate(body.usuario, body.contrasena)

  return c.json({ mensaje: 'Inicio de sesión exitoso', usuario: session.usuario, token: session.token })
}

export function logoutController(c: Context<AppEnv>) {
  return c.json({ mensaje: 'Sesión cerrada correctamente' })
}
