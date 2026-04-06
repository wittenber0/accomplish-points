# T15 — About Page

## Phase
4 — Pages

## Dependencies
- **T04** — Content data files (credentials)
- **T05** — Button component
- **T06** — SectionHeading component
- **T09** — CredentialBadge component
- **T10** — CallToAction section component
- **T13** — Root layout

## Objective
Build the About page that establishes Mary's credibility through her professional story, credentials, and unique value proposition. The page tells a human narrative, not a dry resume listing.

## Files to Reference
- `agent-tasks/README.md` — Full design system
- `content/bio.md` — Full biography (the primary source)
- `content/credentials.md` — Education, certifications, awards, WBE
- `content/services.md` — Category 9 intersectionality content (People/Planning/Economics)
- `src/content/credentials.ts` — Structured credentials data (T04)

## Files to Create

1. `src/app/about/page.tsx`
2. `__tests__/pages/about.test.tsx`

## Page Metadata

```ts
export const metadata: Metadata = {
  title: 'About Mary Cook',
  description:
    'Mary Cook is a nationally certified planner (AICP) with 25+ years of experience in strategic planning, facilitation, and organizational development for public service organizations.',
}
```

## Tests to Write First

**`__tests__/pages/about.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AboutPage from '@/app/about/page'

describe('About page', () => {
  describe('Heading hierarchy', () => {
    it('has exactly one H1', () => {
      const { container } = render(<AboutPage />)
      expect(container.querySelectorAll('h1')).toHaveLength(1)
    })

    it('H1 contains "About Mary Cook"', () => {
      render(<AboutPage />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/about mary cook/i)
    })

    it('has "A Career in Service" H2 section', () => {
      render(<AboutPage />)
      expect(screen.getByRole('heading', { level: 2, name: /a career in service/i })).toBeInTheDocument()
    })

    it('has "Credentials" H2 section', () => {
      render(<AboutPage />)
      expect(screen.getByRole('heading', { level: 2, name: /credentials/i })).toBeInTheDocument()
    })

    it('has the intersectionality H2 section', () => {
      render(<AboutPage />)
      expect(
        screen.getByRole('heading', { level: 2, name: /people.*planning.*economics/i })
      ).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('mentions Accomplish Points Consulting', () => {
      render(<AboutPage />)
      expect(screen.getByText(/Accomplish Points/)).toBeInTheDocument()
    })

    it('mentions Bend, Oregon', () => {
      render(<AboutPage />)
      expect(screen.getByText(/Bend, Oregon/)).toBeInTheDocument()
    })

    it('mentions UCLA education', () => {
      render(<AboutPage />)
      expect(screen.getByText(/UCLA/)).toBeInTheDocument()
    })

    it('mentions AICP certification', () => {
      render(<AboutPage />)
      expect(screen.getByText(/AICP|American Institute of Certified Planners/)).toBeInTheDocument()
    })

    it('mentions Clackamas County career', () => {
      render(<AboutPage />)
      expect(screen.getByText(/Clackamas County/)).toBeInTheDocument()
    })

    it('mentions WBE certification', () => {
      render(<AboutPage />)
      expect(screen.getByText(/Women Business Enterprise|WBE/)).toBeInTheDocument()
    })

    it('mentions Swanson Partners as prior firm', () => {
      render(<AboutPage />)
      expect(screen.getByText(/Swanson Partners/)).toBeInTheDocument()
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<AboutPage />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no exclamation points', () => {
      const { container } = render(<AboutPage />)
      expect(container.textContent).not.toContain('!')
    })
  })

  describe('Navigation', () => {
    it('has CTA linking to contact page', () => {
      render(<AboutPage />)
      const link = screen.getByRole('link', { name: /get in touch|start a conversation/i })
      expect(link).toHaveAttribute('href', '/contact')
    })
  })
})
```

## Implementation Spec

### Page Structure (`src/app/about/page.tsx`)

```tsx
import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CredentialBadge } from '@/components/ui/CredentialBadge'
import { CallToAction } from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: 'About Mary Cook',
  description: '...',
}

export default function AboutPage() {
  return (
    <>
      {/* Section 1: Hero / Intro */}
      {/* Section 2: Professional Journey */}
      {/* Section 3: Credentials & Certifications */}
      {/* Section 4: The Intersection */}
      {/* Section 5: CTA */}
    </>
  )
}
```

### Section 1: Hero / Intro
- **Background:** `brand-cream`
- H1: "About Mary Cook" with amber decorative rule
- Two-column on desktop: left is narrative text, right is outdoor portrait placeholder
- Opening text (2-3 paragraphs): Focus on CURRENT mission of Accomplish Points. Not a resume — a story of purpose. Rewrite from `content/bio.md` "Accomplish Points Consulting — Current" section:
  - After decades of partnership with Oregon's public service organizations, Accomplish Points Consulting is dedicated to re-imagining and rebuilding civic participation, partnerships, and public service.
  - Mary Cook brings consensus building, process design, project management, and entrepreneurial energy to every engagement.
  - Works as both external consultant (fresh perspective, contracted scope) and embedded staff (aligned with teams, empowered within the organization).
- Image: Outdoor portrait placeholder (slide04 — park/river setting). Use `brand-stone` placeholder until unwatermarked version available.

### Section 2: Professional Journey
- **Background:** `brand-stone`
- H2: "A Career in Service" with amber rule
- Timeline-style PROSE narrative (NOT a visual timeline component — just well-structured paragraphs with clear chronological markers). Rewrite from `content/bio.md` career sections:
  - **Education:** First-generation college student, B.A. Political Science and M.A. Urban Planning from UCLA, independent coursework at UCLA Law and Anderson Business School
  - **Private Sector:** Land use economics, market analyses for public agencies, discovered her passion for meetings and partnerships
  - **Clackamas County (~17 years):** Senior Planner across 6 divisions (County Commission, Planning, Transportation, Development Agency, Parks, North Clackamas Parks). Award-winning public involvement work. Change Management Certified. AICP.
  - **Swanson Partners, LLC:** Independent consultancy, "Your Partner in Service." Clients including OSU Research Centers, County Extensions, Libraries, Transportation Districts, Cities.
  - **Accomplish Points:** Current firm, relocated to Bend, Oregon. Rededicated to consensus building and civic engagement.
- Keep prose short — 2-4 sentences per career phase. Do NOT reproduce the full bio verbatim.

### Section 3: Credentials & Certifications
- **Background:** `brand-cream`
- H2: "Credentials" with amber rule
- Two-column layout on desktop, stacked on mobile:
  - **Left: Education**
    - M.A. Urban Planning, UCLA
    - B.A. Political Science (minor: Geography), UCLA
    - Additional coursework: UCLA School of Law, Anderson Business School
  - **Right: Certifications**
    - AICP — American Institute of Certified Planners
    - PROSCI Change Management (ADKAR)
    - International Research Board (IRB), 2009
- Below: Professional affiliations as a simple inline list
- WBE callout: "Certified Women Business Enterprise, State of Oregon (No. 5490)" — use a distinct visual treatment (e.g., a `brand-stone` panel with border)

### Section 4: The Intersection
- **Background:** `brand-stone`
- H2: "People. Planning. Economics."
- Three-column layout on desktop (`lg:grid-cols-3`), stacked on mobile
- Each column has an H3 heading and 2-3 sentences:
  - **People:** Emotionally intelligent leadership. Adaptive to the humans in the room. Change management certified. People come first.
  - **Planning:** Nationally certified planner with technical rigor. Award-winning public process design. UCLA-trained in the intersection of land use, governance, and community.
  - **Economics:** Fluent in both public and private sector dynamics. Partnerships, fiscal analysis, and practical innovation for redesigning service delivery.
- This communicates Mary's unique "intersectionality" — the rare combination that defines her value.

### Section 5: CTA
Use shared `CallToAction` component:
- Heading: "Ready to accomplish what matters most?"
- Body: "Every engagement begins with a conversation about what you need."
- Button: "Get in Touch" → `/contact`

## Acceptance Criteria

1. All tests pass
2. Exactly one H1: "About Mary Cook"
3. Four clearly defined sections plus CTA
4. Professional journey is narrative prose, not bullet lists or timeline UI
5. Credentials organized in two columns with education and certifications
6. WBE certification displayed with number
7. "People. Planning. Economics." section has three-column layout
8. Alternating section backgrounds (cream → stone → cream → stone → slate)
9. CTA at bottom links to contact page
10. No emojis, no exclamation points
11. Content sourced from bio.md and credentials.md, rewritten for web brevity
12. Image placeholder present for outdoor portrait
