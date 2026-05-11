import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ServicesPage from '@/app/services/page'

describe('Services page', () => {
  describe('Heading hierarchy', () => {
    it('has exactly one H1 with "Services"', () => {
      const { container } = render(<ServicesPage />)
      const h1s = container.querySelectorAll('h1')
      expect(h1s).toHaveLength(1)
      expect(h1s[0]).toHaveTextContent(/services/i)
    })

    it('has engagement models H2', () => {
      render(<ServicesPage />)
      expect(screen.getByRole('heading', { level: 2, name: /how we work together/i })).toBeInTheDocument()
    })

    it('does not skip heading levels', () => {
      const { container } = render(<ServicesPage />)
      const headings = container.querySelectorAll('h1, h2, h3, h4')
      const levels = Array.from(headings).map((h) => parseInt(h.tagName[1]))
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i]).toBeLessThanOrEqual(Math.max(...levels.slice(0, i)) + 1)
      }
    })
  })

  describe('Engagement models', () => {
    it('describes the consultant engagement model', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/consultant/i)).toBeInTheDocument()
    })

    it('describes the embedded staff engagement model', () => {
      render(<ServicesPage />)
      expect(screen.getByRole('heading', { level: 3, name: /as your staff/i })).toBeInTheDocument()
    })
  })

  describe('Service categories', () => {
    it('renders Leadership & Coaching section', () => {
      render(<ServicesPage />)
      expect(screen.getByRole('heading', { level: 3, name: /leadership/i })).toBeInTheDocument()
    })

    it('renders Meeting Design & Facilitation section', () => {
      render(<ServicesPage />)
      expect(screen.getByRole('heading', { level: 3, name: /meeting design/i })).toBeInTheDocument()
    })

    it('renders Planning & Policy section', () => {
      render(<ServicesPage />)
      expect(screen.getByRole('heading', { level: 3, name: /plan.*policy/i })).toBeInTheDocument()
    })

    it('renders Written Deliverables section', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/written deliverables/i)).toBeInTheDocument()
    })

    it('renders "Reports for USE" brand phrase', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/reports for use/i)).toBeInTheDocument()
    })

    it('service categories have id anchors for deep linking', () => {
      const { container } = render(<ServicesPage />)
      expect(container.querySelector('#leadership-coaching')).toBeInTheDocument()
      expect(container.querySelector('#meeting-facilitation')).toBeInTheDocument()
      expect(container.querySelector('#planning-policy')).toBeInTheDocument()
    })
  })

  describe('Specialty areas', () => {
    it('renders specialty keywords', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/urban and rural planning/i)).toBeInTheDocument()
    })
  })

  describe('CTA', () => {
    it('has CTA linking to contact page', () => {
      render(<ServicesPage />)
      const link = screen.getByRole('link', { name: /get in touch|start a conversation/i })
      expect(link).toHaveAttribute('href', '/contact')
    })
  })

  describe('Anti-patterns', () => {
    it('contains no emojis', () => {
      const { container } = render(<ServicesPage />)
      expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
    })

    it('contains no exclamation points', () => {
      const { container } = render(<ServicesPage />)
      expect(container.textContent).not.toContain('!')
    })
  })

  describe('Value proposition', () => {
    it('renders the value proposition callout', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/rare combination.*people skills/i)
      ).toBeInTheDocument()
    })

    it('renders the cropped facilitation hero image', () => {
      render(<ServicesPage />)
      expect(
        screen.getByAltText(/facilitating a workshop with seated participants/i)
      ).toBeInTheDocument()
    })

    it('mentions impactful public-private partnerships in the services hero', () => {
      render(<ServicesPage />)
      expect(
        screen.getAllByText(/impactful public-private partnerships/i).length
      ).toBeGreaterThan(0)
    })
  })

  describe('Engagement model cards', () => {
    it('renders benefit bullets for consultant model', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/fresh perspective.*candor/i)
      ).toBeInTheDocument()
    })

    it('renders benefit bullets for staff model', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/embedded alignment/i)
      ).toBeInTheDocument()
    })
  })

  describe('Signature services section', () => {
    it('renders signature services on white background', () => {
      const { container } = render(<ServicesPage />)
      const sections = container.querySelectorAll('section')
      const sectionClasses = Array.from(sections).map((s) => s.className)
      expect(sectionClasses.some((c) => c.includes('bg-white'))).toBe(true)
    })

    it('renders "Meetings with Mary" brand callout', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/meetings with mary/i)).toBeInTheDocument()
    })

    it('renders 3 signature service cards', () => {
      render(<ServicesPage />)
      expect(
        screen.getByRole('heading', { level: 3, name: /leadership/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /meeting design/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /project/i })
      ).toBeInTheDocument()
    })
  })

  describe('Additional services section', () => {
    it('renders additional services in compact format', () => {
      render(<ServicesPage />)
      expect(
        screen.getByRole('heading', { level: 3, name: /plan.*policy/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /^written deliverables$/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /interagency/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: /communication strategies/i })
      ).toBeInTheDocument()
    })

    it('renders "Reports for USE" brand callout in written deliverables', () => {
      render(<ServicesPage />)
      expect(screen.getByText(/reports for use/i)).toBeInTheDocument()
    })

    it('references new service delivery models in planning and policy work', () => {
      render(<ServicesPage />)
      expect(
        screen.getAllByText(/new service delivery models/i).length
      ).toBeGreaterThan(0)
    })
  })

  describe('Specialty areas intro', () => {
    it('has intro text above specialty badges', () => {
      render(<ServicesPage />)
      expect(
        screen.getByText(/deep expertise.*disciplines/i)
      ).toBeInTheDocument()
    })
  })

  describe('Bullet count discipline', () => {
    it('signature service cards have at most 3 bullets each', () => {
      const { container } = render(<ServicesPage />)
      const whiteSection = Array.from(
        container.querySelectorAll('section')
      ).find((s) => s.className.includes('bg-white'))
      if (whiteSection) {
        const cards = whiteSection.querySelectorAll('[class*="rounded-lg"]')
        cards.forEach((card) => {
          const bullets = card.querySelectorAll('li')
          expect(bullets.length).toBeLessThanOrEqual(3)
        })
      }
    })

    it('additional service cards have at most 2 bullets each', () => {
      const { container } = render(<ServicesPage />)
      const sections = Array.from(container.querySelectorAll('section'))
      const whiteIdx = sections.findIndex((s) =>
        s.className.includes('bg-white')
      )
      const additionalSection = sections[whiteIdx + 1]
      if (additionalSection) {
        const cards = additionalSection.querySelectorAll('[class*="rounded-lg"]')
        cards.forEach((card) => {
          const bullets = card.querySelectorAll('li')
          expect(bullets.length).toBeLessThanOrEqual(2)
        })
      }
    })
  })
})
