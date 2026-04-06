import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContactPage from '@/app/contact/page'

describe('Contact page', () => {
  it('has exactly one H1 with "Let\'s Talk"', () => {
    const { container } = render(<ContactPage />)
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(/let's talk/i)
  })

  it('displays email contact', () => {
    render(<ContactPage />)
    expect(screen.getByText(/mary@accomplishpoints.com/)).toBeInTheDocument()
  })

  it('email is a clickable mailto link', () => {
    render(<ContactPage />)
    const emailLink = screen.getByRole('link', { name: /mary@accomplishpoints.com/ })
    expect(emailLink).toHaveAttribute('href', 'mailto:mary@accomplishpoints.com')
  })

  it('displays Bend, Oregon location', () => {
    render(<ContactPage />)
    expect(screen.getByText(/Bend, Oregon/)).toBeInTheDocument()
  })

  it('has a contact form', () => {
    render(<ContactPage />)
    expect(screen.getByRole('form') || screen.getByLabelText(/name/i)).toBeTruthy()
  })

  it('contains no emojis', () => {
    const { container } = render(<ContactPage />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
