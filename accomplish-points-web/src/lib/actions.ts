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
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Accomplish Points <onboarding@resend.dev>'

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
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

    if (error) {
      console.error('Resend email send failed', error)

      return {
        success: false,
        errors: {
          form: 'Message could not be sent. Please email mary@accomplishpoints.com directly.',
        },
      }
    }

    return { success: true, message: 'Thank you. I will be in touch soon.' }
  } catch (error) {
    console.error('Unexpected contact form send failure', error)

    return {
      success: false,
      errors: { form: 'Something went wrong. Please try again or email directly.' },
    }
  }
}
