# Frontend del catálogo de motos

Frontend estático construido con Astro y Tailwind CSS, preparado para
desplegarse en Vercel.

## Arquitectura

- Astro genera todas las páginas en `dist/` durante el build.
- Las interacciones del catálogo, login y administración se ejecutan en el
  navegador mediante scripts TypeScript.
- El cliente API se encuentra en `src/lib/api/`.
- La sesión se almacena en `localStorage`.
- El JWT se envía al backend exclusivamente mediante `Authorization: Bearer <token>`.

## Variables de entorno

Copiar `.env.example` como `.env` y configurar:

```env
PUBLIC_API_URL=https://tu-backend.vercel.app
```

Las variables públicas de Astro deben comenzar con `PUBLIC_`. No colocar
secretos privados del backend en este proyecto.

## Vercel

Vercel utilizará la configuración de `vercel.json`:

```text
Build command: npm run build
Output directory: dist
Framework: Astro
```

El backend debe permitir mediante CORS el dominio desplegado del frontend.

## Validación local sin levantar servicios

```bash
npm install
npm run check
npm run build
```

Estos comandos solo instalan dependencias y generan la salida estática. No
inician el frontend ni el backend.
