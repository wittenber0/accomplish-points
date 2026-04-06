import { describe, it, expect } from 'vitest'
import { services, engagementModels, specialtyAreas, serviceGroupings } from '@/content/services'

describe('Services data', () => {
  it('exports an array of 7 service categories', () => {
    expect(services).toHaveLength(7)
  })

  it('each service has required fields', () => {
    services.forEach((service) => {
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('title')
      expect(service).toHaveProperty('description')
      expect(service).toHaveProperty('offerings')
      expect(typeof service.id).toBe('string')
      expect(typeof service.title).toBe('string')
      expect(typeof service.description).toBe('string')
      expect(Array.isArray(service.offerings)).toBe(true)
      expect(service.offerings.length).toBeGreaterThan(0)
    })
  })

  it('includes "Meetings with Mary" as a branded service', () => {
    const meetings = services.find((s) => s.id === 'meeting-facilitation')
    expect(meetings).toBeDefined()
    expect(meetings!.title).toContain('Meetings with Mary')
  })

  it('includes "Reports for USE" branded phrase', () => {
    const reports = services.find((s) => s.id === 'written-deliverables')
    expect(reports).toBeDefined()
    expect(reports!.title + ' ' + reports!.description).toContain('USE')
  })

  it('exports 2 engagement models', () => {
    expect(engagementModels).toHaveLength(2)
    engagementModels.forEach((model) => {
      expect(model).toHaveProperty('title')
      expect(model).toHaveProperty('description')
    })
  })

  it('exports specialty areas as an array of strings', () => {
    expect(Array.isArray(specialtyAreas)).toBe(true)
    expect(specialtyAreas.length).toBeGreaterThan(5)
    specialtyAreas.forEach((area) => {
      expect(typeof area).toBe('string')
    })
  })

  it('exports 4 service groupings for the home page', () => {
    expect(serviceGroupings).toHaveLength(4)
    serviceGroupings.forEach((group) => {
      expect(group).toHaveProperty('title')
      expect(group).toHaveProperty('description')
      expect(group).toHaveProperty('href')
    })
  })

  it('contains no emojis', () => {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
    const allText = services.map((s) => s.title + s.description + s.offerings.join('')).join('')
    expect(emojiRegex.test(allText)).toBe(false)
  })

  it('contains no exclamation points', () => {
    const allText = services.map((s) => s.title + s.description + s.offerings.join('')).join('')
    expect(allText).not.toContain('!')
  })
})
