import { Button } from '@/components/ui/Button'

interface CallToActionProps {
  heading: string
  body: string
  buttonText: string
  buttonHref: string
}

export function CallToAction({ heading, body, buttonText, buttonHref }: CallToActionProps) {
  return (
    <section className="bg-brand-slate text-brand-cream py-14 lg:py-20 text-center">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
        <h2 className="font-heading text-h2 text-brand-cream">{heading}</h2>
        <p className="mx-auto mt-4 max-w-prose text-body text-brand-stone">{body}</p>
        <div className="mt-8">
          <Button href={buttonHref} variant="primary" className="bg-brand-amber text-brand-slate hover:bg-[#A8822E]">
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}
