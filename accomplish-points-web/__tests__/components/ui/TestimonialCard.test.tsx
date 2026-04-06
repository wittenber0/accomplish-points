import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

describe('TestimonialCard component', () => {
  const baseProps = {
    quote: 'Mary was first rate in her planning skills.',
    name: 'Clark Seavert',
  }

  describe('Content rendering', () => {
    it('renders the quote text', () => {
      render(<TestimonialCard {...baseProps} />)
      expect(screen.getByText(/Mary was first rate/)).toBeInTheDocument()
    })

    it('renders the name', () => {
      render(<TestimonialCard {...baseProps} />)
      expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
    })

    it('renders title when provided', () => {
      render(<TestimonialCard {...baseProps} title="Director" />)
      expect(screen.getByText(/Director/)).toBeInTheDocument()
    })

    it('renders organization when provided', () => {
      render(<TestimonialCard {...baseProps} organization="OSU Research Center" />)
      expect(screen.getByText(/OSU Research Center/)).toBeInTheDocument()
    })

    it('renders without title and organization', () => {
      render(<TestimonialCard quote="Great work." name="Jane" />)
      expect(screen.getByText(/Great work/)).toBeInTheDocument()
      expect(screen.getByText(/Jane/)).toBeInTheDocument()
    })
  })

  describe('Semantic structure', () => {
    it('renders as a blockquote', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      expect(container.querySelector('blockquote')).toBeInTheDocument()
    })

    it('renders attribution in a footer or cite element', () => {
      const { container } = render(<TestimonialCard {...baseProps} title="Director" organization="OSU" />)
      const footer = container.querySelector('footer') || container.querySelector('cite')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('has left amber border', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      const blockquote = container.querySelector('blockquote')
      expect(blockquote?.className).toContain('border-l')
      expect(blockquote?.className).toContain('border-brand-amber')
    })

    it('quote text is italic', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      const quote = container.querySelector('blockquote p')
      expect(quote?.className).toContain('italic')
    })

    it('does not contain any quotation mark characters or icons', () => {
      const { container } = render(<TestimonialCard {...baseProps} />)
      const html = container.innerHTML
      expect(html).not.toContain('\u201C')
      expect(html).not.toContain('\u201D')
      expect(html).not.toContain('\u00AB')
      expect(html).not.toContain('\u00BB')
      expect(html).not.toContain('<svg')
    })
  })

  describe('Variants', () => {
    it('renders default variant without featured styles', () => {
      const { container } = render(
        <TestimonialCard {...baseProps} variant="default" />
      )
      const blockquote = container.querySelector('blockquote')
      expect(blockquote?.className).not.toContain('col-span')
    })

    it('renders featured variant with col-span class', () => {
      const { container } = render(
        <TestimonialCard {...baseProps} variant="featured" />
      )
      const blockquote = container.querySelector('blockquote')
      expect(blockquote?.className).toContain('col-span')
    })

    it('defaults to default variant when no variant prop', () => {
      const { container } = render(
        <TestimonialCard quote="Test quote" name="Test Name" />
      )
      const blockquote = container.querySelector('blockquote')
      expect(blockquote?.className).not.toContain('col-span')
    })

    it('uses larger text for featured variant', () => {
      const { container } = render(
        <TestimonialCard {...baseProps} variant="featured" />
      )
      const quote = container.querySelector('blockquote p')
      expect(quote?.className).toContain('text-body')
      expect(quote?.className).not.toContain('text-body-sm')
    })

    it('uses smaller text for default variant', () => {
      const { container } = render(
        <TestimonialCard {...baseProps} variant="default" />
      )
      const quote = container.querySelector('blockquote p')
      expect(quote?.className).toContain('text-body-sm')
    })
  })
})
