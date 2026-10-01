import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1).default('development-secret-change-me'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(4).max(31).default(8),
  FRONTEND_ORIGINS: z.string()
    .default('http://localhost:4321,http://127.0.0.1:4321')
    .transform((value) => value.split(',').map((origin) => origin.trim()).filter(Boolean))
})

export const env = envSchema.parse(process.env)
