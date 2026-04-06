# T07 — TestimonialCard Component

## Phase
2 — UI Components

## Dependencies
- **T02** — Tailwind design tokens
- **T03** — Global styles

## Objective
Create a TestimonialCard component that displays a client quote with a left amber border, italic quote text, and attribution (name, optional title, optional organization). Used on the Home page (single featured) and Clients page (all 4).

## Files to Reference
- `agent-tasks/README.md` — Component Patterns > Testimonial Styling

## Files to Create

1. `src/components/ui/TestimonialCard.tsx`
2. `__tests__/components/ui/TestimonialCard.test.tsx`

## Tests to Write First

**`__tests__/components/ui/TestimonialCard.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

describe('TestimonialCard component', () => {
  const baseProps = {
    quote: 'Mary was first rate in her planning skills.',
    name: 'Clark Seavert',
  }

  describe('Content rendering', () => {
    it('renders the quote text', () => {
      render(<TestimonialCard {...baseProps} />)
      expect(screen.getByText(/Mary was first rate/)).toBeInTheDocument()
    })

    it('renders the name', () => {
      render(<TestimonialCard {...baseProps} />)
      expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
    })

    it('renders title when provided', () => {
      render(<TestimonialCard {...baseProps} title="Director" />)
      expect(screen.getByText(/Director/)).toBeInTheDocument()
    })

    it('renders organization when provided', () => {
      render(<TestimonialCard {...baseProps} organization="OSU Research Center" />)
      expect(screen.getByText(/OSU Research Center/)).toBeInTheDocument()
    })

    it('renders without title and organization', () => {
      render(<TestimonialCard quote="Great work." name="Jane" />)
      expect(screen.getByText(/Great work/)).toBeInTheDocument()
      expect(screen.getByText(/Jane/)).toBeInTheDocument()
    })
  })

  describe('Semantic structure', () => {
    it('renders as a blockquote', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      expect(container.querySelector('blockquote')).toBeInTheDocument()
    })

    it('renders attribution in a footer or cite element', () => {
      const { container } = render(<TestimonialCard {...baseProps} title="Director" organization="OSU" />)
      const footer = container.querySelector('footer') || container.querySelector('cite')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('has left amber border', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      const blockquote = container.querySelector('blockquote')
      expect(blockquote?.className).toContain('border-l')
      expect(blockquote?.className).toContain('border-brand-amber')
    })

    it('quote text is italic', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      const quote = container.querySelector('blockquote p')
      expect(quote?.className).toContain('italic')
    })

    it('does not contain any quotation mark characters or icons', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      const html = container.innerHTML
      // No decorative quote marks (", ", «, », or SVG icons)
      expect(html).not.toContain('\u201C') // "
      expect(html).not.toContain('\u201D') // "
      expect(html).not.toContain('\u00AB') // «
      expect(html).not.toContain('\u00BB') // »
      expect(html).not.toContain('<svg')
    })
  })
})
```

## Implementation Spec

```tsx
// src/components/ui/TestimonialCard.tsx

interface TestimonialCardProps {
  quote: string
  name: string
  title?: string
  organization?: string
}

export function TestimonialCard({ quote, name, title, organization }: TestimonialCardProps) {
  return (
    <blockquote className="border-l-[3px] border-brand-amber pl-6 py-2">
      <p className="italic text-body text-body leading-relaxed">
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

### Design Spec Recap

- Left border: 3px solid `brand-amber`
- Left padding: `pl-6` (24px) — space between border and text
- Quote text: italic, body size, `text-body` color
- Name: semibold, `text-brand-slate`
- Title/Org: smaller text, muted color, on separate line
- **No quotation mark decorations** — no oversized " characters, no SVG quote icons
- **No box shadow, no background color** — the amber border IS the visual distinction
- Semantic HTML: `<blockquote>` wrapping, `<footer>` for attribution

## Acceptance Criteria

1. All tests pass
2. Renders as a semantic `<blockquote>` element
3. Quote text is italic
4. Left border is amber, 3px wide
5. Attribution shows name (always), title and organization (when provided)
6. No decorative quotation marks, no SVG icons, no emojis
7. Works with minimal props (just `quote` and `name`)
