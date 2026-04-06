import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionHeading } from '@/components/ui/SectionHeading'

describe('SectionHeading component', () => {
  describe('Heading levels', () => {
    it('renders an h1 by default', () => {
      render(<SectionHeading>Title</SectionHeading>)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('renders an h2 when level="h2"', () => {
      render(<SectionHeading level="h2">Section</SectionHeading>)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('renders an h3 when level="h3"', () => {
      render(<SectionHeading level="h3">Sub</SectionHeading>)
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('renders children text', () => {
      render(<SectionHeading>My Heading</SectionHeading>)
      expect(screen.getByText('My Heading')).toBeInTheDocument()
    })
  })

  describe('Decorative rule', () => {
    it('does not render decorative rule by default', () => {
      const { container } = render(<SectionHeading>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule).toBeNull()
    })

    it('renders decorative rule when withRule is true', () => {
      const { container } = render(<SectionHeading withRule>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule).toBeInTheDocument()
    })

    it('decorative rule is hidden from screen readers', () => {
      const { container } = render(<SectionHeading withRule>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule).toHaveAttribute('aria-hidden', 'true')
    })

    it('decorative rule uses amber color', () => {
      const { container } = render(<SectionHeading withRule>Title</SectionHeading>)
      const rule = container.querySelector('[aria-hidden="true"]')
      expect(rule?.className).toContain('bg-brand-amber')
    })
  })

  describe('Styling', () => {
    it('uses brand-slate text color', () => {
      render(<SectionHeading>Title</SectionHeading>)
      const heading = screen.getByRole('heading')
      expect(heading.className).toContain('text-brand-slate')
    })

    it('uses heading font family', () => {
      render(<SectionHeading>Title</SectionHeading>)
      const heading = screen.getByRole('heading')
      expect(heading.className).toContain('font-heading')
    })
  })
})
