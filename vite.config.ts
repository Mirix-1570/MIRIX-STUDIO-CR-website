import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

const CAROUSEL_VIRTUAL_ID = 'virtual:carousel-images';
const CAROUSEL_RESOLVED_ID = '\0virtual:carousel-images';
const CAROUSEL_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

function carouselImages(): Plugin {
  const imageDir = path.resolve(__dirname, 'public/Carousel');

  const listImages = () => {
    if (!fs.existsSync(imageDir)) return [];
    return fs
      .readdirSync(imageDir)
      .filter((name) => CAROUSEL_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map((name) => `/Carousel/${encodeURIComponent(name)}`);
  };

  return {
    name: 'carousel-images',
    resolveId(id) {
      if (id === CAROUSEL_VIRTUAL_ID) return CAROUSEL_RESOLVED_ID;
    },
    load(id) {
      if (id !== CAROUSEL_RESOLVED_ID) return null;
      return `export default ${JSON.stringify(listImages())};`;
    },
    configureServer(server) {
      const reload = (file: string) => {
        if (!path.normalize(file).startsWith(path.normalize(imageDir))) return;
        const mod = server.moduleGraph.getModuleById(CAROUSEL_RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.add(imageDir);
      server.watcher.on('add', reload);
      server.watcher.on('unlink', reload);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), carouselImages()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/firebase')) return 'firebase';
            if (id.includes('node_modules/react')) return 'react-vendor';
            if (id.includes('node_modules/lucide-react')) return 'lucide';
            if (id.includes('node_modules/motion')) return 'motion';
            return undefined;
          }
        }
      }
    },
  };
});
