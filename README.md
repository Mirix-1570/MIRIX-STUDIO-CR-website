<div align="center">
  <img width="1200" height="475" alt="MIRIX STUDIO CR" src="https://via.placeholder.com/1200x475/000000/FFFFFF?text=MIRIX+STUDIO+CR" />
</div>

# MIRIX STUDIO CR - Sitio Web

Sitio web profesional para **MIRIX STUDIO CR**, estudio de producción audiovisual y fotografía artística ubicado en Esparza, Costa Rica.

## 🎬 Servicios

- **Producción de Video** - Grabaciones en alta definición, reels de tendencia
- **Fotografía Artística** - Retratos, arquitectura, diseño interior, productos
- **Gestión de Redes Sociales** - Contenido estratégico y gestión profesional

## 🚀 Tecnologías

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Motion (Framer Motion)** - Animaciones
- **Lucide React** - Iconos
- **Express** - Servidor backend (opcional)

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

## 🔧 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd MIRIX-STUDIO-CR-website
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

   El servidor se iniciará en `http://localhost:3000`

4. **Build para producción:**
   ```bash
   npm run build
   ```

5. **Preview del build:**
   ```bash
   npm run preview
   ```

## 📁 Estructura del Proyecto

```
MIRIX-STUDIO-CR-website/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Pricing.tsx
│   │   ├── About.tsx
│   │   ├── Shop.tsx
│   │   ├── Contact.tsx
│   │   ├── AdminPanel.tsx
│   │   └── CartDrawer.tsx
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Punto de entrada
│   ├── index.css            # Estilos globales
│   ├── data.ts              # Datos iniciales y persistencia
│   └── types.ts             # Definiciones TypeScript
├── public/                  # Archivos estáticos
├── assets/                  # Imágenes y recursos
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## 🎨 Características

- ✅ Diseño minimalista y elegante
- ✅ Totalmente responsive (mobile-first)
- ✅ Animaciones suaves con Motion
- ✅ Carrito de compras persistente (localStorage)
- ✅ Panel de administración
- ✅ Gestión de contenido dinámico
- ✅ Portafolio interactivo
- ✅ Tienda en línea
- ✅ Formulario de contacto
- ✅ Persistencia de datos en localStorage

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en puerto 3000 |
| `npm run build` | Construye la app para producción |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Verifica tipos TypeScript |
| `npm run clean` | Limpia archivos de build |

## 📝 Notas de Desarrollo

- El proyecto usa **React 19** con la nueva API de `createRoot`
- Los datos se persisten en **localStorage** del navegador
- El panel de admin requiere login (ver `AdminPanel.tsx`)
- Tailwind CSS v4 está configurado con Vite

## 🐛 Issues Conocidos

### Issue #1: Configuración inicial del proyecto
**Fecha:** 2026-07-31  
**Descripción:** El archivo `main.tsx` fue identificado con contenido incompleto en la versión inicial del repositorio.  
**Solución:** Se verificó y corrigió el archivo con la configuración correcta de React 19:
- Imports correctos de `react` y `react-dom/client`
- Uso de `createRoot` API (React 19)
- Renderizado del componente `<App />`

**Estado:** ✅ Resuelto

### Issue #2: Logo no visible en Navbar
**Fecha:** 2026-07-31  
**Descripción:** El logo de MIRIX STUDIO CR no se mostraba en el navbar debido a un nombre de archivo con caracteres especiales (espacios y tildes) que causaba problemas en la ruta de acceso.  
**Archivo afectado:** `src/components/Navbar.tsx`  
**Solución:** 
1. Se renombró el archivo de `Diseño sin título (1).png` a `logo.png` en la carpeta `public/`
2. Se actualizó la referencia en `Navbar.tsx` de `/Diseno sin título (1).png` a `/logo.png`
3. Se mejoró la legibilidad y mantenibilidad del código

**Archivos modificados:**
- `public/Diseño sin título (1).png` → `public/logo.png`
- `src/components/Navbar.tsx` (línea 49)

**Estado:** ✅ Resuelto

## 📄 Licencia

© 2026 MIRIX STUDIO CR - Miranda Méndez Cruz  
Esparza, Costa Rica

---

**Diseñado con ❤️ en Costa Rica**