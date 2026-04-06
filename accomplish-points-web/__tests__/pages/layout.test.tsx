import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RootLayout from '@/app/layout'

vi.mock('@/lib/fonts', () => ({
  headingFont: { variable: '--font-heading', className: 'mock-heading' },
  bodyFont: { variable: '--font-body', className: 'mock-body' },
}))

vi.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}))

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}))

describe('Root Layout', () => {
  it('renders the Header', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders the Footer', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders children between header and footer', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    )
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })

  it('wraps children in a main element', () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )
    expect(container.querySelector('main')).toBeInTheDocument()
  })

  it('includes skip-to-content link', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )
    const skipLink = screen.getByText(/skip to main content/i)
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('main element has the skip-link target id', () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )
    const main = container.querySelector('main')
    expect(main).toHaveAttribute('id', 'main-content')
  })
})
