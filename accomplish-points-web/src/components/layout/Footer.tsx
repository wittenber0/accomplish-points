import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-brand-slate text-brand-cream">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Column 1: Business info */}
          <div>
            <p className="font-heading text-h4 text-brand-cream">Accomplish Points Consulting</p>
            <p className="mt-2 text-body-sm text-brand-stone">Bend, Oregon</p>
            <p className="mt-1 text-caption text-brand-stone">
              Certified Women Business Enterprise, State of Oregon
            </p>
          </div>

          {/* Column 2: Quick links */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-brand-stone hover:text-brand-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact */}
          <div>
            <p className="text-body-sm text-brand-stone">
              <a href="mailto:mary@accomplishpoints.com" className="hover:text-brand-cream transition-colors">
                mary@accomplishpoints.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-brand-sage pt-6">
          <p className="text-caption text-body-muted">
            &copy; {new Date().getFullYear()} Accomplish Points Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
