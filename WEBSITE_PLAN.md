# Accomplish Points Consulting — Website Architecture Plan

> **Purpose:** Complete technical and design specification for building the Accomplish Points Consulting website. This document is intended to be broken into independent implementation tasks by an agent. Every section is self-contained enough to be worked on in isolation.
>
> **Reference:** See `BUSINESS_PLAN.md` for full business context, audience, and content source material. See `content/` directory for all raw copy. See `extracted_images/` for photo assets.

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Project Structure](#2-project-structure)
3. [Design System — Visual Identity](#3-design-system--visual-identity)
4. [Design System — Typography](#4-design-system--typography)
5. [Design System — Spacing & Layout](#5-design-system--spacing--layout)
6. [Design System — Component Patterns](#6-design-system--component-patterns)
7. [Image Selection Process](#7-image-selection-process)
8. [Page Specifications](#8-page-specifications)
9. [Shared Components](#9-shared-components)
10. [Content Strategy & Copywriting Guidelines](#10-content-strategy--copywriting-guidelines)
11. [SEO & Metadata](#11-seo--metadata)
12. [Accessibility Requirements](#12-accessibility-requirements)
13. [Performance Requirements](#13-performance-requirements)
14. [Deployment & Infrastructure](#14-deployment--infrastructure)
15. [Task Dependency Map](#15-task-dependency-map)

---

## 1. Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14+ (App Router) | Static generation for a content-heavy site, excellent Vercel integration, image optimization built in |
| **Language** | TypeScript | Type safety for maintainability |
| **Styling** | Tailwind CSS 3+ | Utility-first, easy to encode design tokens, no runtime CSS overhead |
| **Content** | MDX files in `content/` directory | Structured content that can be edited without touching components; future-proofs for a CMS migration if needed |
| **Contact Form** | Server action posting to an email service (Resend, or Vercel's built-in form handling) | No external form SaaS dependency; simple, reliable |
| **Analytics** | Vercel Analytics (built-in) | Zero-config, privacy-respecting, included with Vercel |
| **Fonts** | `next/font` with Google Fonts (self-hosted) | No external requests, best performance |
| **Images** | `next/image` with local files | Automatic optimization, WebP/AVIF serving, responsive srcsets |
| **Deployment** | Vercel | Required per project spec |
| **Package Manager** | pnpm | Fast, disk-efficient |
| **Linting** | ESLint + Prettier (Next.js defaults) | Consistency |

### What We Are NOT Using

- No CSS-in-JS (styled-components, Emotion) — unnecessary runtime cost
- No headless CMS at launch — content volume doesn't justify it; MDX files are sufficient
- No database — this is a static/mostly-static marketing site
- No authentication — no protected content
- No client-side state management (Redux, Zustand) — no complex client state
- No animation libraries (Framer Motion, GSAP) — keep it restrained and professional; CSS transitions only where needed

---

## 2. Project Structure

```
accomplish-points-web/
├── public/
│   ├── images/
│   │   ├── headshots/          # Mary's professional photos (unwatermarked)
│   │   ├── work/               # Working session and retreat photos
│   │   └── og/                 # Open Graph / social sharing images
│   ├── documents/
│   │   └── capability-statement.pdf
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, metadata, header/footer
│   │   ├── page.tsx            # Home page
│   │   ├── about/
│   │   │   └── page.tsx        # About / Bio page
│   │   ├── services/
│   │   │   └── page.tsx        # Services overview page
│   │   ├── clients/
│   │   │   └── page.tsx        # Clients & testimonials page
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact page with form
│   │   └── not-found.tsx       # Custom 404
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── CredentialBadge.tsx
│   │   │   └── ContactForm.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── ServicesOverview.tsx
│   │       ├── TestimonialStrip.tsx
│   │       ├── CredentialsBar.tsx
│   │       └── CallToAction.tsx
│   ├── content/
│   │   ├── services.ts         # Structured service data
│   │   ├── testimonials.ts     # Testimonial data
│   │   ├── clients.ts          # Client list data
│   │   └── credentials.ts      # Credentials and awards data
│   ├── lib/
│   │   ├── metadata.ts         # SEO metadata helpers
│   │   └── actions.ts          # Server actions (contact form)
│   └── styles/
│       └── globals.css          # Tailwind directives + custom base styles
├── content/                     # Source content docs (reference, not served)
│   ├── bio.md
│   ├── brand.md
│   ├── clients.md
│   ├── credentials.md
│   ├── images.md
│   ├── services.md
│   └── testimonials.md
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local                   # Contact form email config
```

---

## 3. Design System — Visual Identity

### Design Philosophy

This is a website for a seasoned professional consultant who serves government agencies, universities, and public service organizations. The design must communicate **earned authority** and **human warmth** simultaneously. It should feel like the office of a trusted advisor — refined but not cold, organized but not rigid.

**Anti-patterns to explicitly avoid:**
- No emojis anywhere in the design or copy
- No bright gradient backgrounds or colorful blob shapes
- No rounded "pill" cards with drop shadows (the startup SaaS look)
- No stock photography of smiling business people in glass offices
- No icon grids where each service gets a colorful circle icon
- No parallax scrolling or scroll-triggered animations
- No dark mode — this audience doesn't expect or need it
- No "tech company" aesthetic — no monospace fonts for headings, no neon accents
- No decorative SVG illustrations or line art of people

### Color Palette

The palette draws from the Pacific Northwest landscape — the deep blues of Oregon rivers, the muted greens of the Willamette Valley, the warm amber of late afternoon light through Douglas fir. These colors appear naturally in Mary's outdoor professional photos (the park/river portrait, the retreat setting).

#### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Slate** | `#2F3C4A` | Primary text, headings, navigation. Conveys gravitas. |
| **Deep Teal** | `#2A5C5A` | Primary brand color. Used for links, active navigation, key accents. Authoritative but warmer than navy. |
| **Warm White** | `#FAF8F4` | Page background. Warmer than `#FFFFFF` — avoids the clinical feel of pure white. |

#### Secondary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Sage** | `#7A9E8E` | Secondary accents — borders, subtle backgrounds, credential badges. Calm, Oregon green. |
| **Amber** | `#C29545` | Sparingly used warm accent — CTA button hover states, pull-quote marks, horizontal rules. Warmth without being loud. |
| **Stone** | `#E8E3DA` | Section alternating backgrounds, card backgrounds, subtle dividers. A warm light gray. |

#### Functional Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Body Text** | `#3D3830` | Paragraph text. Warm near-black, softer than `#000000`. |
| **Muted Text** | `#7A746A` | Captions, metadata, secondary information. |
| **Border** | `#D4CFC6` | Subtle dividers between sections, card borders. |
| **Success** | `#3D7A5F` | Form submission success state. |
| **Error** | `#A13D2D` | Form validation errors. Muted, not alarming. |

### Tailwind Config Extension

```ts
// tailwind.config.ts — colors
colors: {
  brand: {
    slate: '#2F3C4A',
    teal: '#2A5C5A',
    sage: '#7A9E8E',
    amber: '#C29545',
    stone: '#E8E3DA',
    cream: '#FAF8F4',
  },
  body: {
    DEFAULT: '#3D3830',
    muted: '#7A746A',
  },
  border: {
    DEFAULT: '#D4CFC6',
  },
}
```

### Visual Texture

- **Subtle horizontal rules** (1px, `border` color) to separate content sections — not colored dividers
- **No box shadows on cards** — use border and background color contrast instead
- **Generous padding** inside sections creates visual breathing room rather than decorative elements
- If a section needs visual distinction, use alternating background colors (`cream` and `stone`) rather than shadows or borders
- **Pull quotes** in testimonials use a left border in `amber` (3px) — no quotation mark icons or oversized decorative quotes

---

## 4. Design System — Typography

### Font Selection

| Role | Font | Weight(s) | Fallback Stack |
|------|------|-----------|----------------|
| **Headings** | **Source Serif 4** (Google Fonts) | 600 (semibold), 700 (bold) | `Georgia, 'Times New Roman', serif` |
| **Body** | **Source Sans 3** (Google Fonts) | 400 (regular), 600 (semibold) | `system-ui, -apple-system, sans-serif` |

**Why Source Serif + Source Sans:** They are designed as a matched pair (Adobe's Source superfamily), so they share proportions and rhythm. Source Serif has the authority of a serif without feeling old-fashioned. Source Sans is highly readable at all sizes. Both are well-hinted for screen rendering and available through Google Fonts with `next/font` self-hosting.

### Type Scale

Use a modular scale based on 1.25 ratio (Major Third), anchored to a 16px base.

| Element | Size (rem) | Line Height | Weight | Font | Letter Spacing |
|---------|-----------|-------------|--------|------|---------------|
| **H1** (page titles) | 2.441rem (~39px) | 1.2 | 700 | Heading | -0.02em |
| **H2** (section headings) | 1.953rem (~31px) | 1.25 | 600 | Heading | -0.01em |
| **H3** (sub-sections) | 1.563rem (~25px) | 1.3 | 600 | Heading | 0 |
| **H4** (card headings) | 1.25rem (20px) | 1.4 | 600 | Heading | 0 |
| **Body** | 1.125rem (18px) | 1.7 | 400 | Body | 0 |
| **Body Small** | 1rem (16px) | 1.6 | 400 | Body | 0 |
| **Caption / Meta** | 0.875rem (14px) | 1.5 | 400 | Body | 0.01em |
| **Nav Links** | 0.9375rem (15px) | 1 | 600 | Body | 0.03em |
| **Button** | 0.9375rem (15px) | 1 | 600 | Body | 0.04em |

### Body Text Line Length

Maximum `65ch` for body text. On wide viewports, content paragraphs should not span the full container width. Use `max-w-prose` (Tailwind) or equivalent to constrain reading width.

### Heading Style Rules

- Headings use `brand-slate` color by default
- H1 and H2 may use a thin horizontal rule beneath (1px, `border` color, 48px wide) as a subtle decorative element — not a full-width line
- Avoid ALL CAPS headings except for the nav links and small credential labels
- Avoid colored headings — keep them in the slate/text color range

---

## 5. Design System — Spacing & Layout

### Container

- Max content width: `1200px` (Tailwind `max-w-7xl` is 1280px — close enough, or define custom)
- Horizontal padding: `1.5rem` (24px) on mobile, `2rem` (32px) on tablet, `3rem` (48px) on desktop
- Content is always horizontally centered

### Section Spacing

- Vertical padding between major page sections: `5rem` (80px) on desktop, `3.5rem` (56px) on mobile
- Internal spacing within a section between heading and content: `2rem` (32px)

### Grid System

- Services page: 2-column grid on desktop, single column on mobile
- Client list: 3-column grid on desktop, 2 on tablet, 1 on mobile
- Testimonials: single column, stacked, with generous vertical spacing

### Responsive Breakpoints

Use Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Primary breakpoint for layout shifts: `lg` (1024px) — above this is "desktop" layout, below is "mobile/tablet" layout.

### Navigation Breakpoint

- Desktop nav (horizontal links) at `lg` and above
- Mobile nav (hamburger menu with slide-out panel) below `lg`

---

## 6. Design System — Component Patterns

### Buttons

Two variants only:

**Primary Button:**
- Background: `brand-teal`
- Text: white
- Padding: `0.75rem 1.75rem`
- Border-radius: `4px` (barely rounded — not pill-shaped)
- Hover: darken background by 10%
- Transition: `background-color 150ms ease`
- Text: uppercase, letter-spaced (as per Button row in type scale)

**Secondary Button (Ghost):**
- Background: transparent
- Border: 1px solid `brand-teal`
- Text: `brand-teal`
- Same padding and radius
- Hover: background fills to `brand-teal`, text turns white

### Cards (Service Cards, Testimonial Cards)

- Background: `brand-cream` (on `stone` sections) or `brand-stone` (on `cream` sections) — always contrasts with section background
- Border: 1px solid `border` color
- Border-radius: `4px`
- Padding: `2rem`
- No box shadow
- No hover effects — these are not clickable interactive elements
- Heading in `brand-slate`, body in `body` color

### Testimonial Styling

- Left border: 3px solid `brand-amber`
- Italic body text (the quote itself)
- Attribution on its own line below: name in semibold, title/org in muted text
- No quotation mark decorations, no icons

### Credential Badges

- Small inline elements for displaying certifications
- Background: `brand-stone`
- Border: 1px solid `border`
- Padding: `0.25rem 0.75rem`
- Text: small/caption size, `brand-slate`
- Border-radius: `2px`
- Used in a horizontal wrap layout on the About page

### Horizontal Rules

Where used as section decorators (under H1/H2):
- Width: `3rem` (48px)
- Height: 2px
- Color: `brand-amber`
- Left-aligned (not centered), positioned below heading with `0.75rem` gap
- This is the primary decorative element in the design — used sparingly, it adds warmth without clutter

---

## 7. Image Selection Process

### Overview

The `extracted_images/` directory contains 28 files extracted from Mary's PowerPoint. Most are not suitable for the website. This section provides a structured decision process for an implementing agent to classify each image and determine its use on the site.

### Step 1: Categorize Every Image

For each file in `extracted_images/`, apply this decision tree:

```
Is the file a .png under 50KB?
  → YES → DISCARD (these are PowerPoint audio player icons, not real images)
  → NO → Continue

Does the image show a document/printed page with text?
  → YES → DISCARD for web use (content already transcribed into content/*.md files)
  → NO → Continue

Does the image contain copyrighted third-party content (e.g., art installations)?
  → YES → DISCARD (legal risk)
  → NO → Continue

Is the image personal/sentimental content (family photos, children's writing, "for fun" labels)?
  → YES → DISCARD (not brand-aligned)
  → NO → Continue

Does the image show identifiable faces (not Mary) without confirmed consent?
  → YES → FLAG as "consent-required" — usable only if consent is confirmed
  → NO → Continue (image is CANDIDATE)
```

### Step 2: Apply the Pre-Existing Classification

The `content/images.md` file contains a human-reviewed classification of every image. Use it as the authoritative source. Here is the summary:

#### APPROVED for use (pending unwatermarked versions)

| File | Classification | Website Placement | Notes |
|------|---------------|-------------------|-------|
| `slide03_img001.jpg` | Professional headshot — navy blazer, dark bg | **Hero section primary** | Watermarked — BLOCKED until unwatermarked version obtained. Most formal/authoritative of the four. |
| `slide04_img002.jpg` | Professional portrait — outdoor park/river | **About page** or **Services** | Watermarked — BLOCKED. Best "Oregon feel" — natural setting, approachable. |
| `slide05_img003.jpg` | Professional headshot — white shirt, dark bg | **Alternate / Contact page** | Watermarked — BLOCKED. Lighter, friendlier feel. |
| `slide06_img004.jpg` | Professional portrait — brick wall, arms crossed | **Contact page** or **About** | Watermarked — BLOCKED. Confident pose, good for "let's work together" context. |

#### CONDITIONALLY APPROVED

| File | Classification | Website Placement | Condition |
|------|---------------|-------------------|-----------|
| `slide31_img018.jpg` | Outdoor retreat — 3 people at picnic table, scenic PNW hillside, shot FROM BEHIND | **Services page — retreat/facilitation** | Faces are not clearly visible (photographed from behind). Lower consent risk, but still verify. This is the strongest "work in action" photo — lush green Oregon landscape, collaborative feel. |
| `slide27_img017.jpg` | Indoor working session — conference room | **Services page — meetings** | Identifiable faces — requires consent. Secondary priority; the room is generic. |
| `slide48_img026.jpg` | Mary at Swanson Partners trade show booth | **About page — legacy/history** | Shows old branding. Use only if the About page includes a "history" section. |
| `slide26_img016.jpg` | Casual outdoor portrait — sunset, sunglasses | **Not recommended** | Too casual for the brand tone. Sunglasses obscure eye contact. Does not convey "gravitas + friendly expert." Could potentially be used for a future blog/newsletter header but should not appear on core pages. |

#### DISCARD — Not for Website

| File | Reason |
|------|--------|
| `slide07_img005.jpg` through `slide12_img010.jpg` | Document photographs — text already transcribed |
| `slide13_img011.png` through `slide15_img013.png` | PowerPoint audio icons |
| `slide23_img014.jpg` | Chihuly glass art — copyright concern flagged by Mary |
| `slide25_img015.jpg` | Child's whiteboard writing — personal content |
| `slide41_img019.jpg` | Autumn leaves — labeled "FOR FUN" by Mary |
| `slide42_img020.png` through `slide47_img025.png` | PowerPoint audio icons |
| `slide48_img027.jpg` | Personal family photo |
| `slide48_img028.jpg` | Personal family photo |

### Step 3: Brand Alignment Scoring

For any new images added to the project later (if Mary provides additional photos), use this scoring rubric to decide inclusion. Score each image 1–5 on each criterion; include only images scoring 15+ total.

| Criterion | 1 (Reject) | 3 (Acceptable) | 5 (Ideal) |
|-----------|-----------|----------------|-----------|
| **Professionalism** | Casual selfie, poor lighting, distracting background | Decent quality, neutral setting | Professional photography, intentional composition |
| **Brand Tone** | Conveys leisure, personal life, or unrelated subject | Neutral — could be any consultant | Conveys authority + warmth, public service context, Oregon setting |
| **Technical Quality** | Blurry, low resolution (<800px), heavy compression artifacts | Adequate resolution, minor issues | Sharp, high resolution (1200px+), good color balance |
| **Relevance** | No connection to consulting, planning, or facilitation | Loosely related to professional context | Directly shows Mary's work: facilitation, planning, collaboration, Oregon communities |
| **Privacy/Legal** | Identifiable non-consented individuals, copyrighted content | Faces obscured or from distance | Solo Mary, or confirmed-consent participants, or stock photography with proper license |

### Step 4: Image Processing Pipeline

Once approved images are collected (unwatermarked versions from photographer + any conditionally approved photos), process them as follows:

1. **Place originals** in `public/images/headshots/` (portraits) or `public/images/work/` (scenes)
2. **Use descriptive filenames:** `mary-headshot-formal.jpg`, `mary-portrait-outdoor.jpg`, `retreat-outdoor-hillside.jpg`, etc.
3. **Do not manually resize** — `next/image` handles responsive sizing and format conversion
4. **Create OG image:** Take the primary headshot and composite the business name onto it at 1200x630px for social sharing. Place in `public/images/og/`
5. **Write alt text** for every image — see Accessibility section
6. **Placeholder strategy:** Until unwatermarked photos arrive, use a solid `brand-stone` color block with Mary's name in `brand-teal` text as a placeholder. Do NOT use any watermarked images on the live site — this would be unprofessional and potentially a licensing violation.

---

## 8. Page Specifications

### 8.1 Root Layout (`layout.tsx`)

**Responsibility:** Wraps all pages with consistent header, footer, fonts, and metadata.

**Structure:**
```
<html>
  <body class="bg-brand-cream text-body font-body">
    <Header />
    <main>{children}</main>
    <Footer />
  </body>
</html>
```

**Font loading:** Use `next/font/google` to load Source Serif 4 and Source Sans 3. Assign CSS variables (`--font-heading`, `--font-body`) and reference in Tailwind config via `fontFamily` extension.

**Global metadata** (in layout or `metadata.ts`):
- `title` template: `%s | Accomplish Points Consulting`
- Default `title`: `Accomplish Points Consulting — Strategic Planning & Leadership Consulting`
- Default `description`: Pulled from the brand mission statement

---

### 8.2 Header & Navigation

**Desktop (lg+):**
- Fixed-position top bar, `brand-cream` background with subtle bottom border (`border` color)
- Left: Business name "Accomplish Points" in heading font, linked to home. No logo image at launch — use typographic treatment only. The name is distinctive enough.
- Right: Horizontal navigation links — Home, About, Services, Clients, Contact
- Nav links: small caps (`uppercase`), `nav-link` size, `brand-slate` color, `brand-teal` on hover/active
- Subtle active-page indicator: a 2px bottom border in `brand-teal` on the current page's nav item
- On scroll, add a very subtle shadow (`shadow-sm`) to the header to separate it from content — CSS transition

**Mobile (<lg):**
- Same left-aligned business name
- Right: Hamburger icon (three horizontal lines — use a simple SVG, not a Unicode character, not an emoji)
- On tap: slide-in panel from the right, `brand-cream` background, full-height, vertical nav links
- Overlay behind the panel: semi-transparent dark scrim
- Close button: simple X icon in the panel

**Height:** `4rem` (64px) on mobile, `5rem` (80px) on desktop. Content starts below with appropriate offset.

---

### 8.3 Footer

**Background:** `brand-slate`
**Text color:** `brand-cream` / `brand-stone`

**Layout (single row on desktop, stacked on mobile):**
- Left column: "Accomplish Points Consulting" + "Bend, Oregon" + WBE certification mention
- Center column: Quick links mirroring nav (Home, About, Services, Clients, Contact)
- Right column: Contact info (phone, email) + a single line "Certified Women Business Enterprise, State of Oregon"
- Bottom: thin top border in `brand-sage`, copyright line — "© 2026 Accomplish Points Consulting. All rights reserved."

**Important:** Footer should feel grounded and informative, not decorative. No social media icons unless Mary has active professional social accounts (LinkedIn at minimum — confirm).

---

### 8.4 Home Page (`/`)

The home page has one job: immediately communicate who Mary is, what she does, and drive visitors deeper into the site or toward contact.

**Section 1: Hero**
- Full viewport height minus header height (`min-h-[calc(100vh-5rem)]`)
- Two-column layout on desktop: left column with text content, right column with Mary's primary headshot
- On mobile: single column, image above text (or image as subtle background with overlay — test both approaches during build)
- Text content:
  - Small label above the heading: "Accomplish Points Consulting" in caption size, `brand-teal`, letter-spaced
  - H1: "Accomplish what is most important." (Mary's core brand phrase)
  - Subtitle paragraph (2–3 sentences): Synthesized from brand value proposition — Mary helps public service organizations, leaders, and communities through strategic planning, facilitation, and leadership development. 25+ years of experience. Based in Bend, Oregon.
  - Primary CTA button: "Start a Conversation" → links to `/contact`
  - Secondary ghost button: "Explore Services" → links to `/services`
- Image: Primary headshot (slide03 — navy blazer, dark background), cropped as needed. Use `next/image` with `priority` prop for LCP optimization.
- Background: `brand-cream`

**Section 2: What I Do (Services Overview)**
- Background: `brand-stone` (alternating section)
- H2: "How I Work With You"
- Decorative amber rule beneath heading
- 2x2 grid on desktop (or 4-column single row if space permits) of the 4 most prominent service groupings:
  1. **Leadership & Coaching** — combines Service Categories 1 & 2
  2. **Meeting Design & Facilitation** — Service Category 3 ("Meetings with Mary")
  3. **Planning & Policy** — combines Categories 4 & 5
  4. **Communication & Coordination** — combines Categories 7 & 8
- Each card: H4 heading, 2-sentence description, text link "Learn more" → `/services` with anchor
- Below the grid: a sentence about the two engagement models (consultant vs. embedded staff) + "Written Deliverables" mention
- CTA: "View All Services" link → `/services`

**Section 3: Testimonial Strip**
- Background: `brand-cream`
- Single featured testimonial — use the Clark Seavert quote (most detailed, has title + org). Styled with left amber border.
- Below the quote: "See more from our clients" text link → `/clients`

**Section 4: Credentials Bar**
- Background: `brand-stone`
- Compact horizontal layout — not a full section, more of a visual trust band
- Display: AICP certification, PROSCI Change Management, UCLA M.A. Urban Planning, WBE Certified, 25+ Years Experience
- Use `CredentialBadge` components in a horizontal wrapping flex row
- No headings — the badges speak for themselves

**Section 5: Call to Action (CTA)**
- Background: `brand-slate` (dark section — breaks the visual rhythm, signals "action")
- Text: `brand-cream`
- H2: "Ready to accomplish what matters most?"
- Brief paragraph: Talk about customized, scoped engagements — "Every engagement begins with a conversation about what you need."
- Primary button (inverted for dark bg — `brand-amber` background, `brand-slate` text): "Get in Touch" → `/contact`

---

### 8.5 About Page (`/about`)

**Purpose:** Establish Mary's credibility and tell her professional story in a way that builds trust.

**Section 1: Hero / Intro**
- H1: "About Mary Cook"
- Amber decorative rule
- Two-column on desktop: left column with narrative text, right column with outdoor portrait (slide04 — park/river setting)
- Opening: 2–3 paragraphs covering current focus and mission of Accomplish Points. Not a resume — a story.
- Source: `content/bio.md` — "Accomplish Points Consulting — Current" section

**Section 2: Professional Journey**
- Background: `brand-stone`
- H2: "A Career in Service"
- Timeline-style narrative (NOT a visual timeline component — just well-structured prose with clear chronological markers)
- Cover: UCLA education → private sector land use economics → Clackamas County (17 years across multiple divisions) → Swanson Partners, LLC → Accomplish Points
- Source: `content/bio.md` — Career sections
- Key achievements woven in naturally (awards, conference speaking, the diversity of county divisions she served)

**Section 3: Credentials & Certifications**
- Background: `brand-cream`
- H2: "Credentials"
- Two-column layout:
  - Left: Education (degrees, schools, additional coursework)
  - Right: Certifications & Awards (AICP, PROSCI, IRB, League of Oregon Cities award, IAP2 award)
- Professional affiliations below as a simple list
- WBE certification as a separate callout with certification number
- Source: `content/credentials.md`

**Section 4: The Intersection (What Makes Mary Different)**
- Background: `brand-stone`
- H2: "People. Planning. Economics."
- Three-column layout (stacks on mobile), one for each pillar:
  - **People:** Emotionally intelligent, adaptive, change management certified, people-first
  - **Planning:** Nationally certified planner, UCLA M.A., technical rigor, award-winning public processes
  - **Economics:** Public + private sector fluency, partnerships, redesigning public service delivery
- This is Mary's "intersectionality" message — the rare combination that defines her value
- Source: `content/services.md` — Service Category 9

**Section 5: CTA**
- Same pattern as home page CTA section

---

### 8.6 Services Page (`/services`)

**Purpose:** Comprehensive, scannable overview of everything Mary does, organized so a prospect can quickly find what's relevant to them.

**Section 1: Overview**
- H1: "Services"
- Amber decorative rule
- Introductory paragraph: All services are customized and scoped for each client. Mary works across a range of circumstances from complex multi-stakeholder processes to focused single-issue engagements.
- Source: `content/services.md` — Overview section

**Section 2: Engagement Models**
- Background: `brand-stone`
- H2: "How We Work Together"
- Two-column layout:
  - **As Your Consultant:** External perspective, agility, contracted scope, candor that facilitates change
  - **As Your Staff:** Embedded interim/temp/part-time role, aligned with internal teams, empowered within org framework
- Source: `content/services.md` — Engagement Models
- This is placed early because it frames how all subsequent services can be delivered

**Section 3: Service Categories**
- Background: `brand-cream`
- Each service category gets its own sub-section separated by subtle horizontal rules
- For each category: H3, 1–2 sentence description, then a tidy bullet list of specific offerings
- Place `id` anchors on each category for deep-linking from the home page
- Categories to present (consolidated from the 8 in the business plan for better readability):

  1. **Leadership Development & Coaching** (combines Categories 1–2)
     - Thought partnership, trusted ally, personal/team development, DISC assessments, career transition support, confidential advisory
     - H4 sub-head: "Meetings with Mary" label optional here

  2. **Meeting Design & Facilitation** (Category 3 — "Meetings with Mary")
     - Mary's signature service — call it out prominently
     - Award-winning, all scales (office to outdoor retreats to conferences), agenda design, materials prep, report generation
     - If the outdoor retreat photo (slide31) is approved: place it here

  3. **Project Development & Management** (Category 4)
     - Scoping, stakeholder involvement, resource identification, timeline/budget tracking

  4. **Plan & Policy Making** (Category 5)
     - New plans/policies, updates, technical planning assistance, fiscal analysis, tradeoffs, process guidance

  5. **Written Deliverables** (Category 6)
     - Call out the differentiator phrase: "Reports for USE — not the shelf"
     - Plans, reports, bid packages, strategic communications, web/social content

  6. **Interagency & Public Coordination** (Category 7)
     - Strategic alliances, IGAs, policy alternatives, public representation, meeting attendance on behalf of client

  7. **Communication Strategies** (Category 8)
     - Stakeholder processes (interviews, focus groups, task forces, workshops, retreats), materials production

- Source: `content/services.md`

**Section 4: Areas of Specialty**
- Background: `brand-stone`
- A clean, wrapped list of specialty areas — not a separate section per specialty, just a list showing breadth
- Display as a flex-wrap layout of keyword badges (similar to credential badges but lighter)

**Section 5: CTA**
- Same pattern as home page

---

### 8.7 Clients & Testimonials Page (`/clients`)

**Purpose:** Social proof. Show the breadth of organizations Mary has served and let real words from real clients build trust.

**Section 1: Clients**
- H1: "Clients & Testimonials"
- Amber decorative rule
- Brief intro: "Mary has served public service organizations, universities, cities, counties, and special districts for over 25 years."
- Client list organized by category:
  - **Oregon State University System** — list of named OSU clients
  - **County Government** — Clackamas County divisions, Tillamook County
  - **Cities** — Molalla, West Linn, Tualatin (with context: award-winning project, task force appointment, board appointment)
  - **Special Districts & Libraries** — North Clackamas Parks, Library District
- Display as structured lists with organization type as context — not just a flat name list
- If client logos are available, display them in a grid. Otherwise, omit the logo grid entirely — do not use placeholder rectangles.
- Source: `content/clients.md`

**Section 2: Testimonials**
- Background: `brand-stone`
- H2: "What Clients Say"
- All 4 testimonials displayed vertically, each using the `TestimonialCard` pattern (left amber border, italic quote, attribution)
- Order: Clark Seavert first (most detailed, named title), Dan Zinzer second (named title), Connie L. third, Daphne fourth
- Source: `content/testimonials.md`

**Section 3: Awards**
- Background: `brand-cream`
- H2: "Awards & Recognition"
- Two awards displayed with name, description, and context
- Conference speaking mention below
- Source: `content/credentials.md`

**Section 4: CTA**
- Same pattern

---

### 8.8 Contact Page (`/contact`)

**Purpose:** Convert interest into a conversation. Make it easy and low-pressure.

**Section 1: Contact Info + Form**
- H1: "Let's Talk"
- Amber decorative rule
- Two-column on desktop:
  - **Left column (40%):** Direct contact information
    - Phone number (large, clickable `tel:` link)
    - Email address (clickable `mailto:` link)
    - "Bend, Oregon" location line
    - Brief note: "Every engagement begins with a conversation. Reach out by phone, email, or the form here — I'll respond personally."
    - Professional headshot (slide06 — brick wall, confident pose — or slide05 — white shirt, approachable)
  - **Right column (60%):** Contact form
    - Fields:
      - Name (text, required)
      - Organization (text, optional)
      - Email (email, required)
      - Phone (tel, optional)
      - How can I help? (textarea, required, placeholder: "Tell me briefly about your situation and what you're looking for.")
    - Submit button: Primary style, "Send Message"
    - Success state: Replace form with a simple confirmation message: "Thank you. I'll be in touch soon."
    - Error state: Inline field validation + form-level error message
- Background: `brand-cream`

**Form Implementation:**
- Use a Next.js Server Action that posts to an email delivery service (Resend recommended — simple API, generous free tier)
- Server-side validation: sanitize all inputs, validate email format, enforce required fields
- Rate limiting: basic IP-based rate limiting on the server action (e.g., max 5 submissions per hour per IP)
- Honeypot field: hidden field that bots will fill — reject submissions where this field has a value
- No CAPTCHA unless spam becomes an issue — keep it frictionless

---

### 8.9 404 Page (`/not-found`)

- H1: "Page not found"
- Brief text: "The page you're looking for doesn't exist or has been moved."
- Link: "Return to Home" → `/`
- Same layout wrapper as all pages (header + footer present)
- Minimal, clean, brand-consistent

---

## 9. Shared Components

### Component Inventory

Each component below should be implemented as an independent unit with clearly defined props.

| Component | File | Props | Reused On |
|-----------|------|-------|-----------|
| `Header` | `components/layout/Header.tsx` | none (reads route for active state) | All pages via layout |
| `Footer` | `components/layout/Footer.tsx` | none | All pages via layout |
| `Navigation` | `components/layout/Navigation.tsx` | none (reads route) | Header |
| `MobileNav` | `components/layout/MobileNav.tsx` | `isOpen`, `onClose` | Header |
| `Button` | `components/ui/Button.tsx` | `variant: 'primary' \| 'secondary'`, `href?`, `type?`, `children` | All pages |
| `SectionHeading` | `components/ui/SectionHeading.tsx` | `level: 'h1' \| 'h2' \| 'h3'`, `children`, `withRule?: boolean` | All pages |
| `TestimonialCard` | `components/ui/TestimonialCard.tsx` | `quote`, `name`, `title?`, `organization?` | Home, Clients |
| `ServiceCard` | `components/ui/ServiceCard.tsx` | `title`, `description`, `href?` | Home |
| `CredentialBadge` | `components/ui/CredentialBadge.tsx` | `label` | Home, About |
| `ContactForm` | `components/ui/ContactForm.tsx` | none (self-contained with server action) | Contact |
| `Hero` | `components/sections/Hero.tsx` | page-specific — build per page | Home |
| `CallToAction` | `components/sections/CallToAction.tsx` | `heading`, `body`, `buttonText`, `buttonHref` | All pages (bottom) |
| `CredentialsBar` | `components/sections/CredentialsBar.tsx` | `credentials: string[]` | Home |

---

## 10. Content Strategy & Copywriting Guidelines

### Voice Rules for Web Copy

All content should be written (or rewritten from the source material) following these rules:

1. **First person where Mary speaks directly** ("I work with..." not "Mary works with...") — except on the About page bio narrative which uses third person for the career history portion, transitioning to first person for the current mission.
2. **Active voice.** "I design and facilitate meetings" not "Meetings are designed and facilitated."
3. **No jargon without context.** Terms like AICP, ADKAR, and DISC should be spelled out on first use.
4. **Short paragraphs.** 2–4 sentences max for web. Break up dense service descriptions.
5. **No exclamation points.** The brand is warm but measured — exclamation points undermine gravitas.
6. **No emojis.** Anywhere. Period.
7. **Preserve Mary's branded phrases** exactly: "Meetings with Mary," "Reports for USE (not the shelf)," "Thought Partnership," "Accomplish what is most important."
8. **Client-focused framing.** Descriptions should emphasize what the client achieves, not what Mary does. "You gain a dedicated ally" rather than "I serve as a dedicated ally."

### Content Source Mapping

| Page Section | Source File | Adaptation Needed |
|---|---|---|
| Home hero text | `content/brand.md` (value proposition) | Synthesize into 2-3 compelling sentences |
| Home services grid | `content/services.md` (overview + categories) | Condense 8 categories into 4 groupings, 2 sentences each |
| Home testimonial | `content/testimonials.md` (Clark Seavert quote) | Use verbatim |
| Home credentials | `content/credentials.md` | Extract short labels only |
| About narrative | `content/bio.md` | Rewrite for web readability; shorten significantly |
| About credentials | `content/credentials.md` | Structure into lists |
| About intersectionality | `content/services.md` (Category 9) | Rewrite as three pillars |
| Services - all | `content/services.md` (all categories) | Rewrite bullets into readable prose + concise bullet lists |
| Clients list | `content/clients.md` | Direct use, add category groupings |
| Testimonials | `content/testimonials.md` | Use verbatim |
| Contact text | New copy needed | Write fresh intro text following voice rules |

---

## 11. SEO & Metadata

### Per-Page Metadata

| Page | Title | Description |
|------|-------|-------------|
| Home | Accomplish Points Consulting — Strategic Planning & Leadership Consulting | Mary Cook partners with public service organizations, government agencies, and leaders to accomplish what matters most. 25+ years of experience in strategic planning, facilitation, and organizational development in Oregon. |
| About | About Mary Cook \| Accomplish Points Consulting | Mary Cook is a nationally certified planner (AICP) with 25+ years of experience in strategic planning, facilitation, and organizational development for public service organizations. |
| Services | Services \| Accomplish Points Consulting | Leadership coaching, meeting facilitation, strategic planning, project management, and policy development — customized for public service organizations, government agencies, and community leaders. |
| Clients | Clients & Testimonials \| Accomplish Points Consulting | Trusted by Oregon public service organizations including OSU, Clackamas County, and municipalities. Read testimonials from government and university leaders. |
| Contact | Contact \| Accomplish Points Consulting | Start a conversation with Mary Cook about your organization's strategic planning, facilitation, or leadership development needs. Based in Bend, Oregon. |

### Additional SEO Elements

- **Open Graph image:** Custom OG image for each page (or single default) at 1200x630px
- **Structured data (JSON-LD):** `LocalBusiness` schema on home page with business name, location (Bend, Oregon), service area, contact info
- **Canonical URLs:** Self-referencing canonical on every page
- **Sitemap:** Auto-generated via `next-sitemap` or Next.js built-in sitemap generation
- **robots.txt:** Allow all, point to sitemap

### URL Structure

All URLs are clean, no trailing slashes:
- `/`
- `/about`
- `/services`
- `/clients`
- `/contact`

---

## 12. Accessibility Requirements

### Standards

Target **WCAG 2.1 Level AA** compliance. Mary's audience includes public sector organizations that may evaluate accessibility as part of their vendor assessment.

### Specific Requirements

- **Color contrast:** All text/background combinations must meet 4.5:1 ratio for normal text, 3:1 for large text. The palette defined in Section 3 has been selected with this in mind, but every combination must be validated during implementation.
- **Keyboard navigation:** Full site navigable via Tab/Shift+Tab. Focus indicators visible (use `outline` in `brand-teal`, never remove focus outlines).
- **Skip navigation:** "Skip to main content" link as first focusable element on every page.
- **Image alt text:** Every `<img>` must have descriptive alt text. Headshots: "Portrait of Mary Cook, consulting professional." Scene photos: describe what's happening. Decorative images: `alt=""`.
- **Form labels:** Every form input has an associated `<label>` element. Error messages are linked to fields via `aria-describedby`.
- **Heading hierarchy:** Strict — one H1 per page, H2 for sections, H3 for subsections. Never skip levels.
- **Link text:** Descriptive — "View all services" not "Click here."
- **Mobile touch targets:** Minimum 44x44px for all interactive elements.
- **Reduced motion:** Respect `prefers-reduced-motion` — disable any CSS transitions for users who set this.

---

## 13. Performance Requirements

### Targets

- **Lighthouse Performance score:** 95+
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

### Implementation

- **Static generation:** All pages should be statically generated at build time (`generateStaticParams` not needed — there are no dynamic routes). No server-side rendering on request.
- **Image optimization:** Use `next/image` for all images. Set explicit `width` and `height` to prevent CLS. Use `priority` on the hero image. Set `sizes` prop appropriately.
- **Font loading:** `next/font` with `display: swap`. Load only the weights specified (400, 600, 700).
- **No JavaScript-heavy interactivity:** The only client-side JS should be: mobile nav toggle, contact form submission, and scroll-based header shadow. Everything else is static HTML/CSS.
- **CSS:** Tailwind's purge will handle unused CSS. No additional CSS libraries.

---

## 14. Deployment & Infrastructure

### Vercel Configuration

- **Framework preset:** Next.js (auto-detected)
- **Build command:** `pnpm build`
- **Output directory:** `.next` (default)
- **Node.js version:** 20.x
- **Environment variables:**
  - `RESEND_API_KEY` — for contact form email delivery
  - `CONTACT_EMAIL_TO` — Mary's email address (destination for form submissions)

### Domain Setup

- Register/transfer domain to Vercel DNS or configure external DNS with Vercel's required records
- Domain TBD — likely `accomplishpoints.com` or `accomplishpointsconsulting.com`
- SSL: Automatic via Vercel (Let's Encrypt)
- WWW redirect: `www.` → apex domain (or vice versa — pick one canonical)

### Email

- Set up `mary@accomplishpoints.com` (or similar) — this is separate from Vercel/website hosting
- Options: Google Workspace, Fastmail, or Zoho Mail
- Required before launch for the contact form `reply-to` address

---

## 15. Task Dependency Map

Below is the recommended task breakdown with dependencies. Tasks at the same level can be worked in parallel if no dependency arrow exists between them.

```
PHASE 1 — Foundation (must complete first)
├── T1: Project scaffolding (Next.js, Tailwind, TypeScript, pnpm, folder structure)
├── T2: Tailwind config (colors, typography, spacing from design system)
├── T3: Global styles (globals.css, font loading, base element styles)
└── T4: Content data files (services.ts, testimonials.ts, clients.ts, credentials.ts)

PHASE 2 — Layout Shell (depends on Phase 1)
├── T5: Header + Desktop Navigation
├── T6: Mobile Navigation
├── T7: Footer
└── T8: Root layout.tsx (assemble header/footer, metadata template)

PHASE 3 — Shared Components (depends on Phase 1)
├── T9: Button component
├── T10: SectionHeading component
├── T11: TestimonialCard component
├── T12: ServiceCard component
├── T13: CredentialBadge component
└── T14: CallToAction section component

PHASE 4 — Pages (depends on Phases 2 & 3)
├── T15: Home page (all 5 sections)
├── T16: About page (all 5 sections)
├── T17: Services page (all 5 sections)
├── T18: Clients & Testimonials page (all 4 sections)
├── T19: Contact page + ContactForm component + Server Action
└── T20: 404 page

PHASE 5 — Image Integration (can begin in Phase 3, complete in Phase 4)
├── T21: Run image selection process (categorize all extracted_images/ per Section 7)
├── T22: Process approved images (rename, place in public/images/, write alt text)
├── T23: Create OG social sharing image
└── T24: Implement placeholder strategy for blocked images

PHASE 6 — Polish & Launch Prep (depends on Phase 4)
├── T25: SEO metadata for all pages + JSON-LD structured data
├── T26: Sitemap + robots.txt generation
├── T27: Accessibility audit (contrast, keyboard nav, skip links, alt text, heading hierarchy)
├── T28: Performance audit (Lighthouse, image sizes, font loading)
├── T29: Responsive QA (test all pages at mobile/tablet/desktop breakpoints)
└── T30: Vercel deployment configuration + environment variables
```

### Task Notes

- **T1–T4** are all independent of each other and can be done in parallel.
- **T5–T8** depend on T1–T3 being complete. T5 and T6 can be done in parallel. T8 depends on T5, T6, T7.
- **T9–T14** depend only on T1–T3 (design system). All are independent of each other.
- **T15–T20** each depend on T8 (layout) + whichever shared components they use. They can be done in parallel.
- **T19** (Contact page) has an additional dependency on email service setup (Resend API key).
- **T21–T24** can proceed independently once the project structure exists; images are integrated into pages during T15–T20 or after.
- **T25–T30** are final polish; T27–T29 must run against the completed site.

---

## Appendix A: File Reference

All source content for the website lives in the `content/` directory of this project:

| File | Contains | Used By |
|------|----------|---------|
| `content/bio.md` | Mary's full professional biography | About page |
| `content/brand.md` | Brand identity, tone, taglines, value proposition | All pages (voice guide), Home hero |
| `content/services.md` | All 8 service categories + engagement models + areas of specialty | Services page, Home services grid |
| `content/clients.md` | Named client list with categories | Clients page |
| `content/testimonials.md` | 4 testimonials with attribution | Clients page, Home testimonial |
| `content/credentials.md` | Education, certifications, awards, affiliations, WBE | About page, Home credentials bar |
| `content/images.md` | Complete image inventory with classifications and decisions | Image selection (Phase 5 tasks) |
| `BUSINESS_PLAN.md` | Full business context and requirements | Reference for all tasks |
