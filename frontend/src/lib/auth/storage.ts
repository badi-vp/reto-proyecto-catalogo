const TOKEN_KEY = 'auth_token'
const USER_KEY = 'admin_user'

export function saveSession(token: string, usuario: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, usuario)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getCurrentUser() {
  return localStorage.getItem(USER_KEY)
}

export function isAuthenticated() {
  return Boolean(getToken())
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
