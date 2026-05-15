import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AboutPage from '@/app/about/page'

describe('About page', () => {
  describe('Heading hierarchy', () => {
    it('has exactly one H1', () => {
      const { container } = render(<AboutPage />)
      expect(container.querySelectorAll('h1')).toHaveLength(1)
    })

    it('H1 contains "About Mary Cook"', () => {
      render(<AboutPage />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/about mary cook/i)
    })

    it('has "A Career in Service" H2 section', () => {
      render(<AboutPage />)
      expect(screen.getByRole('heading', { level: 2, name: /a career in service/i })).toBeInTheDocument()
    })

    it('has "Credentials" H2 section', () => {
      render(<AboutPage />)
      expect(screen.getByRole('heading', { level: 2, name: /credentials/i })).toBeInTheDocument()
    })

    it('has the intersectionality H2 section', () => {
      render(<AboutPage />)
      expect(screen.getByRole('heading', { level: 2, name: /people.*planning.*economics/i })).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('mentions Accomplish Points Consulting', () => {
      render(<AboutPage />)
      expect(screen.getAllByText(/Accomplish Points/).length).toBeGreaterThan(0)
    })

    it('mentions Bend, Oregon', () => {
      render(<AboutPage />)
      expect(screen.getAllByText(/Bend, Oregon/).length).toBeGreaterThan(0)
    })

    it('mentions UCLA education', () => {
      render(<AboutPage />)
      expect(screen.getAllByText(/UCLA/).length).toBeGreaterThan(0)
    })

    it('mentions AICP certification', () => {
      render(<AboutPage />)
      expect(screen.getAllByText(/AICP|American Institute of Certified Planners/).length).toBeGreaterThan(0)
    })

    it('mentions Clackamas County career', () => {
      render(<AboutPage />)
      expect(screen.getByText(/Clackamas County/)).toBeInTheDocument()
    })

    it('mentions Swanson Partners as prior firm', () => {
      render(<AboutPage />)
      expect(screen.getByText(/Swanson Partners/)).toBeInTheDocument()
    })

    it('mentions impactful public-private partnerships', () => {
      render(<AboutPage />)
      expect(screen.getByText(/impactful public-private partnerships/i)).toBeInTheDocument()
    })

    it('bypasses optimization for the portrait image', () => {
      render(<AboutPage />)
      const image = screen.getByAltText(/Portrait of Mary Cook/i)

      expect(image).toHaveAttribute('unoptimized', '')
      expect(image).toHaveAttribute('sizes', '(max-width: 1024px) 100vw, 384px')
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<AboutPage />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no exclamation points', () => {
      const { container } = render(<AboutPage />)
      expect(container.textContent).not.toContain('!')
    })
  })

  describe('Navigation', () => {
    it('has CTA linking to contact page', () => {
      render(<AboutPage />)
      const link = screen.getByRole('link', { name: /get in touch|start a conversation/i })
      expect(link).toHaveAttribute('href', '/contact')
    })
  })
})
