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
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-10 lg:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Business info */}
          <div className="shrink-0">
            <p className="font-heading text-h4 text-brand-cream">
              Accomplish Points Consulting
            </p>
            <p className="mt-2 text-body-sm text-brand-stone">Bend, Oregon</p>
            <p className="mt-1 text-caption text-brand-stone">
              Certified Women Business Enterprise, State of Oregon
            </p>
          </div>

          {/* Navigation + Contact — right-aligned cluster */}
          <div className="flex flex-col items-start gap-6 md:items-end">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
            <a
              href="mailto:mary@accomplishpoints.com"
              className="text-body-sm text-brand-stone hover:text-brand-cream transition-colors"
            >
              mary@accomplishpoints.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-brand-cream/15 pt-6">
          <p className="text-caption text-brand-stone/60">
            &copy; {new Date().getFullYear()} Accomplish Points Consulting. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
