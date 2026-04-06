import { describe, it, expect } from 'vitest'
import { generateJsonLd } from '@/lib/metadata'

describe('JSON-LD structured data', () => {
  it('has @context schema.org', () => {
    const data = generateJsonLd()
    expect(data['@context']).toBe('https://schema.org')
  })

  it('has @type LocalBusiness', () => {
    const data = generateJsonLd()
    expect(data['@type']).toBe('LocalBusiness')
  })

  it('has correct business name', () => {
    const data = generateJsonLd()
    expect(data.name).toBe('Accomplish Points Consulting')
  })

  it('has Bend, Oregon address', () => {
    const data = generateJsonLd()
    expect(data.address?.addressLocality).toBe('Bend')
    expect(data.address?.addressRegion).toBe('OR')
  })

  it('has service description', () => {
    const data = generateJsonLd()
    expect(data.description).toBeDefined()
    expect(typeof data.description).toBe('string')
  })

  it('description has no emojis', () => {
    const data = generateJsonLd()
    expect(data.description).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
