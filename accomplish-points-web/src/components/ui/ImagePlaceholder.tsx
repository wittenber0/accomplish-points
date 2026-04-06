type ImagePlaceholderProps = {
  alt: string
  label?: string
  aspectRatio?: 'portrait' | 'square' | 'landscape' | 'og'
  className?: string
}

const aspectClasses = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  og: 'aspect-[1200/630]',
}

export function ImagePlaceholder({
  alt,
  label,
  aspectRatio = 'portrait',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      data-testid="image-placeholder"
      role="img"
      aria-label={alt}
      className={`bg-brand-stone border border-border flex items-center justify-center ${aspectClasses[aspectRatio]} ${className}`}
    >
      {label && (
        <span className="text-brand-teal font-heading text-h4 text-center px-4">
          {label}
        </span>
      )}
    </div>
  )
}
