import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  href?: string
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <div className="rounded border border-border bg-brand-cream p-8">
      <h3 className="font-heading text-h4 text-brand-slate">{title}</h3>
      <p className="mt-3 text-body text-body-muted">{description}</p>
      {href && (
        <Link
          href={href}
          className="mt-4 inline-block text-body-sm font-semibold text-brand-teal hover:text-brand-slate transition-colors"
        >
          Learn more
        </Link>
      )}
    </div>
  )
}
