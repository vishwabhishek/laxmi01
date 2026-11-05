# Master Page Inventory & Route Specifications

**Reference URL**: [https://woodworked-template.webflow.io](https://woodworked-template.webflow.io)  
**Total Identified Routes**: 19  
**Audit Viewports Tested**: Desktop (1440×900), Tablet (768×1024), Mobile (390×844)  

---

## 1. Route Topology & Sitemap Overview

| Route Path | Page Name / Slug | Archetype | Sections Count | Images | Key Interactions |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `/` | **Home** (`home`) | Homepage | 9 | 20 | Hero Parallax, Testimonial Slider, Hover Cards |
| `/about` | **About Us** (`about`) | About | 9 | 12 | Team Grid, Craftsmanship Story, Process Steps |
| `/services` | **Services Directory** (`services`) | Index / Listing | 8 | 11 | Number Counter, Category Grid, FAQ Accordion |
| `/services/kitchens` | **Service: Kitchens** (`service_kitchens`) | Service Detail | 8 | 7 | Materials Spec, Gallery, FAQ, Inquiry CTA |
| `/services/bathrooms` | **Service: Bathrooms** (`service_bathrooms`) | Service Detail | 8 | 7 | Moisture-Proof Joinery, Gallery, FAQ, CTA |
| `/services/furniture` | **Service: Furniture** (`service_furniture`) | Service Detail | 8 | 7 | Custom Joinery, Gallery, FAQ, CTA |
| `/services/flooring` | **Service: Flooring** (`service_flooring`) | Service Detail | 8 | 7 | Hardwood Specs, Gallery, FAQ, CTA |
| `/services/buildings` | **Service: Buildings** (`service_buildings`) | Service Detail | 8 | 7 | Timber Outbuildings, Gallery, FAQ, CTA |
| `/portfolio` | **Portfolio Directory** (`portfolio`) | Portfolio Listing | 7 | 8 | Project Card Zoom, Filterable Grid, Quote Card |
| `/projects/light-pine-kitchen` | **Project: Light Pine Kitchen** (`project_light_pine_kitchen`) | Project Detail | 4 | 7 | Full-Bleed Gallery, Project Metadata, Quote CTA |
| `/projects/airy-apartment` | **Project: Airy Apartment** (`project_airy_apartment`) | Project Detail | 4 | 7 | Architectural Case Study, Specs, Gallery |
| `/projects/modern-kitchen` | **Project: Modern Kitchen** (`project_modern_kitchen`) | Project Detail | 4 | 7 | Contemporary Joinery Showcase, Gallery |
| `/projects/hamptons-manor-house` | **Project: Hamptons Manor House** (`project_hamptons_manor_house`) | Project Detail | 4 | 7 | Heritage Restoration Showcase, Gallery |
| `/projects/dark-oak-kitchen` | **Project: Dark Oak Kitchen** (`project_dark_oak_kitchen`) | Project Detail | 4 | 7 | Rich Espresso Timber Showcase, Gallery |
| `/contact` | **Contact & Quote** (`contact`) | Contact / Form | 4 | 4 | Multi-field Inquiry Form, Validation, FAQ |
| `/template-help/licences` | **Licensing** (`template_licences`) | Documentation | 3 | 2 | Asset Attributions, Unsplash/Pexels Links |
| `/template-help/changelog` | **Changelog** (`template_changelog`) | Documentation | 3 | 2 | Release Versions, Template History |
| `/404` | **Not Found** (`404`) | Utility | 2 | 2 | Error Illustration, Return Home CTA |
| `/401` | **Protected Page** (`401`) | Utility | 0 | 0 | Password Input Form, Authentication Gate |

---

## 2. In-Depth Page Specifications

### 2.1 Home Page (`/`)
- **URL**: `https://woodworked-template.webflow.io/`
- **Slug**: `home`
- **Title**: `Woodworked - Webflow HTML website template`
- **Primary Headings**:
  - H1: `Turning homes into artwork`
  - H2: `[ Who we are ]`, `[ Our services ]`, `[ Testimonials ]`, `[ Our Values ]`
- **Section Sequence**:
  1. `header`: Fixed floating navigation pill with logo, links, social icons, and "Get a Quote" CTA.
  2. `hero-layout-one`: Full-height viewport hero (`min-height: 100svh`) with large background photograph of master carpenter workshop, headline "Turning homes into artwork", subheadline, and link card "Take a look at some of our previous work".
  3. `text-layout-one`: Introductory narrative "Hand crafting perfection since 1967", circular rotating submark seal, and two-column overview copy.
  4. `navigation-layout-one`: Interactive directory of primary service disciplines with thumbnail previews.
  5. `testimonial-layout-one`: Testimonial carousel with 4 slides, left/right control buttons, and dot indicators.
  6. `text-layout-two`: Brand values grid (Sustainability, Precision, Heritage, Lifetime Quality).
  7. `portfolio-layout-one`: 3-column featured projects gallery preview.
  8. `cta-layout-one`: Dark chocolate conversion section with headline "Enquire now for a free quote" and button.
  9. `footer`: 2-column site link columns, branding, legal links, and social icons.
- **Visual Artifacts**:
  - Desktop Screenshot: `audit_tools/screenshots/desktop/home_full.png`
  - Tablet Screenshot: `audit_tools/screenshots/tablet/home_full.png`
  - Mobile Screenshot: `audit_tools/screenshots/mobile/home_full.png`

---

### 2.2 About Page (`/about`)
- **URL**: `https://woodworked-template.webflow.io/about`
- **Slug**: `about`
- **Primary Headings**:
  - H1: `[ Discover the business ]`
  - H2: `Masterful craftsmanship`, `[ Who we are ]`, `a team brimming with passion, expertise and knowledge`, `Our Process for reliable success`
- **Section Sequence**:
  1. `header`: Fixed floating navigation header.
  2. `hero-layout-two`: Split hero with headline, company narrative, and large artisan workshop portrait.
  3. `text-layout-three`: Core story on sustainable forestry, traditional wood selection, and generational skills.
  4. `text-layout-four`: Who we are narrative with dual imagery.
  5. `text-layout-five`: 4-step process breakdown (Consultation, Design & 3D Modeling, Hand Crafting, Final Installation).
  6. `team-layout-one`: 4-column team member showcase featuring founders, master joiners, and wood finishing specialists.
  7. `testimonial-layout-two`: Client endorsement quote block.
  8. `cta-layout-two`: Consultation invitation block.
  9. `footer`: Standard site footer.
- **Visual Artifacts**:
  - Desktop Screenshot: `audit_tools/screenshots/desktop/about_full.png`
  - Tablet Screenshot: `audit_tools/screenshots/tablet/about_full.png`
  - Mobile Screenshot: `audit_tools/screenshots/mobile/about_full.png`

---

### 2.3 Services Directory Page (`/services`)
- **URL**: `https://woodworked-template.webflow.io/services`
- **Slug**: `services`
- **Primary Headings**:
  - H1: `[ Woodworking, Joinery & Carpentry Services ]`
  - H2: `Our Services`, `[ Our work in numbers ]`, `Kitchens`, `Bathrooms`, `Furniture`, `Flooring`, `Buildings`
- **Section Sequence**:
  1. `header`: Fixed floating navigation header.
  2. `hero-layout-three`: Minimalist header breadcrumb and title banner.
  3. `text-layout-six`: Metrics banner (Years in Business, Completed Projects, Wood Types Stocked, Client Satisfaction Rate).
  4. `services-layout-one`: 5 rich photographic service cards linking to sub-service detail pages.
  5. `testimonial-layout-one`: Testimonial slider.
  6. `faq-layout-one`: Expandable FAQ accordion answering timeline, materials, and pricing questions.
  7. `cta-layout-one`: Free quote banner.
  8. `footer`: Standard site footer.
- **Visual Artifacts**:
  - Desktop Screenshot: `audit_tools/screenshots/desktop/services_full.png`
  - Tablet Screenshot: `audit_tools/screenshots/tablet/services_full.png`
  - Mobile Screenshot: `audit_tools/screenshots/mobile/services_full.png`

---

### 2.4 Service Detail Pages (5 Routes)
1. `/services/kitchens` (Kitchen Joinery & Custom Cabinetry)
2. `/services/bathrooms` (Luxury Wooden Vanities & Bathroom Elements)
3. `/services/furniture` (Bespoke Dining, Desks, and Storage Furniture)
4. `/services/flooring` (Solid Hardwood, Parquet & Engineered Timber)
5. `/services/buildings` (Garden Studios, Timber Framing & Pergolas)

- **Common Structural Blueprint (8 Sections)**:
  1. `header`: Floating navigation header.
  2. `hero-layout-three`: Breadcrumb link (`Services / [Service Name]`) and service title.
  3. `text-layout-three`: Service overview narrative, craftsmanship philosophy, and materials guide.
  4. `text-layout-seven`: Detailed service feature breakdown with high-res photo gallery.
  5. `faq-layout-one`: Service-specific questions and technical specifications.
  6. `testimonial-layout-one`: Client reviews specific to joinery and craftsmanship.
  7. `cta-layout-three`: Custom consultation call-to-action tailored to the service.
  8. `footer`: Standard site footer.
- **Visual Artifacts**:
  - Kitchens: `audit_tools/screenshots/desktop/service_kitchens_full.png`
  - Bathrooms: `audit_tools/screenshots/desktop/service_bathrooms_full.png`
  - Furniture: `audit_tools/screenshots/desktop/service_furniture_full.png`
  - Flooring: `audit_tools/screenshots/desktop/service_flooring_full.png`
  - Buildings: `audit_tools/screenshots/desktop/service_buildings_full.png`

---

### 2.5 Portfolio Directory Page (`/portfolio`)
- **URL**: `https://woodworked-template.webflow.io/portfolio`
- **Slug**: `portfolio`
- **Primary Headings**:
  - H1: `[ Woodworking, Joinery & Carpentry Projects ]`
  - H2: `Our Work`, `Browse some of our favorite projects.`
- **Section Sequence**:
  1. `header`: Floating navigation header.
  2. `hero-layout-three`: Clean typographic header.
  3. `text-layout-eight`: Introduction narrative on architectural woodworking excellence.
  4. `portfolio-layout-two`: 2-column grid of all 5 featured project cards with image hover zoom, category tags, and links to detail case studies.
  5. `testimonial-layout-two`: Featured architect / homeowner endorsement.
  6. `cta-layout-two`: Project commission CTA.
  7. `footer`: Standard site footer.
- **Visual Artifacts**:
  - Desktop Screenshot: `audit_tools/screenshots/desktop/portfolio_full.png`
  - Tablet Screenshot: `audit_tools/screenshots/tablet/portfolio_full.png`
  - Mobile Screenshot: `audit_tools/screenshots/mobile/portfolio_full.png`

---

### 2.6 Project Detail Pages (5 Routes)
1. `/projects/light-pine-kitchen`
2. `/projects/airy-apartment`
3. `/projects/modern-kitchen`
4. `/projects/hamptons-manor-house`
5. `/projects/dark-oak-kitchen`

- **Common Structural Blueprint (4 Sections)**:
  1. `header`: Floating navigation header.
  2. `portfolio-page-layout`:
     - Project Hero Title (H1) and Location / Date / Scope metadata grid.
     - Full-width hero photograph.
     - Multi-paragraph project brief and execution narrative.
     - Multi-image gallery showcasing fine joinery details, dovetail joints, and installed architecture.
  3. `cta-layout-one`: Consultation CTA with headline "Enquire now for a free quote".
  4. `footer`: Standard site footer.
- **Visual Artifacts**:
  - Light Pine: `audit_tools/screenshots/desktop/project_light_pine_kitchen_full.png`
  - Airy Apartment: `audit_tools/screenshots/desktop/project_airy_apartment_full.png`
  - Modern Kitchen: `audit_tools/screenshots/desktop/project_modern_kitchen_full.png`
  - Hamptons Manor: `audit_tools/screenshots/desktop/project_hamptons_manor_house_full.png`
  - Dark Oak: `audit_tools/screenshots/desktop/project_dark_oak_kitchen_full.png`

---

### 2.7 Contact Page (`/contact`)
- **URL**: `https://woodworked-template.webflow.io/contact`
- **Slug**: `contact`
- **Primary Headings**:
  - H1: `[ Get in touch ]`
  - H2: `Contact us for a free quote or consultation`, `Looking for some answers?`
- **Section Sequence**:
  1. `header`: Floating navigation header.
  2. `hero-layout-four`: Split layout:
     - Left column: Direct contact details (Email, Phone, Workshop Address, Studio Opening Hours).
     - Right column: Interactive inquiry form containing 5 inputs (Name, Phone Number, Email Address, Type of Service dropdown, Inquiry Message textarea) and Submit button.
  3. `faq-layout-one`: Project engagement FAQs.
  4. `footer`: Standard site footer.
- **Visual Artifacts**:
  - Desktop Screenshot: `audit_tools/screenshots/desktop/contact_full.png`
  - Tablet Screenshot: `audit_tools/screenshots/tablet/contact_full.png`
  - Mobile Screenshot: `audit_tools/screenshots/mobile/contact_full.png`

---

### 2.8 Documentation & Utility Pages
1. `/template-help/licences`: Image and typography licensing attributions.
2. `/template-help/changelog`: Version history and template release records.
3. `/404`: Custom 404 page with woodworked styling and "Back to Home" button.
4. `/401`: Protected page view with password authentication field.
- **Visual Artifacts**:
  - Licences: `audit_tools/screenshots/desktop/template_licences_full.png`
  - Changelog: `audit_tools/screenshots/desktop/template_changelog_full.png`
  - 404: `audit_tools/screenshots/desktop/404_full.png`
  - 401: `audit_tools/screenshots/desktop/401_full.png`
