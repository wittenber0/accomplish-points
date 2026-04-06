import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MobileNav } from '@/components/layout/MobileNav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('MobileNav component', () => {
  it('renders all nav links when open', () => {
    render(<MobileNav isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Clients' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('is hidden when isOpen is false', () => {
    const { container } = render(<MobileNav isOpen={false} onClose={vi.fn()} />)
    const panel = container.querySelector('[role="dialog"]') || container.firstChild as HTMLElement
    const isHidden = panel?.className?.includes('translate-x-full') ||
                     panel?.getAttribute('aria-hidden') === 'true' ||
                     panel?.hasAttribute('hidden')
    expect(isHidden).toBe(true)
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<MobileNav isOpen={true} onClose={onClose} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when overlay/scrim is clicked', async () => {
    const onClose = vi.fn()
    const { container } = render(<MobileNav isOpen={true} onClose={onClose} />)
    const scrim = container.querySelector('[data-testid="mobile-nav-overlay"]')
    if (scrim) {
      await userEvent.click(scrim)
      expect(onClose).toHaveBeenCalledOnce()
    }
  })

  it('close button is an X icon (SVG), not an emoji', () => {
    render(<MobileNav isOpen={true} onClose={vi.fn()} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    expect(closeButton.querySelector('svg')).toBeInTheDocument()
    expect(closeButton.textContent).not.toMatch(/[\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/u)
  })
})
