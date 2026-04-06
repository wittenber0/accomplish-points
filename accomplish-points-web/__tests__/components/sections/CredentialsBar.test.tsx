import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CredentialsBar } from '@/components/sections/CredentialsBar'

describe('CredentialsBar section', () => {
  it('renders AICP credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/AICP/)).toBeInTheDocument()
  })

  it('renders PROSCI credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/PROSCI|Change Management/)).toBeInTheDocument()
  })

  it('renders UCLA credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/UCLA/)).toBeInTheDocument()
  })

  it('renders WBE credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/WBE/i)).toBeInTheDocument()
  })

  it('renders experience credential', () => {
    render(<CredentialsBar />)
    expect(screen.getByText(/25\+/)).toBeInTheDocument()
  })

  it('has stone background', () => {
    const { container } = render(<CredentialsBar />)
    expect(container.firstChild).toHaveClass('bg-brand-stone')
  })

  it('does not render section headings', () => {
    const { container } = render(<CredentialsBar />)
    expect(container.querySelector('h2')).not.toBeInTheDocument()
    expect(container.querySelector('h3')).not.toBeInTheDocument()
  })
})
