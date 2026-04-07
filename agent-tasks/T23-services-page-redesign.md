# T23 — Services Page UI Redesign

## Phase
6 — Refinement

## Dependencies
- **T16** — Services Page (original implementation)
- **T06** — SectionHeading component
- **T08** — ServiceCard component
- **T09** — CredentialBadge component
- **T10** — CallToAction section component

## Objective

Redesign the Services page to improve scannability, visual hierarchy, and information density. The current page problems include: 7 service categories presented as an undifferentiated wall of repeating heading-paragraph-bullets blocks; no visual distinction between Mary's signature services and supporting ones; overly long bullet lists that discourage reading; engagement models presented as plain text blocks without enough visual weight; and the specialty badges section feeling disconnected from the rest of the page. This redesign restructures the page into a clear visual hierarchy that guides prospects to the services most relevant to them.

## Files to Reference
- `agent-tasks/README.md` — Shared design system and conventions
- `WEBSITE_PLAN.md` — Sections 3-6 (design system), Section 8.6 (services page spec)
- `content/services.md` — All 8 service categories, engagement models, specialties
- `content/brand.md` — Brand voice, core phrases ("Meetings with Mary", "Reports for USE")
- `src/content/services.ts` — Structured service data
- `src/app/services/page.tsx` — Current implementation

## Design Problems Being Solved

1. **Seven categories in one flat list** — every category gets identical visual treatment (h3 + paragraph + bullet list), creating a monotonous vertical scroll with no hierarchy between Mary's signature offerings and ancillary services
2. **Bullet lists are too long** — some categories have 5+ bullets that read like a resume, not a marketing page; prospects scan, they do not read every bullet
3. **Engagement models lack visual weight** — the "As Your Consultant" / "As Your Staff" section is two plain text blocks that fail to communicate a key differentiator
4. **Hero section is generic** — just a heading + paragraph + image, with no hook that communicates Mary's unique value proposition
5. **Specialty badges feel disconnected** — a bag of keyword pills with no connection to the service categories they support
6. **No visual rhythm in the service categories section** — all on `bg-brand-cream` with only thin divider lines between 7 blocks of similar content
7. **ServiceCard component is unused** — the page defines its own inline card markup instead of using the existing `ServiceCard` component

## Page Redesign Specification

### Section 1: Hero (bg-brand-cream)

**Layout:** Two-column grid on desktop (`lg:grid-cols-2`), single column on mobile.

Left column (vertically centered against image):
- H1: "Services" with amber decorative rule (unchanged)
- Intro paragraph (unchanged): "All services are customized and scoped for each client..."
- **NEW: Value proposition callout** — a short sentence below the paragraph that anchors Mary's unique positioning:
  - Text: "Mary brings a rare combination of people skills, certified planning expertise, and public-private sector fluency to every engagement."
  - Style: `text-body font-medium text-brand-teal mt-4` — distinct from the regular paragraph, but not a heading

Right column:
- Hero image (unchanged — indoor session photo)

### Section 2: Engagement Models (bg-brand-stone)

**Key change:** Transform from plain text blocks into visually distinct cards with more structure.

- H2: "How We Work Together" with amber rule (unchanged)
- Two-column grid on desktop (`lg:grid-cols-2`), single column on mobile

Each engagement model rendered as a **card**:
- Container: `bg-white rounded-lg p-8 border border-border`
- No box shadows (per design system)
- H3 heading: "As Your Consultant" / "As Your Staff" (unchanged text)
- Description paragraph (keep existing text)
- **NEW: 3 concise benefit bullets** below each description, pulled from the source content:

  **As Your Consultant:**
  - Fresh perspective and candor that facilitates evolution and change
  - Agility to re-imagine outside the constraints of an in-house role
  - Specific change and growth targets more directly available

  **As Your Staff:**
  - Embedded alignment with your staff and leaders
  - Empowered delivery within your organizational framework
  - Continuity and institutional knowledge development

- Bullet styling: `text-body-sm text-brand-slate/80`, with a small teal dot marker (use `list-disc marker:text-brand-teal` or a custom `before:` pseudo-element)

### Section 3: Signature Services (bg-white)

**Key change:** Elevate the top 3 services — Leadership & Coaching, Meetings with Mary, and Project Management — into prominent feature cards. These are Mary's revenue-driving, differentiated offerings. Switching to `bg-white` creates visual separation from both the stone engagement models above and the cream sections that follow.

- H2: "What We Deliver" with amber rule (unchanged)
- **NEW layout: 3 featured service cards** in a single row on desktop (`lg:grid-cols-3`), stacked on mobile

Each featured card:
- Container: `bg-brand-cream rounded-lg p-8 border border-border border-t-[3px] border-t-brand-teal`
- The teal top-border marks these as primary offerings (distinct from the amber left-border used on the clients page — different accent placement for different page identity)
- H3 heading with `id` anchor for deep-linking
- Short description paragraph (2-3 sentences max — trim from current)
- **Capped at 3 bullets max** — select only the most compelling/differentiating points from the current list. Do not include generic items.
- Each card includes a subtle brand phrase callout where applicable

**Card 1: Leadership Development and Coaching** (`id="leadership-coaching"`)
- Description: "A dedicated Thought Partnership for your development and decision-making. Strategic counsel helps you refine your thinking, align your team, and move confidently toward your goals."
- Bullets (pick 3):
  - Trusted advisory for leaders navigating complex decisions
  - DISC personality assessments with applied results
  - Confidential, customized counsel from new managers to senior executives

**Card 2: Meeting Design and Facilitation** (`id="meeting-facilitation"`)
- **Brand callout:** Include "Meetings with Mary" as a styled subtitle below the h3: `text-body-sm font-semibold text-brand-teal tracking-wide uppercase`
- Description: "Every gathering is designed for productive outcomes and meaningful participation, from conference-scale sessions to intimate retreats."
- Bullets (pick 3):
  - Award-winning facilitation across government and university settings
  - Agenda design, stakeholder interviews, and public workshops
  - Change management facilitation from incremental to transformational

**Card 3: Project Development and Management** (`id="project-management"`)
- Description: "Move from initial ideas to clarified programs with detailed scopes of work, focused stakeholder involvement, and disciplined time and budget management."
- Bullets (pick 3):
  - Develop initial ideas into clarified programs and projects
  - Stakeholder and agency involvement with resource identification
  - Time and budget tracking with regular briefings

### Section 4: Additional Services (bg-brand-cream)

**Key change:** The remaining 4 service categories — Plan & Policy, Written Deliverables, Interagency Coordination, Communication Strategies — are presented in a more compact 2-column grid, signaling that they are important capabilities but secondary to the signature three.

- No section heading (this section flows visually as a continuation of services)
- 2-column grid on desktop (`md:grid-cols-2`), single column on mobile, with `gap-6`

Each additional service rendered as a **compact card**:
- Container: `bg-white rounded-lg p-6 border border-border`
- H3 heading with `id` anchor, styled at h4 size: `font-heading text-h4 font-semibold text-brand-slate`
- Short description (1-2 sentences — briefer than the signature cards)
- **2 bullets max** — only the most distinctive points
- No top-border accent (distinguishes these from the signature cards visually)

**Card 4: Plan and Policy Making** (`id="planning-policy"`)
- Description: "Expert support for creating new frameworks or updating existing ones, paired with technical planning assistance and community engagement."
- Bullets:
  - Fiscal analysis, tradeoffs, and alternatives with metrics
  - Guidance through bureaucratic and community processes

**Card 5: Written Deliverables** (`id="written-deliverables"`)
- **Brand callout:** Include "Reports for USE, not the shelf" as a styled subtitle: `text-body-sm font-semibold text-brand-teal tracking-wide uppercase`
- Description: "Documentation that is fully vetted, strategically designed, and ready for use across your organization and community."
- Bullets:
  - Plans, reports, policies, and strategic communications
  - Materials for web, social media, and multi-channel outreach

**Card 6: Interagency and Public Coordination** (`id="interagency-coordination"`)
- Description: "Build and maintain the strategic alliances and community relationships essential to your mission."
- Bullets:
  - Public policy alternative development and strategy
  - Interagency agreements, letters of intent, and representation

**Card 7: Communication Strategies** (`id="communication-strategies"`)
- Description: "Strategic communications support for stakeholder processes and multi-channel outreach."
- Bullets:
  - Stakeholder interviews, focus groups, task forces, and workshops
  - Materials production for multiple audiences

### Section 5: Areas of Specialty (bg-brand-stone — unchanged)

Minimal changes to this section:
- H2: "Areas of Specialty" with amber rule (unchanged)
- **NEW: Add a brief intro line** above the badges: "Deep expertise spanning public and private sectors across these disciplines" — styled as `text-body text-brand-slate/80 mt-4 mb-6`
- Badge layout remains flex-wrap with `CredentialBadge` components (unchanged)
- **Organize badges into a subtle visual grouping** — add a small gap between related clusters by ordering them intentionally:
  1. Planning cluster: Urban and Rural Planning, Real Estate Analysis, Natural Resources, Parks and Recreation, Agriculture, Transportation, Libraries
  2. People/Process cluster: Community Engagement, Decision Making, Organizational Development, Scenario Analysis, Budget Analysis, Governance and Management, Program Design and Implementation

### Section 6: CTA (unchanged)

Use shared `CallToAction` component with existing props. No changes.

## Files to Modify

1. `src/app/services/page.tsx` — Main page component (significant rewrite)
2. `__tests__/pages/services.test.tsx` — Update/extend tests

## Files to Create

None. This task modifies existing files only.

## Data Changes

The `serviceCategories` array currently hardcoded in `page.tsx` will be restructured into two arrays:
- `signatureServices` — the 3 featured services (Leadership, Meetings, Project Management)
- `additionalServices` — the 4 supporting services

These remain defined inline in the page file (not in `src/content/services.ts`) since they are page-specific presentation groupings with curated bullets, not raw content data.

The `specialtyLabels` array and `engagementModels` import remain unchanged.

### Engagement Model Benefits

Add benefits data inline in the page component:

```tsx
const engagementBenefits: Record<string, string[]> = {
  'External Consultant': [
    'Fresh perspective and candor that facilitates evolution and change',
    'Agility to re-imagine outside the constraints of an in-house role',
    'Specific change and growth targets more directly available',
  ],
  'Internal Staff (Interim / Part-Time)': [
    'Embedded alignment with your staff and leaders',
    'Empowered delivery within your organizational framework',
    'Continuity and institutional knowledge development',
  ],
}
```

## Tests to Write / Update

### Updated `__tests__/pages/services.test.tsx`

All existing tests MUST continue to pass. Add the following new tests:

```tsx
describe('Services page — redesign', () => {
  describe('Value proposition', () => {
    it('renders the value proposition callout', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/rare combination.*people skills/i)
      ).toBeInTheDocument()
    })
  })

  describe('Engagement model cards', () => {
    it('renders benefit bullets for consultant model', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/fresh perspective.*candor/i)
      ).toBeInTheDocument()
    })

    it('renders benefit bullets for staff model', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/embedded alignment/i)
      ).toBeInTheDocument()
    })
  })

  describe('Signature services section', () => {
    it('renders signature services on white background', () => {
      const { container } = render(<ServicesPage />)
      const sections = container.querySelectorAll('section')
      // The signature services section (3rd section) should use bg-white
      const sectionClasses = Array.from(sections).map((s) => s.className)
      expect(sectionClasses.some((c) => c.includes('bg-white'))).toBe(true)
    })

    it('renders "Meetings with Mary" brand callout', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/meetings with mary/i)).toBeInTheDocument()
    })

    it('renders 3 signature service cards', () => {
      render(<ServicesPage />)
      // The three signature services should all be present
      expect(
        screen.getByRole('heading', { level: 3, name: /leadership/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /meeting design/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /project/i })
      ).toBeInTheDocument()
    })
  })

  describe('Additional services section', () => {
    it('renders additional services in compact format', () => {
      render(<ServicesPage />)
      expect(
        screen.getByRole('heading', { level: 3, name: /plan.*policy/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /written deliverables/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /interagency/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /communication strategies/i })
      ).toBeInTheDocument()
    })

    it('renders "Reports for USE" brand callout in written deliverables', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/reports for use/i)).toBeInTheDocument()
    })
  })

  describe('Specialty areas intro', () => {
    it('has intro text above specialty badges', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/deep expertise.*disciplines/i)
      ).toBeInTheDocument()
    })
  })

  describe('Bullet count discipline', () => {
    it('signature service cards have at most 3 bullets each', () => {
      const { container } = render(<ServicesPage />)
      // Find the signature services section (bg-white)
      const whiteSection = Array.from(
        container.querySelectorAll('section')
      ).find((s) => s.className.includes('bg-white'))
      if (whiteSection) {
        const cards = whiteSection.querySelectorAll('[class*="rounded-lg"]')
        cards.forEach((card) => {
          const bullets = card.querySelectorAll('li')
          expect(bullets.length).toBeLessThanOrEqual(3)
        })
      }
    })

    it('additional service cards have at most 2 bullets each', () => {
      const { container } = render(<ServicesPage />)
      // Find the additional services section (bg-brand-cream, after bg-white)
      const sections = Array.from(container.querySelectorAll('section'))
      const whiteIdx = sections.findIndex((s) =>
        s.className.includes('bg-white')
      )
      const additionalSection = sections[whiteIdx + 1]
      if (additionalSection) {
        const cards = additionalSection.querySelectorAll('[class*="rounded-lg"]')
        cards.forEach((card) => {
          const bullets = card.querySelectorAll('li')
          expect(bullets.length).toBeLessThanOrEqual(2)
        })
      }
    })
  })
})
```

## Implementation Guidance

### Signature Service Card

```tsx
interface SignatureService {
  id: string
  title: string
  brandCallout?: string
  description: string
  bullets: string[]
}

const signatureServices: SignatureService[] = [
  {
    id: 'leadership-coaching',
    title: 'Leadership Development and Coaching',
    description:
      'A dedicated Thought Partnership for your development and decision-making. Strategic counsel helps you refine your thinking, align your team, and move confidently toward your goals.',
    bullets: [
      'Trusted advisory for leaders navigating complex decisions',
      'DISC personality assessments with applied results',
      'Confidential, customized counsel from new managers to senior executives',
    ],
  },
  {
    id: 'meeting-facilitation',
    title: 'Meeting Design and Facilitation',
    brandCallout: 'Meetings with Mary',
    description:
      'Every gathering is designed for productive outcomes and meaningful participation, from conference-scale sessions to intimate retreats.',
    bullets: [
      'Award-winning facilitation across government and university settings',
      'Agenda design, stakeholder interviews, and public workshops',
      'Change management facilitation from incremental to transformational',
    ],
  },
  {
    id: 'project-management',
    title: 'Project Development and Management',
    description:
      'Move from initial ideas to clarified programs with detailed scopes of work, focused stakeholder involvement, and disciplined time and budget management.',
    bullets: [
      'Develop initial ideas into clarified programs and projects',
      'Stakeholder and agency involvement with resource identification',
      'Time and budget tracking with regular briefings',
    ],
  },
]
```

Render pattern for a signature card:

```tsx
<div
  id={service.id}
  className="scroll-mt-24 rounded-lg border border-border border-t-[3px] border-t-brand-teal bg-brand-cream p-8"
>
  <h3 className="font-heading text-h3 font-semibold text-brand-slate">
    {service.title}
  </h3>
  {service.brandCallout && (
    <p className="mt-1 text-body-sm font-semibold uppercase tracking-wide text-brand-teal">
      {service.brandCallout}
    </p>
  )}
  <p className="mt-3 max-w-prose text-body text-brand-slate/80">
    {service.description}
  </p>
  <ul className="mt-4 list-disc space-y-1 pl-5 text-body-sm text-brand-slate/70 marker:text-brand-teal">
    {service.bullets.map((bullet) => (
      <li key={bullet}>{bullet}</li>
    ))}
  </ul>
</div>
```

### Additional Service Card

```tsx
interface AdditionalService {
  id: string
  title: string
  brandCallout?: string
  description: string
  bullets: string[]
}

const additionalServices: AdditionalService[] = [
  {
    id: 'planning-policy',
    title: 'Plan and Policy Making',
    description:
      'Expert support for creating new frameworks or updating existing ones, paired with technical planning assistance and community engagement.',
    bullets: [
      'Fiscal analysis, tradeoffs, and alternatives with metrics',
      'Guidance through bureaucratic and community processes',
    ],
  },
  {
    id: 'written-deliverables',
    title: 'Written Deliverables',
    brandCallout: 'Reports for USE, not the shelf',
    description:
      'Documentation that is fully vetted, strategically designed, and ready for use across your organization and community.',
    bullets: [
      'Plans, reports, policies, and strategic communications',
      'Materials for web, social media, and multi-channel outreach',
    ],
  },
  {
    id: 'interagency-coordination',
    title: 'Interagency and Public Coordination',
    description:
      'Build and maintain the strategic alliances and community relationships essential to your mission.',
    bullets: [
      'Public policy alternative development and strategy',
      'Interagency agreements, letters of intent, and representation',
    ],
  },
  {
    id: 'communication-strategies',
    title: 'Communication Strategies',
    description:
      'Strategic communications support for stakeholder processes and multi-channel outreach.',
    bullets: [
      'Stakeholder interviews, focus groups, task forces, and workshops',
      'Materials production for multiple audiences',
    ],
  },
]
```

Render pattern for an additional card:

```tsx
<div
  id={service.id}
  className="scroll-mt-24 rounded-lg border border-border bg-white p-6"
>
  <h3 className="font-heading text-h4 font-semibold text-brand-slate">
    {service.title}
  </h3>
  {service.brandCallout && (
    <p className="mt-1 text-caption font-semibold uppercase tracking-wide text-brand-teal">
      {service.brandCallout}
    </p>
  )}
  <p className="mt-2 text-body-sm text-brand-slate/80">
    {service.description}
  </p>
  <ul className="mt-3 list-disc space-y-1 pl-5 text-body-sm text-brand-slate/70 marker:text-brand-teal">
    {service.bullets.map((bullet) => (
      <li key={bullet}>{bullet}</li>
    ))}
  </ul>
</div>
```

### Engagement Model Card

```tsx
<div className="rounded-lg border border-border bg-white p-8">
  <h3 className="font-heading text-h3 font-semibold text-brand-slate">
    {model.title === 'External Consultant' ? 'As Your Consultant' : 'As Your Staff'}
  </h3>
  <p className="mt-3 text-body text-brand-slate/80">
    {model.description}
  </p>
  <ul className="mt-4 list-disc space-y-1 pl-5 text-body-sm text-brand-slate/70 marker:text-brand-teal">
    {engagementBenefits[model.title].map((benefit) => (
      <li key={benefit}>{benefit}</li>
    ))}
  </ul>
</div>
```

## Acceptance Criteria

1. All existing T16 tests continue to pass (no regressions)
2. New redesign tests pass
3. Hero includes value proposition callout text
4. Engagement model cards render with benefit bullets
5. 3 signature services displayed prominently on `bg-white` section with teal top-border accent
6. 4 additional services displayed in compact `md:grid-cols-2` grid on `bg-brand-cream`
7. Signature services capped at 3 bullets each; additional services at 2 bullets each
8. "Meetings with Mary" brand callout styled distinctly on the facilitation card
9. "Reports for USE, not the shelf" brand callout styled distinctly on the written deliverables card
10. All 7 service `id` anchors preserved for deep-linking
11. Specialty badges section includes intro text
12. `pnpm test:run` passes
13. `pnpm build` completes without errors
14. No emojis, no exclamation points in copy
15. No box shadows (per design system)
16. Responsive: all grids collapse to single column on mobile
