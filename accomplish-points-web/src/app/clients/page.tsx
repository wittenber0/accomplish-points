import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { CallToAction } from '@/components/sections/CallToAction'
import { clientCategories } from '@/content/clients'
import type { Client } from '@/content/clients'
import { testimonials } from '@/content/testimonials'
import { awards } from '@/content/credentials'

export const metadata: Metadata = {
  title: 'Clients & Testimonials',
  description:
    'Trusted by Oregon public service organizations including OSU, Clackamas County, and municipalities. Read testimonials from government and university leaders.',
}

const trustStats = [
  { value: '25+ Years', label: 'of partnership' },
  { value: '20+ Organizations', label: 'served' },
  { value: '4 Sectors', label: 'of public service' },
]

function shouldShowContext(categoryName: string, client: Client): boolean {
  if (!client.context) return false
  const normalizedCategory = categoryName.toLowerCase()
  const normalizedContext = client.context.toLowerCase()
  if (normalizedContext === normalizedCategory) return false
  if (normalizedCategory.includes(normalizedContext)) return false
  if (normalizedContext.includes(normalizedCategory)) return false
  return true
}

export default function ClientsPage() {
  const [featured, ...rest] = testimonials

  return (
    <>
      {/* Section 1: Hero */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeading level="h1" withRule>
                Clients &amp; Testimonials
              </SectionHeading>
              <p className="mt-6 max-w-prose text-body leading-relaxed">
                Mary has partnered with public service organizations,
                universities, cities, counties, and special districts for over
                25 years.
              </p>

              {/* Trust stats */}
              <div className="mt-8 flex gap-6">
                {trustStats.map((stat, i) => (
                  <div
                    key={stat.value}
                    className={
                      i < trustStats.length - 1
                        ? 'border-r border-border pr-6'
                        : ''
                    }
                  >
                    <p className="font-heading text-h4 font-semibold text-brand-teal">
                      {stat.value}
                    </p>
                    <p className="text-caption text-body-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[3/2] overflow-hidden rounded">
              <Image
                src="/images/work/outdoor-retreat.jpg"
                alt="Outdoor retreat setting with participants collaborating at a picnic table in the Oregon hills"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Client Categories */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            Organizations We Have Served
          </SectionHeading>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {clientCategories.map((category) => (
              <div
                key={category.name}
                className="rounded-lg border border-border border-l-[3px] border-l-brand-amber bg-brand-cream p-6"
              >
                <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                  {category.name}
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {category.clients.map((client) => {
                    const showContext = shouldShowContext(
                      category.name,
                      client
                    )
                    return (
                      <li
                        key={client.name}
                        className="text-body-sm leading-relaxed"
                      >
                        <span className="font-medium">{client.name}</span>
                        {showContext && client.context && (
                          <span className="text-caption text-body-muted">
                            {' '}
                            &mdash; {client.context}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Testimonials */}
      <section className="bg-brand-stone py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            What Clients Say
          </SectionHeading>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <TestimonialCard
              key={featured.name}
              quote={featured.quote}
              name={featured.name}
              title={featured.title}
              organization={featured.organization}
              variant="featured"
            />
            {rest.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                organization={testimonial.organization}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Awards & Recognition */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            Awards &amp; Recognition
          </SectionHeading>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {awards.map((award) => (
              <div
                key={award.name}
                className="rounded-lg border border-border border-l-[3px] border-l-brand-amber bg-white p-6"
              >
                <h3 className="font-heading text-h4 font-semibold text-brand-slate">
                  {award.name}
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-border bg-white p-6">
            <h3 className="font-heading text-h4 font-semibold text-brand-slate">
              Conference Speaking
            </h3>
            <p className="mt-2 text-body-sm leading-relaxed">
              &ldquo;Getting The Most Out of Your Planning Process&rdquo; —
              presented at professional conferences on effective facilitation
              and stakeholder engagement strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <CallToAction
        heading="Ready to Partner with Us?"
        body="Let us help your organization achieve meaningful results through expert facilitation and strategic planning."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  )
}
