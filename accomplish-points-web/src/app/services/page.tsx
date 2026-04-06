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

interface ServiceCategory {
  id: string
  title: string
  description: string
  highlights: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'leadership-coaching',
    title: 'Leadership Development and Coaching',
    description:
      'You gain a dedicated Thought Partnership for your development and decision-making. Strategic counsel helps you refine your thinking, align your team, and move confidently toward your goals.',
    highlights: [
      'Trusted advisory for leaders navigating complex decisions',
      'Strategy and framework design for decision-making and action',
      'DISC personality assessments with applied results',
      'Support at every level, from new managers to senior executives',
      'Confidential, customized counsel for career transitions and growth',
    ],
  },
  {
    id: 'meeting-facilitation',
    title: 'Meeting Design and Facilitation \u2014 Meetings with Mary',
    description:
      'Every gathering is designed for productive outcomes and meaningful participation. From conference-scale sessions to intimate retreats, meetings deliver results.',
    highlights: [
      'Facilitation, agenda design, and goal-setting',
      'Stakeholder interviews, focus groups, and public workshops',
      'Conference-scale sessions and multi-day retreats',
      'Change management facilitation across all formats',
    ],
  },
  {
    id: 'project-management',
    title: 'Project Development and Management',
    description:
      'You move from initial ideas to clarified programs with detailed scopes of work. Projects stay on track with focused content, appropriate stakeholder involvement, and disciplined time and budget management.',
    highlights: [
      'Develop initial ideas into clarified programs or projects',
      'Detailed scopes of work and project scheduling',
      'Stakeholder and agency involvement with resource identification',
      'Time and budget tracking with regular briefings',
    ],
  },
  {
    id: 'planning-policy',
    title: 'Plan and Policy Making',
    description:
      'Expert support for creating new frameworks or updating existing ones, paired with coordination of allied professionals and community engagement.',
    highlights: [
      'Create new or update existing organizational and public service policies',
      'Technical assistance including reports and permit applications',
      'Coordination with allied professionals to accomplish goals',
      'Fiscal analysis, tradeoffs, and alternatives with metrics',
      'Guidance through bureaucratic and community processes',
    ],
  },
  {
    id: 'written-deliverables',
    title: 'Written Deliverables \u2014 Reports for USE, not the shelf',
    description:
      'You get documentation that is fully vetted, strategically designed, and ready for use across your organization and community. Materials are customized for multi-channel communication needs.',
    highlights: [
      'Reports, policies, and summaries ready for immediate use',
      'Materials for web, social media, and electronic communications',
      'Strategic communications and talking points',
      'Content developed collaboratively with your team',
    ],
  },
  {
    id: 'interagency-coordination',
    title: 'Interagency and Public Coordination',
    description:
      'You build and maintain the strategic alliances and community relationships essential to your mission. Coordination is managed with clarity and purpose.',
    highlights: [
      'Build and maintain strategic alliances and positive relationships',
      'Public policy alternative development and strategy',
      'Interagency materials including letters of intent and agreements',
      'Stakeholder interviews, focus groups, and task forces',
    ],
  },
  {
    id: 'communication-strategies',
    title: 'Communication Strategies',
    description:
      'Strategic communications support for stakeholder processes, materials production, and multi-channel outreach.',
    highlights: [
      'Stakeholder process design and management',
      'Materials production for multiple audiences',
      'Multi-channel outreach coordination',
    ],
  },
]

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
      {/* Section 1: Overview */}
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
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {engagementModels.map((model) => (
              <div key={model.title}>
                <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                  {model.title === 'External Consultant'
                    ? 'As Your Consultant'
                    : 'As Your Staff'}
                </h3>
                <p className="mt-3 text-body text-brand-slate/80">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Service Categories */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            What We Deliver
          </SectionHeading>
          <div className="mt-10 divide-y divide-brand-slate/10">
            {serviceCategories.map((category) => (
              <div
                key={category.id}
                id={category.id}
                className="scroll-mt-24 py-10 first:pt-0 last:pb-0"
              >
                <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                  {category.title}
                </h3>
                <p className="mt-3 max-w-prose text-body text-brand-slate/80">
                  {category.description}
                </p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body text-brand-slate/70">
                  {category.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Areas of Specialty */}
      <section className="bg-brand-stone py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            Areas of Specialty
          </SectionHeading>
          <div className="mt-8 flex flex-wrap gap-3">
            {specialtyLabels.map((area) => (
              <CredentialBadge key={area} label={area} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <CallToAction
        heading="Ready to Start a Conversation"
        body="Every engagement begins with understanding your needs. Reach out to explore how we can work together."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  )
}
