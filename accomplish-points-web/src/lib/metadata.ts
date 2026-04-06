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
