# T22 — Clients Page UI Redesign

## Phase
6 — Refinement

## Dependencies
- **T17** — Clients & Testimonials Page (original implementation)
- **T06** — SectionHeading component
- **T07** — TestimonialCard component
- **T10** — CallToAction section component

## Objective

Redesign the Clients & Testimonials page to fix visual and UX issues identified in a UI review. The current page has flat, monotonous client lists without visual grouping; repetitive context labels that add clutter; no visual rhythm between sections; and a text-heavy vertical testimonial stack that is hard to scan. This task restructures the page into a polished, scannable layout that communicates trust and breadth of experience while respecting the design system's "earned authority + human warmth" philosophy.

## Files to Reference
- `agent-tasks/README.md` — Shared design system and conventions
- `WEBSITE_PLAN.md` — Sections 3-6 (design system), Section 8.7 (clients page spec)
- `content/clients.md` — Full client list by category
- `content/testimonials.md` — All 4 testimonials
- `content/credentials.md` — Awards and conference speaking
- `content/brand.md` — Brand voice, differentiators, values
- `src/content/clients.ts` — Structured client data
- `src/content/testimonials.ts` — Structured testimonial data
- `src/content/credentials.ts` — Awards data

## Design Problems Being Solved

1. **Hero section is sparse and unbalanced** — left column has only a heading + paragraph, leaving excessive whitespace opposite the image
2. **Client lists are flat and monotonous** — plain `<ul>` with no visual grouping or card treatment
3. **Repetitive context labels** — "County government" appears 5 times under a heading that already says "County Government"
4. **Category headings lack hierarchy cues** — minimal differentiation between category groups when scrolling
5. **No visual rhythm** — hero and client list share the same `bg-brand-cream`, creating an unbroken wall of beige
6. **Testimonial section is a vertical wall of text** — long quotes stacked vertically with no variation in layout
7. **Missing social proof signal** — no quantitative trust indicators above the fold

## Page Redesign Specification

### Section 1: Hero (bg-brand-cream)

**Layout:** Two-column grid on desktop (`lg:grid-cols-2`), single column on mobile.

Left column (vertically centered against image):
- H1: "Clients & Testimonials" with amber decorative rule (no change)
- Intro paragraph: "Mary has partnered with public service organizations, universities, cities, counties, and special districts for over 25 years." (no change)
- **NEW: Trust stats row** — a horizontal flex row of 3 compact stats below the paragraph:
  - "25+ Years" / "of partnership"
  - "20+ Organizations" / "served"
  - "4 Sectors" / "of public service"
  - Styling: each stat is a small vertical stack — the number/value in `font-heading text-h3 font-semibold text-brand-teal`, the label in `text-caption text-body-muted`. Stats separated by a thin vertical `border-r border-border` divider (except last). Use `flex gap-6` with `pr-6` for divider spacing.

Right column:
- Hero image (unchanged — outdoor retreat photo)

### Section 2: Client Categories (bg-white — NOT cream)

**Key change:** Switch from `bg-brand-cream` to `bg-white` to create visual separation from the hero.

**Layout:** 2-column grid on desktop (`md:grid-cols-2`), single column on mobile, with `gap-8`.

Each category rendered as a **card**:
- Container: `bg-brand-cream rounded-lg p-6 border border-border`
- No box shadows (per design system anti-patterns)
- H2 for category name (changed from H3 to be consistent — these are the main section divisions): `font-heading text-h3 font-semibold text-brand-slate`
  - Note: use `level="h2"` on _SectionHeading_ or plain `<h2>` styled at h3 size. Since the page already has an "What Clients Say" H2 and "Awards" H2, use `<h3>` elements actually, to maintain heading hierarchy. Keep category headings as `<h3>`.
- Amber left border accent: `border-l-[3px] border-l-brand-amber` on the card container for visual identity
- Client list inside the card: `<ul>` with `space-y-1.5`

**Context label cleanup rules:**
- **Remove** the context label when it merely restates the category heading (e.g., "County government" under "County Government" heading)
- **Keep** the context label when it provides distinct information (e.g., "Research institute", "Award-winning Social Services Summit", "Special district" under County Government for Tillamook)
- This means most County Government entries lose their context, while OSU entries keep theirs (they specify research/extension type) and Cities entries keep theirs (they specify the notable project)

Specific context label decisions:

**Oregon State University System:**
- Oregon Wine Research Institute — *keep* "Research institute"
- Food Innovation Center — *keep* "Research center"
- North Willamette Research and Extension Center — *keep* "Research and extension"
- Clackamas County Extension and 4-H District — *keep* "Extension and education"
- OSU Extension — *keep* "Extension services"

**County Government:**
- Clackamas County Commission — *remove* (redundant)
- Clackamas County Planning Division — *remove* (redundant)
- Clackamas County Transportation Engineering Division — *remove* (redundant)
- Clackamas County Development Agency (Economics) — *remove* (redundant)
- Clackamas County Parks Department — *remove* (redundant)
- Tillamook County Transportation District — *keep* "Special district" (not a Clackamas County entity)

**Cities:**
- City of Molalla, Oregon — *keep* "Award-winning Social Services Summit"
- City of West Linn — *keep* "Sustainability Task Force appointment"
- City of Tualatin — *keep* "Parks Advisory Board appointment"

**Special Districts and Libraries:**
- North Clackamas Parks and Recreation District — *keep* "Annexation proposal and ballot measure"
- Clackamas County Library District — *no context* (none currently)

### Section 3: Testimonials (bg-brand-stone — unchanged)

**Layout change:** Use a responsive grid instead of a single vertical stack.
- Desktop: `lg:grid-cols-2` grid with `gap-8`
- Mobile: single column stack
- H2: "What Clients Say" with amber rule (unchanged)

**Testimonial card updates (modify TestimonialCard component):**
- Add an optional `variant` prop: `'default' | 'featured'`
- `'featured'` variant: larger text (`text-body` — same as now), displayed at full grid width (`lg:col-span-2`)
- `'default'` variant: slightly smaller text (`text-body-sm`), fits in a single grid column
- Clark Seavert testimonial gets `variant="featured"` — it spans two columns on desktop (it is the longest and most detailed quote, and it comes from a named director)
- Remaining 3 testimonials get `variant="default"` and sit in the 2-column grid below

Testimonial order (unchanged):
1. Clark Seavert (featured, full-width)
2. Dan Zinzer (default, left column)
3. Connie L. (default, right column)
4. Daphne (default, left column — will be alone in its row, which is fine)

### Section 4: Awards & Recognition (bg-brand-cream — unchanged)

Minimal changes to this section:
- Wrap each award in the same card treatment as client categories: `bg-white rounded-lg p-6 border border-border border-l-[3px] border-l-brand-amber`
- Use a 2-column grid on desktop for the two awards (`md:grid-cols-2 gap-8`), single column on mobile
- Conference speaking entry gets its own smaller card below the two awards, or sits as a plain text block below. Keep it simple.

### Section 5: CTA (unchanged)

Use shared `CallToAction` component with existing props. No changes.

## Files to Modify

1. `src/app/clients/page.tsx` — Main page component (rewrite)
2. `src/components/ui/TestimonialCard.tsx` — Add `variant` prop
3. `src/content/clients.ts` — No structural changes needed; context filtering is done in the page component
4. `__tests__/pages/clients.test.tsx` — Update/extend tests
5. `__tests__/components/ui/TestimonialCard.test.tsx` — Add variant tests (if file exists)

## Files to Create

None. This task modifies existing files only.

## Tests to Write / Update

### Updated `__tests__/pages/clients.test.tsx`

All existing tests MUST continue to pass. Add the following new tests:

```tsx
describe('Clients page — redesign', () => {
  describe('Trust stats', () => {
    it('renders "25+ Years" stat', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/25\+ Years/i)).toBeInTheDocument()
    })

    it('renders "20+ Organizations" stat', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/20\+ Organizations/i)).toBeInTheDocument()
    })

    it('renders "4 Sectors" stat', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/4 Sectors/i)).toBeInTheDocument()
    })
  })

  describe('Client category cards', () => {
    it('renders 4 client category groups', () => {
      render(<ClientsPage />)
      const categoryHeadings = screen.getAllByRole('heading', { level: 3 })
      // Filter to only category headings (the ones inside the client section)
      const categoryNames = [
        /Oregon State University/i,
        /County Government/i,
        /Cities/i,
        /Special Districts/i,
      ]
      categoryNames.forEach((name) => {
        expect(
          screen.getByRole('heading', { level: 3, name })
        ).toBeInTheDocument()
      })
    })
  })

  describe('Context label cleanup', () => {
    it('does not show redundant "County government" context for Clackamas entities', () => {
      const { container } = render(<ClientsPage />)
      // The County Government section should not repeat "County government" 
      // for each Clackamas County entry. Tillamook should keep "Special district".
      const listItems = container.querySelectorAll('li')
      const countyItems = Array.from(listItems).filter((li) =>
        li.textContent?.includes('Clackamas County Commission')
      )
      countyItems.forEach((li) => {
        expect(li.textContent).not.toContain('County government')
      })
    })

    it('keeps distinct context labels like "Special district" for Tillamook', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Special district/)).toBeInTheDocument()
    })
  })

  describe('Testimonial layout', () => {
    it('renders featured testimonial with featured variant', () => {
      const { container } = render(<ClientsPage />)
      // The first blockquote (Clark Seavert) should be the featured one
      const blockquotes = container.querySelectorAll('blockquote')
      expect(blockquotes.length).toBe(4)
    })
  })

  describe('Visual rhythm', () => {
    it('client categories section uses white background (not cream)', () => {
      const { container } = render(<ClientsPage />)
      const sections = container.querySelectorAll('section')
      // Second section (client categories) should have bg-white
      expect(sections[1]?.className).toContain('bg-white')
    })
  })
})
```

### TestimonialCard variant test

Add to existing TestimonialCard tests (or create if needed):

```tsx
describe('TestimonialCard variants', () => {
  it('renders default variant without featured styles', () => {
    const { container } = render(
      <TestimonialCard
        quote="Test quote"
        name="Test Name"
        variant="default"
      />
    )
    const blockquote = container.querySelector('blockquote')
    expect(blockquote?.className).not.toContain('col-span')
  })

  it('renders featured variant', () => {
    const { container } = render(
      <TestimonialCard
        quote="Test quote"
        name="Test Name"
        variant="featured"
      />
    )
    expect(container.querySelector('blockquote')).toBeInTheDocument()
  })

  it('defaults to default variant when no variant prop', () => {
    const { container } = render(
      <TestimonialCard quote="Test quote" name="Test Name" />
    )
    expect(container.querySelector('blockquote')).toBeInTheDocument()
  })
})
```

## Implementation Guidance

### Trust Stats Component

Build inline in the page component (no separate component needed for a one-time use):

```tsx
<div className="mt-8 flex gap-6">
  {[
    { value: '25+ Years', label: 'of partnership' },
    { value: '20+ Organizations', label: 'served' },
    { value: '4 Sectors', label: 'of public service' },
  ].map((stat, i, arr) => (
    <div
      key={stat.value}
      className={`${i < arr.length - 1 ? 'border-r border-border pr-6' : ''}`}
    >
      <p className="font-heading text-h4 font-semibold text-brand-teal">
        {stat.value}
      </p>
      <p className="text-caption text-body-muted">{stat.label}</p>
    </div>
  ))}
</div>
```

### Client Category Card

```tsx
<div className="rounded-lg border border-border border-l-[3px] border-l-brand-amber bg-brand-cream p-6">
  <h3 className="font-heading text-h3 font-semibold text-brand-slate">
    {category.name}
  </h3>
  <ul className="mt-4 space-y-1.5">
    {category.clients.map((client) => {
      const showContext = shouldShowContext(category.name, client)
      return (
        <li key={client.name} className="text-body-sm leading-relaxed">
          <span className="font-medium">{client.name}</span>
          {showContext && client.context && (
            <span className="text-caption text-body-muted">
              {' '}&mdash; {client.context}
            </span>
          )}
        </li>
      )
    })}
  </ul>
</div>
```

### Context Filtering Logic

Create a helper function in the page component:

```tsx
function shouldShowContext(categoryName: string, client: Client): boolean {
  // Don't show context that merely restates the category name
  if (!client.context) return false
  const normalizedCategory = categoryName.toLowerCase()
  const normalizedContext = client.context.toLowerCase()
  // If the context is just the category type (e.g. "county government" under "County Government"), hide it
  if (normalizedContext === normalizedCategory) return false
  if (normalizedCategory.includes(normalizedContext)) return false
  if (normalizedContext.includes(normalizedCategory)) return false
  return true
}
```

### TestimonialCard Variant Update

Modify `TestimonialCard` to accept an optional `variant` prop:

```tsx
interface TestimonialCardProps {
  quote: string
  name: string
  title?: string
  organization?: string
  variant?: 'default' | 'featured'
}

export function TestimonialCard({
  quote, name, title, organization, variant = 'default'
}: TestimonialCardProps) {
  return (
    <blockquote
      className={`border-l-[3px] border-brand-amber pl-6 py-2 ${
        variant === 'featured' ? 'lg:col-span-2' : ''
      }`}
    >
      <p className={`italic leading-relaxed ${
        variant === 'featured' ? 'text-body' : 'text-body-sm'
      }`}>
        {quote}
      </p>
      <footer className="mt-4">
        <span className="font-semibold text-brand-slate">{name}</span>
        {(title || organization) && (
          <span className="block text-body-sm text-body-muted">
            {[title, organization].filter(Boolean).join(', ')}
          </span>
        )}
      </footer>
    </blockquote>
  )
}
```

### Awards Card Treatment

Wrap each award in a card matching the client category style:

```tsx
<div className="mt-10 grid gap-8 md:grid-cols-2">
  {awards.map((award) => (
    <div
      key={award.name}
      className="rounded-lg border border-border border-l-[3px] border-l-brand-amber bg-white p-6"
    >
      <h3 className="font-heading text-h4 font-semibold text-brand-slate">
        {award.name}
      </h3>
      <p className="mt-2 text-body-sm leading-relaxed">
        {award.description}
      </p>
    </div>
  ))}
</div>
```

## Acceptance Criteria

1. All existing T17 tests continue to pass (no regressions)
2. New redesign tests pass
3. Trust stats row renders 3 stats in the hero section
4. Client categories are wrapped in bordered cards with amber left accent
5. Redundant context labels removed; distinct ones preserved
6. Client category section uses `bg-white` background (not cream)
7. Testimonials use 2-column grid on desktop with Clark Seavert spanning full width
8. `TestimonialCard` accepts optional `variant` prop with `'default' | 'featured'`
9. Awards wrapped in matching card treatment
10. `pnpm test:run` passes
11. `pnpm build` completes without errors
12. No emojis, no exclamation points in copy
13. No box shadows (per design system)
14. Responsive: all layouts collapse to single column on mobile
