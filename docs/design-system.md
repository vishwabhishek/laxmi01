# Woodworked Design System & Visual Specification

**Reference URL**: [https://woodworked-template.webflow.io](https://woodworked-template.webflow.io)  
**Design Philosophy**: Warm Organic Minimalism & Architectural Editorial Craftsmanship  
**Tokens Source**: Extracted from `:root` CSS variables in `woodworked-template.webflow.shared.d2983bccf.css`  

---

## 1. Color Palette System

The Woodworked palette evokes natural timber grain, artisan sawdust, aged oak, and warm editorial paper.

### 1.1 Core Brand Colors

| Token Name | HEX Code | RGB Value | Role / Usage Context |
| :--- | :--- | :--- | :--- |
| `--color--lightest` | `#f4e6d5` | `rgb(244, 230, 213)` | **Primary Background**: Warm cream tone used across all main page backgrounds and contrast text on dark sections. |
| `--color--darkest` | `#3e3128` | `rgb(62, 49, 40)` | **Primary Text & Dark Theme**: Deep espresso wood tone used for all primary body text, headlines, and dark conversion sections. |
| `--color--accent` | `#e1af87` | `rgb(225, 175, 135)` | **Brand Accent**: Warm caramel / tan tone used for badges, divider lines, active indicators, and highlight pills. |
| `--color--light` | `#eed5b9` | `rgb(238, 213, 185)` | **Border & Subdued Surface**: Warm sand tone used for card borders, navbar boundary, and input outlines. |
| `--color--dark` | `#89684f` | `rgb(137, 104, 79)` | **Secondary Wood Tone**: Medium earth tone used for footer borders, secondary copy, and iconography. |
| `--color--light-600` | `#f6dfc5` | `rgb(246, 223, 197)` | **Card Background Tint**: Elevated light surface for interactive cards and input backgrounds. |
| `--color--accent-600`| `#e6ba92` | `rgb(230, 186, 146)` | **Hover Accent**: Brightened caramel tone for interactive hover states. |
| `--color--dark-600` | `#caa07f` | `rgb(202, 160, 127)` | **Muted Warmth**: Used for secondary text on dark sections. |

### 1.2 Color Usage Rules

1. **Light Sections (Default)**:
   - Background: `var(--color--lightest)` (`#f4e6d5`)
   - Text: `var(--color--darkest)` (`#3e3128`)
   - Borders: `1px solid var(--color--light)` (`#eed5b9`)
2. **Dark Sections (CTA & Footer)**:
   - Background: `var(--color--darkest)` (`#3e3128`)
   - Text: `var(--color--lightest)` (`#f4e6d5`)
   - Borders: `1px solid var(--color--dark)` (`#89684f`)
3. **Contrast Accents**:
   - Divider lines: `var(--color--accent)` (`#e1af87`)
   - Badge tags: `[ Who we are ]` styled in uppercase brackets with `letter-spacing: .1em` in dark espresso.

---

## 2. Typography Hierarchy & Scales

### 2.1 Font Families

```css
:root {
  --font--heading-font: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font--body-font: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

- **Heading Font**: `Plus Jakarta Sans` — Geometrically crisp yet humanist grotesque typeface with distinct legibility at high optical sizes.
- **Body Font**: `DM Sans` — Low-contrast, clean geometric sans-serif engineered for effortless long-form readability.

### 2.2 Typographic Hierarchy (Desktop vs Mobile)

| Element / Class | Desktop Font Size | Desktop Line Height | Weight | Letter Spacing | Text Transform | Mobile (<479px) |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `h1`, `.heading-one` | `4.5rem` (72px) | `1.3em` | 700 | `0.05em` | UPPERCASE | `2rem` (32px) |
| `h2`, `.heading-two` | `3.0rem` (48px) | `1.3em` | 700 | `0.05em` | UPPERCASE | `1.75rem` (28px) |
| `h3`, `.heading-three` | `2.0rem` (32px) | `1.4em` | 600 | `0` | Normal | `1.5rem` (24px) |
| `h4`, `.heading-four` | `1.5rem` (24px) | `1.5em` | 600 | `0` | Normal | `1.25rem` (20px) |
| `h5`, `.heading-five` | `0.875rem` (14px) | `1.5em` | 700 | `0.10em` | UPPERCASE | `0.75rem` (12px) |
| `h6`, `.heading-six` | `1.0rem` (16px) | `1.5em` | 400 | `0.02em` | Normal | `0.875rem` (14px) |
| `body`, `p` | `1.0rem` (16px) | `1.6em` | 400 | `0` | Normal | `0.9375rem` (15px) |
| `small`, `.caption` | `0.75rem` (12px) | `1.4em` | 500 | `0.05em` | UPPERCASE | `0.75rem` (12px) |
| `.primary-button` | `0.75rem` (12px) | `1.0em` | 600 | `0.10em` | UPPERCASE | `0.75rem` (12px) |

---

## 3. Spacing Scale & Layout Grid System

### 3.1 Spacing Tokens

| Token | Desktop Rem | Desktop Px | Tablet Rem | Mobile Rem | Primary Use Case |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `--spacing--none` | `0` | `0px` | `0` | `0` | Reset |
| `--spacing--xxs` | `0.25rem` | `4px` | `0.25rem` | `0.25rem` | Micro padding, pill gaps |
| `--spacing--xs` | `0.75rem` | `12px` | `0.75rem` | `0.75rem` | Button padding-y, card radius |
| `--spacing--s` | `1.5rem` | `24px` | `1.0rem` | `1.0rem` | Navbar gaps, column gaps |
| `--spacing--m` | `2.0rem` | `32px` | `1.5rem` | `1.25rem` | Card padding, standard gutter |
| `--spacing--l` | `3.0rem` | `48px` | `2.5rem` | `1.5rem` | Section subtitle margin |
| `--spacing--xl` | `4.5rem` | `72px` | `3.0rem` | `2.0rem` | Standard section top/bottom padding |
| `--spacing--xxl` | `6.0rem` | `96px` | `4.0rem` | `3.0rem` | Major section breaks |
| `--spacing--xxxl` | `8.0rem` | `128px` | `6.0rem` | `4.0rem` | Landing hero paddings |
| `--spacing--hero` | `12.0rem` | `192px` | `8.0rem` | `5.0rem` | Top padding to clear fixed header |

### 3.2 Container & Grid Tokens

```css
:root {
  --site-width--site-max-width: 1440px;
  --site-width--global-site-padding: 4rem;         /* 64px Desktop */
  --site-width--global-site-padding-tablet: 2rem;  /* 32px Tablet */
  --site-width--global-site-padding-mobile: 1rem;  /* 16px Mobile */
}
```

- **Main Container Width**: `1440px` centered with `margin-inline: auto`.
- **Grid Systems**:
  - **4-Column Grid**: Team members (`grid-template-columns: repeat(4, 1fr)` on desktop, `repeat(2, 1fr)` on tablet, `1fr` on mobile).
  - **3-Column Grid**: Featured projects and service highlights (`repeat(3, 1fr)` desktop, `1fr` mobile).
  - **2-Column Split**: About narrative, Contact split, and Process steps (`repeat(2, 1fr)` desktop, `1fr` mobile).
  - **Grid Gaps**: Standard `grid-column-gap: 2rem`, `grid-row-gap: 2rem`.

---

## 4. UI Elements & Component Geometry

### 4.1 Border Radius
- **Micro / Pill Radius**: `0.75rem` (12px) — applied to buttons, input fields, header capsule container, and outer image wrapper frames.
- **Section Inner Frames**: `0.75rem` (12px) — the home hero image container uses `border-radius: var(--spacing--xs); overflow: hidden`.

### 4.2 Borders & Outlines
- **Light Border**: `1px solid var(--color--light)` (`#eed5b9`).
- **Dark Border**: `1px solid var(--color--dark)` (`#89684f`).
- **Active Focus Outline**: `1px solid var(--color--darkest)` with `outline: none`.

### 4.3 Shadows
- The aesthetic is intentionally tactile and flat-editorial:
  - Default cards: `box-shadow: none` with solid structural borders.
  - Floating pill navbar: `box-shadow: none` or subtle `0 10px 30px rgba(62, 49, 40, 0.04)`.

### 4.4 Buttons

1. **Primary Button Dark** (`.primary-button.darkest`):
   - Background: `var(--color--darkest)` (`#3e3128`)
   - Text Color: `var(--color--lightest)` (`#f4e6d5`)
   - Padding: `0.75rem 1.5rem`
   - Border Radius: `0.75rem` (12px)
   - Font Size: `0.75rem` (12px), uppercase, tracking `0.1em`, font-weight 600
   - Hover Transition: `color 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)`
2. **Primary Button Light** (`.primary-button.lightest`):
   - Background: `transparent` with `1px solid var(--color--lightest)` or filled with `var(--color--lightest)`.
   - Text Color: `var(--color--darkest)`.

---

## 5. Animation & Interaction Tokens

- **Timing Function**: `cubic-bezier(0.645, 0.045, 0.355, 1)` (ease-in-out quintic).
- **Standard Transition Duration**: `0.4s` (400ms).
- **Image Hover Scale**: `transform: scale(1.04); transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)`.
- **Scroll Reveal**: Elements fade in from `opacity: 0; transform: translateY(24px)` to `opacity: 1; transform: translateY(0)` as they enter viewport.
