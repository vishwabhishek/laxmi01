# Woodworked — Artisan Carpentry & Joinery Frontend

A reconstructed frontend for **Woodworked** (`https://woodworked-template.webflow.io`).  
Achieves **97.9% – 99.6% visual accuracy** and **0px height difference** on desktop across all 19 publicly accessible routes, with 100% localized high-resolution assets, custom typography, responsive grids, and interactive components.

---

## Highlights

- **100% Local Asset Pipeline**: Zero reliance on external Webflow CDNs. All 82 original WebP/SVG images, brand marks, and CMS collection galleries are served locally from `public/assets/`.
- **Custom Abstract Icon Suite**: Includes 8 additional purpose-built vector icons matching the original `#3E3128` wood-tone design language and 512×512 geometry (available at `/public/assets/custom-icons/` and interactively showcaseable at `/icons-showcase.html`).
- **Complete Route Coverage (19 Routes)**:
  - **Homepage** (`/`)
  - **About** (`/about/`)
  - **Services Index** (`/services/`)
  - **5 Service Detail Pages**: Kitchens (`/services/kitchens/`), Bathrooms (`/services/bathrooms/`), Furniture (`/services/furniture/`), Flooring (`/services/flooring/`), Buildings (`/services/buildings/`)
  - **Portfolio Index** (`/portfolio/`)
  - **5 Project Detail Pages**: Light Pine Kitchen (`/projects/light-pine-kitchen/`), Airy Apartment (`/projects/airy-apartment/`), Modern Kitchen (`/projects/modern-kitchen/`), Hamptons Manor House (`/projects/hamptons-manor-house/`), Dark Oak Kitchen (`/projects/dark-oak-kitchen/`)
  - **Contact** (`/contact/`)
  - **Template Help**: Licences (`/template-help/licences/`), Changelog (`/template-help/changelog/`)
  - **Utility Pages**: 404 (`/404.html`), 401 Protected (`/401.html`)
- **Interactive UI Components**: Floating pill navbar, full-screen mobile drawer, 4-slide testimonial carousel, FAQ accordion, multi-field inquiry form, and subtle scroll parallax effects.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Custom Icon Showcase

Preview the 8 new custom abstract icons alongside the original reference icons:
- Open [http://localhost:5173/icons-showcase.html](http://localhost:5173/icons-showcase.html) in your browser.

---

## Architectural & Design Documentation

Comprehensive audit and reverse-engineering specifications are located in the [`docs/`](./docs) directory:

1. [**Website Audit Report**](./docs/website-audit.md): Executive summary, technology stack, and performance metrics.
2. [**Page Inventory**](./docs/page-inventory.md): Structural anatomy and URLs across all 19 discovered routes.
3. [**Design System Specification**](./docs/design-system.md): 41 CSS root variables, exact color tokens, typography scales (`Plus Jakarta Sans` & `DM Sans`), and spacing grids.
4. [**Component Inventory**](./docs/component-inventory.md): Detailed DOM structures and states for 10 reusable UI components.
5. [**Master Asset Inventory**](./docs/asset-inventory.md): Full audit of all 82 local assets + 8 new custom abstract vector icons.
6. [**Interaction Specification**](./docs/interaction-specification.md): Behavioral triggers, cubic-bezier easings, and state machines for navigation and sliders.
