# T08 — ServiceCard Component

## Phase
2 — UI Components

## Dependencies
- **T02** — Tailwind design tokens
- **T03** — Global styles

## Objective
Create a ServiceCard component for the home page services grid. Each card shows a service grouping title, short description, and a "Learn more" text link. Cards are static — not interactive hover-state elements.

## Files to Reference
- `agent-tasks/README.md` — Component Patterns > Cards section

## Files to Create

1. `src/components/ui/ServiceCard.tsx`
2. `__tests__/components/ui/ServiceCard.test.tsx`

## Tests to Write First

**`__tests__/components/ui/ServiceCard.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServiceCard } from '@/components/ui/ServiceCard'

describe('ServiceCard component', () => {
  const baseProps = {
    title: 'Leadership & Coaching',
    description: 'Thought partnership and dedicated advisory for leaders navigating complex decisions.',
  }

  describe('Content', () => {
    it('renders the title as an h4', () => {
      render(<ServiceCard {...baseProps} />)
      const heading = screen.getByRole('heading', { level: 4 })
      expect(heading).toHaveTextContent('Leadership & Coaching')
    })

    it('renders the description', () => {
      render(<ServiceCard {...baseProps} />)
      expect(screen.getByText(/Thought partnership/)).toBeInTheDocument()
    })

    it('renders a "Learn more" link when href is provided', () => {
      render(<ServiceCard {...baseProps} href="/services#leadership" />)
      const link = screen.getByRole('link', { name: /learn more/i })
      expect(link).toHaveAttribute('href', '/services#leadership')
    })

    it('does not render a link when href is omitted', () => {
      render(<ServiceCard {...baseProps} />)
      expect(screen.queryByRole('link')).toBeNull()
    })
  })

  describe('Styling', () => {
    it('has a border', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('border')
    })

    it('has no box shadow classes', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).not.toContain('shadow')
    })

    it('has rounded corners (not pill)', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('rounded')
      expect(card.className).not.toContain('rounded-full')
    })

    it('has padding', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('p-')
    })
  })

  describe('Accessibility', () => {
    it('link text is descriptive (contains "Learn more")', () => {
      render(<ServiceCard {...baseProps} href="/services#leadership" />)
      const link = screen.getByRole('link')
      expect(link.textContent?.toLowerCase()).toContain('learn more')
    })
  })
})
```

## Implementation Spec

```tsx
// src/components/ui/ServiceCard.tsx
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  href?: string
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <div className="rounded border border-border bg-brand-cream p-8">
      <h4 className="font-heading text-h4 text-brand-slate">{title}</h4>
      <p className="mt-3 text-body text-body-muted">{description}</p>
      {href && (
        <Link
          href={href}
          className="mt-4 inline-block text-body-sm font-semibold text-brand-teal hover:text-brand-slate transition-colors"
        >
          Learn more
        </Link>
      )}
    </div>
  )
}
```

### Design Spec Recap

- Background: `brand-cream` (will be placed on `brand-stone` sections)
- Border: 1px solid `border` color
- Border-radius: `rounded` (4px)
- Padding: `p-8` (32px)
- **No box shadow. No hover effects on the card itself.**
- Heading: `text-h4`, heading font, `brand-slate`
- Description: body text, muted color, max 2 sentences
- Link: teal, transitions to slate on hover

## Acceptance Criteria

1. All tests pass
2. Title renders as `<h4>`
3. "Learn more" link only appears when `href` is provided
4. Link uses Next.js `Link` for client-side navigation
5. No box shadow
6. No hover animation on the card container
7. No decorative icons or emojis
