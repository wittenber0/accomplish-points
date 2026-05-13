import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '@/components/sections/Hero'

describe('Hero section', () => {
  it('renders the business name label', () => {
    render(<Hero />)
    expect(screen.getByText(/Accomplish Points Consulting/)).toBeInTheDocument()
  })

  it('renders the H1 heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders subtitle paragraph', () => {
    render(<Hero />)
    expect(screen.getByText(/strategic planning|public service/i)).toBeInTheDocument()
  })

  it('renders primary CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /start a conversation/i })).toBeInTheDocument()
  })

  it('renders secondary CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /explore services/i })).toBeInTheDocument()
  })

  it('has image placeholder or image element', () => {
    const { container } = render(<Hero />)
    const img = container.querySelector('img')
    const placeholder = container.querySelector('[data-testid="hero-image-placeholder"]')
    expect(img || placeholder).toBeTruthy()
  })

  it('requests a higher-quality hero image variant', () => {
    render(<Hero />)
    const image = screen.getByAltText(/Mary Cook in an outdoor setting/i)

    expect(image).toHaveAttribute('quality', '90')
    expect(image).toHaveAttribute('sizes', '(max-width: 1024px) 100vw, 50vw')
  })
})
