import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="bg-brand-cream py-14 lg:py-24">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">
              Accomplish Points Consulting
            </p>
            <h1 className="mt-4 font-heading text-h1 font-bold text-brand-slate">
              Accomplish what is most important.
            </h1>
            <p className="mt-6 max-w-prose text-body text-body-muted">
              Strategic planning, leadership coaching, and public service
              consulting to help you and your organization move forward with
              clarity and purpose.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                Start a Conversation
              </Button>
              <Button href="/services" variant="secondary">
                Explore Services
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/images/headshots/mary-cook-pro-blue.jpeg"
              alt="Mary Cook in an outdoor setting along the river in Oregon"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
