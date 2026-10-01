import { apiFetch } from './client'
import type { Moto, MotoFilters, MotoInput } from '../../types/moto'
import type { MotoListResponse } from '../../types/api'

export function getMotos(filters: MotoFilters = {}) {
  const params = new URLSearchParams()
  if (filters.modelo) params.set('modelo', filters.modelo)
  if (filters.categoria) params.set('categoria', filters.categoria)
  if (filters.cilindrada !== undefined) params.set('cilindrada', String(filters.cilindrada))
  if (filters.precioMin !== undefined) params.set('precioMin', String(filters.precioMin))
  if (filters.precioMax !== undefined) params.set('precioMax', String(filters.precioMax))
  if (filters.stockDisponible !== undefined) params.set('stockDisponible', String(filters.stockDisponible))
  const query = params.toString()
  return apiFetch<MotoListResponse>(`/api/motos${query ? `?${query}` : ''}`)
}

export function createMoto(input: MotoInput) {
  return apiFetch<{ data: Moto }>('/api/motos', {
    method: 'POST',
    body: JSON.stringify(input)
  })
}

export function updateMoto(id: number, input: Partial<MotoInput>) {
  return apiFetch<{ data: Moto }>(`/api/motos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input)
  })
}
