import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    template: '%s | Accomplish Points Consulting',
    default: 'Accomplish Points Consulting — Strategic Planning & Leadership Consulting',
  },
  description:
    'Mary Cook partners with public service organizations, government agencies, and leaders to accomplish what matters most. 25+ years of experience in strategic planning, facilitation, and organizational development in Oregon.',
  metadataBase: new URL('https://accomplishpoints.com'),
}

export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Accomplish Points Consulting',
    description:
      'Strategic planning, leadership consulting, and facilitation services for public service organizations, government agencies, and community leaders in Oregon.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bend',
      addressRegion: 'OR',
      addressCountry: 'US',
    },
    url: 'https://accomplishpoints.com',
    email: 'mary@accomplishpoints.com',
    founder: {
      '@type': 'Person',
      name: 'Mary Cook',
      jobTitle: 'Principal Consultant',
    },
    areaServed: {
      '@type': 'State',
      name: 'Oregon',
    },
  }
}
