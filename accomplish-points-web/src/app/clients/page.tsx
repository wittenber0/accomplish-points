import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { CallToAction } from '@/components/sections/CallToAction'
import { clientCategories } from '@/content/clients'
import { testimonials } from '@/content/testimonials'
import { awards } from '@/content/credentials'

export const metadata: Metadata = {
  title: 'Clients & Testimonials',
  description:
    'Trusted by Oregon public service organizations including OSU, Clackamas County, and municipalities. Read testimonials from government and university leaders.',
}

export default function ClientsPage() {
  return (
    <>
      {/* Section 1: Clients */}
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

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {clientCategories.map((category) => (
              <div key={category.name}>
                <SectionHeading level="h2">{category.name}</SectionHeading>
                <ul className="mt-4 space-y-2">
                  {category.clients.map((client) => (
                    <li key={client.name} className="text-body leading-relaxed">
                      <span className="font-medium">{client.name}</span>
                      {client.context && (
                        <span className="text-body-sm text-body-muted">
                          {' '}
                          — {client.context}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Testimonials */}
      <section className="bg-brand-stone py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            What Clients Say
          </SectionHeading>
          <div className="mt-10 space-y-10">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                organization={testimonial.organization}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Awards & Recognition */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            Awards &amp; Recognition
          </SectionHeading>
          <div className="mt-10 space-y-8">
            {awards.map((award) => (
              <div key={award.name}>
                <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                  {award.name}
                </h3>
                <p className="mt-2 text-body leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
            <div>
              <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                Conference Speaking
              </h3>
              <p className="mt-2 text-body leading-relaxed">
                &ldquo;Getting The Most Out of Your Planning Process&rdquo; —
                presented at professional conferences on effective facilitation
                and stakeholder engagement strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA */}
      <CallToAction
        heading="Ready to Partner with Us?"
        body="Let us help your organization achieve meaningful results through expert facilitation and strategic planning."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  )
}
