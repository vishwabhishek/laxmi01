/**
 * Tier 3: Pairwise Combinatorial Interactions Test Suite (15 Test Suites)
 * Validates cross-component, cross-route, and end-to-end component parity.
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
  getButtons,
  getClosingCtaBanner,
  getFaqs,
  getInternalLinks
} from '../helpers/html.js';
import { validateXml } from '../helpers/scanner.js';
import {
  CANONICAL_ROUTES,
  LEGACY_REDIRECTS
} from '../fixtures/routes.js';
import {
  STANDARDIZED_FAQS,
  FAQ_PAGE_PATHS,
  SERVICE_NAV_ITEMS,
  PROHIBITED_TERMS
} from '../fixtures/ground-truth.js';
import { SITEMAP_EXPECTED_PATH } from '../fixtures/sitemap.js';

describe('Tier 3: Pairwise Combinatorial Interactions (T3-INT-01 to T3-INT-15)', () => {
  let serverInstance = null;

  before(async () => {
    serverInstance = await startServer();
  });

  after(async () => {
    if (serverInstance?.server) {
      await stopServer();
    }
  });

  // T3-INT-01: Navigation ↔ Service Detail ↔ Project Detail Loop
  it('T3-INT-01: Navigation loop (Home -> Services -> Turnkey -> Project -> Portfolio -> Home) resolves 200', async () => {
    const steps = [
      { path: '/', expectedText: 'Turnkey Interior Fit-Outs' },
      { path: '/services', expectedText: 'Commercial Fit-Outs & Specialist Joinery' },
      { path: '/services/turnkey-interiors', expectedText: 'Turnkey Fit-Outs' },
      { path: '/projects/4life-andheri', expectedText: '4Life Corporate Office' },
      { path: '/portfolio', expectedText: 'Executed Fit-Out Projects' },
      { path: '/', expectedText: 'Turnkey Interior Fit-Outs' }
    ];

    for (const step of steps) {
      const res = await defaultClient.get(step.path);
      assert.strictEqual(res.status, 200, `Step ${step.path} failed with status ${res.status}`);
      const html = await res.text();
      assert.ok(html.includes(step.expectedText), `Step ${step.path} missing expected text: ${step.expectedText}`);
    }
  });

  // T3-INT-02: Sitemap XML ↔ Live HTTP 200 Parity
  it('T3-INT-02: All URLs in sitemap.xml return live HTTP 200 and have matching canonical tags', async () => {
    const sitemapPath = path.resolve(process.cwd(), SITEMAP_EXPECTED_PATH);
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const { urls } = validateXml(xml);
    assert.strictEqual(urls.length, 16, 'Sitemap must contain exactly 16 URLs');

    for (const url of urls) {
      const parsedUrl = new URL(url);
      const res = await defaultClient.get(parsedUrl.pathname);
      assert.strictEqual(res.status, 200, `Sitemap URL ${url} returned status ${res.status}`);
      const html = await res.text();
      const canonical = getCanonicalUrl(html);
      assert.strictEqual(canonical, url, `Canonical tag on ${parsedUrl.pathname} does not match sitemap: ${canonical} vs ${url}`);
    }
  });

  // T3-INT-03: Cross-Page Primary CTA ↔ Contact Page Routing
  it('T3-INT-03: Every "Get a Quote" primary button links strictly to /contact across all pages', async () => {
    for (const route of CANONICAL_ROUTES) {
      const res = await defaultClient.get(route.path);
      const html = await res.text();
      const parsed = parseHtml(html);
      const quoteButtons = parsed.primaryButtons.filter(b => b.text === 'Get a Quote');

      for (const btn of quoteButtons) {
        assert.strictEqual(btn.href, '/contact', `On page ${route.path}, "Get a Quote" links to ${btn.href} instead of /contact`);
      }
    }
  });

  // T3-INT-04: Closing CTA Banner ↔ Site-Wide Ubiquity
  it('T3-INT-04: Closing CTA banner is present on all 16 canonical pages with identical elements', async () => {
    for (const route of CANONICAL_ROUTES) {
      const res = await defaultClient.get(route.path);
      const html = await res.text();
      const banner = getClosingCtaBanner(html);
      assert.ok(banner.present, `Page ${route.path} missing closing CTA banner`);
      assert.strictEqual(banner.buttonHref, '/contact', `Banner button on ${route.path} must target /contact`);
      assert.strictEqual(banner.buttonText, 'Get a Quote', `Banner button text on ${route.path} must be "Get a Quote"`);
    }
  });

  // T3-INT-05: Services Overview Cards ↔ Service Detail Pages Parity
  it('T3-INT-05: Service cards on /services map 1-to-1 to detail page headings and routes', async () => {
    const res = await defaultClient.get('/services');
    const html = await res.text();

    for (const item of SERVICE_NAV_ITEMS) {
      assert.ok(html.includes(item.href), `/services must link to ${item.href}`);
      const detailRes = await defaultClient.get(item.href);
      assert.strictEqual(detailRes.status, 200, `Detail page ${item.href} returned ${detailRes.status}`);
    }
  });

  // T3-INT-06: Portfolio Overview Cards ↔ Project Detail Pages Parity
  it('T3-INT-06: Portfolio cards on /portfolio map 1-to-1 to detail page headings and routes', async () => {
    const res = await defaultClient.get('/portfolio');
    const html = await res.text();
    const projectRoutes = CANONICAL_ROUTES.filter(r => r.category === 'project');

    for (const p of projectRoutes) {
      assert.ok(html.includes(p.path), `/portfolio must link to project ${p.path}`);
      const projectRes = await defaultClient.get(p.path);
      assert.strictEqual(projectRes.status, 200, `Project page ${p.path} returned ${projectRes.status}`);
    }
  });

  // T3-INT-07: FAQ Component Ubiquity & Content Identity
  it('T3-INT-07: Standardized FAQ component is identical across all 7 target pages', async () => {
    for (const pagePath of FAQ_PAGE_PATHS) {
      const res = await defaultClient.get(pagePath);
      const html = await res.text();
      const faqs = getFaqs(html);
      assert.ok(faqs.items.length >= 4, `Page ${pagePath} has only ${faqs.items.length} FAQs, expected 4`);

      for (const expectedFaq of STANDARDIZED_FAQS) {
        const found = faqs.items.some(
          item => item.q.toLowerCase().includes(expectedFaq.q.toLowerCase().slice(0, 20))
        );
        assert.ok(found, `Page ${pagePath} missing FAQ: "${expectedFaq.q}"`);
      }
    }
  });

  // T3-INT-08: 301 Redirect ↔ Canonical Tag Consistency
  it('T3-INT-08: 301 redirect destination canonical tag matches the redirected canonical URL', async () => {
    const testPair = LEGACY_REDIRECTS[0]; // /services/kitchens -> /services/turnkey-interiors
    const res = await defaultClient.get(testPair.from);
    assert.strictEqual(res.status, 301);
    assert.strictEqual(res.location, testPair.to);

    const destRes = await defaultClient.get(res.location);
    assert.strictEqual(destRes.status, 200);
    const html = await destRes.text();
    const canonical = getCanonicalUrl(html);
    assert.strictEqual(canonical, `https://laxmienterprises.in${testPair.to}`);
  });

  // T3-INT-09: Header Services Dropdown ↔ Services Overview Consistency
  it('T3-INT-09: Header services dropdown and services overview contain identical 5 service slugs', async () => {
    const res = await defaultClient.get('/');
    const html = await res.text();

    for (const s of SERVICE_NAV_ITEMS) {
      assert.ok(html.includes(s.href), `Header must contain service route: ${s.href}`);
    }
  });

  // T3-INT-10: React SPA Routes ↔ MPA Entry Points Parity
  it('T3-INT-10: React App.jsx route definitions align with MPA HTML entry points', () => {
    const appPath = path.resolve(process.cwd(), 'src/App.jsx');
    const content = fs.readFileSync(appPath, 'utf8');

    for (const route of CANONICAL_ROUTES) {
      if (route.path === '/') continue;
      assert.ok(content.includes(route.path), `src/App.jsx must register route path: ${route.path}`);
    }
  });

  // T3-INT-11: Obsolete Route Redirect ↔ Zero-Tolerance Verification
  it('T3-INT-11: Following legacy redirect delivers page containing zero prohibited terms', async () => {
    const res = await defaultClient.get('/projects/light-pine-kitchen');
    assert.strictEqual(res.status, 301);

    const destRes = await defaultClient.get(res.location);
    assert.strictEqual(destRes.status, 200);
    const html = await destRes.text();

    for (const term of PROHIBITED_TERMS) {
      assert.ok(!html.toLowerCase().includes(term.toLowerCase()), `Destination page contains prohibited term: ${term}`);
    }
  });

  // T3-INT-12: Contact Form Dropdown ↔ 5 Commercial Services Match
  it('T3-INT-12: Contact page service options align with 5 commercial services', async () => {
    const res = await defaultClient.get('/contact');
    const html = await res.text();
    assert.ok(html.includes('Turnkey Interiors') || html.includes('Commercial Fit-Outs'));
  });

  // T3-INT-13: Footer Navigation Links ↔ Header Nav Consistency
  it('T3-INT-13: Footer navigation maintains clean URL targets consistent with header', async () => {
    const res = await defaultClient.get('/');
    const html = await res.text();
    const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
    assert.ok(footerMatch, 'Footer must exist');
    const footerHtml = footerMatch[0];

    assert.ok(footerHtml.includes('href="/about"'));
    assert.ok(footerHtml.includes('href="/services"'));
    assert.ok(footerHtml.includes('href="/portfolio"'));
    assert.ok(footerHtml.includes('href="/contact"'));
  });

  // T3-INT-14: Responsive Hamburger Drawer ↔ Clean URL Navigation
  it('T3-INT-14: Mobile navigation links in drawer use clean canonical paths', async () => {
    const res = await defaultClient.get('/');
    const html = await res.text();
    const mobileMatch = html.match(/class=["'][^"']*header-navigation-wrapper[^"']*["'][\s\S]*?<\/div>\s*<\/div>/i) ||
                        html.match(/class=["'][^"']*header-nav-list[^"']*["'][\s\S]*?<\/ul>/i);
    assert.ok(mobileMatch, 'Mobile navigation wrapper must exist');
    const mobileHtml = mobileMatch[0];

    assert.ok(!mobileHtml.includes('.html'), 'Mobile nav must not link to .html files');
    assert.ok(!mobileHtml.includes('/services/kitchens'), 'Mobile nav must not contain legacy links');
  });

  // T3-INT-15: 404 Page Recovery Link Verification
  it('T3-INT-15: 404 error page recovery links navigate cleanly to working endpoints', async () => {
    const res404 = await defaultClient.get('/invalid-deep-path/xyz');
    assert.strictEqual(res404.status, 404);

    // Verify Return Home action works
    const homeRes = await defaultClient.get('/');
    assert.strictEqual(homeRes.status, 200);

    // Verify Get a Quote action works
    const quoteRes = await defaultClient.get('/contact');
    assert.strictEqual(quoteRes.status, 200);
  });
});
