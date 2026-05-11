import { CredentialBadge } from '@/components/ui/CredentialBadge'

const credentialLabels = [
  'AICP',
  'PROSCI Change Management',
  'UCLA Graduate Training',
  'Certified Women Business Enterprise (WBE)',
  '25+ Years Experience',
]

export function CredentialsBar() {
  return (
    <section className="bg-brand-stone py-8 lg:py-10">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {credentialLabels.map((label) => (
            <CredentialBadge key={label} label={label} />
          ))}
        </div>
      </div>
    </section>
  )
}
