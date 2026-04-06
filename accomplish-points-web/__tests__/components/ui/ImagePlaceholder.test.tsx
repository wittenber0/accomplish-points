import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

describe('ImagePlaceholder component', () => {
  it('renders with the provided alt text', () => {
    render(<ImagePlaceholder alt="Portrait of Mary Cook" />)
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument()
  })

  it('applies stone background color', () => {
    render(<ImagePlaceholder alt="Portrait of Mary Cook" />)
    const el = screen.getByTestId('image-placeholder')
    expect(el.className).toContain('bg-brand-stone')
  })

  it('displays descriptive text', () => {
    render(<ImagePlaceholder alt="Portrait of Mary Cook" label="Mary Cook" />)
    expect(screen.getByText(/Mary Cook/)).toBeInTheDocument()
  })

  it('has appropriate aspect ratio by default', () => {
    render(<ImagePlaceholder alt="Portrait" />)
    const el = screen.getByTestId('image-placeholder')
    expect(el.className).toContain('aspect-')
  })

  it('accepts custom aspect ratio', () => {
    render(<ImagePlaceholder alt="Portrait" aspectRatio="square" />)
    const el = screen.getByTestId('image-placeholder')
    expect(el.className).toContain('aspect-square')
  })

  it('does not contain any watermarked images', () => {
    const { container } = render(<ImagePlaceholder alt="Portrait" />)
    expect(container.querySelector('img')).not.toBeInTheDocument()
  })

  it('contains no emojis', () => {
    const { container } = render(<ImagePlaceholder alt="Portrait" label="Mary Cook" />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
