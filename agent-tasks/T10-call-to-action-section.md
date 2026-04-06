# T10 — CallToAction Section Component

## Phase
2 — UI Components

## Dependencies
- **T02** — Tailwind design tokens
- **T03** — Global styles
- **T05** — Button component (used inside the CTA)
- **T06** — SectionHeading component (used for the heading)

## Objective
Create a reusable dark-background call-to-action section that appears at the bottom of every page. It has a heading, short body text, and a button. The dark background (`brand-slate`) creates visual contrast that signals "take action" to the visitor.

## Files to Reference
- `agent-tasks/README.md` — Color Palette, Component Patterns > Buttons

## Files to Create

1. `src/components/sections/CallToAction.tsx`
2. `__tests__/components/sections/CallToAction.test.tsx`

## Tests to Write First

**`__tests__/components/sections/CallToAction.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CallToAction } from '@/components/sections/CallToAction'

describe('CallToAction section', () => {
  const baseProps = {
    heading: 'Ready to accomplish what matters most?',
    body: 'Every engagement begins with a conversation about what you need.',
    buttonText: 'Get in Touch',
    buttonHref: '/contact',
  }

  describe('Content', () => {
    it('renders the heading as h2', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(baseProps.heading)
    })

    it('renders the body text', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByText(baseProps.body)).toBeInTheDocument()
    })

    it('renders a button/link with the provided text', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByRole('link', { name: baseProps.buttonText })).toBeInTheDocument()
    })

    it('button links to the provided href', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByRole('link', { name: baseProps.buttonText })).toHaveAttribute('href', '/contact')
    })
  })

  describe('Styling', () => {
    it('has dark background (brand-slate)', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('bg-brand-slate')
    })

    it('has light text color for readability on dark background', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('text-brand-cream')
    })

    it('has section-level padding', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('py-')
    })

    it('content is centered', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('text-center')
    })
  })

  describe('Semantic structure', () => {
    it('renders as a <section> element', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })
})
```

## Implementation Spec

```tsx
// src/components/sections/CallToAction.tsx
import { Button } from '@/components/ui/Button'

interface CallToActionProps {
  heading: string
  body: string
  buttonText: string
  buttonHref: string
}

export function CallToAction({ heading, body, buttonText, buttonHref }: CallToActionProps) {
  return (
    <section className="bg-brand-slate text-brand-cream py-14 lg:py-20">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 text-center">
        <h2 className="font-heading text-h2 text-brand-cream">{heading}</h2>
        <p className="mx-auto mt-4 max-w-prose text-body text-brand-stone">{body}</p>
        <div className="mt-8">
          <Button href={buttonHref} variant="primary" className="bg-brand-amber text-brand-slate hover:bg-[#A8822E]">
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}
```

### Design Spec Recap

- **Background:** `brand-slate` (dark — creates visual break from content sections)
- **Text:** `brand-cream` for heading, `brand-stone` for body paragraph
- **Heading:** h2, heading font, cream color (override slate default)
- **Body:** centered, max-width `prose`, slightly muted on dark bg
- **Button:** inverted colors — `brand-amber` background, `brand-slate` text (appears warm and stands out against dark section)
- **Layout:** full-width section, centered content, standard section padding
- **Used on every page** as the final section before the footer

### Default Content (for most pages)

```
heading: "Ready to accomplish what matters most?"
body: "Every engagement begins with a conversation about what you need."
buttonText: "Get in Touch"
buttonHref: "/contact"
```

Pages can customize these props as needed.

## Acceptance Criteria

1. All tests pass
2. Renders as a `<section>` element with dark background
3. Heading renders as h2
4. Button links to the provided href
5. Content is centered, max-width constrained
6. Button uses amber/slate color scheme (inverted for dark bg)
7. No emojis, no decorative icons
