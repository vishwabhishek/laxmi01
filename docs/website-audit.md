# Comprehensive Website Audit & Reverse Engineering Specification

**Target Reference URL**: [https://woodworked-template.webflow.io](https://woodworked-template.webflow.io)  
**Webflow Site ID**: `6687bb58d107108aa401e5aa`  
**Webflow Template Name**: Woodworked (Bespoke Joiner, Carpenter & Woodworking Business Template)  
**Author / Designer**: FlowForge  
**Audit Date**: November 2026  
**Auditor**: Senior Website Reverse Engineer & Frontend Architect  

---

## 1. Executive Summary

This audit represents an exhaustive reverse-engineering evaluation of the Woodworked Webflow template. The site is a luxury, bespoke craftsmanship marketing and portfolio website engineered for high-end woodworkers, joiners, carpenters, and architectural timber contractors.

The site is distinguished by:
- **Warm, organic editorial aesthetic**: High-contrast dark chocolate/espresso wood tones (`#3e3128`) balanced by warm cream backgrounds (`#f4e6d5`), caramel/sand accents (`#e1af87`, `#eed5b9`), and clean typography.
- **Architectural Grid & Floating Navigation**: A signature floating pill navigation header (`position: fixed`, `inset: 1.5rem 1.5rem auto`) with delicate borders, rounded geometry, and a responsive off-canvas drawer on mobile/tablet.
- **CMS-Driven Multi-Tier Hierarchy**: 19 distinct routes organized cleanly across Home, About, Services (index + 5 category detail pages), Portfolio (index + 5 project case study pages), Contact with interactive inquiry forms, and Template governance pages.
- **Micro-Interactions**: Smooth cubic-bezier color fills (`cubic-bezier(0.645, 0.045, 0.355, 1)`), parallax hero image scaling, scroll-triggered text reveals, custom testimonial slider with custom arrows, and expandable FAQ accordions.

---

## 2. Technology Stack & Runtime Architecture

| Layer | Reference Technology | Characteristics & Implementation Details |
| :--- | :--- | :--- |
| **Generator** | Webflow CMS Engine | Static HTML export with semantic tags (`<header>`, `<section>`, `<footer>`, `<main>`) and Webflow CMS collection bindings. |
| **CSS Architecture** | Custom BEM-variant CSS | Compiled shared stylesheet (`woodworked-template.webflow.shared.d2983bccf.css`, 117 KB). 41 CSS root custom properties (`--color--*`, `--spacing--*`, `--site-width--*`). |
| **Typography Engine** | WebFont.js Google Fonts Loader | Dual typeface system: **Plus Jakarta Sans** (Weights: 200, 300, 400, 500, 600, 700, 800) for structural headings and brand display; **DM Sans** (Weights: 100-900 with italics) for body copy, navigational links, and UI labels. |
| **Scripting & DOM** | jQuery 3.5.1 + Webflow Core JS | Powers slider carousel (`.w-slider`), mobile menu drawer (`.w-nav-button`), tabs, and form submissions. |
| **Animation Engine** | Webflow IX2 (Interactions 2.0) | Scroll-bound parallax transforms, fade-ins with upward translation, button hover fills, and mobile menu state toggles. |
| **Asset Delivery** | Webflow CDN (Cloudfront / Fastly) | WebP and optimized JPEG image formats with responsive `srcset` resolutions ranging from 500px to 2000px. |

---

## 3. Discovered Page Architecture & Routing Topology

Through recursive automated Playwright crawling and template verification, **19 publicly accessible routes** were discovered and mapped:

```
https://woodworked-template.webflow.io
│
├── / (Home Page)
├── /about (Discover the Business / Company, Team & Values)
├── /services (Services Index / Overview & Work in Numbers)
│   ├── /services/kitchens (Bespoke Kitchen Cabinetry & Joinery)
│   ├── /services/bathrooms (Luxury Wood Vanities & Moisture-Resistant Joinery)
│   ├── /services/furniture (Custom Handcrafted Living & Dining Furniture)
│   ├── /services/flooring (Hardwood & Engineered Architectural Flooring)
│   └── /services/buildings (Timber Frame Outbuildings, Pergolas & Architectural Structures)
├── /portfolio (Portfolio Index / Featured Works & Gallery)
│   ├── /projects/light-pine-kitchen (Case Study 1)
│   ├── /projects/airy-apartment (Case Study 2)
│   ├── /projects/modern-kitchen (Case Study 3)
│   ├── /projects/hamptons-manor-house (Case Study 4)
│   └── /projects/dark-oak-kitchen (Case Study 5)
├── /contact (Contact & Free Quote Inquiry Form)
├── /template-help/licences (Asset Licensing & Image Attributions)
├── /template-help/changelog (Template Release History)
├── /404 (Custom Not Found Error Experience)
└── /401 (Protected Password Entry View)
```

---

## 4. Layout Variance & Structural Archetypes

The website does **not** rely on a monolithic page template. It employs **6 distinct structural layout archetypes**:

1. **Homepage Archetype** (`/`):
   - Hero Layout 1: Full-height viewport container (`min-height: 100svh`), full-bleed background imagery with rounded inner frame (`border-radius: 12px`), floating headline and corner link capsule.
   - Text Layout 1: Split typography with circular submark badge and intro narrative.
   - Navigation Layout 1: Interactive service card directory linking into sub-services.
   - Testimonial Layout 1: 4-slide multi-quote carousel with dot and arrow navigation.
   - Text Layout 2: Two-column brand values narrative with divider line.
   - Portfolio Layout 1: Featured 3-column project showcase.
   - CTA Layout 1: Full-width dark background consultation conversion banner.

2. **About Page Archetype** (`/about`):
   - Hero Layout 2: Editorial split hero with oversized headline and brand imagery.
   - Text Layouts 3, 4, 5: Three progressive narrative blocks (Craftsmanship, Who We Are, Process).
   - Team Layout 1: 4-column master carpenter and artisan team showcase.
   - Testimonial Layout 2: Static blockquote review card.
   - CTA Layout 2: Distinct editorial quote banner.

3. **Services Index Archetype** (`/services`):
   - Hero Layout 3: Minimalist typographic breadcrumb header.
   - Text Layout 6: "Our work in numbers" statistical counter grid (4 metrics).
   - Services Layout 1: Heavy photographic service cards with tag pills and direct sub-page routes.
   - FAQ Layout 1: Categorized accordion Q&A block.

4. **Service Detail Archetype** (`/services/[slug]` - 5 pages):
   - Hero Layout 3 with dynamic service title.
   - Text Layout 3 & 7: Service specification, timber options, craftsmanship methodology, and gallery.
   - FAQ Layout 1: Service-specific frequently asked questions.
   - CTA Layout 3: Customized service consultation conversion block.

5. **Portfolio Index & Project Detail Archetypes** (`/portfolio` & `/projects/[slug]`):
   - Portfolio Index: Dynamic filterable project cards with category badges and image zoom hover states.
   - Project Detail: High-resolution project hero banner, metadata bar (Client, Location, Completion Date, Wood Species), expansive multi-image project gallery, narrative case study, and bottom CTA banner.

6. **Utility Archetypes** (`/contact`, `/template-help/*`, `/404`, `/401`):
   - Contact: Split layout with business location info, business hours, interactive inquiry form with dropdown selection, and embedded FAQ.
   - Template Pages: Clean document layout for licences and changelog.
   - 404 & 401: Centered minimalist cards with return to homepage actions.

---

## 5. Responsive Behavior & Viewport Breakpoints

The site strictly adheres to a 4-tier responsive grid system:

| Viewport Tier | Width Threshold | Container Padding | Layout Adjustments |
| :--- | :--- | :--- | :--- |
| **Desktop** | `> 991px` (Max 1440px) | `4rem` (64px) | Full 3-4 column grids, floating horizontal pill navbar, side-by-side split heroes. |
| **Tablet** | `768px – 991px` | `2rem` (32px) | Grids collapse to 2 columns. Floating header collapses links into a slide-down drawer via hamburger button. |
| **Mobile Landscape** | `480px – 767px` | `1.5rem` (24px) | Single-column cards, font sizes scale down (h1 drops from 72px to 36px), statistics stack 2x2. |
| **Mobile Portrait** | `< 479px` | `1rem` (16px) | Full single-column linear flow, touch-optimized button targets, h1 scales to 32px. |

---

## 6. Visual Design System Highlights

- **Dominant Background**: Warm Cream `#f4e6d5` (CSS var `--color--lightest`).
- **Dominant Primary Text & Contrast**: Dark Espresso `#3e3128` (CSS var `--color--darkest`).
- **Accent Tones**: Warm Wood Caramel `#e1af87` (`--color--accent`) and Sand `#eed5b9` (`--color--light`).
- **Border Radii**: Strict geometric repetition of `0.75rem` (12px) across cards, inner frames, buttons, and floating navbar.
- **Button Micro-Interactions**: Rounded pill buttons with solid fills and smooth text color inversion on hover.
- **Floating Header**: Always fixed at top (`inset: 1.5rem 1.5rem auto`, `z-index: 998`), maintaining situational awareness across long scroll sessions.

---

## 7. Next Steps & Implementation Readiness

All 19 pages have been crawled, visually captured at 3 viewports (desktop, tablet, mobile), asset-mapped, and interaction-tested. The design system, page inventory, component specifications, and asset catalogs have been fully extracted and documented in subsequent companion reports.
