import bcrypt from 'bcrypt'
import { sign } from 'hono/jwt'
import { env } from '../config/env.js'
import { findAdministratorByUsername } from '../repositories/administrador.repository.js'

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciales inválidas')
    this.name = 'InvalidCredentialsError'
  }
}

export async function authenticate(usuario: string, contrasena: string) {
  const administrator = await findAdministratorByUsername(usuario)
  if (!administrator) throw new InvalidCredentialsError()

  const matches = await bcrypt.compare(contrasena, administrator.contrasena)
  if (!matches) throw new InvalidCredentialsError()

  const now = Math.floor(Date.now() / 1000)
  const expiresInSeconds = parseExpiresIn(env.JWT_EXPIRES_IN)
  const token = await sign({
    sub: String(administrator.identificador),
    usuario: administrator.usuario,
    iat: now,
    exp: now + expiresInSeconds
  }, env.JWT_SECRET, 'HS256')

  return { token, usuario: administrator.usuario }
}

function parseExpiresIn(value: string): number {
  const match = value.match(/^(\d+)\s*(s|m|h|d)?$/i)
  if (!match) return 3600
  const amount = Number(match[1])
  const unit = (match[2] ?? 's').toLowerCase()
  return amount * ({ s: 1, m: 60, h: 3600, d: 86400 }[unit] ?? 1)
}
