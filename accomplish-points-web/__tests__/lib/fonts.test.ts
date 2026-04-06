import { describe, it, expect } from 'vitest'
import { headingFont, bodyFont } from '@/lib/fonts'

describe('Font configuration', () => {
  it('exports headingFont with correct CSS variable', () => {
    expect(headingFont.variable).toBe('--font-heading')
  })

  it('exports bodyFont with correct CSS variable', () => {
    expect(bodyFont.variable).toBe('--font-body')
  })

  it('headingFont has className defined', () => {
    expect(headingFont.className).toBeDefined()
    expect(typeof headingFont.className).toBe('string')
  })

  it('bodyFont has className defined', () => {
    expect(bodyFont.className).toBeDefined()
    expect(typeof bodyFont.className).toBe('string')
  })
})
