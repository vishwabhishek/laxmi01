import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        service_kitchens: resolve(__dirname, 'services/kitchens/index.html'),
        service_bathrooms: resolve(__dirname, 'services/bathrooms/index.html'),
        service_furniture: resolve(__dirname, 'services/furniture/index.html'),
        service_flooring: resolve(__dirname, 'services/flooring/index.html'),
        service_buildings: resolve(__dirname, 'services/buildings/index.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        project_light_pine_kitchen: resolve(__dirname, 'projects/light-pine-kitchen/index.html'),
        project_airy_apartment: resolve(__dirname, 'projects/airy-apartment/index.html'),
        project_modern_kitchen: resolve(__dirname, 'projects/modern-kitchen/index.html'),
        project_hamptons_manor_house: resolve(__dirname, 'projects/hamptons-manor-house/index.html'),
        project_dark_oak_kitchen: resolve(__dirname, 'projects/dark-oak-kitchen/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        template_licences: resolve(__dirname, 'template-help/licences/index.html'),
        template_changelog: resolve(__dirname, 'template-help/changelog/index.html'),
        page_404: resolve(__dirname, '404.html'),
        page_401: resolve(__dirname, '401.html')
      }
    }
  }
});
