import { describe, it, expect } from 'vitest'
import { siteMetadata } from '@/lib/metadata'

describe('Site metadata', () => {
  it('has a title template with site name', () => {
    expect(siteMetadata.title).toBeDefined()
    if (typeof siteMetadata.title === 'object' && siteMetadata.title !== null && 'template' in siteMetadata.title) {
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
