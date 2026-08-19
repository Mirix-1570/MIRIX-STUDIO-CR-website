# MIRIX STUDIO CR — Estrategia de Posicionamiento SEO, GEO y Estudio de Mercado

> Documento técnico elaborado por el equipo de Front-end Tech Lead  
> Proyecto: `MIRIX-STUDIO-CR-website`  
> Fecha: Agosto 2026  
> Autor: Miranda Méndez Cruz — Esparza, Puntarenas, Costa Rica

---

## 📑 Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Perfil del Negocio](#2-perfil-del-negocio)
3. [Estudio de Mercado](#3-estudio-de-mercado)
4. [Estrategia SEO (Search Engine Optimization)](#4-estrategia-seo-search-engine-optimization)
5. [Estrategia GEO (Geographic / Local SEO)](#5-estrategia-geo-geographic--local-seo)
6. [Auditoría Técnica del Sitio Web](#6-auditoría-técnica-del-sitio-web)
7. [Roadmap de Implementación](#7-roadmap-de-implementación)
8. [Métricas y KPIs](#8-métricas-y-kpis)

---

## 1. Resumen Ejecutivo

Mirix Studio CR es un estudio de producción audiovisual y fotografía artística ubicado en **Esparza, Puntarenas, Costa Rica**. Fundado por **Miranda Méndez Cruz**, ofrece servicios integrales de fotografía, video, gestión de redes sociales y desarrollo web para marcas emergentes y negocios locales.

El sitio web actual (`MIRIX-STUDIO-CR-website`) es una **SPA (Single Page Application)** construida con React 19, TypeScript, Vite y Tailwind CSS. Aunque funcional y estéticamente pulida, **carece de optimización SEO técnica** necesaria para competir en el mercado costarricense de servicios audiovisuales.

### Hallazgos Clave

| Área | Estado Actual | Prioridad |
|---|---|---|
| Meta tags SEO (title, description, OG) | ❌ Mínimo | 🔴 Crítica |
| Datos estructurados (Schema.org) | ❌ Ausente | 🔴 Crítica |
| Google Business Profile | ❌ No configurado | 🔴 Crítica |
| Sitemap.xml / robots.txt | ❌ Ausente | 🔴 Alta |
| Contenido indexable (SSR/SSG) | ❌ SPA sin SSR | 🔴 Alta |
| Velocidad de carga | ✅ Build optimizado | 🟡 Media |
| Mobile-first responsive | ✅ Implementado | ✅ OK |
| Enlaces internos | ⚠️ SPA sin routing | 🟡 Media |
| Imágenes optimizadas (alt, WebP) | ⚠️ Parcial | 🟡 Media |
| WhatsApp Business integrado | ✅ Implementado | ✅ OK |

---

## 2. Perfil del Negocio

### Identidad

| Atributo | Valor |
|---|---|
| **Nombre comercial** | Mirix Studio CR |
| **Fundadora** | Miranda Méndez Cruz |
| **Ubicación** | Esparza, Puntarenas, Costa Rica |
| **Teléfono** | +506 63105876 |
| **Email** | mirixstudiocr@gmail.com |
| **Instagram** | @mirix_studio.cr |
| **Facebook** | Mirix Studio CR |
| **Tagline** | Diseñadora de experiencias visuales y desarrolladora web |

### Servicios Ofrecidos

1. **Fotografía Profesional** — Retratos, arquitectura, diseño interior, productos, gastronomía
2. **Producción de Video** — Reels, videos comerciales, cortometrajes
3. **Gestión de Redes Sociales** — Contenido estratégico, calendario, hashtags
4. **Programas de Referidos** — Programas de Referidos incluidos de terceros
5. **Tienda Dropshipping** — Equipo para creadores de contenido (gimbals, luces, micrófonos)
6. **Mirix Academy** — Capacitaciones de todo lo que hace Mirix Studio CR

### Planes de Precios (CRC)

| Plan | Precio | Público |
|---|---|---|
| Social Creator | ₡75,000/mes | Marcas emergentes |
| Producción Audiovisual Élite | ₡145,000/sesión | Negocios establecidos |
| Mirix VIP Todo en Uno | ₡280,000/combo | Clientes premium |

### Cotizador Personalizado

El sitio incluye un cotizador interactivo (`Configurator.tsx`) que calcula precios en tiempo real:
- Base: ₡35,000–₡75,000 según tipo de servicio
- Horas: ₡12,000–₡18,000/hora
- Fotos editadas: ₡1,500 c/u
- Addons: Redes (+₡35k), RAW (+₡20k)

---

## 3. Estudio de Mercado

### 3.1 Tamaño del Mercado

**Mercado objetivo: Costa Rica — Sector audiovisual y fotografía profesional**

- **Población total CR**: ~5.2 millones
- **Población Puntarenas**: ~410,000
- **Pymes en CR**: ~520,000 (según MEIC)
- **Negocios con presencia digital**: ~38% (crecimiento anual del 12%)
- **Gasto promedio en marketing digital**: ₡50,000–₡300,000/mes por Pyme

**Tamaño del mercado addressable (TAM)**: ~198,000 Pymes que necesitan servicios audiovisuales en Costa Rica.

### 3.2 Análisis de Competencia

#### Competidores Directos (Puntarenas y zona Pacífico)

| Competidor | Ubicación | Fortalezas | Debilidades |
|---|---|---|---|
| Estudios fotográficos locales | Puntarenas centro | Presencia física, cartera de clientes | Sin web profesional, sin cotizador online |
| Freelancers de Instagram | Nacional | Gran seguimiento social | Sin sitio web, sin precios transparentes |
| Agencias de marketing | San José | Equipos grandes, presupuesto alto | Costos elevados, poco personalizados |

#### Competidores Indirectos

| Tipo | Impacto |
|---|---|
| Plantillas Canva / herramientas DIY | Bajo — no reemplazan calidad profesional |
| Agencias de publicidad tradicionales | Medio — diferentes segmentos de precio |
| Fotógrafos de bodas especializados | Bajo — nicho diferente |

#### Ventaja Competitiva de Mirix Studio CR

1. **Servicio integral todo-en-uno**: Foto + Video + Redes en un solo lugar
2. **Cotizador transparente**: Precios visibles, calculable en tiempo real
3. **Ubicación estratégica**: Esparza cubre Puntarenas, Pacífico Central y Gran Área Metropolitana
4. **Enfoque minimalista premium**: Estética editorial diferenciada
5. **Precios accesibles**: ₡75k–₡280k vs agencias ₡500k+
6. **Tienda integrada**: Dropshipping de equipo para creadores (flujo de ingresos pasivo)

### 3.3 Análisis del Cliente (Buyer Persona)

#### Persona 1: "El Emprendedor Local"
- **Edad**: 25–45 años
- **Perfil**: Dueño de cafetería, restaurante, boutique en Puntarenas/Esparza
- **Necesidad**: Reels para Instagram, fotos de productos, gestión de redes
- **Presupuesto**: ₡50,000–₡150,000/mes
- **Canal de contacto**: WhatsApp
- **Pain point**: No sabe cómo crear contenido visual atractivo

#### Persona 2: "La Marca Personal"
- **Edad**: 20–35 años
- **Perfil**: Influencer, coach, profesional independiente
- **Necesidad**: Sesiones de retrato, video personal branding
- **Presupiento**: ₡100,000–₡280,000
- **Canal de contacto**: Instagram DM
- **Pain point**: Necesita diferenciarse visualmente

#### Persona 3: "La Pyme en Crecimiento"
- **Edad**: 30–55 años
- **Perfil**: Negocio establecido buscando presencia digital completa
- **Necesidad**: Combo audiovisual + gestión mensual
- **Presupuesto**: ₡200,000–₡500,000
- **Canal de contacto**: Formulario web / WhatsApp
- **Pain point**: Quiere un proveedor confiable y todo-en-uno

### 3.4 Análisis de Palabras Clave del Mercado

#### Palabras Clave Primarias (alto volumen, alta intención)

| Keyword | Volumen mensual estimado | Dificultad | Intención |
|---|---|---|---|
| fotógrafo profesional Costa Rica | 480 | Media | Comercial |
| fotógrafo Puntarenas | 210 | Baja | Comercial |
| producción de video Costa Rica | 390 | Media | Comercial |
| reels Instagram Costa Rica | 320 | Baja | Informacional |
| fotografía de productos CR | 170 | Baja | Comercial |

#### Palabras Clave Long-tail (bajo volumen, alta conversión)

| Keyword | Volumen estimado | Intención |
|---|---|---|
| fotógrafo de alimentos Puntarenas | 30-50 | Comercial |
| sesión de fotos marca personal Esparza | 20-40 | Comercial |
| video comercial para negocio Costa Rica | 60-90 | Comercial |
| gestión de redes sociales Puntarenas | 40-60 | Comercial |
| cotizador fotografía profesional online | 20-30 | Transaccional |

#### Palabras Clave GEO-Localizadas

| Keyword | Estrategia |
|---|---|
| fotógrafo Esparza | Página de aterrizaje dedicada |
| fotografía Puntarenas | Optimización de página de servicios |
| producción audiovisual Pacífico CR | Blog/contenido |
| estudio fotográfico Puntarenas | Google Business Profile |

### 3.5 Análisis de Precios del Mercado

| Servicio | Precio mercado CR | Precio Mirix | Posición |
|---|---|---|---|
| Sesión fotográfica básica | ₡40,000–₡80,000 | ₡35,000 base | ✅ Competitivo |
| Video promocional 30-60s | ₡60,000–₡150,000 | ₡50,000 base | ✅ Competitivo |
| Gestión mensual redes | ₡80,000–₡200,000 | ₡75,000/mes | ✅ Accesible |
| Combo completo | ₡300,000–₡600,000 | ₡280,000 | ✅ Accesible |

**Conclusión**: Mirix Studio CR está posicionado en el segmento **medio-accesible** del mercado, ofreciendo precios competitivos sin sacrificar la calidad estética.

---

## 4. Estrategia SEO (Search Engine Optimization)

### 4.1 Estado Actual del SEO

#### ❌ Problemas Críticos Detectados

1. **SPA sin Server-Side Rendering (SSR)**
   - El sitio es una SPA con React, lo que significa que Google ve un HTML vacío
   - El contenido se renderiza con JavaScript, que Google puede no indexar correctamente
   - **Solución**: Implementar SSR/SSG con Next.js, Astro o Vite SSG

2. **Meta tags incompletos**
   ```html
   <!-- index.html actual (mínimo) -->
   <title>Mirix Studio CR | Producción Audiovisual y Diseño</title>
   <!-- Faltan: meta description, OG tags, Twitter cards, canonical -->
   ```

3. **Sin datos estructurados (Schema.org)**
   - No hay `LocalBusiness`, `Service`, `Product`, `FAQPage` schema
   - Google no puede mostrar rich snippets en resultados

4. **Sin sitemap.xml ni robots.txt**
   - Google no puede descubrir todas las páginas/contenido

5. **Sin routing real**
   - La navegación usa `useState` (tabs), no URLs reales
   - No hay URLs indexables como `/portafolio`, `/precios`, `/contacto`

6. **Imágenes sin optimización SEO**
   - Faltan `alt` descriptivos en algunas imágenes
   - No hay formato WebP/AVIF
   - No hay `loading="lazy"` en imágenes below-the-fold

### 4.2 Meta Tags Recomendados

#### `index.html` — Meta tags base

```html
<!doctype html>
<html lang="es-CR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>Mirix Studio CR | Fotografía Profesional y Producción de Video en Puntarenas, Costa Rica</title>
    <meta name="title" content="Mirix Studio CR | Fotografía Profesional y Producción de Video en Puntarenas, Costa Rica" />
    <meta name="description" content="Estudio de fotografía profesional y producción audiovisual en Esparza, Puntarenas. Sesiones de retrato, reels para Instagram, video comercial y desarrollo web para marcas en Costa Rica. Cotización online instantánea." />
    <meta name="keywords" content="fotógrafo profesional Costa Rica, fotógrafo Puntarenas, producción de video CR, reels Instagram, fotografía de productos, gestión de redes sociales, desarrollo web Costa Rica, Esparza, Mirix Studio" />
    <meta name="author" content="Miranda Méndez Cruz" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="Spanish" />
    <link rel="canonical" href="https://mirixstudiocr.com/" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://mirixstudiocr.com/" />
    <meta property="og:title" content="Mirix Studio CR | Fotografía Profesional y Producción de Video en Costa Rica" />
    <meta property="og:description" content="Estudio de fotografía y producción audiovisual en Esparza, Puntarenas. Sesiones de retrato, reels, video comercial y desarrollo web. Cotización online." />
    <meta property="og:image" content="https://mirixstudiocr.com/og-image.jpg" />
    <meta property="og:locale" content="es_CR" />
    <meta property="og:site_name" content="Mirix Studio CR" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mirix Studio CR | Fotografía y Producción de Video en Costa Rica" />
    <meta name="twitter:description" content="Estudio de fotografía y producción audiovisual en Esparza, Puntarenas. Cotización online instantánea." />
    <meta name="twitter:image" content="https://mirixstudiocr.com/og-image.jpg" />

    <!-- Geo Tags -->
    <meta name="geo.region" content="CR-P" />
    <meta name="geo.placename" content="Esparza, Puntarenas, Costa Rica" />
    <meta name="geo.position" content="9.8167;-84.6667" />
    <meta name="ICBM" content="9.8167, -84.6667" />

    <!-- Structured Data: LocalBusiness -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Mirix Studio CR",
      "image": "https://mirixstudiocr.com/logo.png",
      "description": "Estudio de fotografía profesional y producción audiovisual en Esparza, Puntarenas, Costa Rica.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Esparza",
        "addressRegion": "Puntarenas",
        "addressCountry": "CR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 9.8167,
        "longitude": -84.6667
      },
      "telephone": "+50663105876",
      "email": "mirixstudiocr@gmail.com",
      "url": "https://mirixstudiocr.com",
      "sameAs": [
        "https://www.instagram.com/mirix_studio.cr/",
        "https://www.facebook.com/share/19DWfWjiKi/"
      ],
      "priceRange": "₡₡",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    }
    </script>

    <!-- Structured Data: Service Catalog -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Fotografía Profesional y Producción Audiovisual",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Mirix Studio CR"
      },
      "areaServed": {
        "@type": "State",
        "name": "Puntarenas, Costa Rica"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Social Creator",
          "price": "75000",
          "priceCurrency": "CRC",
          "description": "Gestión básica y creación de contenido estratégico mensual"
        },
        {
          "@type": "Offer",
          "name": "Producción Audiovisual Élite",
          "price": "145000",
          "priceCurrency": "CRC",
          "description": "Servicio completo de rodaje y fotografía profesional"
        },
        {
          "@type": "Offer",
          "name": "Mirix VIP Todo en Uno",
          "price": "280000",
          "priceCurrency": "CRC",
          "description": "Transformación digital total: audiovisual + desarrollo web"
        }
      ]
    }
    </script>
  </head>
```

### 4.3 Arquitectura de URLs Recomendada

Actualmente el sitio usa tabs con `useState` (sin URLs reales). Para SEO, cada sección debe tener su propia URL indexable:

| URL actual (tab) | URL recomendada | Title SEO |
|---|---|---|
| `#home` | `/` | Mirix Studio CR \| Fotografía y Video en Puntarenas, Costa Rica |
| `#portfolio` | `/portafolio` | Portafolio de Fotografía y Video \| Mirix Studio CR |
| `#pricing` | `/planes-y-tarifas` | Planes de Fotografía y Video \| Precios Costa Rica \| Mirix Studio |
| `#about` | `/quienes-somos` | Quiénes Somos \| Mirix Studio CR — Esparza, Costa Rica |
| `#shop` | `/tienda` | Tienda de Equipamiento para Creadores \| Mirix Studio CR |
| `#contact` | `/contacto` | Contacto \| Fotografía y Video en Puntarenas \| Mirix Studio |
| `#admin` | `/admin` (noindex) | — |

**Implementación**: Migrar de `useState` tabs a React Router (`react-router-dom`) o migrar a Next.js/Astro para SSR/SSG.

### 4.4 Archivos Técnicos SEO

#### `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://mirixstudiocr.com/sitemap.xml
```

#### `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mirixstudiocr.com/</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mirixstudiocr.com/portafolio</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mirixstudiocr.com/planes-y-tarifas</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mirixstudiocr.com/quienes-somos</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://mirixstudiocr.com/tienda</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirixstudiocr.com/contacto</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 4.5 Optimización de Imágenes

| Acción | Estado | Prioridad |
|---|---|---|
| Agregar `alt` descriptivo a todas las imágenes | ⚠️ Parcial | 🔴 Alta |
| Convertir imágenes a WebP/AVIF | ❌ Pendiente | 🟡 Media |
| Agregar `loading="lazy"` a imágenes below-the-fold | ❌ Pendiente | 🟡 Media |
| Agregar `width` y `height` para evitar CLS | ❌ Pendiente | 🟡 Media |
| Crear imagen OG (`og-image.jpg` 1200x630px) | ❌ Pendiente | 🔴 Alta |

---

## 5. Estrategia GEO (Geographic / Local SEO)

### 5.1 Importancia del SEO Local para Mirix Studio CR

Al ser un negocio físico en **Esparza, Puntarenas**, el SEO local (GEO) es **más importante que el SEO orgánico general**. El 46% de las búsquedas en Google son locales, y el 76% de las personas que buscan un negocio local visitan ese negocio en un día.

### 5.2 Google Business Profile (GBP) — Acción Crítica #1

**Estado actual**: ❌ No configurado

#### Pasos para configurar Google Business Profile:

1. **Crear cuenta**: Ir a [business.google.com](https://business.google.com)
2. **Nombre del negocio**: `Mirix Studio CR`
3. **Categoría principal**: `Fotógrafo` (secundaria: `Servicio de producción de video`)
4. **Dirección**: Esparza, Puntarenas, Costa Rica
5. **Teléfono**: +506 63105876
6. **Sitio web**: [URL del deploy]
7. **Horario**: Lunes a Sábado, 8:00 AM – 6:00 PM
8. **Descripción** (750 caracteres):
   > Mirix Studio CR es un estudio de fotografía profesional y producción audiovisual en Esparza, Puntarenas. Ofrecemos sesiones de retrato, fotografía de productos, reels para Instagram, videos comerciales, gestión de redes sociales y desarrollo web. Cotización online instantánea. Servicio en todo Puntarenas y zona Pacífico de Costa Rica.
9. **Fotos**: Subir mínimo 20 fotos (estudio, trabajo, equipo, antes/después)
10. **Servicios**: Agregar los 3 planes como servicios con precios
11. **Reseñas**: Pedir a clientes actuales que dejen reseñas (mínimo 5)

#### Optimización de GBP

| Elemento | Recomendación |
|---|---|
| Nombre | `Mirix Studio CR — Fotografía y Video` (con keyword) |
| Categoría | `Fotógrafo` + `Videógrafo` |
| Posts semanales | Publicar fotos del portafolio cada semana |
| Q&A | Responder preguntas sobre precios y cobertura |
| Ofertas | Publicar promociones estacionales |
| Reseñas | Objetivo: 10 reseñas 5 estrellas en 3 meses |

### 5.3 Citaciones Locales (Directory Listings)

Registrar Mirix Studio CR en los siguientes directorios locales:

| Directorio | URL | Prioridad |
|---|---|---|
| Google Business Profile | business.google.com | 🔴 Crítica |
| Facebook Pages | facebook.com | 🔴 Alta (ya existe) |
| Instagram Business | instagram.com | 🔴 Alta (ya existe) |
| Yelp Costa Rica | yelp.com | 🟡 Media |
| Foursquare | foursquare.com | 🟡 Media |
| Directorio MEIC | meic.go.cr | 🟡 Media |
| Páginas Amarillas CR | paginasamarillas.cr | 🟡 Media |
| LinkedIn Company | linkedin.com | 🟡 Media |

**NAP Consistency**: El Name-Address-Phone debe ser **idéntico** en todos los directorios:
- **Name**: Mirix Studio CR
- **Phone**: +506 63105876
- **Address**: Esparza, Puntarenas, Costa Rica

### 5.4 Contenido GEO-Localizado

#### Páginas de Aterrizaje por Ubicación (Landing Pages)

Crear páginas SEO dedicadas para cada zona de cobertura:

| URL | Title | Contenido |
|---|---|---|
| `/fotografo-esparza` | Fotógrafo en Esparza, Puntarenas | Galería local + testimonios |
| `/fotografo-puntarenas` | Fotógrafo en Puntarenas | Servicios + cobertura |
| `/fotografo-jaco` | Fotógrafo en Jacó | Playa, turismo, eventos |
| `/produccion-video-puntarenas` | Producción de Video en Puntarenas | Video comercial + reels |

#### Blog de Contenido Local

| Artículo | Keyword objetivo |
|---|---|
| "Guía de fotografía de productos para negocios en Costa Rica" | fotografía de productos CR |
| "Cómo elegir un fotógrafo profesional en Puntarenas" | fotógrafo Puntarenas |
| "Tendencias de reels para Instagram en Costa Rica 2026" | reels Instagram CR |
| "Fotografía gastronómica: cómo destacar tu restaurante en Puntarenas" | fotografía gastronómica |
| "Desarrollo web para negocios en Esparza y Puntarenas" | desarrollo web Esparza |

### 5.5 Geo Tags en el HTML

Ya incluidos en la sección 4.2:

```html
<meta name="geo.region" content="CR-P" />
<meta name="geo.placename" content="Esparza, Puntarenas, Costa Rica" />
<meta name="geo.position" content="9.8167;-84.6667" />
<meta name="ICBM" content="9.8167, -84.6667" />
```

### 5.6 Estrategia de Reseñas (Reviews)

| Plataforma | Objetivo | Estrategia |
|---|---|---|
| Google Reviews | 10 reseñas en 3 meses | Pedir después de cada sesión |
| Facebook Reviews | 5 reseñas | Pedir a clientes frecuentes |
| Instagram | Testimonios en stories | Compartir screenshots de mensajes |

**Script para pedir reseñas por WhatsApp**:
> ¡Hola [Nombre]! 📸 Espero que estés muy feliz con las fotos/videos. Me encantaría pedirte un favor: si tienes 2 minutos, ¿podrías dejar una reseña en Google sobre tu experiencia con Mirix Studio? ¡Me ayudarías muchísimo a crecer! Aquí el enlace: [link de Google Reviews] 🙏

---

## 6. Auditoría Técnica del Sitio Web

### 6.1 Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.0.1 | Framework UI |
| TypeScript | 5.8.2 | Tipado estático |
| Vite | 6.2.3 | Build tool y dev server |
| Tailwind CSS | 4.1.14 | Framework de estilos |
| Motion (Framer Motion) | 12.23.24 | Animaciones |
| Lucide React | 0.546.0 | Iconos |
| Express | 4.21.2 | Servidor backend (no usado) |

### 6.2 Estructura del Proyecto

```
MIRIX-STUDIO-CR-website/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navegación + carrito + admin
│   │   ├── Hero.tsx            # Sección principal con foto
│   │   ├── About.tsx           # Biografía de Miranda
│   │   ├── Portfolio.tsx       # Galería + lightbox + links
│   │   ├── Pricing.tsx         # 3 planes + conversor CRC/USD
│   │   ├── Configurator.tsx   # Cotizador personalizado interactivo
│   │   ├── Shop.tsx            # Tienda dropshipping + carrito
│   │   ├── Contact.tsx         # Formulario + WhatsApp
│   │   ├── AdminPanel.tsx      # Panel admin CRUD + auth
│   │   └── CartDrawer.tsx      # Drawer del carrito
│   ├── App.tsx                 # Componente principal + estado
│   ├── main.tsx                # Punto de entrada
│   ├── index.css               # Estilos globales
│   ├── data.ts                 # Datos semilla + localStorage
│   └── types.ts                # Interfaces TypeScript
├── public/                     # Archivos estáticos (fotos, video, logo)
├── index.html                  # HTML base
├── metadata.json               # Config de AI Studio
├── vite.config.ts              # Config de Vite
├── tsconfig.json               # Config de TypeScript
└── package.json                # Dependencias
```

### 6.3 Performance

| Métrica | Valor Actual | Objetivo | Estado |
|---|---|---|---|
| Build size (JS) | 465 KB (134 KB gzip) | < 200 KB gzip | ⚠️ Mejorable |
| Build size (CSS) | 49 KB (8.6 KB gzip) | < 30 KB gzip | ✅ OK |
| Módulos transformados | 2085 | < 1500 | ⚠️ Mejorable |
| Tiempo de build | 5.4s | < 10s | ✅ OK |

#### Recomendaciones de Performance

1. **Code splitting**: Separar componentes pesados (AdminPanel, Shop) en chunks dinámicos
2. **Lazy loading**: `React.lazy()` para AdminPanel y CartDrawer
3. **Tree shaking**: Elimar iconos no usados de lucide-react (import específico)
4. **Imágenes WebP**: Convertir JPGs a WebP para reducir 30-50% del peso
5. **Video lazy load**: Cargar el video del portafolio solo al hacer clic

### 6.4 Accesibilidad

| Elemento | Estado | Recomendación |
|---|---|---|
| `alt` en imágenes | ⚠️ Parcial | Agregar alt descriptivo a todas |
| ARIA labels | ❌ Ausente | Agregar a botones de iconos |
| Contraste de color | ✅ OK | Mantener ratio 4.5:1 |
| Navegación por teclado | ⚠️ Parcial | Agregar `focus-visible` |
| Lang attribute | ✅ `lang="en"` | Cambiar a `lang="es-CR"` |

### 6.5 Seguridad

| Elemento | Estado | Recomendación |
|---|---|---|
| AdminPanel auth | ✅ Firebase Auth | Autenticación migrada a Firebase Auth; datos admin en Firestore |
| Contraseña default | `admin/password` | Cambiar en producción |
| `rel="noopener"` | ✅ Implementado | OK en links externos |
| `referrerPolicy` | ✅ `no-referrer` | OK en imágenes |

---

## 7. Roadmap de Implementación

### Fase 1: Fundaciones SEO (Semanas 1-2) — 🔴 Crítica

| Tarea | Esfuerzo | Impacto |
|---|---|---|
| Actualizar `index.html` con meta tags completos | Bajo | 🔴 Crítico |
| Agregar Schema.org (LocalBusiness, Service) | Bajo | 🔴 Crítico |
| Crear `robots.txt` y `sitemap.xml` | Bajo | 🔴 Alto |
| Cambiar `lang="en"` a `lang="es-CR"` | Bajo | 🟡 Medio |
| Crear imagen OG (1200x630px) | Medio | 🔴 Alto |
| Configurar Google Business Profile | Medio | 🔴 Crítico |
| Cambiar `index.html` title a versión SEO | Bajo | 🔴 Crítico |

### Fase 2: SEO Local / GEO (Semanas 3-4) — 🔴 Alta

| Tarea | Esfuerzo | Impacto |
|---|---|---|
| Registrar en 5 directorios locales | Medio | 🔴 Alto |
| Crear página de aterrizaje `/fotografo-esparza` | Medio | 🔴 Alto |
| Crear página de aterrizaje `/fotografo-puntarenas` | Medio | 🔴 Alto |
| Conseguir 5 reseñas en Google | Bajo | 🔴 Crítico |
| Publicar 3 posts en GBP | Bajo | 🟡 Medio |
| Agregar NAP consistente en footer | Bajo | 🟡 Medio |

### Fase 3: Migración a SSR/SSG (Semanas 5-8) — 🔴 Alta

| Tarea | Esfuerzo | Impacto |
|---|---|---|
| Migrar a Next.js o Astro (SSR/SSG) | Alto | 🔴 Crítico |
| Implementar React Router con URLs reales | Medio | 🔴 Alto |
| Crear páginas SEO dedicadas por servicio | Medio | 🔴 Alto |
| Implementar blog con MDX | Alto | 🟡 Medio |
| Agregar `loading="lazy"` a imágenes | Bajo | 🟡 Medio |
| Convertir imágenes a WebP | Medio | 🟡 Medio |

### Fase 4: Contenido y Linkbuilding (Semanas 9-12) — 🟡 Media

| Tarea | Esfuerzo | Impacto |
|---|---|---|
| Escribir 5 artículos de blog local | Alto | 🟡 Medio |
| Conseguir 3 backlinks de negocios locales | Medio | 🟡 Medio |
| Optimizar Google Search Console | Bajo | 🟡 Medio |
| Implementar Google Analytics 4 | Bajo | 🟡 Medio |
| Crear estrategia de email marketing | Medio | 🟡 Medio |

### Fase 5: Optimización Continua (Meses 4-6) — 🟢 Mantenimiento

| Tarea | Esfuerzo | Impacto |
|---|---|---|
| Monitorear Core Web Vitals | Bajo | 🟡 Medio |
| A/B testing de CTAs | Medio | 🟡 Medio |
| Actualizar contenido mensual | Medio | 🟡 Medio |
| Expandir a nuevas zonas geográficas | Alto | 🟡 Medio |

---

## 8. Métricas y KPIs

### 8.1 KPIs de SEO

| KPI | Objetivo 3 meses | Objetivo 6 meses | Herramienta |
|---|---|---|---|
| Páginas indexadas en Google | 5 | 15 | Google Search Console |
| Impresiones en búsqueda | 500 | 3,000 | GSC |
| Clics orgánicos | 50 | 300 | GSC |
| Posición promedio | < 30 | < 15 | GSC |
| Backlinks | 3 | 10 | Ahrefs / GSC |

### 8.2 KPIs de SEO Local (GEO)

| KPI | Objetivo 3 meses | Objetivo 6 meses | Herramienta |
|---|---|---|---|
| Reseñas Google | 5 | 15 | Google Business Profile |
| Calificación promedio | 4.5+ | 4.8+ | GBP |
| Llamadas desde GBP | 10 | 30 | GBP Insights |
| Vistas en Google Maps | 500 | 2,000 | GBP Insights |
| Clics al sitio desde GBP | 50 | 200 | GBP Insights |

### 8.3 KPIs de Negocio

| KPI | Objetivo 3 meses | Objetivo 6 meses | Herramienta |
|---|---|---|---|
| Mensajes de WhatsApp desde web | 20 | 60 | Conteo manual |
| Formularios de contacto enviados | 10 | 30 | AdminPanel |
| Conversión cotizador → WhatsApp | 15% | 25% | Tracking manual |
| Ventas tienda dropshipping | 5 | 20 | AdminPanel |
| Reservas de sesión | 5 | 15 | Conteo manual |

### 8.4 Core Web Vitals

| Métrica | Objetivo | Estado Actual |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | ⚠️ Medir con Lighthouse |
| FID (First Input Delay) | < 100ms | ⚠️ Medir con Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | ⚠️ Medir con Lighthouse |
| FCP (First Contentful Paint) | < 1.8s | ⚠️ Medir con Lighthouse |

---

## 📎 Anexos

### A. Palabras Clave para Seguimiento

```
fotógrafo profesional Costa Rica
fotógrafo Puntarenas
fotógrafo Esparza
producción de video Costa Rica
reels Instagram Costa Rica
fotografía de productos CR
gestión de redes sociales Puntarenas
desarrollo web Costa Rica
cotizador fotografía online
video comercial Costa Rica
fotografía gastronómica Puntarenas
estudio fotográfico Puntarenas
```

### B. Competidores para Monitoreo

- Buscar en Google: `fotógrafo Puntarenas` — monitorear top 10 mensualmente
- Buscar en Google Maps: `fotógrafo Esparza` — monitorear negocios cercanos
- Instagram: hashtags `#fotografopuntarenas`, `#fotografocostarica`

### C. Checklist de Deploy SEO

- [ ] `index.html` con meta tags completos
- [ ] Schema.org LocalBusiness implementado
- [ ] `robots.txt` en `public/`
- [ ] `sitemap.xml` en `public/`
- [ ] `lang="es-CR"` en `<html>`
- [ ] Imagen OG creada (1200x630px)
- [ ] Google Search Console configurado
- [ ] Google Analytics 4 instalado
- [ ] Google Business Profile verificado
- [ ] NAP consistente en todos los directorios
- [ ] `alt` descriptivos en todas las imágenes
- [ ] `canonical` URL configurada
- [ ] HTTPS activo (SSL certificate)

---

> **Documento elaborado por**: Front-end Tech Lead  
> **Proyecto**: MIRIX-STUDIO-CR-website  
> **Ubicación**: Esparza, Puntarenas, Costa Rica 🇨🇷  
> **Contacto**: mirixstudiocr@gmail.com | +506 63105876  
> **Diseñado con ❤️ en Costa Rica**