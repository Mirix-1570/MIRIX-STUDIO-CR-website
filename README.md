# Mirix Studio CR

Sitio de **Mirix Studio CR**, estudio de producción audiovisual, fotografía y diseño con base en Esparza, Puntarenas, y cobertura en Costa Rica. Fundado por Miranda Méndez.

Sitio publicado: [https://mirixstudiocr.netlify.app/](https://mirixstudiocr.netlify.app/)

## Qué incluye

- Inicio con la foto del estudio
- Quiénes somos
- Carrusel «Mi inspiración», armado con las fotos de `public/Carousel`
- Portafolio
- Planes en colones y en dólares, con el tipo de cambio de venta del BCCR vía la API de Hacienda
- Cotizador
- Contacto con mapa de Esparza, datos reales y formulario
- Pie de página con privacidad, términos y acceso administrativo
- Panel de administración con Firebase

## Tecnologías

- React 19 y TypeScript
- Vite
- Tailwind CSS 4
- Motion
- Firebase Auth y Firestore
- Netlify (formulario de contacto y aviso por Telegram)

## Requisitos

- Node.js 18 o superior
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:3000`.

Copia `.env.example` a `.env` y completa los valores de Firebase. El token de Telegram no va en ese archivo: se configura en Netlify, como variables `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`.

## Scripts

| Comando | Uso |
|---|---|
| `npm run dev` | Desarrollo en el puerto 3000 |
| `npm run build` | Build de producción |
| `npm run preview` | Vista del build |
| `npm run lint` | Revisión de tipos |

## Estructura

```
src/components/     Páginas y secciones
src/data.ts         Textos y precios iniciales
src/lib/            Firebase y Firestore
public/Carousel/    Fotos del carrusel
public/logo/        Logo, retrato y fondo de planes
netlify/functions/  Aviso del formulario a Telegram
firestore.rules     Permisos de la base de datos
```

## Carrusel

Cada imagen nueva en `public/Carousel` (jpg, jpeg, png, webp, gif o avif) entra sola en el siguiente build. No hace falta editar una lista en el código.

## Contacto real

- Esparza, Puntarenas, Costa Rica
- mirixstudiocr@gmail.com
- WhatsApp +506 63105876

## Documentos

- [seo.md](seo.md) — cómo está armado el posicionamiento del sitio
- [vulnerabilities.md](vulnerabilities.md) — riesgos conocidos y cómo están contenidos

© 2026 Mirix Studio CR · Miranda Méndez · Esparza, Costa Rica
