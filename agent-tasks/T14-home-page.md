# T14 — Home Page

## Phase
4 — Pages

## Dependencies
- **T04** — Content data files (services, testimonials, credentials)
- **T05** — Button component
- **T06** — SectionHeading component
- **T07** — TestimonialCard component
- **T08** — ServiceCard component
- **T09** — CredentialBadge component
- **T10** — CallToAction section component
- **T13** — Root layout (header, footer in place)

## Objective
Build the home page with five sections: Hero, Services Overview, Testimonial Strip, Credentials Bar, and CTA. This is the primary landing page and must immediately communicate who Mary is, what she does, and drive visitors deeper into the site.

## Files to Reference
- `agent-tasks/README.md` — Full design system
- `content/brand.md` — Value proposition, core phrases
- `content/services.md` — Service categories for overview grid
- `content/testimonials.md` — Clark Seavert quote for featured testimonial
- `content/credentials.md` — Certifications for credentials bar
- `src/content/services.ts` — Structured service data (created in T04)
- `src/content/testimonials.ts` — Structured testimonial data (created in T04)
- `src/content/credentials.ts` — Structured credentials data (created in T04)

## Files to Create

1. `src/app/page.tsx` — Home page
2. `src/components/sections/Hero.tsx` — Hero section
3. `src/components/sections/ServicesOverview.tsx` — Services overview grid
4. `src/components/sections/TestimonialStrip.tsx` — Featured testimonial
5. `src/components/sections/CredentialsBar.tsx` — Credentials trust band
6. `__tests__/pages/home.test.tsx`
7. `__tests__/components/sections/Hero.test.tsx`
8. `__tests__/components/sections/ServicesOverview.test.tsx`
9. `__tests__/components/sections/TestimonialStrip.test.tsx`
10. `__tests__/components/sections/CredentialsBar.test.tsx`

## Tests to Write First

**`__tests__/pages/home.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '@/app/page'

describe('Home page', () => {
  it('renders the H1 heading with brand phrase', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /accomplish what is most important/i
    )
  })

  it('has exactly one H1', () => {
    const { container } = render(<HomePage />)
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
  })

  it('renders the primary CTA linking to contact', () => {
    render(<HomePage />)
    const cta = screen.getByRole('link', { name: /start a conversation/i })
    expect(cta).toHaveAttribute('href', '/contact')
  })

  it('renders the secondary CTA linking to services', () => {
    render(<HomePage />)
    const cta = screen.getByRole('link', { name: /explore services/i })
    expect(cta).toHaveAttribute('href', '/services')
  })

  it('renders a featured testimonial', () => {
    render(<HomePage />)
    expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
  })

  it('renders credentials section', () => {
    render(<HomePage />)
    expect(screen.getByText(/AICP/)).toBeInTheDocument()
  })

  it('renders services overview section', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /how i work with you/i })).toBeInTheDocument()
  })

  it('contains no emojis', () => {
    const { container } = render(<HomePage />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })

  it('contains no exclamation points in body text', () => {
    const { container } = render(<HomePage />)
    // Allow exclamation in brand phrase "Accomplish what is most important."
    // but check there aren't excessive ones
    const textContent = container.textContent || ''
    const exclamationCount = (textContent.match(/!/g) || []).length
    expect(exclamationCount).toBeLessThanOrEqual(0)
  })
})
```

**`__tests__/components/sections/Hero.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '@/components/sections/Hero'

describe('Hero section', () => {
  it('renders the business name label', () => {
    render(<Hero />)
    expect(screen.getByText(/Accomplish Points Consulting/)).toBeInTheDocument()
  })

  it('renders the H1 heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders subtitle paragraph', () => {
    render(<Hero />)
    // Should mention strategic planning or public service
    expect(screen.getByText(/strategic planning|public service/i)).toBeInTheDocument()
  })

  it('renders primary CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /start a conversation/i })).toBeInTheDocument()
  })

  it('renders secondary CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /explore services/i })).toBeInTheDocument()
  })

  it('has image placeholder or image element', () => {
    const { container } = render(<Hero />)
    // Either an img or a placeholder div
    const img = container.querySelector('img')
    const placeholder = container.querySelector('[data-testid="hero-image-placeholder"]')
    expect(img || placeholder).toBeTruthy()
  })
})
```

**`__tests__/components/sections/ServicesOverview.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServicesOverview } from '@/components/sections/ServicesOverview'

describe('ServicesOverview section', () => {
  it('renders the section heading', () => {
    render(<ServicesOverview />)
    expect(screen.getByRole('heading', { level: 2, name: /how i work with you/i })).toBeInTheDocument()
  })

  it('renders 4 service cards', () => {
    render(<ServicesOverview />)
    // 4 service groupings
    const cards = screen.getAllByRole('heading', { level: 4 })
    expect(cards.length).toBeGreaterThanOrEqual(4)
  })

  it('renders "View All Services" link', () => {
    render(<ServicesOverview />)
    const link = screen.getByRole('link', { name: /view all services/i })
    expect(link).toHaveAttribute('href', '/services')
  })

  it('has stone background class', () => {
    const { container } = render(<ServicesOverview />)
    // The section wrapper should have stone bg
    expect(container.firstChild).toHaveClass('bg-brand-stone')
  })
})
```

**`__tests__/components/sections/TestimonialStrip.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TestimonialStrip } from '@/components/sections/TestimonialStrip'

describe('TestimonialStrip section', () => {
  it('renders the Clark Seavert testimonial', () => {
    render(<TestimonialStrip />)
    expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
  })

  it('renders the quote text', () => {
    render(<TestimonialStrip />)
    expect(screen.getByText(/first rate in her planning skills/i)).toBeInTheDocument()
  })

  it('renders a link to see more testimonials', () => {
    render(<TestimonialStrip />)
    const link = screen.getByRole('link', { name: /see more|clients/i })
    expect(link).toHaveAttribute('href', '/clients')
  })

  it('uses a blockquote element', () => {
    const { container } = render(<TestimonialStrip />)
    expect(container.querySelector('blockquote')).toBeInTheDocument()
  })
})
```

**`__tests__/components/sections/CredentialsBar.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CredentialsBar } from '@/components/sections/CredentialsBar'

describe('CredentialsBar section', () => {
  it('renders AICP credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/AICP/)).toBeInTheDocument()
  })

  it('renders PROSCI credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/PROSCI|Change Management/)).toBeInTheDocument()
  })

  it('renders UCLA credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/UCLA/)).toBeInTheDocument()
  })

  it('renders WBE credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/WBE/i)).toBeInTheDocument()
  })

  it('renders experience credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/25\+/)).toBeInTheDocument()
  })

  it('has stone background', () => {
    const { container } = render(<CredentialsBar />)
    expect(container.firstChild).toHaveClass('bg-brand-stone')
  })

  it('does not render section headings', () => {
    const { container } = render(<CredentialsBar />)
    // Credentials bar is a visual band, no headings
    expect(container.querySelector('h2')).not.toBeInTheDocument()
    expect(container.querySelector('h3')).not.toBeInTheDocument()
  })
})
```

## Implementation Spec

### Page Structure (`src/app/page.tsx`)

```tsx
import { Hero } from '@/components/sections/Hero'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { TestimonialStrip } from '@/components/sections/TestimonialStrip'
import { CredentialsBar } from '@/components/sections/CredentialsBar'
import { CallToAction } from '@/components/sections/CallToAction'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <TestimonialStrip />
      <CredentialsBar />
      <CallToAction
        heading="Ready to accomplish what matters most?"
        body="Every engagement begins with a conversation about what you need."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  )
}
```

### Section 1: Hero (`src/components/sections/Hero.tsx`)

**Layout:**
- Full viewport height minus header: `min-h-[calc(100vh-5rem)]`
- Two-column on desktop (`lg:grid-cols-2`), single column on mobile
- Text left, image right on desktop

**Content:**
- Small label: "Accomplish Points Consulting" — caption size, `brand-teal`, uppercase, tracking-wide
- H1: "Accomplish what is most important." — heading font, `brand-slate`, `text-h1`
- Subtitle (2-3 sentences): "Mary Cook partners with public service organizations, government agencies, and leaders through strategic planning, facilitation, and leadership development. Over 25 years of experience building capacity and consensus in Oregon communities."
- Primary CTA: `<Button variant="primary" href="/contact">Start a Conversation</Button>`
- Secondary CTA: `<Button variant="secondary" href="/services">Explore Services</Button>`

**Image:**
- Right column: Mary's primary headshot placeholder
- Until unwatermarked photo available: solid `brand-stone` block with `data-testid="hero-image-placeholder"`
- When photo available: `next/image` with `priority` prop, descriptive alt text

**Background:** `brand-cream`

### Section 2: Services Overview (`src/components/sections/ServicesOverview.tsx`)

**Background:** `brand-stone`

**Content:**
- H2: "How I Work With You" with amber decorative rule (use `SectionHeading` with `withRule`)
- 2x2 grid on desktop (`lg:grid-cols-2`), single column on mobile
- 4 service groupings, each rendered as a `ServiceCard`:
  1. **Leadership & Coaching** — "Thought partnership, personal development, and a trusted advisory relationship dedicated to your growth and your team's effectiveness."
  2. **Meeting Design & Facilitation** — "Award-winning facilitation from office rooms to outdoor retreats. Agenda design, stakeholder engagement, and deliverables that drive action."
  3. **Planning & Policy** — "Strategic plans, policy development, and technical planning assistance grounded in decades of public sector experience."
  4. **Communication & Coordination** — "Stakeholder processes, interagency coordination, and strategic communications that bring the right people to the table."
- Each card has a "Learn more" link to `/services`
- Below grid: "View All Services" text link → `/services`

### Section 3: Testimonial Strip (`src/components/sections/TestimonialStrip.tsx`)

**Background:** `brand-cream`

**Content:**
- Single featured testimonial using `TestimonialCard` component
- Use Clark Seavert quote (most detailed, has title + org):
  - Quote: "Mary was first rate in her planning skills and especially her ability to be unbending in her focus on a well designed process and product while remaining engaging and flexible with the people involved. She is excellent at eliciting participation and is respectful and collaborative in the way she incorporates the results in the project. She is an excellent writer. She understands how to serve the client's needs and as a professional in delivery of public services really understood what was needed. She was a true 'partner' to the Center and me as her firm's name implies."
  - Attribution: Clark Seavert, Director, OSU Research Center
- Below the quote: "See more from our clients" text link → `/clients`

### Section 4: Credentials Bar (`src/components/sections/CredentialsBar.tsx`)

**Background:** `brand-stone`

**Content:**
- Compact horizontal layout — a trust band, not a full section
- Flex row of `CredentialBadge` components, wrapping:
  - "AICP Certified Planner"
  - "PROSCI Change Management"
  - "M.A. Urban Planning, UCLA"
  - "WBE Certified"
  - "25+ Years Experience"
- No headings, no decorative elements
- Center-aligned, generous horizontal spacing

### Section 5: CTA

Use the shared `CallToAction` component:
- Heading: "Ready to accomplish what matters most?"
- Body: "Every engagement begins with a conversation about what you need."
- Button: "Get in Touch" → `/contact`

## Acceptance Criteria

1. All tests pass
2. Page has exactly one H1 ("Accomplish what is most important.")
3. Hero renders with two-column layout on desktop, stacked on mobile
4. Both CTA buttons present with correct links
5. Services overview shows 4 grouped service cards with amber decorative rule
6. Featured testimonial displays Clark Seavert quote with attribution
7. Credentials bar shows 5 credential badges in a horizontal flex row
8. CTA section at bottom with dark background
9. No emojis, no exclamation points
10. Alternating section backgrounds (cream → stone → cream → stone → slate)
11. Image placeholder renders when headshot is unavailable
12. Page is a Server Component (no `'use client'`)
