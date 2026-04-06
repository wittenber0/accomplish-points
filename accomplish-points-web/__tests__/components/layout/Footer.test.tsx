import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/layout/Footer'

describe('Footer component', () => {
  describe('Content', () => {
    it('renders the business name', () => {
      render(<Footer />)
      const matches = screen.getAllByText(/Accomplish Points Consulting/)
      expect(matches.length).toBeGreaterThanOrEqual(1)
    })

    it('renders the location', () => {
      render(<Footer />)
      expect(screen.getByText(/Bend, Oregon/)).toBeInTheDocument()
    })

    it('renders copyright notice with current year', () => {
      render(<Footer />)
      const year = new Date().getFullYear()
      expect(screen.getByText(new RegExp(`${year} Accomplish Points Consulting`))).toBeInTheDocument()
    })

    it('renders WBE certification mention', () => {
      render(<Footer />)
      expect(screen.getByText(/Women Business Enterprise/i)).toBeInTheDocument()
    })
  })

  describe('Navigation links', () => {
    it('renders all navigation links', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Clients' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    })

    it('navigation links have correct hrefs', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
      expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
    })
  })

  describe('Semantic structure', () => {
    it('renders as a footer element', () => {
      const { container } = render(<Footer />)
      expect(container.querySelector('footer')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('has dark slate background', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer?.className).toContain('bg-brand-slate')
    })

    it('has light text color', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer?.className).toContain('text-brand-cream') ||
        expect(footer?.className).toContain('text-brand-stone')
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<Footer />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no social media icons', () => {
      const { container } = render(<Footer />)
      const svgs = container.querySelectorAll('svg')
      svgs.forEach((svg) => {
        expect(svg.getAttribute('aria-label')).not.toMatch(/twitter|facebook|instagram|linkedin/i)
      })
    })
  })
})
