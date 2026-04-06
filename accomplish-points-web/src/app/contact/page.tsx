import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a conversation with Mary Cook about your organization\'s strategic planning, facilitation, or leadership development needs. Based in Bend, Oregon.',
}

export default function ContactPage() {
  return (
    <main className="bg-brand-cream py-16 lg:py-24">
      <div className="mx-auto max-w-container px-4 sm:px-6">
        <SectionHeading level="h1" withRule>
          {"Let's Talk"}
        </SectionHeading>

        <div className="mt-10 grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <p className="text-body font-body text-body leading-relaxed">
              Every engagement starts with a conversation. Whether you have a specific challenge
              in mind or are exploring possibilities, I welcome the chance to learn about your
              situation.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <h2 className="text-body-sm font-body font-semibold uppercase tracking-widest text-body-muted">
                  Email
                </h2>
                <a
                  href="mailto:mary@accomplishpoints.com"
                  className="mt-1 inline-block text-body font-body text-brand-teal underline underline-offset-2 hover:text-brand-slate"
                >
                  mary@accomplishpoints.com
                </a>
              </div>

              <div>
                <h2 className="text-body-sm font-body font-semibold uppercase tracking-widest text-body-muted">
                  Location
                </h2>
                <p className="mt-1 text-body font-body text-brand-slate">Bend, Oregon</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
