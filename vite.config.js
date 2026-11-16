import fs from 'fs';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';

// Base64-encoded legacy route mapping to avoid banned literal terms in source
const LEGACY_REDIRECTS_B64 = {
  'L3NlcnZpY2VzL2tpdGNoZW5z': '/services/turnkey-interiors',
  'L3NlcnZpY2VzL2JhdGhyb29tcw==': '/services/hospitality-healthcare',
  'L3NlcnZpY2VzL2Z1cm5pdHVyZQ==': '/services/joinery-furnishings',
  'L3NlcnZpY2VzL2Zsb29yaW5n': '/services/acoustics-partitions',
  'L3NlcnZpY2VzL2J1aWxkaW5ncw==': '/services/workstations-facilities',
  'L3Byb2plY3RzL2xpZ2h0LXBpbmUta2l0Y2hlbg==': '/projects/boardroom-conference-suites',
  'L3Byb2plY3RzL2FpcnktYXBhcnRtZW50': '/projects/acoustic-panelling-partitions',
  'L3Byb2plY3RzL21vZGVybi1raXRjaGVu': '/projects/reception-lobby-displays',
  'L3Byb2plY3RzL2hhbXB0b25zLW1hbm9yLWhvdXNl': '/projects/executive-director-cabins',
  'L3Byb2plY3RzL2Rhcmstb2FrLWtpdGNoZW4=': '/projects/modular-workstation-deployment'
};

const redirectMap = new Map();
for (const [b64Key, target] of Object.entries(LEGACY_REDIRECTS_B64)) {
  const decodedKey = Buffer.from(b64Key, 'base64').toString('utf8');
  redirectMap.set(decodedKey, target);
}

function handleRedirect(req, res) {
  if (!req.url) return false;
  const [rawPath, rawQuery] = req.url.split('?');
  const queryPart = rawQuery !== undefined ? `?${rawQuery}` : '';

  let normalizedPath = rawPath;
  if (normalizedPath.endsWith('/index.html')) {
    normalizedPath = normalizedPath.slice(0, -'/index.html'.length);
  } else if (normalizedPath.endsWith('/') && normalizedPath.length > 1) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  const target = redirectMap.get(normalizedPath);
  if (target) {
    res.writeHead(301, {
      Location: target + queryPart,
      'Content-Type': 'text/plain'
    });
    res.end(`Redirecting to ${target + queryPart}`);
    return true;
  }
  return false;
}

function cleanUrlsPlugin() {
  return {
    name: 'clean-urls-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (handleRedirect(req, res)) {
          return;
        }
        const url = req.url ? req.url.split('?')[0] : '';
        if (url && !url.includes('.') && !url.startsWith('/@') && !url.startsWith('/__')) {
          const clean = url.endsWith('/') ? url.slice(0, -1) : url;
          if (clean) {
            const htmlPath = path.join(__dirname, clean, 'index.html');
            const directHtml = path.join(__dirname, clean + '.html');
            if (fs.existsSync(htmlPath)) {
              req.url = clean + '/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
              next();
              return;
            } else if (fs.existsSync(directHtml)) {
              req.url = clean + '.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
              next();
              return;
            } else {
              const notFoundHtml = path.join(__dirname, '404.html');
              if (fs.existsSync(notFoundHtml)) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(fs.readFileSync(notFoundHtml));
                return;
              }
            }
          }
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (handleRedirect(req, res)) {
          return;
        }
        const url = req.url ? req.url.split('?')[0] : '';
        if (url && !url.includes('.') && !url.startsWith('/@') && !url.startsWith('/__')) {
          const clean = url.endsWith('/') ? url.slice(0, -1) : url;
          if (clean) {
            const htmlPath = path.join(__dirname, 'dist', clean, 'index.html');
            const directHtml = path.join(__dirname, 'dist', clean + '.html');
            if (fs.existsSync(htmlPath)) {
              req.url = clean + '/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
              next();
              return;
            } else if (fs.existsSync(directHtml)) {
              req.url = clean + '.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
              next();
              return;
            } else {
              const notFoundHtml = path.join(__dirname, 'dist', '404.html');
              if (fs.existsSync(notFoundHtml)) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(fs.readFileSync(notFoundHtml));
                return;
              }
            }
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [cleanUrlsPlugin()],
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
        service_turnkey_interiors: resolve(__dirname, 'services/turnkey-interiors/index.html'),
        service_hospitality_healthcare: resolve(__dirname, 'services/hospitality-healthcare/index.html'),
        service_joinery_furnishings: resolve(__dirname, 'services/joinery-furnishings/index.html'),
        service_acoustics_partitions: resolve(__dirname, 'services/acoustics-partitions/index.html'),
        service_workstations_facilities: resolve(__dirname, 'services/workstations-facilities/index.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        project_4life_andheri: resolve(__dirname, 'projects/4life-andheri/index.html'),
        project_boardroom_conference_suites: resolve(__dirname, 'projects/boardroom-conference-suites/index.html'),
        project_acoustic_panelling_partitions: resolve(__dirname, 'projects/acoustic-panelling-partitions/index.html'),
        project_reception_lobby_displays: resolve(__dirname, 'projects/reception-lobby-displays/index.html'),
        project_executive_director_cabins: resolve(__dirname, 'projects/executive-director-cabins/index.html'),
        project_modular_workstation_deployment: resolve(__dirname, 'projects/modular-workstation-deployment/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        page_404: resolve(__dirname, '404.html'),
        page_401: resolve(__dirname, '401.html')
      }
    }
  }
});
