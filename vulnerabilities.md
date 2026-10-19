# Vulnerabilidades y controles — Mirix Studio CR

Revisión del sitio público y del panel. Fecha: 19 de octubre de 2026.

Esto describe riesgos reales del proyecto y el control que ya existe. No es una guía para atacar el sitio.

## Cómo está protegido el panel

El acceso administrativo usa Firebase Authentication (correo y contraseña). Escribir planes, biografía, portafolio o productos solo está permitido en `firestore.rules` si la sesión pertenece a `mirixstudiocr@gmail.com`.

Leer el contenido público (biografía, planes, portafolio) es abierto a propósito: el sitio lo necesita para mostrarse.

La configuración web de Firebase (`VITE_FIREBASE_*`) viaja en el JavaScript del navegador. Eso es normal en Firebase. La protección está en las reglas y en Authentication, no en esconder la API key.

## Mensajes de contacto

Cualquier visitante puede crear un mensaje. Las reglas exigen los campos de texto del formulario y un visitante no puede listar, editar ni borrar el buzón.

El mismo envío avisa por Telegram mediante `netlify/functions/notify-telegram.mjs`. Esa función solo acepta POST, recorta el largo de cada campo y no publica el token. `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` viven en las variables de Netlify, nunca en variables `VITE_*`.

Riesgo que sigue abierto: no hay límite de intentos ni captcha. Alguien puede llenar el buzón y disparar avisos de Telegram. Contención actual: campos con tope de caracteres, y Telegram responde 503 si las variables no están configuradas.

## Secretos

| Dato | Dónde va |
|---|---|
| API key, dominio y proyecto de Firebase | `.env` local, valores `VITE_*`. Son públicos en el bundle |
| Correo del administrador | `.env` y, como comprobación definitiva, `firestore.rules` |
| Token y chat de Telegram | Solo variables de Netlify |
| `GEMINI_API_KEY` | No la usa el sitio público. No hace falta en el deploy de Netlify |

`.env` no debe subirse al repositorio. `.env.example` solo trae marcadores.

## Superficie pública

- El formulario se registra en Netlify y también se guarda en Firestore.
- El mapa es un iframe de Google hacia Esparza. El contenido del mapa lo sirve Google.
- El tipo de cambio se consulta en `https://api.hacienda.go.cr/indicadores/tc/dolar`. Si esa API falla, los precios en dólares quedan desactivados y el sitio sigue en colones.
- React escapa el texto que pinta. Los mensajes del formulario no se insertan como HTML.
- No hay cabeceras de Content-Security-Policy en el repositorio. Conviene agregarlas en Netlify cuando se fijen los dominios de Google, Firebase y Hacienda.

## Dependencias

El build usa React, Vite, Firebase y Motion. `package.json` fija `protobufjs` en 7.6.5 o superior y `proxy-addr` en 2.0.8. Esa segunda versión cierra el aviso de suplantación de IP que Express 4.22.2 arrastraba con la 2.0.7. Conviene revisar `npm audit` antes de cada deploy y actualizar solo con el sitio probado después.

## Qué revisar en cada deploy

1. Confirmar que `firestore.rules` desplegadas siguen permitiendo lectura pública del contenido y escritura solo al correo administrador.
2. Confirmar que el token de Telegram no aparece en el bundle (buscar `TELEGRAM_BOT_TOKEN` en `dist/` debe dar vacío).
3. Entrar al panel con la cuenta real y comprobar que una sesión ajena no guarda cambios.
4. Enviar un mensaje de prueba y comprobar que llega al buzón y a Telegram.
