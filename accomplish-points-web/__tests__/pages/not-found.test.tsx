import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotFoundPage from '@/app/not-found'

describe('404 page', () => {
  it('has an H1 with "Page not found"', () => {
    render(<NotFoundPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/page not found/i)
  })

  it('has exactly one H1', () => {
    const { container } = render(<NotFoundPage />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('has explanatory text', () => {
    render(<NotFoundPage />)
    expect(screen.getByText(/doesn't exist|has been moved|could not be found/i)).toBeInTheDocument()
  })

  it('has a link back to home', () => {
    render(<NotFoundPage />)
    const link = screen.getByRole('link', { name: /return to home|go home|home/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('contains no emojis', () => {
    const { container } = render(<NotFoundPage />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })

  it('contains no exclamation points', () => {
    const { container } = render(<NotFoundPage />)
    expect(container.textContent).not.toContain('!')
  })
})
