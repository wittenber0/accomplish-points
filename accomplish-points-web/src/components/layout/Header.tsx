'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from './Navigation'
import { MobileNav } from './MobileNav'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-brand-cream border-b border-border transition-shadow duration-200">
      <div className="max-w-container mx-auto flex items-center justify-between px-6 h-16 lg:h-20">
        <Link
          href="/"
          className="font-heading text-lg lg:text-xl text-brand-slate font-semibold"
        >
          Accomplish Points
        </Link>

        <Navigation />

        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="lg:hidden text-brand-slate p-2 hover:text-brand-teal transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  )
}
