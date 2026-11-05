# Interaction Specification & Micro-Animation Architecture

**Reference URL**: [https://woodworked-template.webflow.io](https://woodworked-template.webflow.io)  
**Primary Interaction Engine**: Webflow IX2 + CSS Transitions  
**Audit Verification**: Verified via Playwright Headless Chromium automated interaction test harness  

---

## 1. Global Navigation & Mobile Drawer Behavior

### 1.1 Desktop Floating Header
- **Initial Geometry**:
  - `position: fixed`
  - `inset: 1.5rem 1.5rem auto` (24px offset from top, left, right edges)
  - `z-index: 998`
  - Max-width: Contained within 1440px viewport boundary or expands to inset margin.
  - Border: `1px solid var(--color--light)` (`#eed5b9`)
  - Border Radius: `0.75rem` (12px)
  - Background: `var(--color--lightest)` (`#f4e6d5`)
- **Scroll Dynamics**:
  - The header maintains fixed floating coordinates throughout the entire document scroll lifecycle.
  - Optional subtle drop-shadow or border enhancement upon `window.scrollY > 50px`.

### 1.2 Mobile / Tablet Navigation Drawer (`< 991px`)
- **Trigger Component**: `.header-menu-button`
- **Initial State**:
  - Nav links are hidden (`display: none` or `transform: translateY(-100%)`).
  - Hamburger icon consists of two horizontal lines.
- **Open Trigger**:
  - Clicking `.header-menu-button` sets state `isMenuOpen = true`.
  - Hamburger lines cross into an "X" or animate rotation.
  - Drawer menu container expands downwards smoothly with `transition: max-height 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)`.
  - Background fills with `var(--color--lightest)` with vertical padding `2rem 1.5rem`.
- **Close Trigger**:
  - Clicking any navigation link closes the drawer and scrolls to target.
  - Clicking outside the drawer (backdrop) closes the menu.
  - Pressing `Escape` key closes the menu.

---

## 2. Button Micro-Interactions & Hover Fills

### 2.1 Primary Button Dark (`.primary-button.darkest`)
- **Visual Spec**:
  - Base State: Background `#3e3128`, text color `#f4e6d5`, border `1px solid #3e3128`, border-radius `0.75rem` (12px).
  - Hover Interaction:
    - Text color transitions smoothly: `transition: color 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)`.
    - Pseudo-element (`::before`) background fill slides in from the bottom:
      ```css
      .primary-button.darkest {
        position: relative;
        overflow: hidden;
        z-index: 1;
      }
      .primary-button.darkest::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: var(--color--accent);
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        z-index: -1;
      }
      .primary-button.darkest:hover::before {
        transform: translateY(0);
      }
      .primary-button.darkest:hover {
        color: var(--color--darkest);
      }
      ```

### 2.2 Editorial Underline Links (`.link-style-one`)
- **Hover Interaction**:
  - An animated bottom border / underline expands from left (width `0%` to `100%`) with duration `0.3s ease`.

---

## 3. Testimonial Carousel / Slider Specification

### 3.1 Slider Mechanics
- **Component**: `.testimonial-layout-one-slider.w-slider`
- **Slides**: 4 distinct customer endorsement slides.
- **Controls**:
  - **Left Arrow** (`.testimonal-layout-one-left-arrow`): Circular button with SVG chevron. Decrements active slide index with wrap-around.
  - **Right Arrow** (`.testimonial-layout-one-right-arrow`): Increments active slide index with wrap-around.
  - **Dot Indicators** (`.w-slider-nav`): 4 circular dot buttons. Active dot receives `.w-active` with `background-color: var(--color--darkest)`.
- **Slide Transition**:
  - Track translation: `transform: translateX(-100% * activeIndex)`.
  - Timing: `transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)`.
- **Touch / Mobile Gesture**:
  - Touch start, touch move, and touch end handlers support horizontal swipe navigation on mobile devices with threshold of 50px delta.

---

## 4. FAQ Accordion Component State Machine

### 4.1 Accordion Mechanics
- **Component**: `.faq-layout-one`
- **Item States**:
  - **Collapsed State**:
    - Question row visible, chevron icon pointing right / down (0°).
    - Answer container: `max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.4s ease, opacity 0.3s ease;`
  - **Expanded State**:
    - Trigger receives `aria-expanded="true"`.
    - Chevron rotates 180°: `transform: rotate(180deg); transition: transform 0.3s ease;`
    - Answer container: `max-height: 500px; opacity: 1; padding-top: 1rem;`
- **Toggle Policy**:
  - Multi-expand or single-expand: First question on `/services` and `/contact` begins open by default; clicking any closed item expands it.

---

## 5. Contact Form State Machine & Validation

### 5.1 Input Elements
1. **Name Field** (`#name-2`): Type `text`, `required: true`.
2. **Phone Number Field** (`#Phone-Number-2`): Type `tel`, `required: true`.
3. **Email Address Field** (`#email-2`): Type `email`, `required: true`.
4. **Service Type Select** (`#Type-of-Service-2`): Type `select`, `required: true`.
5. **Inquiry Message** (`#Message-2`): Type `textarea`, `required: true`.
6. **Submit Button**: `.primary-button.darkest` with label "Send Inquiry".

### 5.2 Validation Rules
- **On Submit**:
  - Inspect all required fields.
  - If any field is empty or email fails `^[^\s@]+@[^\s@]+\.[^\s@]+$`:
    - Apply focus to the first invalid field.
    - Set input border to `1px solid #d9534f`.
    - Display field-level helper error text.
- **On Submission Pending**:
  - Disable submit button to prevent duplicate submissions.
  - Show "Sending..." status indicator.
- **On Success**:
  - Hide the `<form>` element.
  - Display `.w-form-done` container with message:
    > "Thank you! Your submission has been received!"
- **On Failure**:
  - Keep form visible.
  - Display `.w-form-fail` banner with message:
    > "Oops! Something went wrong while submitting the form."

---

## 6. Image & Card Hover Transforms

### 6.1 Project & Service Gallery Cards
- **Image Container**: `overflow: hidden; border-radius: 0.75rem;`
- **Image Target**: `img, .portfolio-image, .service-image`
- **Hover Transition**:
  - Image scales up: `transform: scale(1.04); transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);`
  - Arrow icon moves diagonally: `transform: translate(4px, -4px); transition: transform 0.3s ease;`
  - Card border deepens contrast.

---

## 7. Webflow IX2 Scroll-Triggered Parallax & Reveal

- **Hero Image Parallax**: As the user scrolls down from the top of the viewport, the hero background image moves downward at a 0.2x ratio relative to scroll distance, producing an organic depth parallax effect.
- **Text Reveal Stagger**: Section headings and sub-paragraphs observe viewport entry via an `IntersectionObserver`. Upon entering 15% into viewport, elements transition from `opacity: 0; transform: translateY(20px)` to `opacity: 1; transform: translateY(0)` over 0.6s.
