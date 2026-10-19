# SEO — Mirix Studio CR

Estado del posicionamiento del sitio público. Fecha de revisión: 19 de octubre de 2026.

El sitio es una sola página en [https://mirixstudiocr.netlify.app/](https://mirixstudiocr.netlify.app/). Google recibe el HTML de `index.html` y luego el contenido que pinta React.

## Identidad que debe coincidir en todos lados

| Dato | Valor |
|---|---|
| Nombre | Mirix Studio CR |
| Fundadora | Miranda Méndez |
| Sede | Esparza, Puntarenas, Costa Rica |
| Correo | mirixstudiocr@gmail.com |
| WhatsApp | +506 63105876 |
| Instagram | mirix_studio.cr |
| Cobertura | Costa Rica |
| Idioma | Español (`lang="es"`) |

## Lo que ya está en el sitio

En `index.html`:

- Título y descripción en español, con el servicio y la sede
- URL canónica
- Open Graph y Twitter Card
- `theme-color` en marfil `#FAF7F2`
- Datos estructurados `LocalBusiness` (nombre, sede, correo, país atendido, WhatsApp)

En `src/App.tsx`, al abrir Portafolio, Planes, Quiénes somos, Contacto o el panel, cambian `document.title` y la meta descripción.

En `public/`:

- `robots.txt` permite el rastreo y señala el sitemap
- `sitemap.xml` publica la página de inicio

Las obras del portafolio llevan texto alternativo con el título de cada pieza. El retrato de Quiénes somos nombra a Miranda Méndez.

## Velocidad

La portada, el retrato, el logo, el fondo de planes y las fotos del carrusel están en JPEG al tamaño en que se muestran. El hero y el logo se precargan. El mapa de Esparza empieza a cargar con la página, con conexión anticipada a Google.

Las fotos nuevas del carrusel conviene subirlas ya comprimidas. Un PNG de varios megabytes vuelve a frenar esa sección.

## Cómo mantenerlo

1. Si cambia el teléfono, el correo o la sede, actualizar `index.html`, el pie de página y la ficha de Google Business con el mismo texto.
2. La imagen para redes es `public/logo.png`. Si se cambia el logo público, sustituir ese archivo y conservar la ruta, o actualizar `og:image` y `twitter:image`.
3. El sitemap solo necesita la home mientras el sitio siga siendo una sola URL. Privacidad, términos y el panel no son páginas propias: viven dentro de la misma dirección.
4. Al publicar una obra nueva, el texto alternativo sale del título cargado en el portafolio. Un título claro ayuda a la búsqueda.
5. Después de un deploy grande, revisar en Search Console que la home siga indexada y que el sitemap no marque error.

## Pendiente fuera del código

- Ficha de Google Business de Esparza, con el mismo nombre, teléfono y sitio
- Enlaces desde Instagram y Facebook hacia la home
- Search Console y Bing Webmaster con la propiedad `mirixstudiocr.netlify.app`
