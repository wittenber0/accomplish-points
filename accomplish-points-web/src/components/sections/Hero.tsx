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
          <div
            data-testid="hero-image-placeholder"
            className="flex aspect-[4/3] items-center justify-center rounded bg-brand-stone"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
