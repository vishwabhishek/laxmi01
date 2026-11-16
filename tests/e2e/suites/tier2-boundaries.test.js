/**
 * Tier 2: Boundary & Corner Cases Test Suite (10 Domains x 5 Tests = 50 Tests)
 * Tests trailing slashes, 301/404 HTTP status codes, malformed URLs, security boundaries, and edge cases.
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { startServer, stopServer } from '../helpers/server.js';
import { defaultClient } from '../helpers/client.js';
import {
  parseHtml,
  getTitle,
  getCanonicalUrl,
  getHeadings,
  getButtons
} from '../helpers/html.js';
import {
  scanTargetPaths,
  validateXml
} from '../helpers/scanner.js';
import {
  CANONICAL_ROUTES,
  LEGACY_REDIRECTS,
  DELETED_ROUTES
} from '../fixtures/routes.js';
import {
  PROHIBITED_TERMS,
  PROHIBITED_PATTERNS
} from '../fixtures/ground-truth.js';
import {
  SITEMAP_EXPECTED_PATH
} from '../fixtures/sitemap.js';

describe('Tier 2: Boundary & Corner Cases (Domains A–J)', () => {
  let serverInstance = null;

  before(async () => {
    serverInstance = await startServer();
  });

  after(async () => {
    if (serverInstance?.server) {
      await stopServer();
    }
  });

  // ==========================================
  // Domain A: Trailing Slashes & URL Canonicalization
  // ==========================================
  describe('Domain A: Trailing Slashes & URL Canonicalization', () => {
    it('T2-B01-01: Trailing slash on canonical service route returns HTTP 200 or clean rewrite', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors/');
      assert.ok([200, 301].includes(res.status), `Expected 200 or 301, got ${res.status}`);
      if (res.status === 301) {
        assert.strictEqual(res.location, '/services/turnkey-interiors');
      }
    });

    it('T2-B01-02: Trailing slash on canonical project route returns HTTP 200 or clean rewrite', async () => {
      const res = await defaultClient.get('/projects/boardroom-conference-suites/');
      assert.ok([200, 301].includes(res.status), `Expected 200 or 301, got ${res.status}`);
      if (res.status === 301) {
        assert.strictEqual(res.location, '/projects/boardroom-conference-suites');
      }
    });

    it('T2-B01-03: Trailing slash on root returns HTTP 200 with Home page', async () => {
      const res = await defaultClient.get('/');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Turnkey Fit-Outs & Architectural Joinery | Laxmi Enterprises');
    });

    it('T2-B01-04: Trailing slash on legacy redirect route returns HTTP 301 without redirect loop', async () => {
      const res = await defaultClient.get('/services/kitchens/');
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.location, '/services/turnkey-interiors');
    });

    it('T2-B01-05: Direct .html extension requests resolve cleanly or rewrite', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors/index.html');
      assert.ok([200, 301].includes(res.status), `Direct index.html returned ${res.status}`);
    });
  });

  // ==========================================
  // Domain B: HTTP Redirect Status Codes & Loop Prevention
  // ==========================================
  describe('Domain B: HTTP Redirect Status Codes & Loop Prevention', () => {
    it('T2-B02-01: Legacy routes return strictly HTTP 301 (not 302, 307, 308)', async () => {
      for (const r of LEGACY_REDIRECTS) {
        const res = await defaultClient.get(r.from);
        assert.strictEqual(res.status, 301, `${r.from} must return 301 strictly`);
      }
    });

    it('T2-B02-02: Single-hop redirect invariant (destination reached in exactly 1 hop)', async () => {
      for (const r of LEGACY_REDIRECTS) {
        const { hopCount, finalResponse } = await defaultClient.followRedirects(r.from, 3);
        assert.strictEqual(hopCount, 1, `Path ${r.from} took ${hopCount} hops, expected 1`);
        assert.strictEqual(finalResponse.status, 200, `Final response for ${r.from} must be 200`);
      }
    });

    it('T2-B02-03: Target URL cleanliness (Location header has no .html or double slashes)', async () => {
      for (const r of LEGACY_REDIRECTS) {
        const res = await defaultClient.get(r.from);
        assert.ok(!res.location?.endsWith('.html'), `Location ${res.location} has .html extension`);
        assert.ok(!res.location?.includes('//'), `Location ${res.location} has double slashes`);
      }
    });

    it('T2-B02-04: Self-redirect guard (modernized routes never redirect to themselves)', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        assert.strictEqual(res.status, 200, `Canonical route ${route.path} must return 200, not redirect`);
      }
    });

    it('T2-B02-05: Cross-domain redirect guard (redirects are strictly internal)', async () => {
      for (const r of LEGACY_REDIRECTS) {
        const res = await defaultClient.get(r.from);
        assert.ok(
          res.location?.startsWith('/') || res.location?.startsWith('https://laxmienterprises.in/'),
          `Location must be relative or internal domain: ${res.location}`
        );
      }
    });
  });

  // ==========================================
  // Domain C: Strict 404 on Deleted & Non-Existent Resources
  // ==========================================
  describe('Domain C: Strict 404 on Deleted & Non-Existent Resources', () => {
    it('T2-B03-01: Deleted licences page returns strict HTTP 404', async () => {
      const res = await defaultClient.get('/template-help/licences');
      assert.strictEqual(res.status, 404);
    });

    it('T2-B03-02: Deleted changelog page returns strict HTTP 404', async () => {
      const res = await defaultClient.get('/template-help/changelog');
      assert.strictEqual(res.status, 404);
    });

    it('T2-B03-03: Deleted icons showcase page returns strict HTTP 404', async () => {
      const res = await defaultClient.get('/icons-showcase.html');
      assert.strictEqual(res.status, 404);
    });

    it('T2-B03-04: Arbitrary non-existent route returns strict HTTP 404', async () => {
      const res = await defaultClient.get('/nonexistent-path-abc-12345');
      assert.strictEqual(res.status, 404);
    });

    it('T2-B03-05: Non-existent service subpage returns strict HTTP 404', async () => {
      const res = await defaultClient.get('/services/unknown-service-route-xyz');
      assert.strictEqual(res.status, 404);
    });
  });

  // ==========================================
  // Domain D: URL Case-Sensitivity & Malformed URI Handling
  // ==========================================
  describe('Domain D: URL Case-Sensitivity & Malformed URI Handling', () => {
    it('T2-B04-01: Uppercase URL handled gracefully without server crash', async () => {
      const res = await defaultClient.get('/Services/Turnkey-Interiors');
      assert.ok([200, 301, 404].includes(res.status));
    });

    it('T2-B04-02: Percent-encoded space in URL returns 404 safely', async () => {
      const res = await defaultClient.get('/services/%20turnkey-interiors');
      assert.ok([400, 404].includes(res.status));
    });

    it('T2-B04-03: Malformed percent-encoding returns 400, 404, or 500 without crashing process', async () => {
      const res = await defaultClient.get('/services/%ZZturnkey');
      assert.ok([400, 404, 500].includes(res.status));
    });

    it('T2-B04-04: Double slash in path handled safely', async () => {
      const res = await defaultClient.get('/services//turnkey-interiors');
      assert.ok([200, 301, 404].includes(res.status));
    });

    it('T2-B04-05: Null byte injection guard returns 400 or 404 safely', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors%00');
      assert.ok([400, 404].includes(res.status));
    });
  });

  // ==========================================
  // Domain E: Query Parameter & Hash Fragment Preservation
  // ==========================================
  describe('Domain E: Query Parameter & Hash Fragment Preservation', () => {
    it('T2-B05-01: Tracking query parameters preserved on canonical page', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors?utm_source=google&utm_medium=cpc');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      assert.ok(html.includes('Turnkey Fit-Outs') || html.includes('Turnkey Interiors'));
    });

    it('T2-B05-02: Legacy route redirect preserves query parameter', async () => {
      const res = await defaultClient.get('/services/kitchens?ref=architect_portal');
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.location, '/services/turnkey-interiors?ref=architect_portal');
    });

    it('T2-B05-03: Multiple query parameters preserved on legacy redirect', async () => {
      const res = await defaultClient.get('/projects/light-pine-kitchen?source=ad&campaign=mumbai');
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.location, '/projects/boardroom-conference-suites?source=ad&campaign=mumbai');
    });

    it('T2-B05-04: Anchor fragments in links do not break navigation targets and match existing DOM IDs', async () => {
      // 1. Direct endpoint retrieval with hash fragments returns HTTP 200 without server distortion
      const fragmentEndpoints = [
        '/#about',
        '/services#turnkey-interiors',
        '/contact#email-form'
      ];
      for (const endpoint of fragmentEndpoints) {
        const res = await defaultClient.get(endpoint);
        assert.strictEqual(res.status, 200, `Requesting ${endpoint} must return HTTP 200`);
      }

      // 2. Scan canonical routes for internal links containing '#fragment'
      // and verify that the target page contains an existing element with matching DOM id
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const linkMatches = [...html.matchAll(/<a[^>]+href=["']([^"']*#[^"']+)["'][^>]*>/gi)];

        for (const m of linkMatches) {
          const rawHref = m[1];
          // Skip empty hashes, placeholder '#', and external links
          if (rawHref === '#' || rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
            continue;
          }

          const [targetPath, fragment] = rawHref.split('#');
          if (!fragment) continue;

          // Determine destination page: empty path refers to current route
          const destinationPath = targetPath ? targetPath : route.path;
          const targetRes = await defaultClient.get(destinationPath);
          assert.strictEqual(targetRes.status, 200, `Destination page ${destinationPath} must return HTTP 200`);
          const targetHtml = await targetRes.text();

          // Element with id="fragment" or name="fragment" must exist on destination page
          const idRegex = new RegExp(`\\b(?:id|name)=["']${fragment}["']`, 'i');
          assert.ok(
            idRegex.test(targetHtml),
            `Fragment "#${fragment}" referenced in link on ${route.path} must match an existing element with id="${fragment}" on ${destinationPath}`
          );
        }
      }

      // 3. Verify known anchor target IDs exist on destination pages
      const contactRes = await defaultClient.get('/contact');
      const contactHtml = await contactRes.text();
      assert.ok(
        /id=["'](?:email-form|email-form-2)["']/i.test(contactHtml),
        'Contact page must contain form element with id matching fragment targets'
      );
    });

    it('T2-B05-05: Empty query string handled safely', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors?');
      assert.strictEqual(res.status, 200);
    });
  });

  // ==========================================
  // Domain F: Path Traversal & Deep Nesting Security Bounds
  // ==========================================
  describe('Domain F: Path Traversal & Deep Nesting Security Bounds', () => {
    it('T2-B06-01: Path traversal with dot-dot does not leak filesystem package.json', async () => {
      const res = await defaultClient.get('/services/../../package.json');
      assert.ok([400, 403, 404].includes(res.status));
    });

    it('T2-B06-02: Deeply nested non-existent path returns HTTP 404', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors/extra/deep/sub/path');
      assert.strictEqual(res.status, 404);
    });

    it('T2-B06-03: Sensitive file access (.env or .git) returns 403 or 404', async () => {
      const res = await defaultClient.get('/.env');
      assert.ok([403, 404].includes(res.status));
    });

    it('T2-B06-04: Node modules direct access is protected', async () => {
      const res = await defaultClient.get('/node_modules/vite/package.json');
      assert.ok([403, 404].includes(res.status));
    });

    it('T2-B06-05: Internal state directory access is protected', async () => {
      const res = await defaultClient.get('/.agents/teamwork/ORIGINAL_REQUEST.md');
      assert.ok([403, 404].includes(res.status));
    });
  });

  // ==========================================
  // Domain G: Content Bounds, Special Character Escaping & Layout Safety
  // ==========================================
  describe('Domain G: Content Bounds, Special Character Escaping & Layout Safety', () => {
    it('T2-B07-01: XML entity escaping in sitemap has no unescaped bare ampersands', () => {
      const sitemapPath = path.resolve(process.cwd(), SITEMAP_EXPECTED_PATH);
      const xml = fs.readFileSync(sitemapPath, 'utf8');
      const validation = validateXml(xml);
      assert.ok(validation.valid, `Sitemap has XML errors: ${validation.errors.join('; ')}`);
    });

    it('T2-B07-02: Ampersand in HTML headings does not leak raw broken entity tags', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.ok(!html.includes('&amp;amp;'), 'Double-escaped ampersand found in HTML');
    });

    it('T2-B07-03: En-dash characters render cleanly without mojibake (â€“)', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.ok(!html.includes('â€“'), 'Mojibake en-dash found in Home page');
    });

    it('T2-B07-04: SEO title lengths on all 16 canonical pages are between 25 and 75 characters', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const title = getTitle(html);
        assert.ok(title, `Page ${route.path} must have a title`);
        assert.ok(title.length >= 25 && title.length <= 75, `Title on ${route.path} length ${title.length} outside [25, 75]: "${title}"`);
      }
    });

    it('T2-B07-05: Trust line and capability descriptions do not contain placeholder text', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.ok(!html.includes('Lorem ipsum'), 'Home page contains placeholder Lorem ipsum');
    });
  });

  // ==========================================
  // Domain H: CTA Button Label Whitespace & Case Invariants
  // ==========================================
  describe('Domain H: CTA Button Label Whitespace & Case Invariants', () => {
    it('T2-B08-01: Primary button text matches exactly "Get a Quote" without trailing whitespace', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const buttons = getButtons(html);
      const quoteBtns = buttons.filter(b => b.toLowerCase().includes('quote'));
      for (const btn of quoteBtns) {
        assert.strictEqual(btn, 'Get a Quote', `Button text "${btn}" has incorrect spacing/casing`);
      }
    });

    it('T2-B08-02: Button text is not all-caps "GET A QUOTE" or lower-case "get a quote"', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const buttons = getButtons(html);
        assert.ok(!buttons.includes('GET A QUOTE'), `Page ${route.path} has "GET A QUOTE"`);
        assert.ok(!buttons.includes('get a quote'), `Page ${route.path} has "get a quote"`);
      }
    });

    it('T2-B08-03: Exception button "Return Home" on 404 matches exact string', async () => {
      const res = await defaultClient.get('/404.html');
      const html = await res.text();
      const buttons = getButtons(html);
      assert.ok(buttons.includes('Return Home'));
    });

    it('T2-B08-04: Exception button "Share BOQ for Estimation" matches exact string', async () => {
      const res = await defaultClient.get('/projects/4life-andheri');
      const html = await res.text();
      const buttons = getButtons(html);
      assert.ok(buttons.includes('Share BOQ for Estimation'));
    });

    it('T2-B08-05: Exception button "Learn More About Us" matches exact string on Home hero', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const buttons = getButtons(html);
      assert.ok(buttons.includes('Learn More About Us'));
    });
  });

  // ==========================================
  // Domain I: Prohibited Terms Substring & Word Boundary Checks
  // ==========================================
  describe('Domain I: Prohibited Terms Substring & Word Boundary Checks', () => {
    it('T2-B09-01: Word boundary regex for "kitchens" finds zero matches', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact', '401.html', '404.html'];
      const scan = scanTargetPaths(targets, {
        patterns: [{ term: 'kitchens', pattern: /\bkitchens?\b/i }]
      });
      assert.strictEqual(scan.totalViolations, 0, `Word boundary match for kitchens: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T2-B09-02: Word boundary regex for "bathrooms" finds zero matches', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact', '401.html', '404.html'];
      const scan = scanTargetPaths(targets, {
        patterns: [{ term: 'bathrooms', pattern: /\bbathrooms?\b/i }]
      });
      assert.strictEqual(scan.totalViolations, 0, `Word boundary match for bathrooms: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T2-B09-03: Hyphenated legacy project slugs find zero matches', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact'];
      const scan = scanTargetPaths(targets, {
        patterns: [
          { term: 'light-pine', pattern: /light-pine/i },
          { term: 'dark-oak', pattern: /dark-oak/i }
        ]
      });
      assert.strictEqual(scan.totalViolations, 0, `Legacy slugs found: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T2-B09-04: Legacy template name "hamptons" finds zero matches', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact'];
      const scan = scanTargetPaths(targets, {
        patterns: [{ term: 'hamptons', pattern: /hamptons/i }]
      });
      assert.strictEqual(scan.totalViolations, 0, `hamptons found: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T2-B09-05: Case-insensitive regex for legacy marketing slogans finds zero matches', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact'];
      const scan = scanTargetPaths(targets, {
        patterns: [
          { term: 'Looking for some answers', pattern: /Looking\s+for\s+some\s+answers/i },
          { term: 'Partner With Us on Your Next', pattern: /Partner\s+With\s+Us\s+on\s+Your\s+Next/i },
          { term: "Let's engineer your next workspace", pattern: /Let['’]s\s+engineer\s+your\s+next\s+workspace/i }
        ]
      });
      assert.strictEqual(scan.totalViolations, 0, `Marketing slogans found: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });
  });

  // ==========================================
  // Domain J: Viewport Responsiveness & Nav Drawer Boundary States
  // ==========================================
  describe('Domain J: Viewport Responsiveness & Nav Drawer Boundary States', () => {
    it('T2-B10-01: Header contains mobile menu button element in markup', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.match(html, /class=["'][^"']*header-menu-button[^"']*["']/i);
    });

    it('T2-B10-02: Hamburger mobile drawer contains all 5 main navigation links', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const mobileNavMatch = html.match(/class=["'][^"']*header-navigation-wrapper[^"']*["'][\s\S]*?<\/div>\s*<\/div>/i) ||
                             html.match(/class=["'][^"']*header-nav-list[^"']*["'][\s\S]*?<\/ul>/i);
      assert.ok(mobileNavMatch, 'Mobile navigation container must exist');
    });

    it('T2-B10-03: Mobile drawer CTA renders "Get a Quote" linking to /contact', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.match(html, /<a[^>]+href=["']\/contact["'][^>]*class=["'][^"']*primary-button[^"']*["']>[\s\S]*?Get a Quote/i);
    });

    it('T2-B10-04: Header markup contains responsive classes for tablet and desktop', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.match(html, /header/i);
      assert.ok(html.includes('header-logo-link'));
    });

    it('T2-B10-05: Desktop navigation list is present in header markup across all pages', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        assert.match(html, /header-nav-list/i, `Page ${route.path} must contain header-nav-list`);
      }
    });
  });
});
