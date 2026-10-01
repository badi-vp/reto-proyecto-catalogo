import { getToken, clearSession } from '../auth/storage'
import type { ApiError } from '../../types/api'

const API_URL = import.meta.env.PUBLIC_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '')

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'omit'
  })

  const payload = await response.json().catch(() => ({})) as T & ApiError
  if (!response.ok) {
    if (response.status === 401) clearSession()
    throw new Error(payload.error?.mensaje || 'No se pudo completar la solicitud')
  }

  return payload
}
