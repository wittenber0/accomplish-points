interface TestimonialCardProps {
  quote: string
  name: string
  title?: string
  organization?: string
}

export function TestimonialCard({ quote, name, title, organization }: TestimonialCardProps) {
  return (
    <blockquote className="border-l-[3px] border-brand-amber pl-6 py-2">
      <p className="italic text-body leading-relaxed">
        {quote}
      </p>
      <footer className="mt-4">
        <span className="font-semibold text-brand-slate">{name}</span>
        {(title || organization) && (
          <span className="block text-body-sm text-body-muted">
            {[title, organization].filter(Boolean).join(', ')}
          </span>
        )}
      </footer>
    </blockquote>
  )
}
