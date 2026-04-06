import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CallToAction } from '@/components/sections/CallToAction'

describe('CallToAction section', () => {
  const baseProps = {
    heading: 'Ready to accomplish what matters most?',
    body: 'Every engagement begins with a conversation about what you need.',
    buttonText: 'Get in Touch',
    buttonHref: '/contact',
  }

  describe('Content', () => {
    it('renders the heading as h2', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(baseProps.heading)
    })

    it('renders the body text', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByText(baseProps.body)).toBeInTheDocument()
    })

    it('renders a button/link with the provided text', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByRole('link', { name: baseProps.buttonText })).toBeInTheDocument()
    })

    it('button links to the provided href', () => {
      render(<CallToAction {...baseProps} />)
      expect(screen.getByRole('link', { name: baseProps.buttonText })).toHaveAttribute('href', '/contact')
    })
  })

  describe('Styling', () => {
    it('has dark background (brand-slate)', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('bg-brand-slate')
    })

    it('has light text color for readability on dark background', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('text-brand-cream')
    })

    it('has section-level padding', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('py-')
    })

    it('content is centered', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      const section = container.firstChild as HTMLElement
      expect(section.className).toContain('text-center')
    })
  })

  describe('Semantic structure', () => {
    it('renders as a <section> element', () => {
      const { container } = render(<CallToAction {...baseProps} />)
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })
})
