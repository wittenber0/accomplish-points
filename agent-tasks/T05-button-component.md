# T05 — Button Component

## Phase
2 — UI Components

## Dependencies
- **T02** — Tailwind design tokens must be configured
- **T03** — Global styles must be in place

## Objective
Create a reusable Button component with two variants (primary and secondary/ghost). The Button can render as an `<a>` tag (when `href` is provided) or a `<button>` tag (for form submissions). This is the only button component used across the entire site.

## Files to Reference
- `agent-tasks/README.md` — Component Patterns > Buttons section

## Files to Create

1. `src/components/ui/Button.tsx`
2. `__tests__/components/ui/Button.test.tsx`

## Tests to Write First

**`__tests__/components/ui/Button.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button component', () => {
  describe('Rendering', () => {
    it('renders children text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders as <button> by default', () => {
      render(<Button>Submit</Button>)
      const el = screen.getByRole('button', { name: 'Submit' })
      expect(el.tagName).toBe('BUTTON')
    })

    it('renders as <a> when href is provided', () => {
      render(<Button href="/contact">Contact</Button>)
      const el = screen.getByRole('link', { name: 'Contact' })
      expect(el.tagName).toBe('A')
      expect(el).toHaveAttribute('href', '/contact')
    })
  })

  describe('Variants', () => {
    it('applies primary variant styles by default', () => {
      render(<Button>Primary</Button>)
      const el = screen.getByRole('button')
      expect(el.className).toContain('bg-brand-teal')
      expect(el.className).toContain('text-white')
    })

    it('applies secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const el = screen.getByRole('button')
      expect(el.className).toContain('border')
      expect(el.className).toContain('border-brand-teal')
      expect(el.className).toContain('text-brand-teal')
    })
  })

  describe('Button type', () => {
    it('defaults to type="button"', () => {
      render(<Button>Click</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('accepts type="submit"', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
  })

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const handler = vi.fn()
      render(<Button onClick={handler}>Click</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(handler).toHaveBeenCalledOnce()
    })

    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Styling', () => {
    it('has uppercase text', () => {
      render(<Button>Text</Button>)
      expect(screen.getByRole('button').className).toContain('uppercase')
    })

    it('has rounded corners (not pill)', () => {
      render(<Button>Text</Button>)
      const className = screen.getByRole('button').className
      expect(className).toContain('rounded')
      expect(className).not.toContain('rounded-full')
    })

    it('has transition for color', () => {
      render(<Button>Text</Button>)
      expect(screen.getByRole('button').className).toContain('transition')
    })
  })

  describe('Accessibility', () => {
    it('is focusable', () => {
      render(<Button>Focus me</Button>)
      const el = screen.getByRole('button')
      el.focus()
      expect(el).toHaveFocus()
    })
  })
})
```

## Implementation Spec

```tsx
// src/components/ui/Button.tsx
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const baseStyles = 'inline-flex items-center justify-center rounded px-7 py-3 text-button uppercase tracking-widest transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal'

const variants = {
  primary: 'bg-brand-teal text-white hover:bg-[#234A48]',         // ~10% darker teal
  secondary: 'border border-brand-teal text-brand-teal bg-transparent hover:bg-brand-teal hover:text-white',
}

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const classes = `${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
```

### Design Spec Recap

- **Primary:** `bg-brand-teal`, white text, 10% darker on hover
- **Secondary:** transparent bg, `border-brand-teal`, teal text. Hover fills teal, text turns white.
- **Shared:** `rounded` (4px), `px-7 py-3`, uppercase, letter-spaced, `transition-colors duration-150`
- **No pill shape** (`rounded-full` is forbidden)
- **No box shadow**

## Acceptance Criteria

1. All tests pass (`pnpm test:run`)
2. Component renders as `<button>` by default, `<a>` (via Next.js `Link`) when `href` is provided
3. Two variants: `primary` (default) and `secondary`
4. Button type defaults to `"button"` (not `"submit"` — prevents accidental form submissions)
5. Supports `disabled` state with visual indicator
6. Uses `next/link` for client-side navigation when `href` is present
7. No `rounded-full`, no box shadow, no emoji
