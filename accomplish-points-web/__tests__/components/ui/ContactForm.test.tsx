import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from '@/components/ui/ContactForm'

describe('ContactForm component', () => {
  describe('Form fields', () => {
    it('renders Name field (required)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/name/i)
      expect(field).toBeInTheDocument()
      expect(field).toBeRequired()
    })

    it('renders Organization field (optional)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/organization/i)
      expect(field).toBeInTheDocument()
      expect(field).not.toBeRequired()
    })

    it('renders Email field (required)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/email/i)
      expect(field).toBeInTheDocument()
      expect(field).toBeRequired()
      expect(field).toHaveAttribute('type', 'email')
    })

    it('renders Phone field (optional)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/phone/i)
      expect(field).toBeInTheDocument()
      expect(field).not.toBeRequired()
    })

    it('renders Message textarea (required)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/how can i help|message/i)
      expect(field).toBeInTheDocument()
      expect(field).toBeRequired()
      expect(field.tagName).toBe('TEXTAREA')
    })

    it('message textarea has a placeholder', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/how can i help|message/i)
      expect(field).toHaveAttribute('placeholder')
    })

    it('renders Submit button', () => {
      render(<ContactForm />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('every visible input has a label', () => {
      const { container } = render(<ContactForm />)
      const visibleInputs = container.querySelectorAll('input:not([type="hidden"]), textarea, select')
      visibleInputs.forEach((input) => {
        const id = input.getAttribute('id')
        if (id) {
          const label = container.querySelector(`label[for="${id}"]`)
          expect(label).toBeInTheDocument()
        }
      })
    })
  })

  describe('Honeypot field', () => {
    it('has a hidden honeypot field', () => {
      const { container } = render(<ContactForm />)
      const honeypot = container.querySelector('[name="website"]') ||
                       container.querySelector('[name="url"]') ||
                       container.querySelector('[aria-hidden="true"] input')
      expect(honeypot).toBeInTheDocument()
    })

    it('honeypot field is not visible', () => {
      const { container } = render(<ContactForm />)
      const honeypotWrapper = container.querySelector('[aria-hidden="true"]')
      expect(honeypotWrapper).toBeInTheDocument()
      expect(
        honeypotWrapper?.className.includes('sr-only') ||
        honeypotWrapper?.className.includes('hidden') ||
        window.getComputedStyle(honeypotWrapper!).position === 'absolute'
      ).toBe(true)
    })
  })
})
