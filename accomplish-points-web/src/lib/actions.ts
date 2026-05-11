'use server'

import { Resend } from 'resend'

export interface FormState {
  success: boolean
  errors?: Record<string, string>
  message?: string
}

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitContactForm(formData: FormData): Promise<FormState> {
  const honeypot = formData.get('website') as string | null

  // Silently accept honeypot submissions to not alert bots
  if (honeypot) {
    return { success: true }
  }

  const rawName = (formData.get('name') as string) ?? ''
  const rawEmail = (formData.get('email') as string) ?? ''
  const rawOrganization = (formData.get('organization') as string) ?? ''
  const rawPhone = (formData.get('phone') as string) ?? ''
  const rawMessage = (formData.get('message') as string) ?? ''

  const name = sanitize(rawName)
  const email = sanitize(rawEmail)
  const organization = sanitize(rawOrganization)
  const phone = sanitize(rawPhone)
  const message = sanitize(rawMessage)

  const errors: Record<string, string> = {}

  if (!name) {
    errors.name = 'Name is required.'
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!message) {
    errors.message = 'Message is required.'
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return {
      success: false,
      errors: {
        form: 'Email delivery is not configured yet. Please email mary@accomplishpoints.com directly.',
      },
    }
  }

  try {
    const resend = new Resend(apiKey)
    const toEmail = process.env.CONTACT_EMAIL_TO ?? 'mary@accomplishpoints.com'

    await resend.emails.send({
      from: 'Accomplish Points <noreply@accomplishpoints.com>',
      to: [toEmail],
      subject: `Contact form: ${name}`,
      text: [
        `Name: ${name}`,
        organization ? `Organization: ${organization}` : null,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        '',
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return { success: true, message: 'Thank you. I will be in touch soon.' }
  } catch {
    return {
      success: false,
      errors: { form: 'Something went wrong. Please try again or email directly.' },
    }
  }
}
