/**
 * Ephemeral Vite Preview Server Manager
 * Starts an in-process Vite preview server on port 0 with build preflight check.
 */

import { preview } from 'vite';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

let activeServer = null;
let activeBaseUrl = null;

export async function startServer(options = {}) {
  // If an in-process server is already active, return it directly
  if (activeServer && activeBaseUrl) {
    return {
      server: activeServer,
      port: activeServer.httpServer?.address()?.port,
      baseUrl: activeBaseUrl,
      close: stopServer
    };
  }

  // If an external base URL was provided via environment variable, reuse it
  if (process.env.E2E_BASE_URL) {
    activeBaseUrl = process.env.E2E_BASE_URL;
    const parsedUrl = new URL(activeBaseUrl);
    const parsedPort = Number(parsedUrl.port) || (activeBaseUrl.startsWith('https') ? 443 : 80);
    return {
      server: null,
      port: parsedPort,
      baseUrl: activeBaseUrl,
      close: async () => {}
    };
  }

  // Preflight check: ensure dist/ exists and contains index.html
  const distIndexPath = path.resolve(process.cwd(), 'dist', 'index.html');
  if (!fs.existsSync(distIndexPath) || options.forceBuild) {
    try {
      execSync('npm run build', { stdio: 'pipe', encoding: 'utf8' });
    } catch (err) {
      throw new Error(`Build preflight failed before starting server: ${err.message}\n${err.stderr}`);
    }
  }

  activeServer = await preview({
    preview: { port: 0 },
    logLevel: 'silent'
  });

  const port = activeServer.httpServer.address().port;
  activeBaseUrl = `http://localhost:${port}`;
  process.env.E2E_BASE_URL = activeBaseUrl;

  const cleanup = async () => {
    await stopServer();
  };

  process.once('SIGINT', cleanup);
  process.once('SIGTERM', cleanup);

  return {
    server: activeServer,
    port,
    baseUrl: activeBaseUrl,
    close: stopServer
  };
}

export async function stopServer() {
  if (activeServer) {
    try {
      await activeServer.close();
    } catch {
      // Ignore errors on close
    }
    activeServer = null;
    activeBaseUrl = null;
    delete process.env.E2E_BASE_URL;
  }
}

export function getServerUrl() {
  return activeBaseUrl || process.env.E2E_BASE_URL || null;
}
