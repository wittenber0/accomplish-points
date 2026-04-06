import { describe, it, expect } from 'vitest'
import { education, certifications, awards, affiliations } from '@/content/credentials'

describe('Credentials data', () => {
  it('exports education entries', () => {
    expect(education.length).toBeGreaterThanOrEqual(2)
    education.forEach((e) => {
      expect(e).toHaveProperty('degree')
      expect(e).toHaveProperty('institution')
    })
  })

  it('includes UCLA MA Urban Planning', () => {
    const ma = education.find((e) => e.degree.includes('Urban Planning'))
    expect(ma).toBeDefined()
    expect(ma!.institution).toContain('UCLA')
  })

  it('exports certifications', () => {
    expect(certifications.length).toBeGreaterThanOrEqual(2)
    const aicp = certifications.find((c) => c.name.includes('AICP') || c.name.includes('A.I.C.P'))
    expect(aicp).toBeDefined()
    const prosci = certifications.find((c) => c.name.includes('PROSCI') || c.name.includes('Change Management'))
    expect(prosci).toBeDefined()
  })

  it('exports awards', () => {
    expect(awards.length).toBeGreaterThanOrEqual(2)
    awards.forEach((a) => {
      expect(a).toHaveProperty('name')
      expect(a).toHaveProperty('description')
    })
  })

  it('exports professional affiliations', () => {
    expect(affiliations.length).toBeGreaterThanOrEqual(2)
  })
})
