import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { createMotoSchema, motoFiltersSchema, updateMotoSchema } from '../schemas/moto.schema.js'
import { createMoto, listMotos, updateMoto } from '../repositories/moto.repository.js'
import type { AppEnv } from '../types/http.js'

export async function createMotoController(c: Context<AppEnv>) {
  const input = createMotoSchema.parse(await c.req.json())
  const moto = await createMoto(input)
  return c.json({ data: moto }, 201)
}

export async function updateMotoController(c: Context<AppEnv>) {
  const identificador = parseId(c.req.param('identificador') ?? '')
  const input = updateMotoSchema.parse(await c.req.json())
  const moto = await updateMoto(identificador, input)

  if (!moto) {
    return c.json({ error: { codigo: 'NOT_FOUND', mensaje: 'La moto no existe' } }, 404)
  }

  return c.json({ data: moto })
}

export async function listMotosController(c: Context<AppEnv>) {
  const filters = motoFiltersSchema.parse(c.req.query())
  const motos = await listMotos(filters)
  return c.json({ data: motos, total: motos.length, filtros: filters })
}

function parseId(value: string) {
  const id = Number(value)
  if (!Number.isInteger(id) || id <= 0) {
    throw new HTTPException(400, { message: 'El identificador debe ser un entero positivo' })
  }
  return id
}
