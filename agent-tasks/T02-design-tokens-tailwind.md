# T02 — Tailwind Design Tokens & Config

## Phase
1 — Foundation

## Dependencies
- **T01** — Project scaffolding must be complete

## Objective
Configure Tailwind CSS with the full design system: custom colors, font families, type scale, spacing values, and container settings. This is the single source of truth for all visual tokens used across the site.

## Files to Reference
- `agent-tasks/README.md` — Design System Reference section (colors, typography, spacing)

## Files to Create / Modify

1. **Modify:** `tailwind.config.ts` — extend with all design tokens
2. **Create:** `__tests__/config/tailwind.test.ts` — token validation tests

## Tests to Write First

**`__tests__/config/tailwind.test.ts`:**

```ts
import { describe, it, expect } from 'vitest'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)
const colors = fullConfig.theme.colors as Record<string, any>

describe('Tailwind Design Tokens', () => {
  describe('Brand colors', () => {
    it('defines brand-slate', () => {
      expect(colors.brand.slate).toBe('#2F3C4A')
    })

    it('defines brand-teal', () => {
      expect(colors.brand.teal).toBe('#2A5C5A')
    })

    it('defines brand-sage', () => {
      expect(colors.brand.sage).toBe('#7A9E8E')
    })

    it('defines brand-amber', () => {
      expect(colors.brand.amber).toBe('#C29545')
    })

    it('defines brand-stone', () => {
      expect(colors.brand.stone).toBe('#E8E3DA')
    })

    it('defines brand-cream', () => {
      expect(colors.brand.cream).toBe('#FAF8F4')
    })
  })

  describe('Body colors', () => {
    it('defines body text color', () => {
      expect(colors.body.DEFAULT).toBe('#3D3830')
    })

    it('defines body muted color', () => {
      expect(colors.body.muted).toBe('#7A746A')
    })
  })

  describe('Functional colors', () => {
    it('defines border color', () => {
      expect(colors.border.DEFAULT).toBe('#D4CFC6')
    })

    it('defines success color', () => {
      expect(colors.status.success).toBe('#3D7A5F')
    })

    it('defines error color', () => {
      expect(colors.status.error).toBe('#A13D2D')
    })
  })

  describe('Font families', () => {
    const fontFamily = fullConfig.theme.fontFamily as Record<string, string[]>

    it('defines heading font family', () => {
      expect(fontFamily.heading).toBeDefined()
      expect(fontFamily.heading[0]).toContain('var(--font-heading)')
    })

    it('defines body font family', () => {
      expect(fontFamily.body).toBeDefined()
      expect(fontFamily.body[0]).toContain('var(--font-body)')
    })
  })
})
```

## Implementation

**`tailwind.config.ts`:**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: '#2F3C4A',
          teal: '#2A5C5A',
          sage: '#7A9E8E',
          amber: '#C29545',
          stone: '#E8E3DA',
          cream: '#FAF8F4',
        },
        body: {
          DEFAULT: '#3D3830',
          muted: '#7A746A',
        },
        border: {
          DEFAULT: '#D4CFC6',
        },
        status: {
          success: '#3D7A5F',
          error: '#A13D2D',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', "'Times New Roman'", 'serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Type scale (1.25 ratio, 16px base)
        h1: ['2.441rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        h2: ['1.953rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
        h3: ['1.563rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0' }],
        h4: ['1.25rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0' }],
        body: ['1.125rem', { lineHeight: '1.7', fontWeight: '400', letterSpacing: '0' }],
        'body-sm': ['1rem', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.01em' }],
        nav: ['0.9375rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.03em' }],
        button: ['0.9375rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.04em' }],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
```

**Note:** The `fontFamily` references CSS variables (`--font-heading`, `--font-body`) that will be set in Task 03 via `next/font`. This config _defines_ the tokens; Task 03 _loads_ the actual font files.

## Acceptance Criteria

1. `pnpm test:run` passes all token validation tests
2. `pnpm build` completes without errors
3. All brand colors resolve to their exact hex values
4. Font families reference CSS variables for heading and body
5. Custom `fontSize` entries exist for h1–h4, body, body-sm, caption, nav, and button
6. No default Tailwind colors are removed — only extended (so utility classes like `bg-white` still work)
