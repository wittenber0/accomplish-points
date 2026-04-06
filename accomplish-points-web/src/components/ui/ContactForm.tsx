'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { submitContactForm } from '@/lib/actions'
import type { FormState } from '@/lib/actions'

function InputField({
  id,
  label,
  type = 'text',
  required = false,
  error,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-body-sm font-body text-brand-slate">
        {label}
        {!required && <span className="ml-1 text-body-muted">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded border px-3 py-2 font-body text-body-sm text-brand-slate transition-colors
          focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal
          ${error ? 'border-status-error' : 'border-border'}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-caption text-status-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [state, setState] = useState<FormState | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setState(null)

    const formData = new FormData(event.currentTarget)
    const result = await submitContactForm(formData)

    setState(result)
    setSubmitting(false)
  }

  if (state?.success && state.message) {
    return (
      <div className="rounded bg-white p-8 text-center">
        <p className="text-body font-body text-brand-slate">{state.message}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Contact form"
      role="form"
      className="space-y-5 rounded bg-white p-6 shadow-sm lg:p-8"
    >
      <InputField id="name" label="Name" required error={state?.errors?.name} />
      <InputField id="organization" label="Organization" />
      <InputField id="email" label="Email" type="email" required error={state?.errors?.email} />
      <InputField id="phone" label="Phone" type="tel" />

      <div>
        <label htmlFor="message" className="mb-1 block text-body-sm font-body text-brand-slate">
          How can I help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me briefly about your situation and what you are looking for."
          aria-describedby={state?.errors?.message ? 'message-error' : undefined}
          className={`w-full rounded border px-3 py-2 font-body text-body-sm text-brand-slate transition-colors
            focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal
            ${state?.errors?.message ? 'border-status-error' : 'border-border'}`}
        />
        {state?.errors?.message && (
          <p id="message-error" className="mt-1 text-caption text-status-error">
            {state.errors.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state?.errors?.form && (
        <p className="text-caption text-status-error">{state.errors.form}</p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
