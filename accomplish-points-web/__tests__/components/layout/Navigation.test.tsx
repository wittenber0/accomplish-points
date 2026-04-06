import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Navigation } from '@/components/layout/Navigation'

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
}))

describe('Navigation component', () => {
  it('renders all 5 navigation links', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Clients' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('links have correct href values', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
    expect(screen.getByRole('link', { name: 'Clients' })).toHaveAttribute('href', '/clients')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })

  it('nav links are uppercase', () => {
    render(<Navigation />)
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link.className).toContain('uppercase')
  })

  it('renders inside a nav element', () => {
    const { container } = render(<Navigation />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
