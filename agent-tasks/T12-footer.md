# T12 — Footer

## Phase
3 — Layout

## Dependencies
- **T02** — Tailwind design tokens
- **T03** — Global styles

## Objective
Build the site footer with a dark slate background. It displays the business name, location, quick navigation links, contact information, and WBE certification. The footer appears on every page via the root layout.

## Files to Reference
- `agent-tasks/README.md` — Color Palette, Typography
- `content/credentials.md` — WBE certification details

## Files to Create

1. `src/components/layout/Footer.tsx`
2. `__tests__/components/layout/Footer.test.tsx`

## Tests to Write First

**`__tests__/components/layout/Footer.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/layout/Footer'

describe('Footer component', () => {
  describe('Content', () => {
    it('renders the business name', () => {
      render(<Footer />)
      expect(screen.getByText(/Accomplish Points Consulting/)).toBeInTheDocument()
    })

    it('renders the location', () => {
      render(<Footer />)
      expect(screen.getByText(/Bend, Oregon/)).toBeInTheDocument()
    })

    it('renders copyright notice with current year', () => {
      render(<Footer />)
      expect(screen.getByText(/© 2026 Accomplish Points Consulting/)).toBeInTheDocument()
    })

    it('renders WBE certification mention', () => {
      render(<Footer />)
      expect(screen.getByText(/Women Business Enterprise/i)).toBeInTheDocument()
    })
  })

  describe('Navigation links', () => {
    it('renders all navigation links', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Clients' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    })

    it('navigation links have correct hrefs', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    })
  })

  describe('Semantic structure', () => {
    it('renders as a footer element', () => {
      const { container } = render(<Footer />)
      expect(container.querySelector('footer')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('has dark slate background', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer?.className).toContain('bg-brand-slate')
    })

    it('has light text color', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer?.className).toContain('text-brand-cream') ||
        expect(footer?.className).toContain('text-brand-stone')
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<Footer />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no social media icons', () => {
      const { container } = render(<Footer />)
      // No social icons unless confirmed Mary has active profiles
      const svgs = container.querySelectorAll('svg')
      svgs.forEach((svg) => {
        expect(svg.getAttribute('aria-label')).not.toMatch(/twitter|facebook|instagram|linkedin/i)
      })
    })
  })
})
```

## Implementation Spec

```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-brand-slate text-brand-cream">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Column 1: Business info */}
          <div>
            <p className="font-heading text-h4 text-brand-cream">Accomplish Points Consulting</p>
            <p className="mt-2 text-body-sm text-brand-stone">Bend, Oregon</p>
            <p className="mt-1 text-caption text-brand-stone">
              Certified Women Business Enterprise, State of Oregon
            </p>
          </div>

          {/* Column 2: Quick links */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-brand-stone hover:text-brand-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact */}
          <div>
            <p className="text-body-sm text-brand-stone">
              {/* Phone and email — placeholder until confirmed */}
              <a href="mailto:mary@accomplishpoints.com" className="hover:text-brand-cream transition-colors">
                mary@accomplishpoints.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-brand-sage pt-6">
          <p className="text-caption text-body-muted">
            &copy; {new Date().getFullYear()} Accomplish Points Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

### Design Spec Recap

- **Background:** `brand-slate` (dark)
- **Text:** `brand-cream` for business name, `brand-stone` for secondary text
- **Layout:** 3-column grid on desktop (`lg:grid-cols-3`), stacked on mobile
  - Column 1: Business name + location + WBE
  - Column 2: Nav links (vertical list)
  - Column 3: Contact info (email, phone when confirmed)
- **Bottom bar:** Thin `brand-sage` top border, copyright line in muted text
- **No social media icons** (unless Mary confirms active professional accounts)
- **No emojis, no decorative elements**
- Footer nav has `aria-label="Footer navigation"` to distinguish from header nav

## Acceptance Criteria

1. All tests pass
2. Renders as a semantic `<footer>` element
3. Dark slate background with light text
4. Business name, location, and WBE certification visible
5. All 5 nav links present with correct hrefs
6. Copyright year is dynamically generated
7. 3-column layout on desktop, stacked on mobile
8. Bottom border uses `brand-sage` color
9. No social media icons, no emojis
