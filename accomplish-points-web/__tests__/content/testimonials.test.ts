import { describe, it, expect } from 'vitest'
import { testimonials } from '@/content/testimonials'

describe('Testimonials data', () => {
  it('exports 4 testimonials', () => {
    expect(testimonials).toHaveLength(4)
  })

  it('each testimonial has required fields', () => {
    testimonials.forEach((t) => {
      expect(t).toHaveProperty('quote')
      expect(t).toHaveProperty('name')
      expect(typeof t.quote).toBe('string')
      expect(typeof t.name).toBe('string')
      expect(t.quote.length).toBeGreaterThan(20)
    })
  })

  it('Clark Seavert testimonial includes title and organization', () => {
    const clark = testimonials.find((t) => t.name.includes('Clark'))
    expect(clark).toBeDefined()
    expect(clark!.title).toBeDefined()
    expect(clark!.organization).toBeDefined()
  })

  it('Dan Zinzer testimonial includes title and organization', () => {
    const dan = testimonials.find((t) => t.name.includes('Zinzer'))
    expect(dan).toBeDefined()
    expect(dan!.title).toBeDefined()
    expect(dan!.organization).toBeDefined()
  })

  it('testimonials are ordered: Clark, Dan, Connie, Daphne', () => {
    expect(testimonials[0].name).toContain('Clark')
    expect(testimonials[1].name).toContain('Zinzer')
    expect(testimonials[2].name).toContain('Connie')
    expect(testimonials[3].name).toContain('Daphne')
  })
})
