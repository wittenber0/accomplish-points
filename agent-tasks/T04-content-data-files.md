# T04 — Content Data Files

## Phase
1 — Foundation

## Dependencies
- **T01** — Project scaffolding must be complete

## Objective
Transform the raw content from `content/*.md` files into structured TypeScript data files that page components can import directly. These files are the single source of truth for all website text content.

## Files to Reference (READ THESE — they contain all the source content)
- `content/services.md` — All service descriptions, engagement models, areas of specialty
- `content/testimonials.md` — All 4 testimonials with attribution
- `content/clients.md` — Named clients organized by category
- `content/credentials.md` — Education, certifications, awards, affiliations
- `content/bio.md` — Professional biography (for reference — bio content will be used directly in the About page, not as a data file)
- `content/brand.md` — Brand phrases and value proposition (for reference — used in page copy)
- `agent-tasks/README.md` — Content Strategy section for voice rules

## Files to Create

1. `src/content/services.ts`
2. `src/content/testimonials.ts`
3. `src/content/clients.ts`
4. `src/content/credentials.ts`
5. `__tests__/content/services.test.ts`
6. `__tests__/content/testimonials.test.ts`
7. `__tests__/content/clients.test.ts`
8. `__tests__/content/credentials.test.ts`

## Tests to Write First

**`__tests__/content/services.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import { services, engagementModels, specialtyAreas, serviceGroupings } from '@/content/services'

describe('Services data', () => {
  it('exports an array of 7 service categories', () => {
    expect(services).toHaveLength(7)
  })

  it('each service has required fields', () => {
    services.forEach((service) => {
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('title')
      expect(service).toHaveProperty('description')
      expect(service).toHaveProperty('offerings')
      expect(typeof service.id).toBe('string')
      expect(typeof service.title).toBe('string')
      expect(typeof service.description).toBe('string')
      expect(Array.isArray(service.offerings)).toBe(true)
      expect(service.offerings.length).toBeGreaterThan(0)
    })
  })

  it('includes "Meetings with Mary" as a branded service', () => {
    const meetings = services.find((s) => s.id === 'meeting-facilitation')
    expect(meetings).toBeDefined()
    expect(meetings!.title).toContain('Meetings with Mary')
  })

  it('includes "Reports for USE" branded phrase', () => {
    const reports = services.find((s) => s.id === 'written-deliverables')
    expect(reports).toBeDefined()
    expect(reports!.title + ' ' + reports!.description).toContain('USE')
  })

  it('exports 2 engagement models', () => {
    expect(engagementModels).toHaveLength(2)
    engagementModels.forEach((model) => {
      expect(model).toHaveProperty('title')
      expect(model).toHaveProperty('description')
    })
  })

  it('exports specialty areas as an array of strings', () => {
    expect(Array.isArray(specialtyAreas)).toBe(true)
    expect(specialtyAreas.length).toBeGreaterThan(5)
    specialtyAreas.forEach((area) => {
      expect(typeof area).toBe('string')
    })
  })

  it('exports 4 service groupings for the home page', () => {
    expect(serviceGroupings).toHaveLength(4)
    serviceGroupings.forEach((group) => {
      expect(group).toHaveProperty('title')
      expect(group).toHaveProperty('description')
      expect(group).toHaveProperty('href')
    })
  })

  it('contains no emojis', () => {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
    const allText = services.map((s) => s.title + s.description + s.offerings.join('')).join('')
    expect(emojiRegex.test(allText)).toBe(false)
  })

  it('contains no exclamation points', () => {
    const allText = services.map((s) => s.title + s.description + s.offerings.join('')).join('')
    expect(allText).not.toContain('!')
  })
})
```

**`__tests__/content/testimonials.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import { testimonials } from '@/content/testimonials'

describe('Testimonials data', () => {
  it('exports 4 testimonials', () => {
    expect(testimonials).toHaveLength(4)
  })

  it('each testimonial has required fields', () => {
    testimonials.forEach((t) => {
      expect(t).toHaveProperty('quote')
      expect(t).toHaveProperty('name')
      expect(typeof t.quote).toBe('string')
      expect(typeof t.name).toBe('string')
      expect(t.quote.length).toBeGreaterThan(20)
    })
  })

  it('Clark Seavert testimonial includes title and organization', () => {
    const clark = testimonials.find((t) => t.name.includes('Clark'))
    expect(clark).toBeDefined()
    expect(clark!.title).toBeDefined()
    expect(clark!.organization).toBeDefined()
  })

  it('Dan Zinzer testimonial includes title and organization', () => {
    const dan = testimonials.find((t) => t.name.includes('Zinzer'))
    expect(dan).toBeDefined()
    expect(dan!.title).toBeDefined()
    expect(dan!.organization).toBeDefined()
  })

  it('testimonials are ordered: Clark, Dan, Connie, Daphne', () => {
    expect(testimonials[0].name).toContain('Clark')
    expect(testimonials[1].name).toContain('Zinzer')
    expect(testimonials[2].name).toContain('Connie')
    expect(testimonials[3].name).toContain('Daphne')
  })
})
```

**`__tests__/content/clients.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import { clientCategories } from '@/content/clients'

describe('Clients data', () => {
  it('exports client categories', () => {
    expect(clientCategories.length).toBeGreaterThanOrEqual(4)
  })

  it('each category has a name and list of clients', () => {
    clientCategories.forEach((category) => {
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('clients')
      expect(Array.isArray(category.clients)).toBe(true)
      expect(category.clients.length).toBeGreaterThan(0)
    })
  })

  it('each client has a name', () => {
    clientCategories.forEach((category) => {
      category.clients.forEach((client) => {
        expect(client).toHaveProperty('name')
        expect(typeof client.name).toBe('string')
      })
    })
  })

  it('includes OSU system clients', () => {
    const osu = clientCategories.find((c) => c.name.toLowerCase().includes('oregon state') || c.name.toLowerCase().includes('osu'))
    expect(osu).toBeDefined()
  })

  it('includes county government clients', () => {
    const county = clientCategories.find((c) => c.name.toLowerCase().includes('county'))
    expect(county).toBeDefined()
  })
})
```

**`__tests__/content/credentials.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import { education, certifications, awards, affiliations } from '@/content/credentials'

describe('Credentials data', () => {
  it('exports education entries', () => {
    expect(education.length).toBeGreaterThanOrEqual(2)
    education.forEach((e) => {
      expect(e).toHaveProperty('degree')
      expect(e).toHaveProperty('institution')
    })
  })

  it('includes UCLA MA Urban Planning', () => {
    const ma = education.find((e) => e.degree.includes('Urban Planning'))
    expect(ma).toBeDefined()
    expect(ma!.institution).toContain('UCLA')
  })

  it('exports certifications', () => {
    expect(certifications.length).toBeGreaterThanOrEqual(2)
    const aicp = certifications.find((c) => c.name.includes('AICP') || c.name.includes('A.I.C.P'))
    expect(aicp).toBeDefined()
    const prosci = certifications.find((c) => c.name.includes('PROSCI') || c.name.includes('Change Management'))
    expect(prosci).toBeDefined()
  })

  it('exports awards', () => {
    expect(awards.length).toBeGreaterThanOrEqual(2)
    awards.forEach((a) => {
      expect(a).toHaveProperty('name')
      expect(a).toHaveProperty('description')
    })
  })

  it('exports professional affiliations', () => {
    expect(affiliations.length).toBeGreaterThanOrEqual(2)
  })
})
```

## Implementation Spec

### Type Definitions

Define types at the top of each file (or in a shared `src/content/types.ts`):

```ts
// Services
export interface Service {
  id: string          // URL-friendly slug for anchor links
  title: string       // Display heading
  description: string // 1-2 sentence summary
  offerings: string[] // Bullet points of specific services
}

export interface EngagementModel {
  title: string
  description: string
}

export interface ServiceGrouping {
  title: string
  description: string
  href: string        // Link to /services#anchor
}

// Testimonials
export interface Testimonial {
  quote: string
  name: string
  title?: string       // Professional title
  organization?: string
}

// Clients
export interface Client {
  name: string
  context?: string    // Optional note like "Award-winning Social Services Summit"
}

export interface ClientCategory {
  name: string
  clients: Client[]
}

// Credentials
export interface Education {
  degree: string
  institution: string
  notes?: string
}

export interface Certification {
  name: string
  issuer: string
}

export interface Award {
  name: string
  description: string
}
```

### Data Sourcing

Populate each file by reading the corresponding `content/*.md` file and extracting the data. Follow these voice rules from the website plan:

- **Services:** Rewrite source material into client-focused framing. "You gain..." rather than "Mary provides...". Keep descriptions to 2 sentences max. Offerings as concise bullet items.
- **Testimonials:** Use verbatim quotes from `content/testimonials.md`. Do not modify quote text.
- **Clients:** Group by category as listed in `content/clients.md`.
- **Credentials:** Extract structured data from `content/credentials.md`.

### Service Groupings for Home Page

The home page uses 4 condensed groupings (not the full 7 categories):

1. **Leadership & Coaching** — combines categories 1+2
2. **Meeting Design & Facilitation** — category 3 ("Meetings with Mary")
3. **Planning & Policy** — combines categories 4+5
4. **Communication & Coordination** — combines categories 7+8

Each grouping has a `href` pointing to `/services#<anchor-id>`.

### Areas of Specialty

Extract from `content/services.md` overview section as a flat string array:
```ts
export const specialtyAreas: string[] = [
  'Urban and Rural Planning',
  'Land Use and Real Estate Analysis',
  // ... etc
]
```

## Acceptance Criteria

1. All 4 test files pass (`pnpm test:run`)
2. All data files export properly typed arrays/objects
3. Service categories match the 7 defined in the website plan
4. Testimonials are in the specified order (Clark, Dan, Connie, Daphne)
5. No emojis or exclamation points in any content string
6. All branded phrases preserved exactly: "Meetings with Mary", "Reports for USE (not the shelf)", "Thought Partnership"
7. `pnpm build` completes without type errors
