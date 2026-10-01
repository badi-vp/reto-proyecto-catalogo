import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createMotoController, listMotosController, updateMotoController } from '../controllers/motos.controller.js'
import type { AppEnv } from '../types/http.js'

export const motosRoutes = new Hono<AppEnv>()

motosRoutes.get('/', listMotosController)
motosRoutes.post('/', authMiddleware, createMotoController)
motosRoutes.put('/:identificador', authMiddleware, updateMotoController)
