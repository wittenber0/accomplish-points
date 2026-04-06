# T13 — Root Layout

## Phase
3 — Layout

## Dependencies
- **T03** — Global styles and font loading (`src/lib/fonts.ts`, `src/styles/globals.css`)
- **T11** — Header component
- **T12** — Footer component

## Objective
Assemble the root layout that wraps every page: load fonts, apply CSS variables, set default metadata, include skip-navigation link, and render Header + Footer around page content.

## Files to Reference
- `agent-tasks/README.md` — Typography (font CSS variables), Spacing (container)
- `src/lib/fonts.ts` (created in T03)
- `src/styles/globals.css` (created in T03)

## Files to Create / Modify

1. **Create/Modify:** `src/app/layout.tsx`
2. **Create:** `src/lib/metadata.ts` — shared metadata configuration
3. **Create:** `__tests__/pages/layout.test.tsx`

## Tests to Write First

**`__tests__/pages/layout.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RootLayout from '@/app/layout'

// Mock the font imports
vi.mock('@/lib/fonts', () => ({
  headingFont: { variable: '--font-heading', className: 'mock-heading' },
  bodyFont: { variable: '--font-body', className: 'mock-body' },
}))

// Mock Header and Footer to isolate layout testing
vi.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}))

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}))

describe('Root Layout', () => {
  it('renders the Header', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders the Footer', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders children between header and footer', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    )
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })

  it('wraps children in a main element', () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )
    expect(container.querySelector('main')).toBeInTheDocument()
  })

  it('includes skip-to-content link', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )
    const skipLink = screen.getByText(/skip to main content/i)
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('main element has the skip-link target id', () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )
    const main = container.querySelector('main')
    expect(main).toHaveAttribute('id', 'main-content')
  })
})
```

**`__tests__/lib/metadata.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import { siteMetadata } from '@/lib/metadata'

describe('Site metadata', () => {
  it('has a title template with site name', () => {
    expect(siteMetadata.title).toBeDefined()
    // Should be an object with template and default
    if (typeof siteMetadata.title === 'object' && 'template' in siteMetadata.title) {
      expect(siteMetadata.title.template).toContain('Accomplish Points')
    }
  })

  it('has a default description', () => {
    expect(siteMetadata.description).toBeDefined()
    expect(typeof siteMetadata.description).toBe('string')
    expect(siteMetadata.description!.length).toBeGreaterThan(50)
  })

  it('description does not contain emojis', () => {
    expect(siteMetadata.description).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })

  it('description does not contain exclamation points', () => {
    expect(siteMetadata.description).not.toContain('!')
  })
})
```

## Implementation Spec

### `src/lib/metadata.ts`

```ts
import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    template: '%s | Accomplish Points Consulting',
    default: 'Accomplish Points Consulting — Strategic Planning & Leadership Consulting',
  },
  description:
    'Mary Cook partners with public service organizations, government agencies, and leaders to accomplish what matters most. 25+ years of experience in strategic planning, facilitation, and organizational development in Oregon.',
  metadataBase: new URL('https://accomplishpoints.com'), // Update when domain confirmed
}
```

### `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { headingFont, bodyFont } from '@/lib/fonts'
import { siteMetadata } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="bg-brand-cream text-body font-body">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### Design Spec Recap

- **HTML `lang`:** `en`
- **Font CSS variables:** Applied to `<html>` via font `.variable` classes
- **Body:** `bg-brand-cream text-body font-body`
- **Skip link:** First focusable element, uses the `.skip-link` class from globals.css (T03) — visually hidden until focused
- **Main:** `id="main-content"` — skip link target
- **Structure:** Skip link → Header → Main (children) → Footer
- **Metadata:** Title template pattern `"%s | Accomplish Points Consulting"` with a default

### Important Notes

- The layout is a Server Component (no `'use client'`). Header is a Client Component internally.
- `@/styles/globals.css` must be imported here to apply Tailwind styles.
- The `metadataBase` URL should be updated when the actual domain is confirmed.

## Acceptance Criteria

1. All tests pass
2. `<html>` has `lang="en"` and both font CSS variable classes
3. `<body>` has cream background and body font
4. Skip link is present, links to `#main-content`, and is visually hidden by default
5. Header renders above `<main>`, Footer below
6. `<main>` has `id="main-content"`
7. Metadata title template is set with site name
8. Default description is present and professional
9. `pnpm build` completes without errors
10. No emojis, no exclamation points in metadata
