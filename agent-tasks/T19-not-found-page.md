# T19 — 404 Page

## Phase
4 — Pages

## Dependencies
- **T05** — Button component
- **T06** — SectionHeading component
- **T13** — Root layout

## Objective
Build a clean, brand-consistent 404 page that guides lost visitors back to the home page. Minimal and dignified.

## Files to Reference
- `agent-tasks/README.md` — Full design system

## Files to Create

1. `src/app/not-found.tsx`
2. `__tests__/pages/not-found.test.tsx`

## Tests to Write First

**`__tests__/pages/not-found.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotFoundPage from '@/app/not-found'

describe('404 page', () => {
  it('has an H1 with "Page not found"', () => {
    render(<NotFoundPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/page not found/i)
  })

  it('has exactly one H1', () => {
    const { container } = render(<NotFoundPage />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('has explanatory text', () => {
    render(<NotFoundPage />)
    expect(
      screen.getByText(/doesn't exist|has been moved|could not be found/i)
    ).toBeInTheDocument()
  })

  it('has a link back to home', () => {
    render(<NotFoundPage />)
    const link = screen.getByRole('link', { name: /return to home|go home|home/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('contains no emojis', () => {
    const { container } = render(<NotFoundPage />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })

  it('contains no exclamation points', () => {
    const { container } = render(<NotFoundPage />)
    expect(container.textContent).not.toContain('!')
  })
})
```

## Implementation Spec

```tsx
// src/app/not-found.tsx
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="bg-brand-cream py-section-mobile lg:py-section-desktop">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 text-center">
        <SectionHeading level="h1">Page not found</SectionHeading>
        <p className="mt-6 text-body text-body-muted max-w-prose mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Button variant="primary" href="/">Return to Home</Button>
        </div>
      </div>
    </section>
  )
}
```

### Design Notes
- Centered text layout
- `brand-cream` background (consistent with page default)
- Generous vertical padding (section spacing)
- No fancy illustrations, decorative 404, or quirky messaging — clean and professional
- Header and footer are present via root layout
- No metadata export needed (Next.js handles 404 metadata automatically)

## Acceptance Criteria

1. All tests pass
2. Exactly one H1: "Page not found"
3. Brief explanatory text (no apology, no humor)
4. "Return to Home" button linking to `/`
5. Header and footer visible (via root layout)
6. No emojis, no exclamation points, no decorative illustrations
7. Clean, centered, minimal layout
