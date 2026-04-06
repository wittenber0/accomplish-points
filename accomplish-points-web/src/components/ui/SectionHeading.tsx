interface SectionHeadingProps {
  children: React.ReactNode
  level?: 'h1' | 'h2' | 'h3'
  withRule?: boolean
  className?: string
}

const levelStyles = {
  h1: 'text-h1 font-heading font-bold text-brand-slate',
  h2: 'text-h2 font-heading font-semibold text-brand-slate',
  h3: 'text-h3 font-heading font-semibold text-brand-slate',
}

export function SectionHeading({
  children,
  level = 'h1',
  withRule = false,
  className = '',
}: SectionHeadingProps) {
  const Tag = level

  return (
    <div>
      <Tag className={`${levelStyles[level]} ${className}`}>
        {children}
      </Tag>
      {withRule && (
        <div
          aria-hidden="true"
          className="mt-3 h-0.5 w-12 bg-brand-amber"
        />
      )}
    </div>
  )
}
