import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CredentialBadge } from '@/components/ui/CredentialBadge'
import { CallToAction } from '@/components/sections/CallToAction'
import { education, certifications } from '@/content/credentials'

export const metadata: Metadata = {
  title: 'About Mary Cook',
  description:
    'AICP-certified planner with 25+ years in strategic planning, facilitation, and organizational development for public service organizations.',
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero / Intro */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading level="h1" withRule>
                About Mary Cook
              </SectionHeading>

              <div className="mt-8 space-y-5 text-body leading-relaxed text-brand-slate">
                <p>
                  Accomplish Points Consulting is dedicated to re-imagining and
                  rebuilding civic participation, partnerships, and public
                  service. Founded by Mary Cook, the firm brings a
                  people-centered approach to every project, grounded in decades
                  of experience across both the public and private sectors.
                </p>
                <p>
                  Mary brings consensus building, process design, project
                  management, and entrepreneurial energy to every engagement.
                  Whether serving as an external consultant or included as staff,
                  she meets organizations where they are and helps them move
                  forward with clarity and purpose.
                </p>
                <p>
                  Based in Bend, Oregon, Accomplish Points works with
                  municipalities, special districts, and mission-driven
                  organizations throughout the Pacific Northwest and beyond.
                </p>
              </div>
            </div>

            <div className="flex items-start justify-center">
              <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded">
                <Image
                  src="/images/headshots/TPark_8286_033126.jpg"
                  alt="Portrait of Mary Cook, consulting professional"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 384px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="bg-brand-stone py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            A Career in Service
          </SectionHeading>

          <div className="mt-8 space-y-5 text-body leading-relaxed text-brand-slate">
            <p>
              Mary Cook is a first-generation college graduate who earned both a
              Bachelor of Arts in Political Science and a Master of Arts in
              Urban Planning from UCLA. Her academic foundation in public
              administration and urban/rural systems set the stage for a career
              dedicated to strengthening people and communities.
            </p>
            <p>
              She began her career in the private sector, specializing in land
              use economics and market analyses. It was during this early work
              that she discovered her passion for the art and discipline of meetings — the
              craft of bringing diverse stakeholders together to find common
              ground and move toward shared goals.
            </p>
            <p>
              Mary spent approximately seventeen years at Clackamas County,
              serving as a Senior Planner across six divisions. During this
              time she earned her AICP national certification, became Change Management
              Certified through PROSCI, and led award-winning public
              involvement initiatives that set new standards for community
              engagement.
            </p>
            <p>
              Following her public sector tenure, Mary founded Swanson
              Partners, LLC, an independent consultancy operating under the
              motto &ldquo;Your Partner in Service.&rdquo; The firm delivered
              facilitation, strategic planning, and organizational development
              services to public agencies across Oregon.
            </p>
            <p>
              Today, Mary leads Accomplish Points Consulting from Bend, Oregon,
              continuing the mission she has pursued throughout her career:
              helping public service organizations accomplish more for the
              communities they serve.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-brand-cream py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            Credentials
          </SectionHeading>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Education */}
            <div>
              <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                Education
              </h3>
              <ul className="mt-4 space-y-3">
                {education.map((edu) => (
                  <li key={edu.degree}>
                    <p className="text-body font-medium text-brand-slate">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-brand-slate/70">
                      {edu.institution}
                      {edu.notes ? ` — ${edu.notes}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                Certifications
              </h3>
              <ul className="mt-4 space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <CredentialBadge label={cert.name} />
                    <p className="mt-1 text-sm text-brand-slate/70">
                      {cert.issuer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded border border-brand-amber/30 bg-brand-amber/10 px-6 py-4">
            <p className="text-body text-brand-slate">
              Certified Women Business Enterprise (WBE), State of Oregon (No.
              5490)
            </p>
          </div>
        </div>
      </section>

      {/* The Intersection */}
      <section className="bg-brand-stone py-14 lg:py-20">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
          <SectionHeading level="h2" withRule>
            People. Planning. Economics.
          </SectionHeading>

          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <div>
              <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                People
              </h3>
              <p className="mt-3 text-body leading-relaxed text-brand-slate">
                Emotionally intelligent leadership grounded in empathy and
                adaptability. Mary is Change Management Certified and brings a
                facilitative approach to every stakeholder interaction,
                building trust and sustaining momentum through complex
                processes.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                Planning
              </h3>
              <p className="mt-3 text-body leading-relaxed text-brand-slate">
                A nationally certified planner (AICP) with award-winning
                process design skills, trained at UCLA and refined through
                decades of practice. Mary designs engagement processes that
                produce actionable plans grounded in community input.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-h3 font-semibold text-brand-slate">
                Economics
              </h3>
              <p className="mt-3 text-body leading-relaxed text-brand-slate">
                Fluent in public and private sector dynamics, fiscal analysis,
                and practical innovation. Mary translates economic realities
                into clear strategies that help organizations allocate
                resources effectively and deliver measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CallToAction
        heading="Start a Conversation"
        body="Whether you need strategic planning, facilitation, or organizational development support, Mary is ready to help your organization accomplish more."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </main>
  )
}
