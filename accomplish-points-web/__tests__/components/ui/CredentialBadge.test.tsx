import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CredentialBadge } from '@/components/ui/CredentialBadge'

describe('CredentialBadge component', () => {
  it('renders the label text', () => {
    render(<CredentialBadge label="AICP Certified" />)
    expect(screen.getByText('AICP Certified')).toBeInTheDocument()
  })

  it('renders as an inline element (span)', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('has stone background', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toContain('bg-brand-stone')
  })

  it('has border', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toContain('border')
  })

  it('uses small text size', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toMatch(/text-(sm|caption|xs)/)
  })

  it('has minimal border radius (not pill)', () => {
    const { container } = render(<CredentialBadge label="Test" />)
    const badge = container.querySelector('span')
    expect(badge?.className).toContain('rounded-sm')
    expect(badge?.className).not.toContain('rounded-full')
  })

  it('does not contain emojis or icons', () => {
    const { container } = render(<CredentialBadge label="AICP Certified" />)
    expect(container.querySelector('svg')).toBeNull()
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
