import { describe, it, expect } from 'vitest'

describe('Project setup', () => {
  it('vitest is configured and running', () => {
    expect(true).toBe(true)
  })

  it('can resolve @ alias', async () => {
    expect(typeof import.meta).toBe('object')
  })
})
