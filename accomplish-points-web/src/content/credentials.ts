export interface Education {
  degree: string
  institution: string
  notes?: string
}

export interface Certification {
  name: string
  issuer: string
}

export interface Award {
  name: string
  description: string
}

export const education: Education[] = [
  {
    degree: 'Master of Arts in Urban Planning',
    institution: 'University of California, Los Angeles (UCLA)',
  },
  {
    degree: 'Bachelor of Arts in Political Science — Public Administration',
    institution: 'University of California, Los Angeles (UCLA)',
    notes: 'Geography minor',
  },
]

export const certifications: Certification[] = [
  {
    name: 'A.I.C.P. — American Institute of Certified Planners — 20+ years',
    issuer: 'American Planning Association',
  },
  {
    name: 'Change Management Certified (ADKAR model)',
    issuer: 'PROSCI',
  },
  {
    name: 'International Research Board Certification (I.R.B.)',
    issuer: 'Certified 2009',
  },
]

export const awards: Award[] = [
  {
    name: 'League of Oregon Cities Good Governance Award — Award for Excellence',
    description:
      'City of Molalla — Swanson Partners, LLC project team member for design and facilitation of innovative Social Services Summit.',
  },
  {
    name: 'Award of Excellence — Operation Listen',
    description:
      'Design and management of pilot project to better engage the community with Clackamas County. Cascade Chapter, International Association of Public Participation (IAP2).',
  },
]

export const affiliations: string[] = [
  'American Planning Association',
  'Special Districts Association of Oregon',
  'City Club of Portland',
]
