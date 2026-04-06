import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="bg-brand-cream py-14 lg:py-20">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 text-center">
        <SectionHeading level="h1">Page not found</SectionHeading>
        <p className="mt-6 text-body text-body-muted max-w-prose mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Button variant="primary" href="/">Return to Home</Button>
        </div>
      </div>
    </section>
  )
}
