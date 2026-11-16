/**
 * Native Fetch HTTP Client Wrapper for E2E Tests
 * Supports redirect: 'manual' to assert status codes (200, 301, 404) and Location headers.
 */

import { getServerUrl } from './server.js';

export function createClient(customBaseUrl) {
  function getBaseUrl() {
    const url = customBaseUrl || getServerUrl() || process.env.E2E_BASE_URL;
    if (!url) {
      throw new Error('E2E Base URL is not set. Ensure server is started before making requests.');
    }
    return url;
  }

  function resolveUrl(pathOrUrl) {
    if (typeof pathOrUrl !== 'string') {
      throw new TypeError(`Expected string path or URL, got ${typeof pathOrUrl}`);
    }
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
      return pathOrUrl;
    }
    const base = getBaseUrl().replace(/\/+$/, '');
    const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${base}${cleanPath}`;
  }

  async function request(pathOrUrl, options = {}) {
    const fullUrl = resolveUrl(pathOrUrl);
    const { timeout = 5000, signal, ...restOptions } = options;
    const fetchOptions = {
      redirect: 'manual',
      signal: signal || AbortSignal.timeout(timeout),
      ...restOptions
    };

    const startTime = performance.now();
    let res;
    try {
      res = await fetch(fullUrl, fetchOptions);
    } catch (err) {
      throw new Error(`Request failed to ${fullUrl}: ${err.message}`);
    }
    const durationMs = performance.now() - startTime;

    const locationHeader = res.headers.get('location');

    return {
      raw: res,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      location: locationHeader,
      durationMs,
      url: fullUrl,
      ok: res.ok,
      text: () => res.text(),
      json: () => res.json()
    };
  }

  async function get(pathOrUrl, options = {}) {
    return request(pathOrUrl, { method: 'GET', ...options });
  }

  async function head(pathOrUrl, options = {}) {
    return request(pathOrUrl, { method: 'HEAD', ...options });
  }

  async function followRedirects(initialPath, maxHops = 5) {
    let currentPath = initialPath;
    const hops = [];

    for (let i = 0; i < maxHops; i++) {
      const res = await get(currentPath, { redirect: 'manual' });
      hops.push({
        url: currentPath,
        status: res.status,
        location: res.location
      });

      if ([301, 302, 307, 308].includes(res.status) && res.location) {
        currentPath = res.location;
      } else {
        return {
          finalResponse: res,
          hops,
          hopCount: hops.length - 1
        };
      }
    }

    throw new Error(`Exceeded maximum redirect hops (${maxHops}) starting from ${initialPath}`);
  }

  return {
    getBaseUrl,
    resolveUrl,
    request,
    get,
    head,
    followRedirects
  };
}

export const defaultClient = createClient();
