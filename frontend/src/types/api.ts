import type { Moto } from './moto'

export type ApiError = {
  error?: {
    codigo?: string
    mensaje?: string
    detalles?: unknown[]
  }
}

export type MotoListResponse = {
  data: Moto[]
  total: number
  filtros: Record<string, unknown>
}

export type LoginResponse = {
  mensaje: string
  usuario: string
  token: string
}
