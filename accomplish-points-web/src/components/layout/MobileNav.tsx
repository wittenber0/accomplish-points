'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          data-testid="mobile-nav-overlay"
          onClick={onClose}
        />
      )}

      <div
        role="dialog"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 h-full w-72 bg-brand-cream z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-brand-slate p-2 hover:text-brand-teal transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-4">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`text-lg py-3 font-body transition-colors ${
                  isActive
                    ? 'text-brand-teal font-semibold'
                    : 'text-brand-slate hover:text-brand-teal'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
