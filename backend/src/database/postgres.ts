import pg from 'pg'
import { env } from '../config/env.js'

const { Pool } = pg

const globalForPostgres = globalThis as typeof globalThis & {
  postgresPool?: pg.Pool
}

export function getPostgresPool(): pg.Pool {
  if (!globalForPostgres.postgresPool) {
    globalForPostgres.postgresPool = new Pool({
      connectionString: env.DATABASE_URL,
      ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000
    })
  }

  return globalForPostgres.postgresPool
}
