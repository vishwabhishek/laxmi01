/**
 * Tier 4: Real-World Scenarios & User Journeys (6 Multi-Step Journeys)
 * Simulates realistic end-user persona workflows across pages, redirects, and forms.
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';

import { startServer, stopServer } from '../helpers/server.js';
import { defaultClient } from '../helpers/client.js';
import {
  parseHtml,
  getTitle,
  getHeadings,
  getButtons,
  getFaqs,
  getCapabilities,
  getClosingCtaBanner
} from '../helpers/html.js';
import { PROHIBITED_TERMS } from '../fixtures/ground-truth.js';

describe('Tier 4: Real-World Application Scenarios (Journeys 1–6)', () => {
  let serverInstance = null;

  before(async () => {
    serverInstance = await startServer();
  });

  after(async () => {
    if (serverInstance?.server) {
      await stopServer();
    }
  });

  // Journey 1: Commercial PMC Turnkey Fit-Out Inquiry
  it('Scenario 1: Commercial PMC Fit-Out Inquiry Journey (Home -> Turnkey Service -> Contact)', async () => {
    // Step 1: PMC lands on Home (/)
    const homeRes = await defaultClient.get('/');
    assert.strictEqual(homeRes.status, 200);
    const homeHtml = await homeRes.text();

    // Step 2: PMC verifies H1 and commercial hero positioning
    const homeHeadings = getHeadings(homeHtml);
    assert.ok(homeHeadings.h1.includes('Turnkey Interior Fit-Outs & Architectural Joinery'));
    assert.ok(homeHtml.includes('25+ years of site leadership delivering turnkey fit-outs'));

    // Step 3: PMC checks trust line credentials
    assert.ok(homeHtml.includes('GST-registered · Mumbai-based · Pan-India deployment'));

    // Step 4: PMC clicks through to Turnkey Interiors service page
    const serviceRes = await defaultClient.get('/services/turnkey-interiors');
    assert.strictEqual(serviceRes.status, 200);
    const serviceHtml = await serviceRes.text();

    // Step 5: Reviews 6 capability cards
    const serviceCapabilities = getCapabilities(serviceHtml);
    for (const cap of ['Architectural Joinery', 'Civil & Partitions', 'Electrical & Lighting', 'Plumbing & MEP Coordination', 'Finishes & Hardware', 'Laser-Level Precision']) {
      assert.ok(
        serviceCapabilities.some(c => c.title.includes(cap) || c.description.includes(cap)) ||
        serviceHtml.includes(cap) ||
        serviceHtml.includes(cap.replace(/&/g, '&amp;')),
        `Service detail page missing capability: ${cap}`
      );
    }

    // Step 6: Verifies FAQs on materials and start speed
    const faqs = getFaqs(serviceHtml);
    assert.ok(faqs.items.some(item => item.q.includes('Which materials do you use?')));
    assert.ok(faqs.items.some(item => item.q.includes('How quickly can you start')));

    // Step 7: Clicks closing CTA button "Get a Quote"
    const banner = getClosingCtaBanner(serviceHtml);
    assert.strictEqual(banner.buttonHref, '/contact');

    // Step 8: Lands on Contact page
    const contactRes = await defaultClient.get(banner.buttonHref);
    assert.strictEqual(contactRes.status, 200);
    const contactHtml = await contactRes.text();
    const contactHeadings = getHeadings(contactHtml);
    assert.ok(contactHeadings.h2.includes('Request a Proposal or Quote'));
    assert.ok(contactHtml.includes('Tenders & BOQ Submissions'));
  });

  // Journey 2: Executive Architect Portfolio Due Diligence
  it('Scenario 2: Executive Architect Portfolio Due Diligence (Home -> Portfolio -> Boardroom -> Contact)', async () => {
    // Step 1: Architect lands on Home and navigates to Portfolio
    const portRes = await defaultClient.get('/portfolio');
    assert.strictEqual(portRes.status, 200);
    const portHtml = await portRes.text();

    // Step 2: Reviews portfolio headings
    const portHeadings = getHeadings(portHtml);
    assert.ok(portHeadings.h1.includes('Portfolio'));
    assert.ok(portHeadings.h2.includes('Executed Fit-Out Projects'));

    // Step 3: Selects Boardroom project card
    assert.ok(portHtml.includes('/projects/boardroom-conference-suites'));
    const projRes = await defaultClient.get('/projects/boardroom-conference-suites');
    assert.strictEqual(projRes.status, 200);
    const projHtml = await projRes.text();

    // Step 4: Reviews project specifications
    assert.strictEqual(getTitle(projHtml), 'Corporate Boardroom & Conference Suites | Laxmi Enterprises');
    assert.ok(projHtml.includes('20-seater suite with dual-screen video wall'));

    // Step 5: Clicks secondary CTA "Share BOQ for Estimation"
    assert.ok(projHtml.includes('Share BOQ for Estimation'));

    // Step 6: Navigates to contact endpoint
    const contactRes = await defaultClient.get('/contact');
    assert.strictEqual(contactRes.status, 200);
  });

  // Journey 3: Legacy Bookmark Redirect & Transition
  it('Scenario 3: Legacy Bookmark Redirect & Transition (/services/kitchens -> 301 -> /services/turnkey-interiors)', async () => {
    // Step 1: Visitor requests legacy bookmarked path
    const res = await defaultClient.get('/services/kitchens', { redirect: 'manual' });

    // Step 2: Server returns strict HTTP 301
    assert.strictEqual(res.status, 301);
    assert.strictEqual(res.location, '/services/turnkey-interiors');

    // Step 3: Visitor follows redirect to modernized page
    const destRes = await defaultClient.get(res.location);
    assert.strictEqual(destRes.status, 200);
    const destHtml = await destRes.text();

    // Step 4: Verifies modern title and headings
    assert.strictEqual(getTitle(destHtml), 'Turnkey Interiors & Fit-Outs | Laxmi Enterprises');

    // Step 5: Verifies zero legacy terminology remains on redirected destination
    for (const term of PROHIBITED_TERMS) {
      assert.ok(!destHtml.toLowerCase().includes(term.toLowerCase()), `Destination contains banned term: ${term}`);
    }

    // Step 6: Continues browsing to another modernized service
    const wsRes = await defaultClient.get('/services/workstations-facilities');
    assert.strictEqual(wsRes.status, 200);
  });

  // Journey 4: Lost Visitor / Broken Link 404 Recovery Journey
  it('Scenario 4: Lost Visitor 404 Recovery Journey (/projects/old-manor-spec -> 404 -> Return Home or Get a Quote)', async () => {
    // Step 1: Visitor types invalid URL
    const res = await defaultClient.get('/projects/old-manor-spec');
    assert.strictEqual(res.status, 404);
    const html = await res.text();

    // Step 2: Custom 404 template renders helpful copy
    assert.ok(html.includes("This page doesn't exist or has moved."));

    // Step 3: Visitor exercises "Return Home" recovery action
    assert.match(html, /<a[^>]+href=["']\/["'][^>]*>[\s\S]*?Return Home/i);
    const homeRes = await defaultClient.get('/');
    assert.strictEqual(homeRes.status, 200);

    // Step 4: Visitor exercises "Get a Quote" recovery action
    assert.match(html, /<a[^>]+href=["']\/contact["'][^>]*>[\s\S]*?Get a Quote/i);
    const quoteRes = await defaultClient.get('/contact');
    assert.strictEqual(quoteRes.status, 200);
  });

  // Journey 5: General Contractor Compliance & FAQ Diligence
  it('Scenario 5: General Contractor Compliance & FAQ Diligence (/about -> /services -> /contact)', async () => {
    // Step 1: Contractor lands on /about to review enterprise qualifications
    const aboutRes = await defaultClient.get('/about');
    assert.strictEqual(aboutRes.status, 200);
    const aboutHtml = await aboutRes.text();

    // Step 2: Reviews leadership and 4-stage process
    assert.ok(aboutHtml.includes('25+ Years of Field Leadership'));
    assert.ok(aboutHtml.includes('1. Drawing & BOQ Study'));
    assert.ok(aboutHtml.includes('4. Snag Audit & Handover'));

    // Step 3: Clicks "View All Services"
    const servicesRes = await defaultClient.get('/services');
    assert.strictEqual(servicesRes.status, 200);
    const servicesHtml = await servicesRes.text();

    // Step 4: Reviews labour-only and site supervision FAQs
    const faqs = getFaqs(servicesHtml);
    const labourFaq = faqs.items.find(item => item.q.includes('labour-only contracts'));
    assert.ok(labourFaq, 'Must find labour-only contract FAQ');
    assert.ok(labourFaq.a.includes('labour-only') || labourFaq.a.includes('turnkey/item-rate'));

    const supervisionFaq = faqs.items.find(item => item.q.includes('supervised on site'));
    assert.ok(supervisionFaq, 'Must find on-site supervision FAQ');
    assert.ok(supervisionFaq.a.includes('supervisors oversee site operations') && supervisionFaq.a.includes('specialists are also directly involved'));

    // Step 5: Clicks Contact Us to submit tender
    const contactRes = await defaultClient.get('/contact');
    assert.strictEqual(contactRes.status, 200);
  });

  // Journey 6: Multi-Device Viewport Navigation Flow
  it('Scenario 6: Multi-Device Viewport Navigation Flow (Mobile drawer -> acoustics-partitions -> contact)', async () => {
    // Step 1: Mobile visitor checks viewport meta tag
    const homeRes = await defaultClient.get('/');
    assert.strictEqual(homeRes.status, 200);
    const homeHtml = await homeRes.text();
    assert.match(homeHtml, /<meta[^>]*name=["']viewport["'][^>]*>/i);
    assert.match(homeHtml, /<meta[^>]*width=device-width[^>]*>/i);

    // Step 2: Mobile drawer button is present
    assert.match(homeHtml, /class=["'][^"']*header-menu-button[^"']*["']/i);

    // Step 3: Mobile drawer contains modernized links
    assert.match(homeHtml, /href=["']\/services\/acoustics-partitions["']/i);

    // Step 4: Navigates to Acoustic Panelling service page
    const serviceRes = await defaultClient.get('/services/acoustics-partitions');
    assert.strictEqual(serviceRes.status, 200);
    const serviceHtml = await serviceRes.text();

    // Step 5: Mobile drawer Get a Quote action reaches contact page
    const contactRes = await defaultClient.get('/contact');
    assert.strictEqual(contactRes.status, 200);
  });
});
