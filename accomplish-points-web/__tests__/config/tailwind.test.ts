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
