import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CredentialBadge } from '@/components/ui/CredentialBadge'
import { CallToAction } from '@/components/sections/CallToAction'
import { services, engagementModels, specialtyAreas } from '@/content/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Leadership coaching, meeting facilitation, strategic planning, project management, and policy development — customized for public service organizations, government agencies, and community leaders.',
}

const serviceAnchors: Record<string, string> = {
  'leadership-development': 'leadership-coaching',
  coaching: 'leadership-coaching',
  'meeting-facilitation': 'meeting-facilitation',
  'project-management': 'project-management',
  'plan-policy': 'planning-policy',
  'written-deliverables': 'written-deliverables',
  'coordination-communication': 'interagency-coordination',
}

export default function ServicesPage() {
  return (
    <>
      {/* Section 1: Overview */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
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
            {services.map((service) => {
              const anchor = serviceAnchors[service.id] ?? service.id
              return (
                <div
                  key={service.id}
                  id={anchor}
                  className="scroll-mt-24 py-10 first:pt-0 last:pb-0"
                >
                  <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-body text-brand-slate/80">
                    {service.description}
                  </p>
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-body text-brand-slate/70">
                    {service.offerings.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
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
            {specialtyAreas.map((area) => (
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
