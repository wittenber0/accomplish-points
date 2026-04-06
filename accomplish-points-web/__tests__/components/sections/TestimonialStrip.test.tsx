import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TestimonialStrip } from '@/components/sections/TestimonialStrip'

describe('TestimonialStrip section', () => {
  it('renders the Clark Seavert testimonial', () => {
    render(<TestimonialStrip />)
    expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
  })

  it('renders the quote text', () => {
    render(<TestimonialStrip />)
    expect(screen.getByText(/first rate in her planning skills/i)).toBeInTheDocument()
  })

  it('renders a link to see more testimonials', () => {
    render(<TestimonialStrip />)
    const link = screen.getByRole('link', { name: /see more|clients/i })
    expect(link).toHaveAttribute('href', '/clients')
  })

  it('uses a blockquote element', () => {
    const { container } = render(<TestimonialStrip />)
    expect(container.querySelector('blockquote')).toBeInTheDocument()
  })
})
