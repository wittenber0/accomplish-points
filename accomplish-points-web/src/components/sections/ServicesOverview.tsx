import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { serviceGroupings } from '@/content/services'

export function ServicesOverview() {
  return (
    <section className="bg-brand-stone py-14 lg:py-20">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
        <SectionHeading level="h2" withRule>
          How I Work With You
        </SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {serviceGroupings.map((group) => (
            <ServiceCard
              key={group.title}
              title={group.title}
              description={group.description}
              href={group.href}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-body font-semibold text-brand-teal hover:text-brand-slate transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
