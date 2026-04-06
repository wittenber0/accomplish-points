interface CredentialBadgeProps {
  label: string
}

export function CredentialBadge({ label }: CredentialBadgeProps) {
  return (
    <span className="inline-block rounded-sm border border-border bg-brand-stone px-3 py-1 text-sm text-brand-slate">
      {label}
    </span>
  )
}
