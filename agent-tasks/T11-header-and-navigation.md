# T11 — Header & Navigation (Desktop + Mobile)

## Phase
3 — Layout

## Dependencies
- **T02** — Tailwind design tokens
- **T03** — Global styles
- **T05** — Button component (for potential CTA in mobile nav)

## Objective
Build the site header with desktop horizontal navigation and a mobile hamburger menu with slide-out panel. The header is fixed at the top, shows the business name as a text wordmark (no logo image), and indicates the active page.

## Files to Reference
- `agent-tasks/README.md` — Color Palette, Typography, Spacing, Anti-Patterns

## Files to Create

1. `src/components/layout/Header.tsx`
2. `src/components/layout/Navigation.tsx`
3. `src/components/layout/MobileNav.tsx`
4. `__tests__/components/layout/Header.test.tsx`
5. `__tests__/components/layout/Navigation.test.tsx`
6. `__tests__/components/layout/MobileNav.test.tsx`

## Navigation Links Data

```ts
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
]
```

## Tests to Write First

**`__tests__/components/layout/Header.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from '@/components/layout/Header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header component', () => {
  it('renders the business name', () => {
    render(<Header />)
    expect(screen.getByText(/Accomplish Points/)).toBeInTheDocument()
  })

  it('business name links to home', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: /Accomplish Points/ })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders as a header element', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('header has cream background', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header?.className).toContain('bg-brand-cream')
  })

  it('header has bottom border', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header?.className).toContain('border-b')
  })

  it('contains navigation component', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
```

**`__tests__/components/layout/Navigation.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Navigation } from '@/components/layout/Navigation'

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
}))

describe('Navigation component', () => {
  it('renders all 5 navigation links', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Clients' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('links have correct href values', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
    expect(screen.getByRole('link', { name: 'Clients' })).toHaveAttribute('href', '/clients')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })

  it('nav links are uppercase', () => {
    render(<Navigation />)
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link.className).toContain('uppercase')
  })

  it('renders inside a nav element', () => {
    const { container } = render(<Navigation />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
```

**`__tests__/components/layout/MobileNav.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MobileNav } from '@/components/layout/MobileNav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('MobileNav component', () => {
  it('renders all nav links when open', () => {
    render(<MobileNav isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Clients' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('is hidden when isOpen is false', () => {
    const { container } = render(<MobileNav isOpen={false} onClose={vi.fn()} />)
    // The panel should be off-screen or have hidden attribute
    const panel = container.querySelector('[role="dialog"]') || container.firstChild as HTMLElement
    // Check for translate-x-full (off-screen) or hidden
    const isHidden = panel?.className?.includes('translate-x-full') ||
                     panel?.getAttribute('aria-hidden') === 'true' ||
                     panel?.hasAttribute('hidden')
    expect(isHidden).toBe(true)
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<MobileNav isOpen={true} onClose={onClose} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when overlay/scrim is clicked', async () => {
    const onClose = vi.fn()
    const { container } = render(<MobileNav isOpen={true} onClose={onClose} />)
    // The scrim/overlay is a backdrop element
    const scrim = container.querySelector('[data-testid="mobile-nav-overlay"]')
    if (scrim) {
      await userEvent.click(scrim)
      expect(onClose).toHaveBeenCalledOnce()
    }
  })

  it('close button is an X icon (SVG), not an emoji', () => {
    render(<MobileNav isOpen={true} onClose={vi.fn()} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    // Should contain SVG, not emoji characters
    expect(closeButton.querySelector('svg')).toBeInTheDocument()
    expect(closeButton.textContent).not.toMatch(/[\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/u)
  })
})
```

## Implementation Spec

### Header (`src/components/layout/Header.tsx`)

```
'use client' (needs useState for mobile nav toggle, useEffect for scroll shadow)

Structure:
<header> (fixed top, z-50, cream bg, border-b, full-width)
  <div> (max-w-container, centered, flex row, items-center, justify-between)
    <Link href="/"> (business name — heading font, text-h4 or similar, brand-slate)
      "Accomplish Points"
    </Link>
    <Navigation /> (hidden below lg)
    <button> (hamburger icon, visible below lg, hidden at lg+)
    <MobileNav isOpen={} onClose={} />
  </div>
</header>
```

**Scroll shadow behavior:**
- On mount, listen to scroll events
- When `scrollY > 0`, add `shadow-sm` class to header
- Use `transition-shadow duration-200` for smooth appearance
- Clean up listener on unmount

**Height:** `h-16` (64px) on mobile, `lg:h-20` (80px) on desktop.

### Navigation (`src/components/layout/Navigation.tsx`)

```
Desktop-only (hidden below lg): flex row of links
- Each link: text-nav, uppercase, tracking-wide, brand-slate, hover:brand-teal
- Active link: border-b-2 border-brand-teal
- Use usePathname() from next/navigation to determine active state
```

### MobileNav (`src/components/layout/MobileNav.tsx`)

```
'use client'

When isOpen:
- Overlay: fixed inset-0, bg-black/30, z-40, click to close
- Panel: fixed right-0 top-0 h-full w-72, bg-brand-cream, z-50
  - Close button (X SVG icon) at top-right
  - Vertical list of nav links, each: text-lg, py-3, brand-slate
  - Active link highlighted with brand-teal color
- Slide in from right: translate-x-0 (open) → translate-x-full (closed)
- Transition: transform 200ms ease

When closed:
- Panel off-screen (translate-x-full) with aria-hidden="true"
- Overlay hidden
```

### Hamburger Icon

Use a simple inline SVG — three horizontal lines:
```tsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <line x1="3" y1="6" x2="21" y2="6" />
  <line x1="3" y1="12" x2="21" y2="12" />
  <line x1="3" y1="18" x2="21" y2="18" />
</svg>
```

### Close Icon

```tsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
```

**Do NOT use Unicode characters or emoji for these icons.**

## Acceptance Criteria

1. All tests pass
2. Header is fixed at top of viewport with cream background
3. Business name links to home, renders in heading font
4. Desktop nav shows all 5 links horizontally at `lg` breakpoint and above
5. Active page is indicated by a teal bottom border on its nav link
6. Hamburger menu appears below `lg` breakpoint
7. Mobile panel slides in from right, has semi-transparent overlay
8. Tapping overlay or close button closes the mobile nav
9. Scroll shadow appears on header when page is scrolled
10. **No emoji** for hamburger or close icons — SVG only
11. Header component is `'use client'` (needs state + effects)
12. Keyboard accessible: hamburger button is focusable, panel links are tabbable
