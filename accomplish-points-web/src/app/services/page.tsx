import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CredentialBadge } from '@/components/ui/CredentialBadge'
import { CallToAction } from '@/components/sections/CallToAction'
import { engagementModels } from '@/content/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Leadership coaching, facilitation, strategic planning, and project management for public service organizations and government agencies.',
}

interface SignatureService {
  id: string
  title: string
  brandCallout?: string
  description: string
  bullets: string[]
}

interface AdditionalService {
  id: string
  title: string
  brandCallout?: string
  description: string
  bullets: string[]
}

const signatureServices: SignatureService[] = [
  {
    id: 'leadership-coaching',
    title: 'Leadership Development and Coaching',
    description:
      'A dedicated Thought Partnership for your development and decision-making. Strategic counsel helps you refine your thinking, align your team, and move confidently toward your goals.',
    bullets: [
      'Trusted advisory for leaders navigating complex decisions',
      'DISC personality assessments with applied results',
      'Confidential, customized counsel from new managers to senior executives',
    ],
  },
  {
    id: 'meeting-facilitation',
    title: 'Meeting Design and Facilitation',
    brandCallout: 'Meetings with Mary',
    description:
      'Every gathering is designed for productive outcomes and meaningful participation, from conference-scale sessions to intimate retreats.',
    bullets: [
      'Award-winning facilitation across government and university settings',
      'Agenda design, stakeholder interviews, and public workshops',
      'Change management facilitation from incremental to transformational',
    ],
  },
  {
    id: 'project-management',
    title: 'Project Development and Management',
    description:
      'Move from initial ideas to clarified programs with detailed scopes of work, focused stakeholder involvement, and disciplined time and budget management.',
    bullets: [
      'Develop initial ideas into clarified programs and projects',
      'Stakeholder and agency involvement with resource identification',
      'Time and budget tracking with regular briefings',
    ],
  },
]

const additionalServices: AdditionalService[] = [
  {
    id: 'planning-policy',
    title: 'Plan and Policy Making',
    description:
      'Expert support for creating new frameworks or updating existing ones, paired with technical planning assistance and community engagement.',
    bullets: [
      'Fiscal analysis, tradeoffs, and alternatives with metrics',
      'Guidance through bureaucratic and community processes',
    ],
  },
  {
    id: 'written-deliverables',
    title: 'Written Deliverables',
    brandCallout: 'Reports for USE, not the shelf',
    description:
      'Documentation that is fully vetted, strategically designed, and ready for use across your organization and community.',
    bullets: [
      'Plans, reports, policies, and strategic communications',
      'Materials for web, social media, and multi-channel outreach',
    ],
  },
  {
    id: 'interagency-coordination',
    title: 'Interagency and Public Coordination',
    description:
      'Build and maintain the strategic alliances and community relationships essential to your mission.',
    bullets: [
      'Public policy alternative development and strategy',
      'Interagency agreements, letters of intent, and representation',
    ],
  },
  {
    id: 'communication-strategies',
    title: 'Communication Strategies',
    description:
      'Strategic communications support for stakeholder processes and multi-channel outreach.',
    bullets: [
      'Stakeholder interviews, focus groups, task forces, and workshops',
      'Materials production for multiple audiences',
    ],
  },
]

const engagementBenefits: Record<string, string[]> = {
  'External Consultant': [
    'Fresh perspective and candor that facilitates evolution and change',
    'Agility to re-imagine outside the constraints of an in-house role',
    'Specific change and growth targets more directly available',
  ],
  'Internal Staff (Interim / Part-Time)': [
    'Embedded alignment with your staff and leaders',
    'Empowered delivery within your organizational framework',
    'Continuity and institutional knowledge development',
  ],
}

const specialtyLabels = [
  'Urban and Rural Planning',
  'Real Estate Analysis',
  'Natural Resources',
  'Parks and Recreation',
  'Agriculture',
  'Transportation',
  'Libraries',
  'Community Engagement',
  'Decision Making',
  'Organizational Development',
  'Scenario Analysis',
  'Budget Analysis',
  'Governance and Management',
  'Program Design and Implementation',
]

export default function ServicesPage() {
  return (
    <>
      {/* Section 1: Hero */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeading level="h1" withRule>
                Services
              </SectionHeading>
              <p className="mt-6 max-w-prose text-body text-brand-slate/80">
                All services are customized and scoped for each client. Whether
                navigating complex multi-stakeholder processes or focused
                single-issue engagements, every partnership begins with
                understanding your needs, your people, and your goals.
              </p>
              <p className="mt-4 text-body font-medium text-brand-teal">
                Mary brings a rare combination of people skills, certified
                planning expertise, and public-private sector fluency to every
                engagement.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded">
              <Image
                src="/images/work/indoor-session.jpg"
                alt="Working session with participants collaborating at a conference table"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Engagement Models */}
      <section className="bg-brand-stone py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            How We Work Together
          </SectionHeading>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {engagementModels.map((model) => (
              <div
                key={model.title}
                className="rounded-lg border border-border bg-white p-8"
              >
                <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                  {model.title === 'External Consultant'
                    ? 'As Your Consultant'
                    : 'As Your Staff'}
                </h3>
                <p className="mt-3 text-body text-brand-slate/80">
                  {model.description}
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-body-sm text-brand-slate/70 marker:text-brand-teal">
                  {engagementBenefits[model.title]?.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Signature Services */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            What We Deliver
          </SectionHeading>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {signatureServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 rounded-lg border border-border border-t-[3px] border-t-brand-teal bg-brand-cream p-8"
              >
                <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                  {service.title}
                </h3>
                {service.brandCallout && (
                  <p className="mt-1 text-body-sm font-semibold uppercase tracking-wide text-brand-teal">
                    {service.brandCallout}
                  </p>
                )}
                <p className="mt-3 text-body text-brand-slate/80">
                  {service.description}
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-body-sm text-brand-slate/70 marker:text-brand-teal">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Additional Services */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <div className="grid gap-6 md:grid-cols-2">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 rounded-lg border border-border bg-white p-6"
              >
                <h3 className="font-heading text-h4 font-semibold text-brand-slate">
                  {service.title}
                </h3>
                {service.brandCallout && (
                  <p className="mt-1 text-caption font-semibold uppercase tracking-wide text-brand-teal">
                    {service.brandCallout}
                  </p>
                )}
                <p className="mt-2 text-body-sm text-brand-slate/80">
                  {service.description}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-body-sm text-brand-slate/70 marker:text-brand-teal">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Areas of Specialty */}
      <section className="bg-brand-stone py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            Areas of Specialty
          </SectionHeading>
          <p className="mt-4 mb-6 text-body text-brand-slate/80">
            Deep expertise spanning public and private sectors across these
            disciplines
          </p>
          <div className="flex flex-wrap gap-3">
            {specialtyLabels.map((area) => (
              <CredentialBadge key={area} label={area} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <CallToAction
        heading="Ready to Start a Conversation"
        body="Every engagement begins with understanding your needs. Reach out to explore how we can work together."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  )
}
