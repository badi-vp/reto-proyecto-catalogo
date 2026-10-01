export const CATEGORIAS = ['Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias'] as const

export type Categoria = typeof CATEGORIAS[number]

export type Moto = {
  identificador: number
  modelo: string
  marca: string
  categoria: Categoria
  cilindrada: number
  precio: number
  imagenLink: string
  stock: number
  descripcion: string
}

export type MotoInput = Omit<Moto, 'identificador'>

export type MotoFilters = {
  modelo?: string
  categoria?: Categoria
  cilindrada?: number
  precioMin?: number
  precioMax?: number
  stockDisponible?: boolean
}
