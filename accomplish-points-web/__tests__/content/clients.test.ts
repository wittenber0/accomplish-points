import { describe, it, expect } from 'vitest'
import { clientCategories } from '@/content/clients'

describe('Clients data', () => {
  it('exports client categories', () => {
    expect(clientCategories.length).toBeGreaterThanOrEqual(4)
  })

  it('each category has a name and list of clients', () => {
    clientCategories.forEach((category) => {
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('clients')
      expect(Array.isArray(category.clients)).toBe(true)
      expect(category.clients.length).toBeGreaterThan(0)
    })
  })

  it('each client has a name', () => {
    clientCategories.forEach((category) => {
      category.clients.forEach((client) => {
        expect(client).toHaveProperty('name')
        expect(typeof client.name).toBe('string')
      })
    })
  })

  it('includes OSU system clients', () => {
    const osu = clientCategories.find((c) => c.name.toLowerCase().includes('oregon state') || c.name.toLowerCase().includes('osu'))
    expect(osu).toBeDefined()
  })

  it('includes county government clients', () => {
    const county = clientCategories.find((c) => c.name.toLowerCase().includes('county'))
    expect(county).toBeDefined()
  })
})
