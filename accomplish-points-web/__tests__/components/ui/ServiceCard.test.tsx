import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServiceCard } from '@/components/ui/ServiceCard'

describe('ServiceCard component', () => {
  const baseProps = {
    title: 'Leadership & Coaching',
    description: 'Thought partnership and dedicated advisory for leaders navigating complex decisions.',
  }

  describe('Content', () => {
    it('renders the title as an h3', () => {
      render(<ServiceCard {...baseProps} />)
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Leadership & Coaching')
    })

    it('renders the description', () => {
      render(<ServiceCard {...baseProps} />)
      expect(screen.getByText(/Thought partnership/)).toBeInTheDocument()
    })

    it('renders a "Learn more" link when href is provided', () => {
      render(<ServiceCard {...baseProps} href="/services#leadership" />)
      const link = screen.getByRole('link', { name: /learn more/i })
      expect(link).toHaveAttribute('href', '/services#leadership')
    })

    it('does not render a link when href is omitted', () => {
      render(<ServiceCard {...baseProps} />)
      expect(screen.queryByRole('link')).toBeNull()
    })
  })

  describe('Styling', () => {
    it('has a border', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('border')
    })

    it('has no box shadow classes', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).not.toContain('shadow')
    })

    it('has rounded corners (not pill)', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('rounded')
      expect(card.className).not.toContain('rounded-full')
    })

    it('has padding', () => {
      const { container } = render(<ServiceCard {...baseProps} />)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('p-')
    })
  })

  describe('Accessibility', () => {
    it('link text is descriptive (contains "Learn more")', () => {
      render(<ServiceCard {...baseProps} href="/services#leadership" />)
      const link = screen.getByRole('link')
      expect(link.textContent?.toLowerCase()).toContain('learn more')
    })
  })
})
