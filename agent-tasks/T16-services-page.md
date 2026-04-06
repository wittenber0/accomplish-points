# T16 — Services Page

## Phase
4 — Pages

## Dependencies
- **T04** — Content data files (services)
- **T05** — Button component
- **T06** — SectionHeading component
- **T09** — CredentialBadge component (for specialty keyword badges)
- **T10** — CallToAction section component
- **T13** — Root layout

## Objective
Build the Services page with a comprehensive, scannable overview of everything Mary does. Organized so a prospect can quickly find relevant services and understand the two engagement models.

## Files to Reference
- `agent-tasks/README.md` — Full design system
- `content/services.md` — All 8 service categories + overview + engagement models + specialties
- `src/content/services.ts` — Structured service data (T04)

## Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Services',
  description:
    'Leadership coaching, meeting facilitation, strategic planning, project management, and policy development — customized for public service organizations, government agencies, and community leaders.',
}
```

## Files to Create

1. `src/app/services/page.tsx`
2. `__tests__/pages/services.test.tsx`

## Tests to Write First

**`__tests__/pages/services.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ServicesPage from '@/app/services/page'

describe('Services page', () => {
  describe('Heading hierarchy', () => {
    it('has exactly one H1 with "Services"', () => {
      const { container } = render(<ServicesPage />)
      const h1s = container.querySelectorAll('h1')
      expect(h1s).toHaveLength(1)
      expect(h1s[0]).toHaveTextContent(/services/i)
    })

    it('has engagement models H2', () => {
      render(<ServicesPage />)
      expect(
        screen.getByRole('heading', { level: 2, name: /how we work together/i })
      ).toBeInTheDocument()
    })

    it('does not skip heading levels', () => {
      const { container } = render(<ServicesPage />)
      // Ensure there are no h4s without h3s above them etc.
      const headings = container.querySelectorAll('h1, h2, h3, h4')
      const levels = Array.from(headings).map((h) => parseInt(h.tagName[1]))
      for (let i = 1; i < levels.length; i++) {
        // Each heading level should not jump more than 1 level deeper than the max level seen so far
        expect(levels[i]).toBeLessThanOrEqual(Math.max(...levels.slice(0, i)) + 1)
      }
    })
  })

  describe('Engagement models', () => {
    it('describes the consultant engagement model', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/consultant/i)).toBeInTheDocument()
    })

    it('describes the embedded staff engagement model', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/staff|embedded|interim/i)).toBeInTheDocument()
    })
  })

  describe('Service categories', () => {
    it('renders Leadership & Coaching section', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/leadership.*coaching|coaching.*leadership/i)).toBeInTheDocument()
    })

    it('renders Meeting Design & Facilitation section', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/meeting design|meetings with mary/i)).toBeInTheDocument()
    })

    it('renders Planning & Policy section', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/plan.*policy|planning/i)).toBeInTheDocument()
    })

    it('renders Written Deliverables section', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/written deliverables/i)).toBeInTheDocument()
    })

    it('renders "Reports for USE" brand phrase', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/reports for use/i)).toBeInTheDocument()
    })

    it('service categories have id anchors for deep linking', () => {
      const { container } = render(<ServicesPage />)
      expect(container.querySelector('#leadership-coaching')).toBeInTheDocument()
      expect(container.querySelector('#meeting-facilitation')).toBeInTheDocument()
      expect(container.querySelector('#planning-policy')).toBeInTheDocument()
    })
  })

  describe('Specialty areas', () => {
    it('renders specialty keywords', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/urban and rural planning|land use/i)).toBeInTheDocument()
    })
  })

  describe('CTA', () => {
    it('has CTA linking to contact page', () => {
      render(<ServicesPage />)
      const link = screen.getByRole('link', { name: /get in touch|start a conversation/i })
      expect(link).toHaveAttribute('href', '/contact')
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<ServicesPage />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no exclamation points', () => {
      const { container } = render(<ServicesPage />)
      expect(container.textContent).not.toContain('!')
    })
  })
})
```

## Implementation Spec

### Page Structure (`src/app/services/page.tsx`)

Five sections:

### Section 1: Overview
- **Background:** `brand-cream`
- H1: "Services" with amber decorative rule
- Intro paragraph: "All services are customized and scoped for each client. Whether navigating complex multi-stakeholder processes or focused single-issue engagements, every partnership begins with understanding your needs, your people, and your goals."
- Source: `content/services.md` Overview section

### Section 2: Engagement Models
- **Background:** `brand-stone`
- H2: "How We Work Together"
- Two-column layout on desktop (`lg:grid-cols-2`), stacked on mobile
- Left column — **As Your Consultant:**
  - External perspective with the agility to focus on contracted scope
  - Fresh viewpoint and candor that facilitates evolution and change
  - Support for people's growth, teamwork, and organizational development
- Right column — **As Your Staff:**
  - Embedded interim, part-time, or temporary role
  - Aligned with staff and leaders within organizational framework
  - Dutiful and enthusiastic internal operations support
- Each column: H3 heading, 2-3 short bullet points or sentences
- Source: `content/services.md` Engagement Models + `content/bio.md` "two modes" passage

### Section 3: Service Categories
- **Background:** `brand-cream`
- Each category is a sub-section separated by subtle horizontal rules (1px, `border` color)
- Each category gets: H3 heading, 1-2 sentence description, then concise bullet list
- Each category has an `id` attribute for deep-linking from other pages

**Categories to render (7 consolidated from the 8 source categories):**

1. **Leadership Development & Coaching** (`id="leadership-coaching"`)
   - Thought partnership, trusted advisory, personal and team development
   - DISC assessments and applied results, career transition support
   - Confidentiality, genuine interest, customized approach

2. **Meeting Design & Facilitation** (`id="meeting-facilitation"`)
   - Mary's signature service — "Meetings with Mary"
   - Award-winning, all scales (office rooms to outdoor retreats to conferences)
   - Agenda design, materials preparation, facilitation, report generation
   - Change management support (incremental to transformational)
   - Image placeholder for outdoor retreat photo (slide31) if approved

3. **Project Development & Management** (`id="project-management"`)
   - Develop initial ideas into clarified programs and detailed scopes
   - Stakeholder involvement, resource identification
   - Timeline and budget tracking, flexible scope adjustment

4. **Plan & Policy Making** (`id="planning-policy"`)
   - New organizational or public services plans and policies
   - Updates and revisions to existing plans
   - Technical planning assistance, fiscal analysis, tradeoff evaluation

5. **Written Deliverables** (`id="written-deliverables"`)
   - "Reports for USE — not the shelf" (preserve brand phrase)
   - Plans, reports, bid packages, strategic communications
   - Web and social content development

6. **Interagency & Public Coordination** (`id="interagency-coordination"`)
   - Strategic alliances, intergovernmental agreements
   - Policy alternatives, public representation
   - Meeting attendance on behalf of client, briefings and reports

7. **Communication Strategies** (`id="communication-strategies"`)
   - Stakeholder processes: interviews, focus groups, task forces, workshops, retreats
   - Materials production and strategic messaging

### Section 4: Areas of Specialty
- **Background:** `brand-stone`
- H2: "Areas of Specialty"
- Flex-wrap layout of keyword badges (use `CredentialBadge` or similar lightweight styled spans)
- Keywords: Urban and Rural Planning, Land Use and Real Estate Analysis, Natural Resources, Parks and Recreation, Agriculture, Transportation, Libraries, Community Engagement, Decision Making, Organizational Development, Scenario Planning, Budget Analysis, Governance and Management, Program Design and Implementation
- Source: `content/services.md` "Areas of specialty" list

### Section 5: CTA
Use shared `CallToAction` component:
- Heading: "Ready to accomplish what matters most?"
- Body: "Every engagement begins with a conversation about what you need."
- Button: "Get in Touch" → `/contact`

## Acceptance Criteria

1. All tests pass
2. Exactly one H1: "Services"
3. Engagement models section clearly describes both consultant and staff modes
4. All 7 service categories rendered with `id` anchors for deep-linking
5. "Reports for USE — not the shelf" brand phrase present
6. "Meetings with Mary" mentioned in facilitation section
7. Specialty areas displayed as keyword badges in flex-wrap layout
8. Alternating section backgrounds
9. CTA at bottom links to contact page
10. No emojis, no exclamation points
11. Heading hierarchy is strict (no skipped levels)
