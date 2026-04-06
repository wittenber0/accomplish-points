# T06 — SectionHeading Component

## Phase
2 — UI Components

## Dependencies
- **T02** — Tailwind design tokens
- **T03** — Global styles and fonts

## Objective
Create a reusable heading component that renders the correct HTML heading level (h1, h2, h3) with an optional decorative amber horizontal rule beneath it. This component enforces consistent heading styles across all pages.

## Files to Reference
- `agent-tasks/README.md` — Typography section, Decorative Horizontal Rules in Component Patterns

## Files to Create

1. `src/components/ui/SectionHeading.tsx`
2. `__tests__/components/ui/SectionHeading.test.tsx`

## Tests to Write First

**`__tests__/components/ui/SectionHeading.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionHeading } from '@/components/ui/SectionHeading'

describe('SectionHeading component', () => {
  describe('Heading levels', () => {
    it('renders an h1 by default', () => {
      render(<SectionHeading>Title</SectionHeading>)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('renders an h2 when level="h2"', () => {
      render(<SectionHeading level="h2">Section</SectionHeading>)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('renders an h3 when level="h3"', () => {
      render(<SectionHeading level="h3">Sub</SectionHeading>)
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('renders children text', () => {
      render(<SectionHeading>My Heading</SectionHeading>)
      expect(screen.getByText('My Heading')).toBeInTheDocument()
    })
  })

  describe('Decorative rule', () => {
    it('does not render decorative rule by default', () => {
      const { container } = render(<SectionHeading>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule).toBeNull()
    })

    it('renders decorative rule when withRule is true', () => {
      const { container } = render(<SectionHeading withRule>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule).toBeInTheDocument()
    })

    it('decorative rule is hidden from screen readers', () => {
      const { container } = render(<SectionHeading withRule>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule).toHaveAttribute('aria-hidden', 'true')
    })

    it('decorative rule uses amber color', () => {
      const { container } = render(<SectionHeading withRule>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule?.className).toContain('bg-brand-amber')
    })
  })

  describe('Styling', () => {
    it('uses brand-slate text color', () => {
      render(<SectionHeading>Title</SectionHeading>)
      const heading = screen.getByRole('heading')
      expect(heading.className).toContain('text-brand-slate')
    })

    it('uses heading font family', () => {
      render(<SectionHeading>Title</SectionHeading>)
      const heading = screen.getByRole('heading')
      expect(heading.className).toContain('font-heading')
    })
  })
})
```

## Implementation Spec

```tsx
// src/components/ui/SectionHeading.tsx

interface SectionHeadingProps {
  children: React.ReactNode
  level?: 'h1' | 'h2' | 'h3'
  withRule?: boolean
  className?: string
}

const levelStyles = {
  h1: 'text-h1 font-heading font-bold text-brand-slate',
  h2: 'text-h2 font-heading font-semibold text-brand-slate',
  h3: 'text-h3 font-heading font-semibold text-brand-slate',
}

export function SectionHeading({
  children,
  level = 'h1',
  withRule = false,
  className = '',
}: SectionHeadingProps) {
  const Tag = level

  return (
    <div>
      <Tag className={`${levelStyles[level]} ${className}`}>
        {children}
      </Tag>
      {withRule && (
        <div
          aria-hidden="true"
          className="mt-3 h-0.5 w-12 bg-brand-amber"
        />
      )}
    </div>
  )
}
```

### Design Spec Recap

- Heading text: `font-heading`, `text-brand-slate`
- Size: Uses the `text-h1`, `text-h2`, `text-h3` custom utilities from Tailwind config (T02)
- Decorative rule: `w-12` (48px), `h-0.5` (2px), `bg-brand-amber`, left-aligned, `mt-3` gap
- Rule is `aria-hidden="true"` — purely decorative
- No centered rules, no full-width lines

## Acceptance Criteria

1. All tests pass
2. Renders correct HTML heading element for each level
3. Decorative rule only appears when `withRule={true}`
4. Rule is hidden from assistive technology via `aria-hidden`
5. Rule uses `brand-amber` color, is 48px wide, 2px tall, left-aligned
6. No emojis, no decorative icons
