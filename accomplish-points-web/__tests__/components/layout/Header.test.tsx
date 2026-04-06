import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '@/components/layout/Header'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header component', () => {
  it('renders the business name', () => {
    render(<Header />)
    expect(screen.getByText(/Accomplish Points/)).toBeInTheDocument()
  })

  it('business name links to home', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: /Accomplish Points/ })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders as a header element', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('header has cream background', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header?.className).toContain('bg-brand-cream')
  })

  it('header has bottom border', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header?.className).toContain('border-b')
  })

  it('contains navigation component', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
