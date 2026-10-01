import { z } from 'zod'
import { CATEGORIAS } from '../types/moto'

export const motoSchema = z.object({
  modelo: z.string().trim().min(1, 'El modelo es obligatorio').max(50),
  marca: z.literal('Power Motorcycle'),
  categoria: z.enum(CATEGORIAS),
  cilindrada: z.coerce.number().int().nonnegative('Debe ser un valor positivo'),
  precio: z.coerce.number().nonnegative('Debe ser un valor positivo'),
  imagenLink: z.string().url('Introduce una URL válida').max(255),
  stock: z.coerce.number().int().nonnegative('Debe ser un entero positivo'),
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria').max(500)
})
