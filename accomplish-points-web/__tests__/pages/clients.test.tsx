import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClientsPage from '@/app/clients/page'

describe('Clients page', () => {
  describe('Heading hierarchy', () => {
    it('has exactly one H1', () => {
      const { container } = render(<ClientsPage />)
      expect(container.querySelectorAll('h1')).toHaveLength(1)
    })

    it('H1 contains "Clients & Testimonials"', () => {
      render(<ClientsPage />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/clients.*testimonials/i)
    })

    it('has "What Clients Say" H2', () => {
      render(<ClientsPage />)
      expect(screen.getByRole('heading', { level: 2, name: /what clients say/i })).toBeInTheDocument()
    })

    it('has "Awards & Recognition" H2', () => {
      render(<ClientsPage />)
      expect(screen.getByRole('heading', { level: 2, name: /awards.*recognition/i })).toBeInTheDocument()
    })

    it('has "Organizations We Have Served" H2', () => {
      render(<ClientsPage />)
      expect(screen.getByRole('heading', { level: 2, name: /organizations we have served/i })).toBeInTheDocument()
    })
  })

  describe('Client categories', () => {
    it('renders Oregon State University clients', () => {
      render(<ClientsPage />)
      expect(screen.getAllByText(/Oregon State University|OSU/).length).toBeGreaterThanOrEqual(1)
    })

    it('renders County Government clients', () => {
      render(<ClientsPage />)
      expect(screen.getAllByText(/Clackamas County/).length).toBeGreaterThanOrEqual(1)
    })

    it('renders Cities', () => {
      render(<ClientsPage />)
      expect(screen.getAllByText(/Molalla/).length).toBeGreaterThanOrEqual(1)
    })

    it('renders Special Districts', () => {
      render(<ClientsPage />)
      expect(screen.getAllByText(/North Clackamas Parks/).length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Testimonials', () => {
    it('renders Clark Seavert testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Clark Seavert/)).toBeInTheDocument()
    })

    it('renders Dan Zinzer testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Dan Zinzer/)).toBeInTheDocument()
    })

    it('renders Connie L. testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Connie L\./)).toBeInTheDocument()
    })

    it('renders Daphne testimonial', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Daphne/)).toBeInTheDocument()
    })

    it('testimonials use blockquote elements', () => {
      const { container } = render(<ClientsPage />)
      const blockquotes = container.querySelectorAll('blockquote')
      expect(blockquotes.length).toBe(4)
    })
  })

  describe('Awards', () => {
    it('renders League of Oregon Cities award', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/League of Oregon Cities/)).toBeInTheDocument()
    })

    it('renders IAP2 award', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/IAP2|International Association of Public Participation/)).toBeInTheDocument()
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<ClientsPage />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no placeholder logos or empty rectangles', () => {
      const { container } = render(<ClientsPage />)
      expect(container.innerHTML).not.toContain('placeholder-logo')
    })
  })

  describe('Trust stats', () => {
    it('renders "25+ Years" stat', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/25\+ Years/i)).toBeInTheDocument()
    })

    it('renders "20+ Organizations" stat', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/20\+ Organizations/i)).toBeInTheDocument()
    })

    it('renders "4 Sectors" stat', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/4 Sectors/i)).toBeInTheDocument()
    })

    it('mentions impactful partnerships in the hero copy', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/impactful partnerships/i)).toBeInTheDocument()
    })
  })

  describe('Client category cards', () => {
    it('renders 4 client category groups as H3', () => {
      render(<ClientsPage />)
      expect(
        screen.getByRole('heading', { level: 3, name: /^Oregon State University/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /^County Government$/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /^Cities$/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /^Special Districts/i })
      ).toBeInTheDocument()
    })
  })

  describe('Context label cleanup', () => {
    it('does not show redundant "County government" context for Clackamas entities', () => {
      const { container } = render(<ClientsPage />)
      const listItems = container.querySelectorAll('li')
      const countyItems = Array.from(listItems).filter((li) =>
        li.textContent?.includes('Clackamas County Commission')
      )
      countyItems.forEach((li) => {
        expect(li.textContent).not.toContain('County government')
      })
    })

    it('keeps distinct context labels like "Special district" for Tillamook', () => {
      render(<ClientsPage />)
      expect(screen.getByText(/Special district/)).toBeInTheDocument()
    })
  })

  describe('Visual rhythm', () => {
    it('client categories section uses white background (not cream)', () => {
      const { container } = render(<ClientsPage />)
      const sections = container.querySelectorAll('section')
      expect(sections[1]?.className).toContain('bg-white')
    })
  })
})
