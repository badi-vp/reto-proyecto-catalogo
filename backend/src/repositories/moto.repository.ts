import { getPostgresPool } from '../database/postgres.js'
import type { CreateMotoInput, MotoFilters, UpdateMotoInput } from '../schemas/moto.schema.js'

export type MotoRecord = {
  identificador: number
  modelo: string
  marca: string
  categoria: string
  cilindrada: number
  precio: string | number
  imagen_link: string
  stock: number
  descripcion: string
}

function toMoto(record: MotoRecord) {
  return {
    identificador: record.identificador,
    modelo: record.modelo,
    marca: record.marca,
    categoria: record.categoria,
    cilindrada: record.cilindrada,
    precio: Number(record.precio),
    imagenLink: record.imagen_link,
    stock: record.stock,
    descripcion: record.descripcion
  }
}

export async function createMoto(input: CreateMotoInput) {
  const result = await getPostgresPool().query<MotoRecord>(`
    INSERT INTO moto
      (modelo, marca, categoria, cilindrada, precio, imagen_link, stock, descripcion)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING identificador, modelo, marca, categoria, cilindrada, precio, imagen_link, stock, descripcion
  `, [
    input.modelo,
    input.marca,
    input.categoria,
    input.cilindrada,
    input.precio,
    input.imagenLink,
    input.stock,
    input.descripcion
  ])

  return toMoto(result.rows[0])
}

export async function updateMoto(identificador: number, input: UpdateMotoInput) {
  const fields: Array<[keyof UpdateMotoInput, string]> = [
    ['modelo', 'modelo'],
    ['marca', 'marca'],
    ['categoria', 'categoria'],
    ['cilindrada', 'cilindrada'],
    ['precio', 'precio'],
    ['imagenLink', 'imagen_link'],
    ['stock', 'stock'],
    ['descripcion', 'descripcion']
  ]
  const assignments: string[] = []
  const values: unknown[] = []

  for (const [inputName, column] of fields) {
    const value = input[inputName]
    if (value !== undefined) {
      values.push(value)
      assignments.push(`${column} = $${values.length}`)
    }
  }

  values.push(identificador)
  const result = await getPostgresPool().query<MotoRecord>(`
    UPDATE moto
    SET ${assignments.join(', ')}
    WHERE identificador = $${values.length}
    RETURNING identificador, modelo, marca, categoria, cilindrada, precio, imagen_link, stock, descripcion
  `, values)

  return result.rows[0] ? toMoto(result.rows[0]) : undefined
}

export async function listMotos(filters: MotoFilters) {
  const conditions: string[] = []
  const values: unknown[] = []
  const addCondition = (condition: string, value?: unknown) => {
    if (value !== undefined) {
      values.push(value)
      conditions.push(condition.replace('?', `$${values.length}`))
    }
  }

  if (filters.modelo) addCondition('modelo ILIKE ?', `%${filters.modelo}%`)
  if (filters.marca) addCondition('marca = ?', filters.marca)
  if (filters.categoria) addCondition('categoria = ?', filters.categoria)
  if (filters.cilindrada !== undefined) addCondition('cilindrada = ?', filters.cilindrada)
  if (filters.precioMin !== undefined) addCondition('precio >= ?', filters.precioMin)
  if (filters.precioMax !== undefined) addCondition('precio <= ?', filters.precioMax)
  if (filters.stockDisponible !== undefined) conditions.push(filters.stockDisponible ? 'stock > 0' : 'stock = 0')

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const result = await getPostgresPool().query<MotoRecord>(`
    SELECT identificador, modelo, marca, categoria, cilindrada, precio, imagen_link, stock, descripcion
    FROM moto
    ${where}
    ORDER BY identificador
  `, values)

  return result.rows.map(toMoto)
}
