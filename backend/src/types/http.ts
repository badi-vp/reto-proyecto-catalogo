export type AdminSession = {
  sub: string
  usuario: string
  iat?: number
  exp?: number
}

export type AppEnv = {
  Variables: {
    admin: AdminSession
  }
}
