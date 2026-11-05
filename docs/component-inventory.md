# Component Inventory & Structural Anatomy Specification

**Reference URL**: [https://woodworked-template.webflow.io](https://woodworked-template.webflow.io)  
**Total Reusable Components**: 18 Component Modules  

---

## 1. Global Navigation & Chrome Components

### 1.1 Floating Pill Header (`Header`)
- **Webflow Classes**: `.header`, `.header-container`, `.header-logo-link`, `.header-nav-link`, `.header-social-link`, `.header-menu-button`
- **DOM Structure**:
  ```html
  <header class="header">
    <div class="header-container">
      <div class="header-logo-wrapper">
        <a href="/" class="header-logo-link">
          <img src="...logo.svg" alt="Woodworked" class="header-logo" />
        </a>
      </div>
      <nav class="header-nav-menu">
        <a href="/" class="header-nav-link">Home</a>
        <a href="/about" class="header-nav-link">About</a>
        <a href="/portfolio" class="header-nav-link">Portfolio</a>
        <a href="/services" class="header-nav-link">Services</a>
      </nav>
      <div class="header-social-wrapper">
        <a href="..." class="header-social-link" aria-label="Facebook"><svg>...</svg></a>
        <a href="..." class="header-social-link" aria-label="LinkedIn"><svg>...</svg></a>
        <a href="..." class="header-social-link" aria-label="Instagram"><svg>...</svg></a>
      </div>
      <div class="header-cta-wrapper">
        <a href="/contact" class="primary-button darkest">Get a Quote</a>
      </div>
      <button class="header-menu-button" aria-label="Toggle menu">
        <span class="menu-icon-line"></span>
        <span class="menu-icon-line"></span>
      </button>
    </div>
  </header>
  ```
- **CSS Specifications**:
  - Position: `fixed; inset: 1.5rem 1.5rem auto; z-index: 998;`
  - Container: `border: 1px solid var(--color--light); border-radius: 0.75rem; background-color: var(--color--lightest); padding: 0.75rem 2rem; display: flex; align-items: center; justify-content: space-between;`
  - Responsive: On screens `< 991px`, `.header-nav-menu` collapses into an animated off-canvas slide-down drawer triggered by `.header-menu-button`.

### 1.2 Master Footer (`Footer`)
- **Webflow Classes**: `.footer`, `.footer-container`, `.footer-upper`, `.footer-lower`, `.link-style-one`
- **DOM Anatomy**:
  - `.footer-upper`: 3-column split:
    - Column 1: Woodworked Logo, company registration, workshop address, newsletter/contact prompt.
    - Column 2: Main navigation links (`Home`, `About`, `Portfolio`, `Services`, `Contact`).
    - Column 3: Services index links (`Kitchens`, `Bathrooms`, `Furniture`, `Flooring`, `Buildings`).
  - `.footer-lower`: Horizontal bar separated by `1px solid var(--color--dark)`:
    - Left: Copyright notice `© Woodworked 2026. All rights reserved.`
    - Right: Sub-links (`Licensing`, `Built by FlowForge`, `Powered by Webflow`).
- **Styling**: `background-color: var(--color--darkest); color: var(--color--lightest); padding: 4.5rem 4rem 2rem;`

---

## 2. Hero Section Components

### 2.1 Hero Layout One (Home Hero)
- **Webflow Class**: `.hero-layout-one`
- **Purpose**: Full-viewport immersive landing hero with framed workshop imagery.
- **Anatomy**:
  - Outer Wrapper: `min-height: 100svh; padding: 0.75rem; display: flex; align-items: stretch;`
  - Inner Frame: `border-radius: 0.75rem; overflow: hidden; position: relative; width: 100%;`
  - Background Image: Full-bleed high-res workshop imagery with subtle dark overlay (`rgba(0,0,0,0.2)`).
  - Content Wrapper: `position: relative; z-index: 2; padding: 12rem 4rem 4.5rem; display: flex; justify-content: space-between; align-items: flex-end;`
  - Left Content: Tag `[ Bespoke Joiner, Carpenter & Woodworking ]`, H1 `Turning homes into artwork`.
  - Right Floating Capsule: Pill card `Take a look at some of our previous work` with animated arrow linking to `/portfolio`.

### 2.2 Hero Layout Two (About Hero)
- **Webflow Class**: `.hero-layout-two`
- **Purpose**: Editorial split presentation of company heritage.
- **Anatomy**: Tag `[ Discover the business ]`, oversized H2 `Masterful craftsmanship`, narrative description, and large framed photograph of the master workshop.

### 2.3 Hero Layout Three (Services & Portfolio Index Hero)
- **Webflow Class**: `.hero-layout-three`
- **Purpose**: Consistent typographic header for directory and sub-service pages.
- **Anatomy**: Centered/Left-aligned uppercase badge pill, H1 title, and introductory subtitle.

### 2.4 Hero Layout Four (Contact Hero)
- **Webflow Class**: `.hero-layout-four`
- **Purpose**: Split contact details and interactive inquiry form.

### 2.5 Portfolio Page Hero (Project Case Study Hero)
- **Webflow Class**: `.portfolio-page-layout`
- **Purpose**: Project title, scope tags, date, and full-width gallery header.

---

## 3. Narrative & Content Layout Modules

### 3.1 Text Layout One (Brand Introduction)
- **Webflow Class**: `.text-layout-one`
- **Components**:
  - Tag pill: `[ Who we are ]`
  - Rotating Submark Badge: Circular SVG badge `text-layout-one-submark` positioned at top right.
  - Headline: `Hand Crafting perfection since 1967`
  - Horizontal Accent Divider: `divider-line background-accent` (Height: 2px, background: `#e1af87`)
  - Two-Column Body Narrative: Artisan heritage and client commitment.

### 3.2 Text Layout Two (Company Values)
- **Webflow Class**: `.text-layout-two`
- **Components**: 4-card grid detailing Woodworked core values (Sustainability, Precision, Heritage, Lifetime Durability).

### 3.3 Text Layout Five (Process Steps)
- **Webflow Class**: `.text-layout-five`
- **Components**: 4 progressive process cards:
  1. `01 / Consultation & Timber Selection`
  2. `02 / 3D CAD Modeling & Prototyping`
  3. `03 / Hand Joinery & Artisan Crafting`
  4. `04 / Site Delivery & Seamless Installation`

### 3.4 Text Layout Six (Work in Numbers / Statistics)
- **Webflow Class**: `.text-layout-six`
- **Components**: 4 statistical counter cards:
  - `55+` Years of Combined Experience
  - `1,200+` Bespoke Projects Delivered
  - `40+` Rare & Sustainable Timber Varieties
  - `100%` Bespoke Architectural Fit Guarantee

---

## 4. Card & Item Modules

### 4.1 Service Card (`ServiceCard`)
- **Classes**: `.navigation-layout-one-card`, `.services-layout-one-card`
- **Anatomy**:
  - Image container with aspect ratio `4:3` or `16:9`
  - Zoom effect on parent hover: `transform: scale(1.05); transition: 0.5s ease;`
  - Category pill badge (e.g. `[ Kitchens ]`)
  - Headline: Title of service
  - Short description excerpt
  - "Explore Service" arrow link

### 4.2 Project Showcase Card (`ProjectCard`)
- **Classes**: `.portfolio-layout-one-card`, `.portfolio-layout-two-card`
- **Anatomy**:
  - High-res photography of completed project
  - Dark scrim overlay on hover
  - Category tag (e.g. `Joinery`, `Residential`, `Kitchen`)
  - Project Title (e.g. `Light Pine Kitchen`, `Airy Apartment`)
  - Link to `/projects/[slug]`

### 4.3 Team Member Card (`TeamCard`)
- **Class**: `.team-layout-one-card`
- **Anatomy**:
  - Portrait photo with rounded corners (`border-radius: 0.75rem`)
  - Full Name (H3)
  - Artisan Title (e.g. `Master Joiner`, `Lead Furniture Designer`)
  - Experience / Specialty bio excerpt

---

## 5. Interactive & Form Modules

### 5.1 Testimonial Slider (`TestimonialSlider`)
- **Webflow Class**: `.testimonial-layout-one-slider.w-slider`
- **Anatomy**:
  - Container `.w-slider-mask`
  - 4 distinct `.w-slide` cards containing:
    - Five-star rating or quote mark icon
    - Quotation text in italicized DM Sans
    - Author full name
    - Project context / location
  - Navigation: Custom SVG Left and Right arrows (`.testimonal-layout-one-left-arrow`, `.testimonial-layout-one-right-arrow`)
  - Pagination: 4 dot indicators (`.w-slider-dot`)

### 5.2 FAQ Accordion (`FaqAccordion`)
- **Webflow Class**: `.faq-layout-one`
- **Anatomy**:
  - Category headline: `Looking for some answers?`
  - Item list of collapsible cards:
    - Trigger header with Question Title (H4) and rotating chevron icon
    - Collapsible answer container with smooth max-height animation
    - Default state: First item open, others closed

### 5.3 Interactive Contact Form (`ContactForm`)
- **Webflow Class**: `.hero-layout-four-form`
- **Fields**:
  1. `name-2`: Full Name input (text, required, placeholder: "Name")
  2. `Phone-Number-2`: Phone Number input (tel, required, placeholder: "Phone Number")
  3. `email-2`: Email Address input (email, required, placeholder: "Email Address")
  4. `Type-of-Service-2`: Select dropdown with options:
     - `Kitchens`
     - `Bathrooms`
     - `Furniture`
     - `Flooring`
     - `Buildings`
     - `Other / Bespoke`
  5. `Message-2`: Textarea (required, placeholder: "Enter your Inquiry")
  6. Submit Button: `.primary-button.darkest` with label "Send Inquiry"
- **States**:
  - Success message: `.w-form-done` (`Thank you! Your submission has been received!`)
  - Error message: `.w-form-fail` (`Oops! Something went wrong while submitting the form.`)

---

## 6. Conversion CTA Modules

### 6.1 CTA Layout One (Standard Banner)
- **Webflow Class**: `.cta-layout-one`
- **Styling**: `background-color: var(--color--darkest); color: var(--color--lightest); border-radius: 0.75rem; text-align: center;`
- **Content**: H2 `Enquire now for a free quote`, descriptive subtitle, and "Get in touch" button linking to `/contact`.

### 6.2 CTA Layout Two (Editorial Quote Banner)
- **Webflow Class**: `.cta-layout-two`
- **Content**: Large typographic statement on architectural woodworking and consultation trigger button.
