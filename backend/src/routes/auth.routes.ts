import { Hono } from 'hono'
import { loginController, logoutController } from '../controllers/auth.controller.js'
import type { AppEnv } from '../types/http.js'

export const authRoutes = new Hono<AppEnv>()

authRoutes.post('/login', loginController)
authRoutes.post('/logout', logoutController)
