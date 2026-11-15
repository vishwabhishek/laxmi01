# Laxmi Enterprises — Turnkey Fit-Outs & Architectural Joinery Frontend

A modern frontend for **Laxmi Enterprises** (`https://laxmienterprises.in`).  
Turnkey commercial interior contracting, modular workstations, and bespoke architectural millwork across Mumbai and pan-India.

---

## Highlights

- **100% Local Asset Pipeline**: High-resolution WebP/SVG images, brand marks, and project showcases served locally from `public/assets/`.
- **Complete Route Coverage (16 Canonical Routes + 2 Utility Pages)**:
  - **Homepage** (`/`)
  - **About** (`/about`)
  - **Services Index** (`/services`)
  - **5 Service Detail Pages**:
    - Turnkey Interiors & Fit-Outs (`/services/turnkey-interiors`)
    - Hospitality & Healthcare Fit-Outs (`/services/hospitality-healthcare`)
    - Architectural Joinery & Furnishings (`/services/joinery-furnishings`)
    - Acoustic Panelling & Partitions (`/services/acoustics-partitions`)
    - Workstations & Critical Facilities (`/services/workstations-facilities`)
  - **Portfolio Index** (`/portfolio`)
  - **6 Project Detail Pages**:
    - 4Life Corporate Office & Healthcare Facility (`/projects/4life-andheri`)
    - Corporate Boardroom & Conference Suites (`/projects/boardroom-conference-suites`)
    - Acoustic Panelling & Demountable Partitions (`/projects/acoustic-panelling-partitions`)
    - Reception Lobby & Brand Displays (`/projects/reception-lobby-displays`)
    - Executive Director Cabins & Veneer Joinery (`/projects/executive-director-cabins`)
    - Modular Workstation Deployment (`/projects/modular-workstation-deployment`)
  - **Contact** (`/contact`)
  - **Utility Pages**: 404 Error (`/404.html`), 401 Protected (`/401.html`)
- **Interactive UI Components**: Floating pill navbar, full-screen mobile drawer, standardized FAQ accordion, project inquiries form, and closing CTA banners.

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

## Architectural & Design Documentation

Specifications are located in the [`docs/`](./docs) directory:

1. [**Website Audit Report**](./docs/website-audit.md): Executive summary, technology stack, and performance metrics.
2. [**Page Inventory**](./docs/page-inventory.md): Structural anatomy and URLs across all routes.
3. [**Design System Specification**](./docs/design-system.md): CSS root variables, color tokens, typography scales (`Plus Jakarta Sans` & `DM Sans`), and spacing grids.
4. [**Component Inventory**](./docs/component-inventory.md): Detailed DOM structures and states for reusable UI components.
5. [**Master Asset Inventory**](./docs/asset-inventory.md): Full audit of local assets and brand marks.
6. [**Interaction Specification**](./docs/interaction-specification.md): Behavioral triggers, cubic-bezier easings, and state machines for navigation and accordions.
