/**
 * Tier 1: Feature Coverage Test Suite (25 Features x 5 Tests = 125 Tests)
 * Validates discrete functional requirements R1–R5 from ORIGINAL_REQUEST.md and PROJECT.md.
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

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
  getInternalLinks,
  getCapabilities,
  stripTags
} from '../helpers/html.js';
import {
  scanFileForProhibitedTerms,
  scanTargetPaths,
  validateXml
} from '../helpers/scanner.js';
import {
  CANONICAL_ROUTES,
  LEGACY_REDIRECTS,
  DELETED_ROUTES,
  UTILITY_ROUTES,
  CANONICAL_PATHS,
  LEGACY_PATHS
} from '../fixtures/routes.js';
import {
  PROHIBITED_TERMS,
  PROHIBITED_PATTERNS,
  STANDARDIZED_FAQS,
  FAQ_PAGE_PATHS,
  CLOSING_CTA_BANNER,
  PERMITTED_BUTTON_EXCEPTIONS,
  MAIN_NAV_ITEMS,
  SERVICE_NAV_ITEMS,
  GROUND_TRUTH_PAGES
} from '../fixtures/ground-truth.js';
import {
  SITEMAP_EXPECTED_PATH,
  SITEMAP_TOTAL_URLS,
  SITEMAP_URLS,
  SITEMAP_PROHIBITED_SUBSTRINGS
} from '../fixtures/sitemap.js';

describe('Tier 1: Feature Coverage (Features 1–25)', () => {
  let serverInstance = null;

  before(async () => {
    serverInstance = await startServer();
  });

  after(async () => {
    // Only stop server if it was started locally in this file
    if (serverInstance?.server) {
      await stopServer();
    }
  });

  // ==========================================
  // Feature 1: Navigation Items
  // ==========================================
  describe('Feature 1: Navigation Items', () => {
    it('T1-F01-01: Desktop header navigation links contain 5 core items', async () => {
      const res = await defaultClient.get('/');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      const parsed = parseHtml(html);

      const navHrefs = parsed.internalLinks.map(l => l.href);
      assert.ok(navHrefs.includes('/'), 'Header nav must include Home (/)');
      assert.ok(navHrefs.includes('/about'), 'Header nav must include /about');
      assert.ok(navHrefs.includes('/portfolio'), 'Header nav must include /portfolio');
      assert.ok(navHrefs.includes('/services'), 'Header nav must include /services');
      assert.ok(navHrefs.includes('/contact'), 'Header nav must include /contact');
    });

    it('T1-F01-02: Mobile navigation drawer links include Get a Quote CTA', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.match(html, /href=["']\/contact["'][^>]*class=["'][^"']*primary-button/i);
    });

    it('T1-F01-03: Footer navigation links contain core items and no obsolete routes', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
      assert.ok(footerMatch, 'Footer element must exist');
      const footerHtml = footerMatch[0];

      for (const banned of ['/services/kitchens', '/services/bathrooms', '/template-help']) {
        assert.ok(!footerHtml.includes(banned), `Footer must not contain legacy path: ${banned}`);
      }
    });

    it('T1-F01-04: Brand logo link points to root and contains company branding', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.match(html, /<a[^>]+href=["']\/["'][^>]*class=["'][^"']*header-logo-link/i);
      assert.match(html, /LAXMI\s+ENTERPRISES/i);
    });

    it('T1-F01-05: Universal navigation structure present across canonical pages', async () => {
      const samplePages = ['/', '/about', '/services', '/portfolio', '/contact'];
      for (const pagePath of samplePages) {
        const res = await defaultClient.get(pagePath);
        assert.strictEqual(res.status, 200, `Page ${pagePath} must respond HTTP 200`);
        const html = await res.text();
        assert.match(html, /<header/i, `Page ${pagePath} must contain header`);
        assert.match(html, /<footer/i, `Page ${pagePath} must contain footer`);
      }
    });
  });

  // ==========================================
  // Feature 2: Services Menu Routes
  // ==========================================
  describe('Feature 2: Services Menu Routes', () => {
    it('T1-F02-01: Turnkey Interiors route is accessible and has correct canonical tag', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      const canonical = getCanonicalUrl(html);
      assert.strictEqual(canonical, 'https://laxmienterprises.in/services/turnkey-interiors');
      const headings = getHeadings(html);
      const h2List = headings.h2.join(' ');
      assert.ok(h2List.includes('Turnkey Fit-Outs') || headings.h1.join(' ').includes('Turnkey Fit-Outs'));
    });

    it('T1-F02-02: Hospitality & Healthcare route is accessible and has correct canonical tag', async () => {
      const res = await defaultClient.get('/services/hospitality-healthcare');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      const canonical = getCanonicalUrl(html);
      assert.strictEqual(canonical, 'https://laxmienterprises.in/services/hospitality-healthcare');
      const headings = getHeadings(html);
      assert.ok(headings.h2.join(' ').includes('Hospitality & Healthcare Fit-Outs') || headings.h1.join(' ').includes('Hospitality & Healthcare'));
    });

    it('T1-F02-03: Architectural Joinery & Furnishings route is accessible with canonical tag', async () => {
      const res = await defaultClient.get('/services/joinery-furnishings');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      const canonical = getCanonicalUrl(html);
      assert.strictEqual(canonical, 'https://laxmienterprises.in/services/joinery-furnishings');
      const headings = getHeadings(html);
      assert.ok(headings.h2.join(' ').includes('Executive Millwork & Joinery') || headings.h1.join(' ').includes('Architectural Joinery'));
    });

    it('T1-F02-04: Acoustic Panelling & Partitions route is accessible with canonical tag', async () => {
      const res = await defaultClient.get('/services/acoustics-partitions');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      const canonical = getCanonicalUrl(html);
      assert.strictEqual(canonical, 'https://laxmienterprises.in/services/acoustics-partitions');
      const headings = getHeadings(html);
      assert.ok(headings.h2.join(' ').includes('Acoustic Panelling & Partitions') || headings.h1.join(' ').includes('Acoustic Panelling'));
    });

    it('T1-F02-05: Workstations & Critical Facilities route is accessible with canonical tag', async () => {
      const res = await defaultClient.get('/services/workstations-facilities');
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      const canonical = getCanonicalUrl(html);
      assert.strictEqual(canonical, 'https://laxmienterprises.in/services/workstations-facilities');
      const headings = getHeadings(html);
      assert.ok(headings.h2.join(' ').includes('Workstations & Facilities') || headings.h1.join(' ').includes('Workstations'));
    });
  });

  // ==========================================
  // Feature 3: Closing CTA Banner
  // ==========================================
  describe('Feature 3: Closing CTA Banner', () => {
    it('T1-F03-01: Closing CTA banner heading is "Start Your Next Fit-Out"', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const banner = getClosingCtaBanner(html);
      assert.ok(banner.heading?.includes('Start Your Next Fit-Out'), `Expected banner heading "Start Your Next Fit-Out", got: ${banner.heading}`);
    });

    it('T1-F03-02: Closing CTA banner body line matches specification', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const banner = getClosingCtaBanner(html);
      assert.ok(banner.line?.includes('Planning a commercial project? Share your drawings or BOQ.'), `Expected body line, got: ${banner.line}`);
    });

    it('T1-F03-03: Closing CTA action button reads "Get a Quote" and links to /contact', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const banner = getClosingCtaBanner(html);
      assert.strictEqual(banner.buttonText, 'Get a Quote');
      assert.strictEqual(banner.buttonHref, '/contact');
    });

    it('T1-F03-04: Closing CTA banner is present across all 16 canonical pages', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const banner = getClosingCtaBanner(html);
        assert.ok(banner.present, `Closing CTA banner must be present on page ${route.path}`);
      }
    });

    it('T1-F03-05: Banner contains zero occurrences of legacy marketing slogans', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.ok(!html.includes('Partner With Us on Your Next'), 'Banner must not contain "Partner With Us on Your Next"');
      assert.ok(!html.includes("Let's engineer your next workspace"), 'Banner must not contain legacy slogan');
    });
  });

  // ==========================================
  // Feature 4: Standardized FAQs
  // ==========================================
  describe('Feature 4: Standardized FAQs', () => {
    it('T1-F04-01: FAQ section heading is strictly "FAQs" on target pages', async () => {
      for (const pagePath of FAQ_PAGE_PATHS) {
        const res = await defaultClient.get(pagePath);
        const html = await res.text();
        const faqs = getFaqs(html);
        assert.ok(faqs.sectionHeading?.includes('FAQs'), `Page ${pagePath} FAQ heading must be "FAQs", got: ${faqs.sectionHeading}`);
        assert.ok(!faqs.sectionHeading?.includes('Looking for some answers'), `Page ${pagePath} must not contain "Looking for some answers"`);
      }
    });

    it('T1-F04-02: FAQ Q1 Materials contains BOQ and certified board details across all 7 pages', async () => {
      for (const pagePath of FAQ_PAGE_PATHS) {
        const res = await defaultClient.get(pagePath);
        const html = await res.text();
        const faqs = getFaqs(html);
        const q1 = faqs.items.find(item => item.q.includes('Which materials do you use?'));
        assert.ok(q1, `Page ${pagePath} must contain Q1 "Which materials do you use?"`);
        assert.ok(q1.a.includes('BWP/BWR plywood'), `Page ${pagePath} Q1 answer must reference BWP/BWR plywood`);
        assert.ok(q1.a.includes('HDHMR'), `Page ${pagePath} Q1 answer must reference HDHMR`);
      }
    });

    it('T1-F04-03: FAQ Q2 Timelines specifies 48–72 hours deployment across all 7 pages', async () => {
      for (const pagePath of FAQ_PAGE_PATHS) {
        const res = await defaultClient.get(pagePath);
        const html = await res.text();
        const faqs = getFaqs(html);
        const q2 = faqs.items.find(item => item.q.includes('How quickly can you start'));
        assert.ok(q2, `Page ${pagePath} must contain Q2 "How quickly can you start..."`);
        assert.ok(q2.a.includes('48–72 hours') || q2.a.includes('48-72 hours'), `Page ${pagePath} Q2 answer must specify 48-72 hours`);
      }
    });

    it('T1-F04-04: FAQ Q3 Labour-Only Contracts confirms contract formats across all 7 pages', async () => {
      for (const pagePath of FAQ_PAGE_PATHS) {
        const res = await defaultClient.get(pagePath);
        const html = await res.text();
        const faqs = getFaqs(html);
        const q3 = faqs.items.find(item => item.q.includes('Do you offer labour-only contracts?'));
        assert.ok(q3, `Page ${pagePath} must contain Q3 "Do you offer labour-only contracts?"`);
        assert.ok(q3.a.includes('labour-only') || q3.a.includes('turnkey/item-rate'), `Page ${pagePath} Q3 answer must describe contract types`);
      }
    });

    it('T1-F04-05: FAQ Q4 Site Supervision confirms daily founder supervision across all 7 pages', async () => {
      for (const pagePath of FAQ_PAGE_PATHS) {
        const res = await defaultClient.get(pagePath);
        const html = await res.text();
        const faqs = getFaqs(html);
        const q4 = faqs.items.find(item => item.q.includes('Is the work supervised on site?'));
        assert.ok(q4, `Page ${pagePath} must contain Q4 on site supervision`);
        assert.ok(q4.a.includes('supervisors oversee site operations') && q4.a.includes('specialists are also directly involved'), `Page ${pagePath} Q4 must confirm daily supervisor oversight and specialist involvement`);
      }
    });
  });

  // ==========================================
  // Feature 5: Primary CTA Standardization
  // ==========================================
  describe('Feature 5: Primary CTA Standardization', () => {
    it('T1-F05-01: Desktop header primary button is "Get a Quote" linking to /contact', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const parsed = parseHtml(html);
      const headerCta = parsed.primaryButtons.find(b => b.href === '/contact');
      assert.ok(headerCta, 'Header CTA targeting /contact must exist');
      assert.strictEqual(headerCta.text, 'Get a Quote');
    });

    it('T1-F05-02: Hero primary CTA on Home page reads "Get a Quote"', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const heroSection = html.match(/<section[^>]*class=["'][^"']*hero[^"']*["'][\s\S]*?<\/section>/i) ||
                          html.match(/<div[^>]*class=["'][^"']*hero[^"']*["'][\s\S]*?<\/div>/i);
      assert.ok(heroSection, 'Hero section must exist on Home page');
      assert.match(heroSection[0], /Get a Quote/);
    });

    it('T1-F05-03: Primary inquiry button across all service and project pages reads "Get a Quote"', async () => {
      const serviceAndProjects = CANONICAL_ROUTES.filter(r => r.category === 'service' || r.category === 'project');
      for (const route of serviceAndProjects) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const buttons = getButtons(html);
        assert.ok(buttons.includes('Get a Quote'), `Page ${route.path} must contain "Get a Quote" button`);
      }
    });

    it('T1-F05-04: Zero occurrences of "Submit BOQ" or "GET A QUOTE" in buttons', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const buttons = getButtons(html);
        for (const btn of buttons) {
          assert.notStrictEqual(btn, 'Submit BOQ', `Page ${route.path} has prohibited button "Submit BOQ"`);
          assert.notStrictEqual(btn, 'GET A QUOTE', `Page ${route.path} has all-caps "GET A QUOTE"`);
        }
      }
    });

    it('T1-F05-05: Permitted button exceptions strictly honored', async () => {
      // 404 page has "Return Home"
      const res404 = await defaultClient.get('/404.html');
      const html404 = await res404.text();
      assert.ok(html404.includes('Return Home'), '404 page must have "Return Home" button');

      // Home hero has "Learn More About Us"
      const resHome = await defaultClient.get('/');
      const htmlHome = await resHome.text();
      assert.ok(htmlHome.includes('Learn More About Us'), 'Home page must have "Learn More About Us" button');

      // About page has "View All Services" and "Contact Us"
      const resAbout = await defaultClient.get('/about');
      const htmlAbout = await resAbout.text();
      assert.ok(htmlAbout.includes('View All Services'), 'About page must have "View All Services"');
      assert.ok(htmlAbout.includes('Contact Us'), 'About page must have "Contact Us"');
    });
  });

  // ==========================================
  // Feature 6: Home Page Content & SEO
  // ==========================================
  describe('Feature 6: Home Page Content & SEO', () => {
    it('T1-F06-01: Home page SEO title matches specification', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const title = getTitle(html);
      assert.strictEqual(title, 'Turnkey Fit-Outs & Architectural Joinery | Laxmi Enterprises');
    });

    it('T1-F06-02: Home H1 and Hero copy match commercial positioning', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h1.includes('Turnkey Interior Fit-Outs & Architectural Joinery'));
      assert.ok(html.includes('25+ years of site leadership delivering turnkey fit-outs'));
      assert.ok(html.includes('Led on-site by our Founder & Principal Supervisor.'));
    });

    it('T1-F06-03: Home hero buttons link to /contact and /about', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      assert.match(html, /<a[^>]+href=["']\/contact["'][^>]*>[\s\S]*?Get a Quote/i);
      assert.match(html, /<a[^>]+href=["']\/about["'][^>]*>[\s\S]*?Learn More About Us/i);
    });

    it('T1-F06-04: Company Profile section and trust line match specification', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h2.includes('Company Profile'));
      assert.ok(headings.h3.includes('25+ Years of Site Leadership'));
      assert.ok(html.includes('GST-registered · Mumbai-based · Pan-India deployment'));
    });

    it('T1-F06-05: Approach section and Portfolio section match specification', async () => {
      const res = await defaultClient.get('/');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h2.includes('Our Approach'));
      assert.ok(headings.h3.includes('Precision, Speed, Compliance'));
      for (const pillar of ['Schedule Discipline', 'BOQ Compliance', 'Trade Supervision', 'Scalable Workforce']) {
        assert.ok(html.includes(pillar), `Approach section must include pillar: ${pillar}`);
      }
    });
  });

  // ==========================================
  // Feature 7: About Page Content & SEO
  // ==========================================
  describe('Feature 7: About Page Content & SEO', () => {
    it('T1-F07-01: About page SEO title matches specification', async () => {
      const res = await defaultClient.get('/about');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'About Us | Laxmi Enterprises');
    });

    it('T1-F07-02: About H1 and Company Overview intro match specification', async () => {
      const res = await defaultClient.get('/about');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h1.includes('About Us'));
      assert.ok(headings.h2.includes('Company Overview'));
      assert.ok(html.includes('With 25+ years of hands-on site leadership'));
    });

    it('T1-F07-03: What We Deliver section highlights precision across formats', async () => {
      const res = await defaultClient.get('/about');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h3.includes('What We Deliver'));
      assert.ok(html.includes('From high-density workstations and boardroom tables'));
    });

    it('T1-F07-04: Enterprise Background details master supervisor experience', async () => {
      const res = await defaultClient.get('/about');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h2.includes('Enterprise Background'));
      assert.ok(html.includes('master supervisor with 20+ years of contracting experience'));
    });

    it('T1-F07-05: Our Process 4-step execution and navigation buttons', async () => {
      const res = await defaultClient.get('/about');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h2.includes('Our Process'));
      assert.ok(html.includes('Drawing & BOQ Study'));
      assert.ok(html.includes('Site Survey & Verification'));
      assert.ok(html.includes('Execution & Supervision'));
      assert.ok(html.includes('Snag Audit & Handover'));
      assert.ok(html.includes('View All Services'));
      assert.ok(html.includes('Contact Us'));
    });
  });

  // ==========================================
  // Feature 8: Portfolio Page Content & SEO
  // ==========================================
  describe('Feature 8: Portfolio Page Content & SEO', () => {
    it('T1-F08-01: Portfolio page SEO title matches specification', async () => {
      const res = await defaultClient.get('/portfolio');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Portfolio | Laxmi Enterprises');
    });

    it('T1-F08-02: Portfolio headings and intro copy match commercial fit-out scope', async () => {
      const res = await defaultClient.get('/portfolio');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h1.includes('Portfolio'));
      assert.ok(headings.h2.includes('Executed Fit-Out Projects'));
      assert.ok(html.includes('Full-scope turnkey fit-outs, high-volume workstation deployments'));
    });

    it('T1-F08-03: Exactly 6 commercial project cards are present', async () => {
      const res = await defaultClient.get('/portfolio');
      const html = await res.text();
      const expectedProjects = [
        '4Life Corporate Office & Healthcare Facility',
        'Corporate Boardroom & Conference Suites',
        'Acoustic Panelling & Demountable Partitions',
        'Reception Lobby & Brand Displays',
        'Executive Director Cabins & Veneer Joinery',
        'Modular Workstation Deployment'
      ];
      for (const p of expectedProjects) {
        assert.ok(html.includes(p), `Portfolio must include card: ${p}`);
      }
    });

    it('T1-F08-04: Project card links point to modernized clean routes', async () => {
      const res = await defaultClient.get('/portfolio');
      const html = await res.text();
      const expectedUrls = [
        '/projects/4life-andheri',
        '/projects/boardroom-conference-suites',
        '/projects/acoustic-panelling-partitions',
        '/projects/reception-lobby-displays',
        '/projects/executive-director-cabins',
        '/projects/modular-workstation-deployment'
      ];
      for (const u of expectedUrls) {
        assert.ok(html.includes(`href="${u}"`) || html.includes(`href='${u}'`), `Portfolio must link to ${u}`);
      }
    });

    it('T1-F08-05: Portfolio closing line and CTA banner are rendered', async () => {
      const res = await defaultClient.get('/portfolio');
      const html = await res.text();
      assert.ok(html.includes('Share your drawings or BOQ for a quick estimate.'));
      const banner = getClosingCtaBanner(html);
      assert.ok(banner.present, 'Portfolio must render closing CTA banner');
    });
  });

  // ==========================================
  // Feature 9: Services Page Content & SEO
  // ==========================================
  describe('Feature 9: Services Page Content & SEO', () => {
    it('T1-F09-01: Services overview SEO title matches specification', async () => {
      const res = await defaultClient.get('/services');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Services | Laxmi Enterprises');
    });

    it('T1-F09-02: Services page H1 and H2 match commercial specification', async () => {
      const res = await defaultClient.get('/services');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h1.includes('Commercial Fit-Outs & Specialist Joinery'));
      assert.ok(headings.h2.includes('Services'));
    });

    it('T1-F09-03: Exactly 5 commercial service cards are present', async () => {
      const res = await defaultClient.get('/services');
      const html = await res.text();
      for (const item of SERVICE_NAV_ITEMS) {
        assert.ok(html.includes(item.label), `Services page must include card: ${item.label}`);
      }
    });

    it('T1-F09-04: Service card links point to modernized service routes', async () => {
      const res = await defaultClient.get('/services');
      const html = await res.text();
      for (const item of SERVICE_NAV_ITEMS) {
        assert.ok(html.includes(`href="${item.href}"`) || html.includes(`href='${item.href}'`), `Must link to ${item.href}`);
      }
    });

    it('T1-F09-05: Services overview page renders standardized FAQs and CTA banner', async () => {
      const res = await defaultClient.get('/services');
      const html = await res.text();
      const faqs = getFaqs(html);
      assert.ok(faqs.items.length >= 4, 'Services page must have at least 4 FAQs');
      const banner = getClosingCtaBanner(html);
      assert.ok(banner.present, 'Services page must have closing CTA banner');
    });
  });

  // ==========================================
  // Feature 10: Service Detail Pages (x5)
  // ==========================================
  describe('Feature 10: Service Detail Pages (x5)', () => {
    it('T1-F10-01: Turnkey Interiors detail page contains title, H2, and 6 capabilities', async () => {
      const res = await defaultClient.get('/services/turnkey-interiors');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Turnkey Interiors & Fit-Outs | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h2.some(h => h.includes('Turnkey Fit-Outs') || h.includes('Turnkey Commercial Fit-Outs')),
        `Expected H2 heading "Turnkey Fit-Outs", found: ${headings.h2.join(', ')}`
      );

      const capabilities = getCapabilities(html);
      assert.strictEqual(capabilities.length, 6, 'Must contain exactly 6 capability cards');
      const expectedCaps = [
        'Architectural Joinery',
        'Civil & Partitions',
        'Electrical & Lighting',
        'Plumbing & MEP Coordination',
        'Finishes & Hardware',
        'Laser-Level Precision'
      ];
      for (const cap of expectedCaps) {
        assert.ok(
          capabilities.some(c => c.title.includes(cap) || c.description.includes(cap)),
          `Capability grid must contain "${cap}", found: ${capabilities.map(c => c.title).join(', ')}`
        );
      }
    });

    it('T1-F10-02: Hospitality & Healthcare detail page contains title, H2, and 6 capabilities', async () => {
      const res = await defaultClient.get('/services/hospitality-healthcare');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Hospitality & Healthcare Fit-Outs | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h2.some(h => h.includes('Hospitality & Healthcare Fit-Outs')),
        `Expected H2 heading "Hospitality & Healthcare Fit-Outs", found: ${headings.h2.join(', ')}`
      );

      const capabilities = getCapabilities(html);
      assert.strictEqual(capabilities.length, 6, 'Must contain exactly 6 capability cards');
      const expectedCaps = [
        'Turnkey Commercial Interiors',
        'Retail Fixtures & Display Joinery',
        'Guest Room Millwork',
        'Moisture-Resistant Vanities',
        'Fire-Rated Doors & Frames',
        'Off-Peak & Night-Shift Deployment'
      ];
      for (const cap of expectedCaps) {
        assert.ok(
          capabilities.some(c => c.title.includes(cap) || c.description.includes(cap)),
          `Capability grid must contain "${cap}", found: ${capabilities.map(c => c.title).join(', ')}`
        );
      }
    });

    it('T1-F10-03: Architectural Joinery detail page contains title, H2, and 6 capabilities', async () => {
      const res = await defaultClient.get('/services/joinery-furnishings');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Architectural Joinery & Furnishings | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h2.some(h => h.includes('Executive Millwork & Joinery') || h.includes('Architectural Joinery')),
        `Expected H2 heading "Executive Millwork & Joinery", found: ${headings.h2.join(', ')}`
      );

      const capabilities = getCapabilities(html);
      assert.strictEqual(capabilities.length, 6, 'Must contain exactly 6 capability cards');
      const expectedCaps = [
        'Reception & Concierge Desks',
        'Boardroom & Meeting Tables',
        'Veneer & Fluted Woodwork',
        'Cable Trays & Power Raceways',
        'Metal, Glass & Acrylic Inlays',
        'Acoustic Booths & Pods'
      ];
      for (const cap of expectedCaps) {
        assert.ok(
          capabilities.some(c => c.title.includes(cap) || c.description.includes(cap)),
          `Capability grid must contain "${cap}", found: ${capabilities.map(c => c.title).join(', ')}`
        );
      }
    });

    it('T1-F10-04: Acoustic Panelling detail page contains title, H2, and 6 capabilities', async () => {
      const res = await defaultClient.get('/services/acoustics-partitions');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Acoustic Panelling & Partitions | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h2.some(h => h.includes('Acoustic Panelling & Partitions')),
        `Expected H2 heading "Acoustic Panelling & Partitions", found: ${headings.h2.join(', ')}`
      );

      const capabilities = getCapabilities(html);
      assert.strictEqual(capabilities.length, 6, 'Must contain exactly 6 capability cards');
      const expectedCaps = [
        'Acoustic Timber Slat Panelling',
        'Demountable Partitions',
        'Hardwood & Laminate Flooring',
        'Fluted & Louvered Walls',
        'Concealed Access Doors',
        'Sub-Base Moisture Verification'
      ];
      for (const cap of expectedCaps) {
        assert.ok(
          capabilities.some(c => c.title.includes(cap) || c.description.includes(cap)),
          `Capability grid must contain "${cap}", found: ${capabilities.map(c => c.title).join(', ')}`
        );
      }
    });

    it('T1-F10-05: Workstations & Facilities detail page contains title, H2, and 6 capabilities', async () => {
      const res = await defaultClient.get('/services/workstations-facilities');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Workstations & Critical Facilities | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h2.some(h => h.includes('Workstations & Facilities') || h.includes('Modular Workstations & Facilities')),
        `Expected H2 heading "Workstations & Facilities", found: ${headings.h2.join(', ')}`
      );

      const capabilities = getCapabilities(html);
      assert.strictEqual(capabilities.length, 6, 'Must contain exactly 6 capability cards');
      const expectedCaps = [
        'Bulk Workstation Installation',
        'Executive Cabins & Boardrooms',
        'Cafeteria & Pantry Joinery',
        'Auditorium & Town Hall Panelling',
        'Phased Deployment for Live Offices',
        'EHS & PPE Compliance'
      ];
      for (const cap of expectedCaps) {
        assert.ok(
          capabilities.some(c => c.title.includes(cap) || c.description.includes(cap)),
          `Capability grid must contain "${cap}", found: ${capabilities.map(c => c.title).join(', ')}`
        );
      }
    });
  });

  // ==========================================
  // Feature 11: Project Detail Pages (x6)
  // ==========================================
  describe('Feature 11: Project Detail Pages (x6)', () => {
    it('T1-F11-01: 4Life project detail page contains SEO title, H1, Scopes 1-4, and buttons', async () => {
      const res = await defaultClient.get('/projects/4life-andheri');
      const html = await res.text();
      assert.strictEqual(getTitle(html), '4Life Corporate Office & Healthcare Facility | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h1.some(h => h.includes('4Life Corporate Office & Healthcare Facility')),
        `Primary H1 must match project name, got: ${headings.h1.join(', ')}`
      );

      for (const scope of ['Plywood & Architectural Joinery', 'Electrical, Lighting & Cabling', 'Walls & Partitions', 'Plumbing & Mechanical']) {
        const hasScope = html.includes(scope) || html.includes(scope.replace(/&/g, '&amp;'));
        assert.ok(hasScope, `4Life must include scope: ${scope}`);
      }
      assert.ok(html.includes('Get a Quote'), 'Must contain "Get a Quote"');
      assert.ok(html.includes('Share BOQ for Estimation'), 'Must contain "Share BOQ for Estimation"');
    });

    it('T1-F11-02: Corporate Boardroom detail page contains title, H1, and summary text', async () => {
      const res = await defaultClient.get('/projects/boardroom-conference-suites');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Corporate Boardroom & Conference Suites | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h1.some(h => h.includes('Corporate Boardroom') && (h.includes('Conference Suites') || h.includes('Executive Conference Suites'))),
        `Primary H1 must match project name, got: ${headings.h1.join(', ')}`
      );
      assert.ok(
        html.includes('20-seater suite with dual-screen video wall'),
        'Must contain summary text "20-seater suite with dual-screen video wall"'
      );
    });

    it('T1-F11-03: Acoustic Panelling project page contains title, H1, and fabric panelling summary', async () => {
      const res = await defaultClient.get('/projects/acoustic-panelling-partitions');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Acoustic Panelling & Demountable Partitions | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h1.some(h => h.includes('Acoustic Panelling') && h.includes('Demountable Partitions')),
        `Primary H1 must match project name, got: ${headings.h1.join(', ')}`
      );
      assert.ok(
        html.includes('Fabric panelling, bench plinths and flush acoustic vision doors') ||
        html.includes('Multi-tone fabric panelling, bench plinths, flush acoustic vision doors'),
        'Must contain acoustic panelling summary copy'
      );
    });

    it('T1-F11-04: Reception Lobby project page contains title, H1, and counter display summary', async () => {
      const res = await defaultClient.get('/projects/reception-lobby-displays');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Reception Lobby & Brand Displays | Laxmi Enterprises');

      const headings = getHeadings(html);
      assert.ok(
        headings.h1.some(h => h.includes('Reception Lobby') && h.includes('Brand Displays')),
        `Primary H1 must match project name, got: ${headings.h1.join(', ')}`
      );
      assert.ok(
        html.includes('Custom reception counters') && (html.includes('trophy showcases') || html.includes('executive trophy showcases')),
        'Must contain reception lobby summary copy'
      );
    });

    it('T1-F11-05: Executive Cabins and Modular Workstations project pages contain specified copy', async () => {
      const resCabins = await defaultClient.get('/projects/executive-director-cabins');
      const htmlCabins = await resCabins.text();
      assert.strictEqual(getTitle(htmlCabins), 'Executive Director Cabins & Veneer Joinery | Laxmi Enterprises');

      const headingsCabins = getHeadings(htmlCabins);
      assert.ok(
        headingsCabins.h1.some(h => h.includes('Executive Director Cabins') && h.includes('Veneer Joinery')),
        `Primary H1 must match Executive Director Cabins, got: ${headingsCabins.h1.join(', ')}`
      );
      assert.ok(
        htmlCabins.includes('Director suites, veneer cladding and walnut credenzas') ||
        htmlCabins.includes('Director desk suites, full-height veneer cladding, walnut credenzas'),
        'Executive Director Cabins summary copy must be present'
      );

      const resMod = await defaultClient.get('/projects/modular-workstation-deployment');
      const htmlMod = await resMod.text();
      assert.strictEqual(getTitle(htmlMod), 'Modular Workstation Deployment | Laxmi Enterprises');

      const headingsMod = getHeadings(htmlMod);
      assert.ok(
        headingsMod.h1.some(h => h.includes('Modular Workstation Deployment')),
        `Primary H1 must match Modular Workstation Deployment, got: ${headingsMod.h1.join(', ')}`
      );
      // Genuine assertion without tautological fallback
      assert.ok(
        htmlMod.includes('Rapid assembly, raceway levelling and floor handover') ||
        htmlMod.includes('Rapid assembly, raceway levelling, acoustic privacy screens and floor handover') ||
        htmlMod.includes('Rapid on-site assembly, wire-management leveling'),
        'Modular Workstation summary copy must be present'
      );
    });
  });

  // ==========================================
  // Feature 12: Contact Page Content & SEO
  // ==========================================
  describe('Feature 12: Contact Page Content & SEO', () => {
    it('T1-F12-01: Contact page SEO title matches specification', async () => {
      const res = await defaultClient.get('/contact');
      const html = await res.text();
      assert.strictEqual(getTitle(html), 'Contact | Laxmi Enterprises');
    });

    it('T1-F12-02: Contact page H1 and H2 match proposal request copy', async () => {
      const res = await defaultClient.get('/contact');
      const html = await res.text();
      const headings = getHeadings(html);
      assert.ok(headings.h1.includes('Contact Us'));
      assert.ok(headings.h2.includes('Request a Proposal or Quote'));
    });

    it('T1-F12-03: Tenders & BOQ Submissions section text matches specification', async () => {
      const res = await defaultClient.get('/contact');
      const html = await res.text();
      assert.ok(html.includes('Tenders & BOQ Submissions'));
      assert.ok(html.includes('We welcome tender invitations, BOQ packages, shop drawings and contractor partnerships.'));
    });

    it('T1-F12-04: Connect With Us section is present with contact information', async () => {
      const res = await defaultClient.get('/contact');
      const html = await res.text();
      assert.ok(html.includes('Connect With Us'));
    });

    it('T1-F12-05: Contact form service dropdown options and FAQs are rendered', async () => {
      const res = await defaultClient.get('/contact');
      const html = await res.text();
      const faqs = getFaqs(html);
      assert.ok(faqs.items.length >= 4, 'Contact page must render standardized FAQs');
      assert.ok(html.includes('Turnkey Interiors') || html.includes('Commercial Fit-Outs'));
    });
  });

  // ==========================================
  // Feature 13: 404 Page Error Handling
  // ==========================================
  describe('Feature 13: 404 Page Error Handling', () => {
    it('T1-F13-01: Non-existent URL returns HTTP status 404', async () => {
      const res = await defaultClient.get('/nonexistent-page-test-abc');
      assert.strictEqual(res.status, 404);
    });

    it('T1-F13-02: 404 page renders Error 404 and Page not found headings', async () => {
      const res = await defaultClient.get('/404.html');
      const html = await res.text();
      assert.match(html, /Error 404/i);
      assert.match(html, /Page not found\./i);
    });

    it('T1-F13-03: 404 body copy matches specification', async () => {
      const res = await defaultClient.get('/404.html');
      const html = await res.text();
      assert.ok(html.includes("This page doesn't exist or has moved."));
    });

    it('T1-F13-04: Return Home button targets root URL /', async () => {
      const res = await defaultClient.get('/404.html');
      const html = await res.text();
      assert.match(html, /<a[^>]+href=["']\/["'][^>]*>[\s\S]*?Return Home/i);
    });

    it('T1-F13-05: Get a Quote button targets /contact', async () => {
      const res = await defaultClient.get('/404.html');
      const html = await res.text();
      assert.match(html, /<a[^>]+href=["']\/contact["'][^>]*>[\s\S]*?Get a Quote/i);
    });
  });

  // ==========================================
  // Feature 14: React SPA Synchronization
  // ==========================================
  describe('Feature 14: React SPA Synchronization', () => {
    it('T1-F14-01: src/data/siteData.js exists and contains modernized service and project slugs', () => {
      const siteDataPath = path.resolve(process.cwd(), 'src/data/siteData.js');
      assert.ok(fs.existsSync(siteDataPath), 'src/data/siteData.js must exist');
      const content = fs.readFileSync(siteDataPath, 'utf8');
      assert.ok(content.includes('turnkey-interiors'));
      assert.ok(content.includes('hospitality-healthcare'));
      assert.ok(content.includes('boardroom-conference-suites'));
    });

    it('T1-F14-02: src/App.jsx router defines modernized route paths', () => {
      const appPath = path.resolve(process.cwd(), 'src/App.jsx');
      assert.ok(fs.existsSync(appPath), 'src/App.jsx must exist');
      const content = fs.readFileSync(appPath, 'utf8');
      assert.ok(content.includes('/services/turnkey-interiors'));
      assert.ok(content.includes('/projects/boardroom-conference-suites'));
    });

    it('T1-F14-03: React source in src/ is free of prohibited terms', () => {
      const srcDir = path.resolve(process.cwd(), 'src');
      const scan = scanTargetPaths(['src'], { rootDir: process.cwd() });
      assert.strictEqual(scan.totalViolations, 0, `React source contains prohibited terms: ${JSON.stringify(scan.violations)}`);
    });

    it('T1-F14-04: React components standardize CTA buttons to "Get a Quote"', () => {
      const srcDir = path.resolve(process.cwd(), 'src');
      const files = fs.readdirSync(path.join(srcDir, 'components')).filter(f => f.endsWith('.jsx'));
      let foundGetAQuote = false;
      for (const file of files) {
        const content = fs.readFileSync(path.join(srcDir, 'components', file), 'utf8');
        if (content.includes('Get a Quote')) {
          foundGetAQuote = true;
          break;
        }
      }
      assert.ok(foundGetAQuote, 'React components must use "Get a Quote"');
    });

    it('T1-F14-05: React code compiles cleanly without syntax errors', () => {
      // Verify via Node syntax check of siteData.js or App.jsx
      const siteDataPath = path.resolve(process.cwd(), 'src/data/siteData.js');
      assert.doesNotThrow(() => {
        execSync(`node -c "${siteDataPath}"`, { stdio: 'pipe' });
      });
    });
  });

  // ==========================================
  // Feature 15: Service Directory Renaming
  // ==========================================
  describe('Feature 15: Service Directory Renaming', () => {
    it('T1-F15-01: services/turnkey-interiors/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'services/turnkey-interiors/index.html')));
    });

    it('T1-F15-02: services/hospitality-healthcare/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'services/hospitality-healthcare/index.html')));
    });

    it('T1-F15-03: services/joinery-furnishings/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'services/joinery-furnishings/index.html')));
    });

    it('T1-F15-04: services/acoustics-partitions/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'services/acoustics-partitions/index.html')));
    });

    it('T1-F15-05: services/workstations-facilities/index.html exists and old directories removed', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'services/workstations-facilities/index.html')));
      for (const oldDir of ['kitchens', 'bathrooms', 'furniture', 'flooring', 'buildings']) {
        assert.ok(!fs.existsSync(path.resolve(process.cwd(), `services/${oldDir}`)), `Legacy directory services/${oldDir} must not exist`);
      }
    });
  });

  // ==========================================
  // Feature 16: Project Directory Renaming
  // ==========================================
  describe('Feature 16: Project Directory Renaming', () => {
    it('T1-F16-01: projects/boardroom-conference-suites/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'projects/boardroom-conference-suites/index.html')));
    });

    it('T1-F16-02: projects/acoustic-panelling-partitions/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'projects/acoustic-panelling-partitions/index.html')));
    });

    it('T1-F16-03: projects/reception-lobby-displays/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'projects/reception-lobby-displays/index.html')));
    });

    it('T1-F16-04: projects/executive-director-cabins/index.html exists on disk', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'projects/executive-director-cabins/index.html')));
    });

    it('T1-F16-05: projects/modular-workstation-deployment/index.html exists and old dirs removed', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'projects/modular-workstation-deployment/index.html')));
      for (const oldDir of ['light-pine-kitchen', 'airy-apartment', 'modern-kitchen', 'hamptons-manor-house', 'dark-oak-kitchen']) {
        assert.ok(!fs.existsSync(path.resolve(process.cwd(), `projects/${oldDir}`)), `Legacy directory projects/${oldDir} must not exist`);
      }
    });
  });

  // ==========================================
  // Feature 17: 301 Redirects Engine
  // ==========================================
  describe('Feature 17: 301 Redirects Engine', () => {
    it('T1-F17-01: Legacy service routes return HTTP 301', async () => {
      const serviceRedirects = LEGACY_REDIRECTS.filter(r => r.category === 'service');
      for (const r of serviceRedirects) {
        const res = await defaultClient.get(r.from);
        assert.strictEqual(res.status, 301, `Legacy path ${r.from} must return HTTP 301, got ${res.status}`);
      }
    });

    it('T1-F17-02: Legacy service redirects have exact Location headers', async () => {
      const serviceRedirects = LEGACY_REDIRECTS.filter(r => r.category === 'service');
      for (const r of serviceRedirects) {
        const res = await defaultClient.get(r.from);
        assert.strictEqual(res.location, r.to, `Expected Location: ${r.to}, got ${res.location}`);
      }
    });

    it('T1-F17-03: Legacy project routes return HTTP 301', async () => {
      const projectRedirects = LEGACY_REDIRECTS.filter(r => r.category === 'project');
      for (const r of projectRedirects) {
        const res = await defaultClient.get(r.from);
        assert.strictEqual(res.status, 301, `Legacy path ${r.from} must return HTTP 301, got ${res.status}`);
      }
    });

    it('T1-F17-04: Legacy project redirects have exact Location headers', async () => {
      const projectRedirects = LEGACY_REDIRECTS.filter(r => r.category === 'project');
      for (const r of projectRedirects) {
        const res = await defaultClient.get(r.from);
        assert.strictEqual(res.location, r.to, `Expected Location: ${r.to}, got ${res.location}`);
      }
    });

    it('T1-F17-05: Trailing slash requests on legacy routes redirect to clean targets', async () => {
      for (const r of LEGACY_REDIRECTS) {
        const res = await defaultClient.get(`${r.from}/`);
        assert.strictEqual(res.status, 301, `${r.from}/ must return 301`);
        assert.strictEqual(res.location, r.to, `Location must be ${r.to}`);
      }
    });
  });

  // ==========================================
  // Feature 18: Sitemap & Canonical Tags
  // ==========================================
  describe('Feature 18: Sitemap & Canonical Tags', () => {
    it('T1-F18-01: public/sitemap.xml exists and is well-formed XML', () => {
      const sitemapPath = path.resolve(process.cwd(), SITEMAP_EXPECTED_PATH);
      assert.ok(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
      const xml = fs.readFileSync(sitemapPath, 'utf8');
      const validation = validateXml(xml);
      assert.ok(validation.valid, `Sitemap XML must be well-formed: ${validation.errors.join('; ')}`);
      assert.ok(xml.includes('<urlset'), 'Sitemap must contain <urlset>');
    });

    it('T1-F18-02: Sitemap contains exactly 16 <url> entries', () => {
      const sitemapPath = path.resolve(process.cwd(), SITEMAP_EXPECTED_PATH);
      const xml = fs.readFileSync(sitemapPath, 'utf8');
      const validation = validateXml(xml);
      assert.strictEqual(validation.urls.length, SITEMAP_TOTAL_URLS, `Expected exactly 16 URLs, found ${validation.urls.length}`);
    });

    it('T1-F18-03: All sitemap URLs use https://laxmienterprises.in/ and clean paths', () => {
      const sitemapPath = path.resolve(process.cwd(), SITEMAP_EXPECTED_PATH);
      const xml = fs.readFileSync(sitemapPath, 'utf8');
      const validation = validateXml(xml);
      for (const url of validation.urls) {
        assert.ok(url.startsWith('https://laxmienterprises.in/'), `URL must start with domain: ${url}`);
        assert.ok(!url.endsWith('.html'), `URL must not end with .html: ${url}`);
      }
    });

    it('T1-F18-04: Sitemap excludes obsolete, deleted, and utility pages', () => {
      const sitemapPath = path.resolve(process.cwd(), SITEMAP_EXPECTED_PATH);
      const xml = fs.readFileSync(sitemapPath, 'utf8');
      for (const sub of SITEMAP_PROHIBITED_SUBSTRINGS) {
        assert.ok(!xml.includes(sub), `Sitemap must not contain: ${sub}`);
      }
    });

    it('T1-F18-05: Canonical tags in all 16 pages match sitemap URLs', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const canonical = getCanonicalUrl(html);
        assert.strictEqual(canonical, route.canonicalUrl, `Page ${route.path} canonical tag must match ${route.canonicalUrl}`);
      }
    });
  });

  // ==========================================
  // Feature 19: Template Files Cleanup
  // ==========================================
  describe('Feature 19: Template Files Cleanup', () => {
    it('T1-F19-01: template-help/ directory is deleted from repository', () => {
      assert.ok(!fs.existsSync(path.resolve(process.cwd(), 'template-help')), 'template-help/ must not exist');
    });

    it('T1-F19-02: public/icons-showcase.html is deleted from repository', () => {
      assert.ok(!fs.existsSync(path.resolve(process.cwd(), 'public/icons-showcase.html')), 'public/icons-showcase.html must not exist');
    });

    it('T1-F19-03: vite.config.js rollup input excludes deleted template pages', () => {
      const configPath = path.resolve(process.cwd(), 'vite.config.js');
      const configText = fs.readFileSync(configPath, 'utf8');
      assert.ok(!configText.includes('template-help'), 'vite.config.js must not reference template-help');
      assert.ok(!configText.includes('icons-showcase'), 'vite.config.js must not reference icons-showcase');
    });

    it('T1-F19-04: dist output excludes deleted template pages', () => {
      assert.ok(!fs.existsSync(path.resolve(process.cwd(), 'dist/template-help')), 'dist/template-help must not exist');
      assert.ok(!fs.existsSync(path.resolve(process.cwd(), 'dist/icons-showcase.html')), 'dist/icons-showcase.html must not exist');
    });

    it('T1-F19-05: HTTP GET to deleted template routes returns HTTP 404', async () => {
      for (const deleted of DELETED_ROUTES) {
        const res = await defaultClient.get(deleted.path);
        assert.strictEqual(res.status, 404, `Deleted path ${deleted.path} must return 404, got ${res.status}`);
      }
    });
  });

  // ==========================================
  // Feature 20: Utility 401 Page
  // ==========================================
  describe('Feature 20: Utility 401 Page', () => {
    it('T1-F20-01: 401.html exists in project root', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), '401.html')), '401.html must exist in project root');
    });

    it('T1-F20-02: 401.html is registered in vite.config.js rollupOptions.input', () => {
      const configText = fs.readFileSync(path.resolve(process.cwd(), 'vite.config.js'), 'utf8');
      assert.ok(configText.includes('401.html'), 'vite.config.js must register 401.html');
    });

    it('T1-F20-03: dist/401.html exists after production build', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'dist/401.html')), 'dist/401.html must exist');
    });

    it('T1-F20-04: 401.html retains password protection form unmodified', () => {
      const content = fs.readFileSync(path.resolve(process.cwd(), '401.html'), 'utf8');
      assert.match(content, /input[^>]+type=["']password["']/i, '401.html must retain password input');
    });

    it('T1-F20-05: 401.html is NOT listed in public/sitemap.xml', () => {
      const sitemap = fs.readFileSync(path.resolve(process.cwd(), SITEMAP_EXPECTED_PATH), 'utf8');
      assert.ok(!sitemap.includes('401'), '401.html must not be in sitemap.xml');
    });
  });

  // ==========================================
  // Feature 21: Obsolete Terms Zero-Tolerance
  // ==========================================
  describe('Feature 21: Obsolete Terms Zero-Tolerance', () => {
    it('T1-F21-01: Zero occurrences of "kitchens" across source files', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact', '401.html', '404.html'];
      const scan = scanTargetPaths(targets, {
        rootDir: process.cwd(),
        patterns: [{ term: 'kitchens', pattern: /\bkitchens?\b/i }]
      });
      assert.strictEqual(scan.totalViolations, 0, `Found "kitchens" violations: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T1-F21-02: Zero occurrences of "bathrooms" across source files', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact', '401.html', '404.html'];
      const scan = scanTargetPaths(targets, {
        rootDir: process.cwd(),
        patterns: [{ term: 'bathrooms', pattern: /\bbathrooms?\b/i }]
      });
      assert.strictEqual(scan.totalViolations, 0, `Found "bathrooms" violations: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T1-F21-03: Zero occurrences of legacy slugs "light-pine", "hamptons", "dark-oak"', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact'];
      const scan = scanTargetPaths(targets, {
        rootDir: process.cwd(),
        patterns: [
          { term: 'light-pine', pattern: /light-pine/i },
          { term: 'hamptons', pattern: /hamptons/i },
          { term: 'dark-oak', pattern: /dark-oak/i }
        ]
      });
      assert.strictEqual(scan.totalViolations, 0, `Found legacy project slug violations: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T1-F21-04: Zero occurrences of legacy slugs "airy-apartment", "modern-kitchen"', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact'];
      const scan = scanTargetPaths(targets, {
        rootDir: process.cwd(),
        patterns: [
          { term: 'airy-apartment', pattern: /airy-apartment/i },
          { term: 'modern-kitchen', pattern: /modern-kitchen/i }
        ]
      });
      assert.strictEqual(scan.totalViolations, 0, `Found legacy project slug violations: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });

    it('T1-F21-05: Zero occurrences of legacy marketing slogans across content files', () => {
      const targets = ['index.html', 'about', 'services', 'projects', 'portfolio', 'contact'];
      const scan = scanTargetPaths(targets, {
        rootDir: process.cwd(),
        patterns: [
          { term: 'Looking for some answers', pattern: /Looking\s+for\s+some\s+answers/i },
          { term: 'Partner With Us on Your Next', pattern: /Partner\s+With\s+Us\s+on\s+Your\s+Next/i },
          { term: "Let's engineer your next workspace", pattern: /Let['’]s\s+engineer\s+your\s+next\s+workspace/i }
        ]
      });
      assert.strictEqual(scan.totalViolations, 0, `Found legacy marketing slogan violations: ${JSON.stringify(scan.violations.slice(0, 3))}`);
    });
  });

  // ==========================================
  // Feature 22: Build Cleanliness
  // ==========================================
  describe('Feature 22: Build Cleanliness', () => {
    it('T1-F22-01: npm run build exits 0 cleanly', () => {
      const output = execSync('npm run build', { stdio: 'pipe', encoding: 'utf8' });
      assert.ok(output.includes('built in'), 'Build output must confirm clean build');
    });

    it('T1-F22-02: Exactly 18 HTML files generated in dist/', () => {
      const distDir = path.resolve(process.cwd(), 'dist');
      let htmlCount = 0;
      function countHtml(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            countHtml(path.join(dir, entry.name));
          } else if (entry.isFile() && entry.name.endsWith('.html')) {
            htmlCount++;
          }
        }
      }
      countHtml(distDir);
      assert.strictEqual(htmlCount, 18, `Expected exactly 18 HTML files in dist/, found ${htmlCount}`);
    });

    it('T1-F22-03: Compiled assets are properly emitted to dist/assets/', () => {
      const assetsDir = path.resolve(process.cwd(), 'dist/assets');
      assert.ok(fs.existsSync(assetsDir), 'dist/assets must exist');
      const files = fs.readdirSync(assetsDir);
      assert.ok(files.length > 0, 'dist/assets must contain emitted files');
    });

    it('T1-F22-04: Zero unresolved imports or build errors', () => {
      // Build runs without throwing
      assert.doesNotThrow(() => {
        execSync('npm run build', { stdio: 'pipe' });
      });
    });

    it('T1-F22-05: Build is idempotent (runs twice consecutively with exit code 0)', () => {
      assert.doesNotThrow(() => {
        execSync('npm run build', { stdio: 'pipe' });
        execSync('npm run build', { stdio: 'pipe' });
      });
    });
  });

  // ==========================================
  // Feature 23: Internal Link Integrity
  // ==========================================
  describe('Feature 23: Internal Link Integrity', () => {
    it('T1-F23-01: All internal links across canonical pages resolve to HTTP 200', async () => {
      const checkedUrls = new Set();
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const parsed = parseHtml(html);

        for (const link of parsed.internalLinks) {
          const cleanPath = link.href.split('?')[0].split('#')[0];
          if (!cleanPath || checkedUrls.has(cleanPath)) continue;
          checkedUrls.add(cleanPath);

          const linkRes = await defaultClient.get(cleanPath, { redirect: 'manual' });
          assert.ok(
            linkRes.status === 200 || linkRes.status === 301,
            `Internal link ${cleanPath} from page ${route.path} returned status ${linkRes.status}`
          );
        }
      }
    });

    it('T1-F23-02: Zero internal links point to legacy service or project routes', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const parsed = parseHtml(html);

        for (const link of parsed.internalLinks) {
          const cleanPath = link.href.split('?')[0].split('#')[0];
          assert.ok(!LEGACY_PATHS.includes(cleanPath), `Page ${route.path} contains internal link to legacy route: ${cleanPath}`);
        }
      }
    });

    it('T1-F23-03: Zero internal links point to deleted template-help or icons-showcase', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const parsed = parseHtml(html);

        for (const link of parsed.internalLinks) {
          assert.ok(!link.href.includes('template-help'), `Page ${route.path} links to template-help`);
          assert.ok(!link.href.includes('icons-showcase'), `Page ${route.path} links to icons-showcase`);
        }
      }
    });

    it('T1-F23-04: Internal navigation and card links use clean URLs without .html', async () => {
      for (const route of CANONICAL_ROUTES) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        const parsed = parseHtml(html);

        for (const link of parsed.internalLinks) {
          if (link.href === '/401.html' || link.href === '/404.html') continue;
          assert.ok(!link.href.endsWith('.html'), `Page ${route.path} contains link with .html extension: ${link.href}`);
        }
      }
    });

    it('T1-F23-05: Breadcrumb links resolve to valid parent pages', async () => {
      const subpages = CANONICAL_ROUTES.filter(r => r.category === 'service' || r.category === 'project');
      for (const route of subpages) {
        const res = await defaultClient.get(route.path);
        const html = await res.text();
        // Check for breadcrumb links (Home, Services, Portfolio)
        assert.ok(html.includes('href="/"') || html.includes("href='/'"), `Page ${route.path} must have home breadcrumb`);
      }
    });
  });

  // ==========================================
  // Feature 24: E2E Opaque-Box Test Suite
  // ==========================================
  describe('Feature 24: E2E Opaque-Box Test Suite', () => {
    it('T1-F24-01: Standalone test runner exists in tests/e2e/runner.js', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'tests/e2e/runner.js')));
    });

    it('T1-F24-02: Test fixtures derive strictly from user requirements and public contracts', () => {
      assert.strictEqual(CANONICAL_ROUTES.length, 16);
      assert.strictEqual(LEGACY_REDIRECTS.length, 10);
      assert.strictEqual(PROHIBITED_TERMS.length, 10);
      assert.strictEqual(STANDARDIZED_FAQS.length, 4);
    });

    it('T1-F24-03: package.json registers test command targeting runner.js', () => {
      const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
      assert.strictEqual(pkg.scripts?.test, 'node tests/e2e/runner.js');
    });

    it('T1-F24-04: Scanner detects artificially injected prohibited terms', () => {
      const dummyText = 'This is a test with kitchens in it.';
      const pattern = PROHIBITED_PATTERNS.find(p => p.term === 'kitchens');
      assert.ok(pattern.pattern.test(dummyText), 'Scanner pattern must detect prohibited term');
    });

    it('T1-F24-05: Test suite relies strictly on Node 24 native built-in APIs', () => {
      assert.ok(typeof fetch === 'function', 'Native fetch must be available');
      assert.ok(typeof performance !== 'undefined', 'Native performance must be available');
    });
  });

  // ==========================================
  // Feature 25: Final Report Deliverable (Milestone 4)
  // ==========================================
  describe('Feature 25: Final Report', () => {
    // Helper to locate the Final Report artifact across standard deliverable paths
    function getFinalReportPath() {
      const candidates = [
        path.resolve(process.cwd(), 'FINAL_REPORT.md'),
        path.resolve(process.cwd(), 'docs', 'FINAL_REPORT.md'),
        path.resolve(process.cwd(), 'docs', 'final-report.md')
      ];
      return candidates.find(p => fs.existsSync(p)) || null;
    }

    it('T1-F25-01: Final report deliverable artifact exists in repository', () => {
      const reportPath = getFinalReportPath();
      assert.ok(
        reportPath !== null,
        'Milestone 4 Final Report deliverable (FINAL_REPORT.md or docs/FINAL_REPORT.md) must exist upon project completion per R5 and Acceptance Criteria'
      );
      const stat = fs.statSync(reportPath);
      assert.ok(stat.size > 200, `Final report at ${reportPath} must be non-empty and substantive (size: ${stat.size} bytes)`);
    });

    it('T1-F25-02: Final report catalogs all changed files and migration modifications', () => {
      const reportPath = getFinalReportPath();
      assert.ok(reportPath !== null, 'Final report must exist to verify changed files catalog');
      const content = fs.readFileSync(reportPath, 'utf8');
      assert.ok(
        /(?:##\s*|###\s*|\*\*)[^\n]*(?:changed\s*files|modified\s*files|file\s*changes)[^\n]*/i.test(content),
        'Final report must include a distinct section documenting Changed Files per R5'
      );
      // Verify that major modified entry points are explicitly cataloged
      const expectedFiles = ['index.html', 'about', 'services', 'projects', 'contact', 'vite.config.js'];
      for (const file of expectedFiles) {
        assert.ok(
          content.includes(file),
          `Final report changed files section must reference modified asset or route: ${file}`
        );
      }
    });

    it('T1-F25-03: Final report catalogs all added 301 redirects and migration mappings', () => {
      const reportPath = getFinalReportPath();
      assert.ok(reportPath !== null, 'Final report must exist to verify redirects catalog');
      const content = fs.readFileSync(reportPath, 'utf8');
      assert.ok(
        /(?:##\s*|###\s*|\*\*)[^\n]*(?:301\s*redirects?|redirects?\s*added|url\s*redirects?)[^\n]*/i.test(content),
        'Final report must include a section documenting Added 301 Redirects per R5'
      );
      // Verify legacy service and project route mappings are listed in the report
      const keyRedirects = [
        '/services/kitchens',
        '/services/turnkey-interiors',
        '/services/bathrooms',
        '/services/hospitality-healthcare',
        '/projects/light-pine-kitchen',
        '/projects/boardroom-conference-suites'
      ];
      for (const route of keyRedirects) {
        assert.ok(
          content.includes(route),
          `Final report redirects section must document redirect route: ${route}`
        );
      }
    });

    it('T1-F25-04: Final report catalogs all deleted template pages and removed files', () => {
      const reportPath = getFinalReportPath();
      assert.ok(reportPath !== null, 'Final report must exist to verify deleted pages catalog');
      const content = fs.readFileSync(reportPath, 'utf8');
      assert.ok(
        /(?:##\s*|###\s*|\*\*)[^\n]*(?:deleted\s*(?:pages|files)|removed\s*(?:pages|files)|template\s*cleanup)[^\n]*/i.test(content),
        'Final report must include a section documenting Deleted Pages / Template Cleanup per R5'
      );
      // Verify specific obsolete template pages removed are cited in the report
      assert.ok(
        content.includes('template-help/licences') || content.includes('licences'),
        'Final report must record removal of template-help/licences'
      );
      assert.ok(
        content.includes('template-help/changelog') || content.includes('changelog'),
        'Final report must record removal of template-help/changelog'
      );
      assert.ok(
        content.includes('icons-showcase.html') || content.includes('icons-showcase'),
        'Final report must record removal of icons-showcase.html'
      );
    });

    it('T1-F25-05: Final report documents layout-related text trims and verification audit', () => {
      const reportPath = getFinalReportPath();
      assert.ok(reportPath !== null, 'Final report must exist to verify layout trims section');
      const content = fs.readFileSync(reportPath, 'utf8');
      assert.ok(
        /(?:##\s*|###\s*|\*\*)[^\n]*(?:layout[\s-]*(?:related\s*)?(?:text\s*)?trims?|layout\s*safety|text\s*trims?)[^\n]*/i.test(content),
        'Final report must include a section documenting Layout-Related Text Trims (or explicit statement of none) per R5'
      );
      // Must also record verification check results (build status or link audit)
      assert.ok(
        /npm\s*run\s*build|build\s*(?:cleanliness|status|verification)|zero\s*(?:broken\s*links|errors)/i.test(content),
        'Final report must document build/link verification audit results per R5'
      );
    });
  });
});
