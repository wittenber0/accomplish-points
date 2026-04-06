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

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`text-nav uppercase tracking-wide text-brand-slate hover:text-brand-teal transition-colors ${
              isActive ? 'border-b-2 border-brand-teal' : ''
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
