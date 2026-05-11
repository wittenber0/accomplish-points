import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '@/app/page'

describe('Home page', () => {
  it('renders the H1 heading with brand phrase', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/accomplish what is most important/i)
  })

  it('has exactly one H1', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders the primary CTA linking to contact', () => {
    render(<HomePage />)
    const cta = screen.getByRole('link', { name: /start a conversation/i })
    expect(cta).toHaveAttribute('href', '/contact')
  })

  it('renders the secondary CTA linking to services', () => {
    render(<HomePage />)
    const cta = screen.getByRole('link', { name: /explore services/i })
    expect(cta).toHaveAttribute('href', '/services')
  })

  it('renders a featured testimonial', () => {
    render(<HomePage />)
    expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
  })

  it('renders credentials section', () => {
    render(<HomePage />)
    expect(screen.getByText(/AICP/)).toBeInTheDocument()
  })

  it('renders services overview section', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /how i work with you/i })).toBeInTheDocument()
  })

  it('mentions impactful public-private partnerships in the hero copy', () => {
    render(<HomePage />)
    expect(
      screen.getAllByText(/impactful public-private partnerships/i).length
    ).toBeGreaterThan(0)
  })

  it('contains no emojis', () => {
    const { container } = render(<HomePage />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })

  it('contains no exclamation points in body text', () => {
    const { container } = render(<HomePage />)
    const textContent = container.textContent || ''
    const exclamationCount = (textContent.match(/!/g) || []).length
    expect(exclamationCount).toBeLessThanOrEqual(0)
  })
})
