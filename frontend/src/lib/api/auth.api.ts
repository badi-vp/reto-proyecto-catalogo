import { apiFetch } from './client'
import type { LoginResponse } from '../../types/api'

export function login(usuario: string, contrasena: string) {
  return apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usuario, contrasena })
  })
}

export function logout() {
  return apiFetch<{ mensaje: string }>('/api/auth/logout', { method: 'POST' })
}
