# Mirix Studio CR

Sitio de **Mirix Studio CR**, estudio de producción audiovisual, fotografía y diseño con base en Esparza, Puntarenas, y cobertura en Costa Rica. Fundado por Miranda Méndez.

Sitio publicado: [https://mirixstudiocr.netlify.app/](https://mirixstudiocr.netlify.app/)

## Qué incluye

- Inicio con la foto del estudio.
- Sección «Quiénes somos» con la biografía de Miranda Méndez.
- Carrusel «Mi inspiración», armado con las fotos de `public/Carousel`.
- Portafolio de fotografía, video y diseño.
- Planes en colones y en dólares, con el tipo de cambio de venta del BCCR vía API de Hacienda.
- Cotizador personalizado.
- Contacto con mapa de Esparza, datos reales y formulario.
- Pie de página con privacidad, términos y acceso administrativo.
- Panel de administración con Firebase.

## Tecnologías

- React 19 y TypeScript.
- Vite 6 con alias `@` al raíz del proyecto.
- Tailwind CSS 4 y `@tailwindcss/vite`.
- Motion 12 para animaciones.
- Firebase 12 Auth y Firestore.
- Netlify (formulario de contacto con Netlify Forms y aviso por Telegram).
- Node.js 18 o superior y npm.

## Requisitos

- Node.js 18 o superior.
- npm.

## Puesta en marcha

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:3000`.

Copia `.env.example` a `.env` y completa los valores de Firebase. El token de Telegram no va en ese archivo: se configura en Netlify, como variables `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`. Después de añadir o cambiar esas variables, despliega de nuevo en Netlify para que la función las tome.

## Scripts

| Comando | Uso |
|---|---|
| `npm run dev` | Desarrollo en el puerto 3000 (`0.0.0.0`). |
| `npm run build` | Build de producción en `dist/`. |
| `npm run preview` | Vista previa del build localmente. |
| `npm run lint` | Revisión de tipos con `tsc --noEmit`. |
| `npm run clean` | Elimina `dist/` y `server.js`. |

## Estructura

```
src/
  components/   Páginas y secciones del sitio
  data.ts       Textos y precios iniciales (biografía, planes, portafolio, productos)
  lib/          Firebase y Firestore
  types.ts      Interfaces TypeScript
public/
  Carousel/     Fotos del carrusel. Se detectan solas al hacer build.
  logo/         Logo, retrato y fondo de planes
netlify/
  functions/    Función serverless que avisa al Telegram al enviar el formulario
firestore.rules  Permisos de la base de datos
```

El carrusel se carga de forma virtual desde `vite.config.ts`; cada imagen nueva en `public/Carousel` (jpg, jpeg, png, webp, gif o avif) entra sola en el siguiente build. No hace falta editar una lista en el código.

## Contacto real

- Esparza, Puntarenas, Costa Rica.
- mirixstudiocr@gmail.com
- WhatsApp +506 63105876

## Panel de administración

Acceso solo para `mirixstudiocr@gmail.com`. En Firebase Auth se crea una cuenta con este correo; en `firestore.rules` la función `isAdmin()` restringe la escritura a ese correo. Solo el administrador puede leer, crear, editar o borrar mensajes del buzón.

## Documentos

- [seo.md](seo.md) — cómo está armado el posicionamiento del sitio.
- [vulnerabilities.md](vulnerabilities.md) — riesgos conocidos y cómo están contenidos.

## Licencia

Código bajo licencia Apache-2.0 (visto en `src/data.ts`). El contenido del sitio es de Mirix Studio CR.

