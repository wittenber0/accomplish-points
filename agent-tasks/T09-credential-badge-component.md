# T09 — CredentialBadge Component

## Phase
2 — UI Components

## Dependencies
- **T02** — Tailwind design tokens
- **T03** — Global styles

## Objective
Create a small inline badge component for displaying certifications and credentials (e.g., "AICP Certified", "UCLA M.A. Urban Planning", "25+ Years Experience"). Used in the credentials bar on the Home page and the credentials section of the About page.

## Files to Reference
- `agent-tasks/README.md` — Component Patterns > Credential Badges

## Files to Create

1. `src/components/ui/CredentialBadge.tsx`
2. `__tests__/components/ui/CredentialBadge.test.tsx`

## Tests to Write First

**`__tests__/components/ui/CredentialBadge.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CredentialBadge } from '@/components/ui/CredentialBadge'

describe('CredentialBadge component', () => {
  it('renders the label text', () => {
    render(<CredentialBadge label="AICP Certified" />)
    expect(screen.getByText('AICP Certified')).toBeInTheDocument()
  })

  it('renders as an inline element (span)', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('has stone background', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toContain('bg-brand-stone')
  })

  it('has border', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toContain('border')
  })

  it('uses small text size', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toMatch(/text-(sm|caption|xs)/)
  })

  it('has minimal border radius (not pill)', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toContain('rounded-sm')
    expect(badge?.className).not.toContain('rounded-full')
  })

  it('does not contain emojis or icons', () => {
    const { container } = render(<CredentialBadge label="AICP Certified" />)
    expect(container.querySelector('svg')).toBeNull()
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
```

## Implementation Spec

```tsx
// src/components/ui/CredentialBadge.tsx

interface CredentialBadgeProps {
  label: string
}

export function CredentialBadge({ label }: CredentialBadgeProps) {
  return (
    <span className="inline-block rounded-sm border border-border bg-brand-stone px-3 py-1 text-sm text-brand-slate">
      {label}
    </span>
  )
}
```

### Design Spec Recap

- Background: `brand-stone`
- Border: 1px solid `border` color
- Border-radius: `rounded-sm` (2px) — barely rounded
- Padding: `px-3 py-1`
- Text: small size, `brand-slate` color
- Display: `inline-block` so they flow horizontally and wrap naturally
- **No icons, no emojis, no dot separators**

## Acceptance Criteria

1. All tests pass
2. Renders as a `<span>` element
3. Displays the provided label text
4. Styled with stone background, border, small text
5. No rounded-full, no shadow
6. Visually compact — suitable for a row of 4-6 badges side by side
