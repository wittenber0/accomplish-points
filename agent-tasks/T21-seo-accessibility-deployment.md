# T21 — SEO, Accessibility & Deployment

## Phase
5 — Polish

## Dependencies
- **T13** — Root layout (metadata template)
- **T14 through T19** — All pages complete (needed to audit)

## Objective
Final polish pass: implement structured data (JSON-LD), generate sitemap and robots.txt, perform an accessibility audit against WCAG 2.1 AA, verify performance targets, and configure for Vercel deployment.

## Files to Reference
- `agent-tasks/README.md` — Full design system, accessibility requirements
- All page files in `src/app/` — for metadata and heading audit

## Files to Create / Modify

1. `src/app/layout.tsx` — Add JSON-LD structured data script
2. `src/app/sitemap.ts` — Next.js sitemap generation
3. `src/app/robots.ts` — Next.js robots.txt generation
4. `vercel.json` — Vercel configuration (if needed)
5. `__tests__/seo/metadata.test.ts`
6. `__tests__/seo/structured-data.test.ts`
7. `__tests__/accessibility/heading-hierarchy.test.tsx`

## Tests to Write First

**`__tests__/seo/metadata.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'

// Test that each page module exports metadata
describe('Page metadata', () => {
  it('home page has default metadata via layout', async () => {
    const { siteMetadata } = await import('@/lib/metadata')
    expect(siteMetadata.title).toBeDefined()
    expect(siteMetadata.description).toBeDefined()
    expect(siteMetadata.description).not.toContain('!')
    expect(siteMetadata.description).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })

  it('about page exports metadata', async () => {
    const { metadata } = await import('@/app/about/page')
    expect(metadata.title).toBe('About Mary Cook')
    expect(metadata.description).toBeDefined()
    expect(typeof metadata.description).toBe('string')
    expect(metadata.description!.length).toBeGreaterThan(50)
    expect(metadata.description!.length).toBeLessThan(160)
  })

  it('services page exports metadata', async () => {
    const { metadata } = await import('@/app/services/page')
    expect(metadata.title).toBe('Services')
    expect(metadata.description).toBeDefined()
    expect(metadata.description!.length).toBeLessThan(160)
  })

  it('clients page exports metadata', async () => {
    const { metadata } = await import('@/app/clients/page')
    expect(metadata.title).toContain('Clients')
    expect(metadata.description).toBeDefined()
  })

  it('contact page exports metadata', async () => {
    const { metadata } = await import('@/app/contact/page')
    expect(metadata.title).toBe('Contact')
    expect(metadata.description).toBeDefined()
  })

  it('no page description contains emojis', async () => {
    const pages = [
      '@/app/about/page',
      '@/app/services/page',
      '@/app/clients/page',
      '@/app/contact/page',
    ]
    for (const page of pages) {
      const mod = await import(page)
      if (mod.metadata?.description) {
        expect(mod.metadata.description).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
      }
    }
  })

  it('no page description contains exclamation points', async () => {
    const pages = [
      '@/app/about/page',
      '@/app/services/page',
      '@/app/clients/page',
      '@/app/contact/page',
    ]
    for (const page of pages) {
      const mod = await import(page)
      if (mod.metadata?.description) {
        expect(mod.metadata.description).not.toContain('!')
      }
    }
  })
})
```

**`__tests__/seo/structured-data.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import { generateJsonLd } from '@/lib/metadata'

describe('JSON-LD structured data', () => {
  it('has @context schema.org', () => {
    const data = generateJsonLd()
    expect(data['@context']).toBe('https://schema.org')
  })

  it('has @type LocalBusiness', () => {
    const data = generateJsonLd()
    expect(data['@type']).toBe('LocalBusiness')
  })

  it('has correct business name', () => {
    const data = generateJsonLd()
    expect(data.name).toBe('Accomplish Points Consulting')
  })

  it('has Bend, Oregon address', () => {
    const data = generateJsonLd()
    expect(data.address?.addressLocality).toBe('Bend')
    expect(data.address?.addressRegion).toBe('OR')
  })

  it('has service description', () => {
    const data = generateJsonLd()
    expect(data.description).toBeDefined()
    expect(typeof data.description).toBe('string')
  })

  it('description has no emojis', () => {
    const data = generateJsonLd()
    expect(data.description).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
```

**`__tests__/accessibility/heading-hierarchy.test.tsx`:**

```tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Import all pages
import HomePage from '@/app/page'
import AboutPage from '@/app/about/page'
import ServicesPage from '@/app/services/page'
import ClientsPage from '@/app/clients/page'
import ContactPage from '@/app/contact/page'
import NotFoundPage from '@/app/not-found'

const pages = [
  { name: 'Home', component: HomePage },
  { name: 'About', component: AboutPage },
  { name: 'Services', component: ServicesPage },
  { name: 'Clients', component: ClientsPage },
  { name: 'Contact', component: ContactPage },
  { name: '404', component: NotFoundPage },
]

describe('Heading hierarchy across all pages', () => {
  pages.forEach(({ name, component: Page }) => {
    describe(`${name} page`, () => {
      it('has exactly one H1', () => {
        const { container } = render(<Page />)
        expect(container.querySelectorAll('h1')).toHaveLength(1)
      })

      it('does not skip heading levels', () => {
        const { container } = render(<Page />)
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
        const levels = Array.from(headings).map((h) => parseInt(h.tagName[1]))

        let maxLevelSeen = 0
        for (const level of levels) {
          // A heading should not be more than 1 level deeper than the deepest seen
          expect(level).toBeLessThanOrEqual(maxLevelSeen + 1)
          maxLevelSeen = Math.max(maxLevelSeen, level)
        }
      })
    })
  })
})
```

## Implementation Spec

### JSON-LD Structured Data

Add to `src/lib/metadata.ts`:

```ts
export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Accomplish Points Consulting',
    description:
      'Strategic planning, leadership consulting, and facilitation services for public service organizations, government agencies, and community leaders in Oregon.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bend',
      addressRegion: 'OR',
      addressCountry: 'US',
    },
    url: 'https://accomplishpoints.com',
    email: 'mary@accomplishpoints.com',
    founder: {
      '@type': 'Person',
      name: 'Mary Cook',
      jobTitle: 'Principal Consultant',
    },
    areaServed: {
      '@type': 'State',
      name: 'Oregon',
    },
  }
}
```

Add to `src/app/layout.tsx` inside `<head>` (via Next.js metadata or script tag):

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
/>
```

### Sitemap (`src/app/sitemap.ts`)

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://accomplishpoints.com'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/clients`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
```

### Robots (`src/app/robots.ts`)

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://accomplishpoints.com/sitemap.xml',
  }
}
```

### Vercel Configuration

If needed, create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### Accessibility Checklist (Manual Verification)

The agent implementing this task should verify:

- [ ] Color contrast: all text/background combos meet 4.5:1 (normal text) or 3:1 (large text)
- [ ] Keyboard navigation: Tab through entire site — every interactive element reachable
- [ ] Focus indicators: visible on all focusable elements (not removed)
- [ ] Skip link: present and functional on every page
- [ ] Image alt text: all images have descriptive alt text, decorative images have `alt=""`
- [ ] Form labels: all inputs have associated `<label>` elements
- [ ] Heading hierarchy: one H1 per page, no skipped levels (tested above)
- [ ] Link text: descriptive, not "click here" or "read more"
- [ ] Touch targets: minimum 44x44px on mobile
- [ ] `prefers-reduced-motion`: any transitions respect this media query

### Performance Checklist

- [ ] `pnpm build` completes without errors
- [ ] All pages are statically generated (no SSR at request time)
- [ ] Hero image has `priority` prop
- [ ] Fonts loaded via `next/font` (no external requests)
- [ ] No unused CSS (Tailwind purge handles this)
- [ ] No unnecessary client-side JS (only Header, ContactForm, MobileNav need `'use client'`)

### Environment Variables for Deployment

```
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_EMAIL_TO=mary@accomplishpoints.com
```

## Acceptance Criteria

1. All tests pass
2. JSON-LD structured data present on home page with correct LocalBusiness schema
3. Sitemap generates at `/sitemap.xml` with all 5 pages
4. Robots.txt allows all crawlers and points to sitemap
5. Security headers configured in Vercel
6. Every page has title + description metadata, no emojis, no exclamation points
7. Heading hierarchy validated across all pages (1 H1 each, no skipped levels)
8. All accessibility checklist items verified
9. `pnpm build` completes successfully
10. All pages statically generated
