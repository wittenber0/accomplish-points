import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button component', () => {
  describe('Rendering', () => {
    it('renders children text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders as <button> by default', () => {
      render(<Button>Submit</Button>)
      const el = screen.getByRole('button', { name: 'Submit' })
      expect(el.tagName).toBe('BUTTON')
    })

    it('renders as <a> when href is provided', () => {
      render(<Button href="/contact">Contact</Button>)
      const el = screen.getByRole('link', { name: 'Contact' })
      expect(el.tagName).toBe('A')
      expect(el).toHaveAttribute('href', '/contact')
    })
  })

  describe('Variants', () => {
    it('applies primary variant styles by default', () => {
      render(<Button>Primary</Button>)
      const el = screen.getByRole('button')
      expect(el.className).toContain('bg-brand-teal')
      expect(el.className).toContain('text-white')
    })

    it('applies secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const el = screen.getByRole('button')
      expect(el.className).toContain('border')
      expect(el.className).toContain('border-brand-teal')
      expect(el.className).toContain('text-brand-teal')
    })
  })

  describe('Button type', () => {
    it('defaults to type="button"', () => {
      render(<Button>Click</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('accepts type="submit"', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
  })

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const handler = vi.fn()
      render(<Button onClick={handler}>Click</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(handler).toHaveBeenCalledOnce()
    })

    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Styling', () => {
    it('has uppercase text', () => {
      render(<Button>Text</Button>)
      expect(screen.getByRole('button').className).toContain('uppercase')
    })

    it('has rounded corners (not pill)', () => {
      render(<Button>Text</Button>)
      const className = screen.getByRole('button').className
      expect(className).toContain('rounded')
      expect(className).not.toContain('rounded-full')
    })

    it('has transition for color', () => {
      render(<Button>Text</Button>)
      expect(screen.getByRole('button').className).toContain('transition')
    })
  })

  describe('Accessibility', () => {
    it('is focusable', () => {
      render(<Button>Focus me</Button>)
      const el = screen.getByRole('button')
      el.focus()
      expect(el).toHaveFocus()
    })
  })
})
