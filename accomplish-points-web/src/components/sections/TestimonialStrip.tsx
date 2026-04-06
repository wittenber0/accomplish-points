import Link from 'next/link'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { testimonials } from '@/content/testimonials'

export function TestimonialStrip() {
  const featured = testimonials[0]

  return (
    <section className="bg-brand-cream py-14 lg:py-20">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
        <TestimonialCard
          quote={featured.quote}
          name={featured.name}
          title={featured.title}
          organization={featured.organization}
        />
        <div className="mt-8">
          <Link
            href="/clients"
            className="text-body font-semibold text-brand-teal hover:text-brand-slate transition-colors"
          >
            See more from our clients
          </Link>
        </div>
      </div>
    </section>
  )
}
