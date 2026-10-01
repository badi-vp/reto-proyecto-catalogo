import { z } from 'zod'

export const categorias = ['Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias'] as const

const motoFields = {
  modelo: z.string().trim().min(1).max(50),
  marca: z.literal('Power Motorcycle').default('Power Motorcycle'),
  categoria: z.enum(categorias),
  cilindrada: z.number().int().nonnegative(),
  precio: z.number().nonnegative(),
  imagenLink: z.string().trim().url().max(255),
  stock: z.number().int().nonnegative().default(0),
  descripcion: z.string().trim().min(1).max(500)
}

export const createMotoSchema = z.object(motoFields)

export const updateMotoSchema = z.object({
  modelo: motoFields.modelo.optional(),
  marca: z.literal('Power Motorcycle').optional(),
  categoria: motoFields.categoria.optional(),
  cilindrada: motoFields.cilindrada.optional(),
  precio: motoFields.precio.optional(),
  imagenLink: motoFields.imagenLink.optional(),
  stock: motoFields.stock.optional(),
  descripcion: motoFields.descripcion.optional()
}).refine((value) => Object.keys(value).length > 0, {
  message: 'Debe enviar al menos un campo para actualizar'
})

export const motoFiltersSchema = z.object({
  modelo: z.string().trim().optional(),
  marca: z.literal('Power Motorcycle').optional(),
  categoria: z.enum(categorias).optional(),
  cilindrada: z.coerce.number().int().nonnegative().optional(),
  precioMin: z.coerce.number().nonnegative().optional(),
  precioMax: z.coerce.number().nonnegative().optional(),
  stockDisponible: z.enum(['true', 'false']).transform((value) => value === 'true').optional()
}).refine((value) => value.precioMin === undefined || value.precioMax === undefined || value.precioMin <= value.precioMax, {
  message: 'precioMin no puede ser mayor que precioMax',
  path: ['precioMin']
})

export type CreateMotoInput = z.infer<typeof createMotoSchema>
export type UpdateMotoInput = z.infer<typeof updateMotoSchema>
export type MotoFilters = z.infer<typeof motoFiltersSchema>
