interface TestimonialCardProps {
  quote: string
  name: string
  title?: string
  organization?: string
  variant?: 'default' | 'featured'
}

export function TestimonialCard({
  quote,
  name,
  title,
  organization,
  variant = 'default',
}: TestimonialCardProps) {
  return (
    <blockquote
      className={`border-l-[3px] border-brand-amber pl-6 py-2 ${
        variant === 'featured' ? 'lg:col-span-2' : ''
      }`}
    >
      <p
        className={`italic leading-relaxed ${
          variant === 'featured' ? 'text-body' : 'text-body-sm'
        }`}
      >
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
