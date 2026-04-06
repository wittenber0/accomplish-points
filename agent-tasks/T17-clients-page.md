# T17 — Clients & Testimonials Page

## Phase
4 — Pages

## Dependencies
- **T04** — Content data files (clients, testimonials, credentials)
- **T06** — SectionHeading component
- **T07** — TestimonialCard component
- **T10** — CallToAction section component
- **T13** — Root layout

## Objective
Build the Clients & Testimonials page that provides social proof through the breadth of organizations served and direct client quotes. This is the "trust" page.

## Files to Reference
- `agent-tasks/README.md` — Full design system
- `content/clients.md` — Full client list by category
- `content/testimonials.md` — All 4 testimonials
- `content/credentials.md` — Awards and conference speaking
- `src/content/clients.ts` — Structured client data (T04)
- `src/content/testimonials.ts` — Structured testimonial data (T04)
- `src/content/credentials.ts` — Awards data (T04)

## Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Clients & Testimonials',
  description:
    'Trusted by Oregon public service organizations including OSU, Clackamas County, and municipalities. Read testimonials from government and university leaders.',
}
```

## Files to Create

1. `src/app/clients/page.tsx`
2. `__tests__/pages/clients.test.tsx`

## Tests to Write First

**`__tests__/pages/clients.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClientsPage from '@/app/clients/page'

describe('Clients page', () => {
  describe('Heading hierarchy', () => {
    it('has exactly one H1', () => {
      const { container } = render(<ClientsPage />)
      expect(container.querySelectorAll('h1')).toHaveLength(1)
    })

    it('H1 contains "Clients & Testimonials"', () => {
      render(<ClientsPage />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /clients.*testimonials/i
      )
    })

    it('has "What Clients Say" H2', () => {
      render(<ClientsPage />)
      expect(
        screen.getByRole('heading', { level: 2, name: /what clients say/i })
      ).toBeInTheDocument()
    })

    it('has "Awards & Recognition" H2', () => {
      render(<ClientsPage />)
      expect(
        screen.getByRole('heading', { level: 2, name: /awards.*recognition/i })
      ).toBeInTheDocument()
    })
  })

  describe('Client categories', () => {
    it('renders Oregon State University clients', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Oregon State University|OSU/)).toBeInTheDocument()
    })

    it('renders County Government clients', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Clackamas County/)).toBeInTheDocument()
    })

    it('renders Cities', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Molalla/)).toBeInTheDocument()
    })

    it('renders Special Districts', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/North Clackamas Parks/)).toBeInTheDocument()
    })
  })

  describe('Testimonials', () => {
    it('renders Clark Seavert testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
    })

    it('renders Dan Zinzer testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Dan Zinzer/)).toBeInTheDocument()
    })

    it('renders Connie L. testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Connie L\./)).toBeInTheDocument()
    })

    it('renders Daphne testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Daphne/)).toBeInTheDocument()
    })

    it('testimonials use blockquote elements', () => {
      const { container } = render(<ClientsPage />)
      const blockquotes = container.querySelectorAll('blockquote')
      expect(blockquotes.length).toBe(4)
    })
  })

  describe('Awards', () => {
    it('renders League of Oregon Cities award', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/League of Oregon Cities/)).toBeInTheDocument()
    })

    it('renders IAP2 award', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/IAP2|International Association of Public Participation/)).toBeInTheDocument()
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<ClientsPage />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no placeholder logos or empty rectangles', () => {
      const { container } = render(<ClientsPage />)
      // No empty divs styled to look like logo placeholders
      expect(container.innerHTML).not.toContain('placeholder-logo')
    })
  })
})
```

## Implementation Spec

### Section 1: Clients
- **Background:** `brand-cream`
- H1: "Clients & Testimonials" with amber decorative rule
- Brief intro: "Mary has partnered with public service organizations, universities, cities, counties, and special districts for over 25 years."
- Client list organized by category, each with an H3 heading:

  **Oregon State University System:**
  - Oregon Wine Research Institute
  - Food Innovation Center
  - North Willamette Research and Extension Center
  - Clackamas County Extension and 4-H District

  **County Government:**
  - Clackamas County — County Commission
  - Clackamas County — Planning Division
  - Clackamas County — Transportation Engineering Division
  - Clackamas County — Development Agency (Economics)
  - Clackamas County — Parks Department
  - Tillamook County Transportation District

  **Cities:**
  - City of Molalla (award-winning Social Services Summit)
  - City of West Linn (Sustainability Task Force appointment)
  - City of Tualatin (Parks Advisory Board appointment)

  **Special Districts & Libraries:**
  - North Clackamas Parks and Recreation District
  - Clackamas County Library District

- Display as structured lists with organization type as context
- Do NOT display logo placeholders — if no logos exist, use text-only lists

### Section 2: Testimonials
- **Background:** `brand-stone`
- H2: "What Clients Say"
- All 4 testimonials displayed vertically using `TestimonialCard` component
- Order (most detailed first):
  1. Clark Seavert, Director, OSU Research Center — "Mary was first rate in her planning skills..."
  2. Dan Zinzer, Director, Clackamas County Business & Community Services — "Mary is an energetic problem solver..."
  3. Connie L. — "Mary has been an invaluable resource..."
  4. Daphne — "Thank you so much for all your work..."
- Each testimonial uses `TestimonialCard` with: `quote`, `name`, `title` (optional), `organization` (optional)
- Generous vertical spacing between cards (`space-y-8` or similar)

### Section 3: Awards & Recognition
- **Background:** `brand-cream`
- H2: "Awards & Recognition"
- Two awards:
  1. **League of Oregon Cities Good Governance Award — Award for Excellence**
     - City of Molalla — Swanson Partners, LLC project team member
     - Design and facilitation of innovative Social Services Summit
  2. **Award of Excellence — Operation Listen**
     - Design and Management of Pilot Project to Better Engage the Community with Clackamas County
     - Cascade Chapter, International Association of Public Participation (IAP2)
- Conference speaking mention: "Getting The Most Out of Your Planning Process" — statewide conference sessions
- Simple card or list layout — not overly designed

### Section 4: CTA
Use shared `CallToAction` component:
- Heading: "Ready to accomplish what matters most?"
- Body: "Every engagement begins with a conversation about what you need."
- Button: "Get in Touch" → `/contact`

## Acceptance Criteria

1. All tests pass
2. Exactly one H1: "Clients & Testimonials"
3. Client list organized by 4 categories with named organizations
4. All 4 testimonials rendered as blockquotes with attribution
5. Testimonials ordered: Clark Seavert, Dan Zinzer, Connie L., Daphne
6. Both awards displayed with context
7. No placeholder logos or empty rectangles for client logos
8. Alternating section backgrounds
9. CTA at bottom links to contact page
10. No emojis, no exclamation points
