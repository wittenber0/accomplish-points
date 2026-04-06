import { describe, it, expect } from 'vitest'

describe('Page metadata', () => {
  it('home page has default metadata via layout', async () => {
    const { siteMetadata } = await import('@/lib/metadata')
    expect(siteMetadata.title).toBeDefined()
    expect(siteMetadata.description).toBeDefined()
    expect(siteMetadata.description).not.toContain('!')
    expect(siteMetadata.description).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })

  it('about page exports metadata', async () => {
    const { metadata } = await import('@/app/about/page')
    expect(metadata.title).toBe('About Mary Cook')
    expect(metadata.description).toBeDefined()
    expect(typeof metadata.description).toBe('string')
    expect(metadata.description!.length).toBeGreaterThan(50)
    expect(metadata.description!.length).toBeLessThan(160)
  })

  it('services page exports metadata', async () => {
    const { metadata } = await import('@/app/services/page')
    expect(metadata.title).toBe('Services')
    expect(metadata.description).toBeDefined()
    expect(metadata.description!.length).toBeLessThan(160)
  })

  it('clients page exports metadata', async () => {
    const { metadata } = await import('@/app/clients/page')
    expect(metadata.title).toContain('Clients')
    expect(metadata.description).toBeDefined()
  })

  it('contact page exports metadata', async () => {
    const { metadata } = await import('@/app/contact/page')
    expect(metadata.title).toBe('Contact')
    expect(metadata.description).toBeDefined()
  })

  it('no page description contains emojis', async () => {
    const pages = [
      '@/app/about/page',
      '@/app/services/page',
      '@/app/clients/page',
      '@/app/contact/page',
    ]
    for (const page of pages) {
      const mod = await import(page)
      if (mod.metadata?.description) {
        expect(mod.metadata.description).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
      }
    }
  })

  it('no page description contains exclamation points', async () => {
    const pages = [
      '@/app/about/page',
      '@/app/services/page',
      '@/app/clients/page',
      '@/app/contact/page',
    ]
    for (const page of pages) {
      const mod = await import(page)
      if (mod.metadata?.description) {
        expect(mod.metadata.description).not.toContain('!')
      }
    }
  })
})
