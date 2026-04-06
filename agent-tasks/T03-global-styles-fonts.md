# T03 — Global Styles & Font Loading

## Phase
1 — Foundation

## Dependencies
- **T01** — Project scaffolding must be complete

## Objective
Load the Source Serif 4 (headings) and Source Sans 3 (body) fonts via `next/font`, assign them to CSS variables, and create the global stylesheet with Tailwind directives and base element styles.

## Files to Reference
- `agent-tasks/README.md` — Typography section, Color Palette section

## Files to Create / Modify

1. **Create:** `src/styles/globals.css` — Tailwind directives + base styles
2. **Create:** `src/lib/fonts.ts` — Font loading configuration
3. **Create:** `__tests__/lib/fonts.test.ts` — Font config tests

## Tests to Write First

**`__tests__/lib/fonts.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import { headingFont, bodyFont } from '@/lib/fonts'

describe('Font configuration', () => {
  it('exports headingFont with correct CSS variable', () => {
    expect(headingFont.variable).toBe('--font-heading')
  })

  it('exports bodyFont with correct CSS variable', () => {
    expect(bodyFont.variable).toBe('--font-body')
  })

  it('headingFont has className defined', () => {
    expect(headingFont.className).toBeDefined()
    expect(typeof headingFont.className).toBe('string')
  })

  it('bodyFont has className defined', () => {
    expect(bodyFont.className).toBeDefined()
    expect(typeof bodyFont.className).toBe('string')
  })
})
```

## Implementation

### `src/lib/fonts.ts`

```ts
import { Source_Serif_4, Source_Sans_3 } from 'next/font/google'

export const headingFont = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})
```

### `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Base body styles */
  body {
    @apply bg-brand-cream text-body font-body text-body;
  }

  /* Heading defaults */
  h1 {
    @apply font-heading text-h1 text-brand-slate;
  }

  h2 {
    @apply font-heading text-h2 text-brand-slate;
  }

  h3 {
    @apply font-heading text-h3 text-brand-slate;
  }

  h4 {
    @apply font-heading text-h4 text-brand-slate;
  }

  /* Link defaults */
  a {
    @apply text-brand-teal transition-colors duration-150;
  }

  a:hover {
    @apply text-brand-slate;
  }

  /* Focus styles — accessibility */
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-brand-teal;
  }

  /* Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Max line length for readability */
  p {
    max-width: 65ch;
  }
}

@layer components {
  /* Skip to main content link — accessibility */
  .skip-link {
    @apply absolute left-4 top-4 z-50 -translate-y-full rounded bg-brand-teal px-4 py-2 text-white transition-transform focus:translate-y-0;
  }
}
```

### Notes

- The `@apply font-body text-body` in `body` uses custom Tailwind token from T02. If T02 is not yet complete, these classes won't resolve. The CSS file must be created regardless; Tailwind will handle resolution once T02 is done.
- Font variables (`--font-heading`, `--font-body`) are applied to the `<html>` or `<body>` element in the root layout (Task 13). This task only defines the fonts and exports them.
- The `p { max-width: 65ch }` ensures body text never spans too wide on large screens. This can be overridden per-element with Tailwind classes if a paragraph needs to be wider.

## Acceptance Criteria

1. `pnpm test:run` passes font configuration tests
2. `src/lib/fonts.ts` exports `headingFont` and `bodyFont` with correct CSS variable names
3. `src/styles/globals.css` contains:
   - All three Tailwind directives (`@tailwind base/components/utilities`)
   - Base heading styles using heading font
   - Base body styles using body font and body text color
   - Focus-visible outlines in `brand-teal`
   - `prefers-reduced-motion` media query
   - `p` max-width of 65ch
   - Skip-link component class
4. `pnpm build` completes without errors
