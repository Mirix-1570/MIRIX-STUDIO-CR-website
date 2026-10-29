# SEO y Lighthouse — Mirix Studio CR

Estado del posicionamiento del sitio público. Fecha de revisión: 19 de octubre de 2026.

El sitio es una sola página en [https://mirixstudiocr.netlify.app/](https://mirixstudiocr.netlify.app/). Google recibe el HTML de `index.html` y luego el contenido que pinta React.

Este documento combina el **Lighthouse** de Google (auditoría de calidad de página, una de cuyas puntuaciones es la de SEO) con las recomendaciones concretas para este proyecto.

---

## 1. Cómo ejecutar Lighthouse

### Opción A — Chrome DevTools (recomendada)

1. Abre [https://mirixstudiocr.netlify.app/](https://mirixstudiocr.netlify.app/) en Google Chrome.
2. Abre DevTools (`F12` o `Ctrl+Shift+I` / `Cmd+Option+I`).
3. Ve a la pestaña **Lighthouse**.
4. Elige **Generate test** y deja las pestañas marcadas:
   - **Performance**
   - **Accessibility**
   - **Best Practices**
   - **SEO**
   - (opcional) **Progressive Web App** = off para una revisión de contenido
5. Pulsa **Generate report**.
6. Abre el reporte y fíjate en la puntuación de **SEO** (escala 0–100). Aquí es donde está el objetivo de este documento.

> Para pruebas de calidad móvil, en DevTools presiona `Ctrl+Shift+M` (o `Cmd+Option+M`) para modo móvil, luego ejecuta Lighthouse de nuevo.

### Opción B — PageSpeed Insights (web)

1. Ve a [pagespeed.web.dev](https://pagespeed.web.dev/).
2. Pega la URL: `https://mirixstudiocr.netlify.app/`
3. Pulsa **Analyze**.
4. El reporte te da una puntuación separada de **Performance**, **Accessibility**, **Best Practices** y **SEO**, más una lista de detalles por categoría.

### Opción C — Lighthouse CLI

Si tienes Node.js instalado:

```bash
npm install -g lighthouse
lighthouse https://mirixstudiocr.netlify.app/ --view
```

Para generar un informe JSON reproducible:

```bash
lighthouse https://mirixstudiocr.netlify.app/ --output json --output-path ./lighthouse-report.json
```

Guarda el reporte antes de cada cambio importante y compara la puntuación de **SEO** entre ejecuciones.

## 2. Los factores de SEO que mide Lighthouse

| Categoría | Qué mide | Puntuación (0–100) |
|---|---|---|
| **SEO** | Etiquetas `<title>`, meta descripción, `lang`, open graph, datos estructurados, `robots.txt`, sitemap, texto alternativo, enlaces internos | 0–100 |
| **Performance** | CPR/Speed Index, FID/INP, LCP, TTI, CLS, bytes transferidos | 0–100 |
| **Accessibility** | Contraste, teclas de acceso, etiquetas de formulario, jerarquía de cabeceras | 0–100 |
| **Best Practices** | Versiones obsoletas, `http` en lugar de `https`, CSP, seguridad | 0–100 |

El puntaje de **SEO** suele haberlo subido el código anteriormente: el título, la meta descripción, los datos estructurados, `robots.txt`, el sitemap y el `lang="es"` ya están en su sitio. Lo que puede perjudicar la puntuación son:

- El **CORS / conexión anticipada** mal configurado en Google (`dns-prefetch` / `preconnect`).
- Un **LCP lento** por la primera imagen del hero (`/imagen01.jpg`).
- Opciones de soporte de **control de texto** (escala de tipografía) en formularios pequeños.
- **Enlaces internos** rotos o demasiado pocos enlaces entre secciones.

---

## 3. Errores típicos y cómo corregirlos aquí

### 3.1. Título y meta descripción por página

El `document.title` y la meta descripción cambian según la sección, pero el valor en `index.html` es el principal.

**Revisar en `index.html`:**

```html
<title>Mirix Studio CR | Producci&oacute;n Audiovisual y Dise&ntilde;o en Costa Rica</title>
<meta name="description" content="Mirix Studio CR — Producci&oacute;n audiovisual y dise&ntilde;o en Costa Rica. Creaci&oacute;n de video, fotograf&iacute;a art&iacute;stica, dise&ntilde;o gr&aacute;fico y gesti&oacute;n de redes sociales. Base en Esparza, cobertura en todo el pa&iacute;s." />
```

- El título debe ir **< 60 caracteres** (Google puede truncarlo).
- La meta descripción debe ir **< 160 caracteres** y contener la sede y la oferta.
- El carácter `í` se escapa como `&iacute;`, `ñ` como `&ntilde;`, `ó` como `&oacute;` — es correcto, pero el navegador y Google lo interpretan igual.

**En las secciones del SPA** (`src/App.tsx`), verificar que `document.title` se actualice con un título descriptivo y que se añada también una meta descripción en `head` cuando se navega a través de enlaces.




### 3.2. Datos estructurados `LocalBusiness`

El esquema de `LocalBusiness` ya está en `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mirix Studio CR",
  "description": "...",
  "url": "https://mirixstudiocr.netlify.app/",
  "image": "https://mirixstudiocr.netlify.app/logo.png",
  "email": "mirixstudiocr@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Esparza",
    "addressRegion": "Puntarenas",
    "addressCountry": "CR"
  },
  "areaServed": { "@type": "Country", "name": "Costa Rica" },
  "priceRange": "$$",
  "sameAs": ["https://wa.me/50663105876"]
}
```

Los errores frecuentes:

- `sameAs` solo apunta al WhatsApp en lugar de a Instagram/Facebook de la marca. Añadir `https://www.instagram.com/mirix_studio.cr/` y `https://www.facebook.com/share/19DWfWjiKi/` si existe.
- Falta `telephone` y `priceRange`. Añadir `telephone`: `tel:+50663105876` y `priceRange`: `$$`.

Edición sugerida (añadir `telephone` y expandir `sameAs`):

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mirix Studio CR",
  "telephone": "tel:+50663105876",
  "priceRange": "$$",
  "sameAs": [
    "https://www.instagram.com/mirix_studio.cr/",
    "https://www.facebook.com/share/19DWfWjiKi/",
    "https://wa.me/50663105876"
  ]
}
```

### 3.3. `robots.txt` y `sitemap.xml`

El `robots.txt` ya permite el rastreo y señala el sitemap. Verificar que la ruta al sitemap sea relativa y apunte a la URL correcta:

```
Sitemap: https://mirixstudiocr.netlify.app/sitemap.xml
```

Si el sitemap solo tiene la home y el sitio sigue siendo una SPA, está bien, pero si se añaden páginas estáticas futuras, hay que añadirlas aquí.

### 3.4. Texto alternativo de imágenes

El portafolio tiene `alt` con el título de cada obra. El retrato de la sección de Quiénes somos debe tener un `alt` descriptivo:

- Correcto: `<img alt="Miranda Méndez, fundadora de Mirix Studio CR" src="...">`
- Incorrecto: `<img alt="foto" src="...">`

Las fotos del carrusel **no** deben tener `alt` vacío o genérico porque el carrusel es de contenidos, no decorativo. Si la imagen tiene un título en el HTML, usar ese título en el `alt`.

### 3.5. Conexiones anticipadas y CORS

En `index.html` hay:

```html
<link rel="preconnect" href="https://www.google.com" />
<link rel="preconnect" href="https://maps.gstatic.com" crossorigin />
```

Esto es correcto. Pero verificar que el `<link rel="preload" as="image">` no rompa el primer paint:

```html
<link rel="preload" as="image" href="/imagen01.jpg" fetchpriority="high" />
```

Se recomienda `fetchpriority="high"` (actualmente correcto). No cambiar el `as="image"`.

### 3.6. Formularios y marco de accesibilidad

El formulario de contacto usa `Netlify Forms` con campos: `name`, `email`, `phone`, `service`, `message`.

Verificar en el accesibilidad de Lighthouse que:

- Todos los campos tengan `<label>` asociado.
- El mapa no emita advertencias de accesibilidad (es un iframe de Google, no editable por el sitio).
- Los mensajes de error del formulario se asocian a los campos con `aria-describedby` o `aria-invalid`.


### 3.7. Enlaces internos y navegación

- El sitio es una SPA: todas las secciones comparten la misma URL base, pero `document.title` y la meta descripción cambian al navegar.
- Para SEO de SPA se recomienda que cada sección tenga un `<link rel="canonical" href="https://mirixstudiocr.netlify.app/">` en su `<head>` (o, si se planea convertir a múltiples URLs, cada una con su propio canonical).
- Los enlaces internos entre secciones (portafolio, planes, contacto) no deben apuntar a `#` sin ancla real. Usar rutas absolutas o, en SPA, usar `<a>` con `href` real.

---

## 4. Checklist antes de cada deploy

| Punto | Cómo verificarlo | Estado |
|---|---|---|
| Puntuación de SEO ≥ 90 | Elegir `"Best Practices"` en DevTools y comprobar la puntuación de SEO | ☐ |
| Puntuación de Performance ≥ 90 | Ejecutar Lighthouse en modo móvil y revisar **LCP**, **FID/INP** y **CLS** | ☐ |
| `robots.txt` válido | Abrir `https://mirixstudiocr.netlify.app/robots.txt` y comprobar que apunta al sitemap | ☐ |
| Sitemap sin errores | Abrir `https://mirixstudiocr.netlify.app/sitemap.xml` y verificar que el XML es válido | ☐ |
| `tel:+50663105876` en el esquema | Buscar `telephone` en `index.html` | ☐ |
| `sameAs` completo | Ver en el reporte de Lighthouse y añadir los enlaces de redes | ☐ |
| Títulos por sección | Ver en DevTools cómo cambia `document.title` al navegar | ☐ |
| Texto alternativo de portafolio | Abrir el portafolio y revisar cada `<img>` | ☐ |
| No hay errores de accessibilidad | Marcar **Accessibility** en Lighthouse y revisar | ☐ |

---

## 5. Herramientas complementarias

| Herramienta | Uso |
|---|---|
| [Google Search Console](https://search.google.com/search-console) | Ver cómo interpreta Google la página, indexación, errores de sitemap, rendimiento de búsqueda |
| [Bing Webmaster Tools](https://www.bing.com/webmasters) | Repositorio alternativo; añadir el mismo dominio |
| [PageSpeed Insights](https://pagespeed.web.dev/) | Métricas de calidad y SEO, comparables con Lighthouse |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Ejecutar Lighthouse en CI para evitar regresiones |
| [Schema Markup Validator](https://search.google.com/test/rich-results) | Validar los datos estructurados de `LocalBusiness` |

---

## 6. ¿Qué dejar fuera del ámbito de este documento?

- El contenido del formulario (ya se envía a Netlify Forms y se guarda en Firestore).
- Las imágenes del portafolio (se gestionan en `public/Carousel` y se precargan en el build).
- Las variables de Firebase (solo siendo sensibles si fueran de producción; el bundle ya es público por diseño).
- Las redes sociales del estudiante (no se controlan en este repositorio).

## 7. Pendiente fuera del código

- Ficha de Google Business de Esparza, con el mismo nombre, teléfono y sitio.
- Enlaces desde Instagram y Facebook hacia la home.
- Search Console y Bing Webmaster con la propiedad `mirixstudiocr.netlify.app`.
- Añadir `https://www.instagram.com/mirix_studio.cr/` y `https://www.facebook.com/share/19DWfWjiKi/` al `sameAs` del esquema si existen.

© 2026 Mirix Studio CR · Miranda Méndez · Esparza, Costa Rica
