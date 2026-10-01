import type { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'
import { InvalidCredentialsError } from '../services/auth.service.js'

export const errorMiddleware: ErrorHandler = (error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ error: { codigo: 'BAD_REQUEST', mensaje: error.message } }, error.status)
  }

  if (error instanceof z.ZodError) {
    return c.json({
      error: {
        codigo: 'VALIDATION_ERROR',
        mensaje: 'Los datos enviados no son válidos',
        detalles: error.issues
      }
    }, 400)
  }

  if (error instanceof InvalidCredentialsError) {
    return c.json({ error: { codigo: 'INVALID_CREDENTIALS', mensaje: error.message } }, 401)
  }

  console.error(error)
  return c.json({
    error: {
      codigo: 'INTERNAL_SERVER_ERROR',
      mensaje: 'Ocurrió un error interno'
    }
  }, 500)
}
