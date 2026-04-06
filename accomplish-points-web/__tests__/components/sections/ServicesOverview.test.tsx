import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServicesOverview } from '@/components/sections/ServicesOverview'

describe('ServicesOverview section', () => {
  it('renders the section heading', () => {
    render(<ServicesOverview />)
    expect(screen.getByRole('heading', { level: 2, name: /how i work with you/i })).toBeInTheDocument()
  })

  it('renders 4 service cards', () => {
    render(<ServicesOverview />)
    const cards = screen.getAllByRole('heading', { level: 4 })
    expect(cards.length).toBeGreaterThanOrEqual(4)
  })

  it('renders "View All Services" link', () => {
    render(<ServicesOverview />)
    const link = screen.getByRole('link', { name: /view all services/i })
    expect(link).toHaveAttribute('href', '/services')
  })

  it('has stone background class', () => {
    const { container } = render(<ServicesOverview />)
    expect(container.firstChild).toHaveClass('bg-brand-stone')
  })
})
