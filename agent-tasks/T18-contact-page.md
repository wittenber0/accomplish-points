# T18 — Contact Page

## Phase
4 — Pages

## Dependencies
- **T05** — Button component
- **T06** — SectionHeading component
- **T13** — Root layout

## Objective
Build the Contact page with a two-column layout: direct contact info on the left and a functional contact form on the right. The form uses a Next.js Server Action to send email via Resend. Includes server-side validation, honeypot spam protection, and rate limiting.

## Files to Reference
- `agent-tasks/README.md` — Full design system, including form functional colors (success #3D7A5F, error #A13D2D)

## Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a conversation with Mary Cook about your organization\'s strategic planning, facilitation, or leadership development needs. Based in Bend, Oregon.',
}
```

## Files to Create

1. `src/app/contact/page.tsx`
2. `src/components/ui/ContactForm.tsx`
3. `src/lib/actions.ts` — Server action for form submission
4. `__tests__/pages/contact.test.tsx`
5. `__tests__/components/ui/ContactForm.test.tsx`
6. `__tests__/lib/actions.test.ts`

## Tests to Write First

**`__tests__/pages/contact.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContactPage from '@/app/contact/page'

describe('Contact page', () => {
  it('has exactly one H1 with "Let\'s Talk"', () => {
    const { container } = render(<ContactPage />)
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(/let's talk/i)
  })

  it('displays email contact', () => {
    render(<ContactPage />)
    expect(screen.getByText(/mary@accomplishpoints.com/)).toBeInTheDocument()
  })

  it('email is a clickable mailto link', () => {
    render(<ContactPage />)
    const emailLink = screen.getByRole('link', { name: /mary@accomplishpoints.com/ })
    expect(emailLink).toHaveAttribute('href', 'mailto:mary@accomplishpoints.com')
  })

  it('displays Bend, Oregon location', () => {
    render(<ContactPage />)
    expect(screen.getByText(/Bend, Oregon/)).toBeInTheDocument()
  })

  it('has a contact form', () => {
    render(<ContactPage />)
    expect(screen.getByRole('form') || screen.getByLabelText(/name/i)).toBeTruthy()
  })

  it('contains no emojis', () => {
    const { container } = render(<ContactPage />)
    expect(container.innerHTML).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)
  })
})
```

**`__tests__/components/ui/ContactForm.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from '@/components/ui/ContactForm'

describe('ContactForm component', () => {
  describe('Form fields', () => {
    it('renders Name field (required)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/name/i)
      expect(field).toBeInTheDocument()
      expect(field).toBeRequired()
    })

    it('renders Organization field (optional)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/organization/i)
      expect(field).toBeInTheDocument()
      expect(field).not.toBeRequired()
    })

    it('renders Email field (required)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/email/i)
      expect(field).toBeInTheDocument()
      expect(field).toBeRequired()
      expect(field).toHaveAttribute('type', 'email')
    })

    it('renders Phone field (optional)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/phone/i)
      expect(field).toBeInTheDocument()
      expect(field).not.toBeRequired()
    })

    it('renders Message textarea (required)', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/how can i help|message/i)
      expect(field).toBeInTheDocument()
      expect(field).toBeRequired()
      expect(field.tagName).toBe('TEXTAREA')
    })

    it('message textarea has a placeholder', () => {
      render(<ContactForm />)
      const field = screen.getByLabelText(/how can i help|message/i)
      expect(field).toHaveAttribute('placeholder')
    })

    it('renders Submit button', () => {
      render(<ContactForm />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('every visible input has a label', () => {
      const { container } = render(<ContactForm />)
      const visibleInputs = container.querySelectorAll(
        'input:not([type="hidden"]), textarea, select'
      )
      visibleInputs.forEach((input) => {
        const id = input.getAttribute('id')
        if (id) {
          const label = container.querySelector(`label[for="${id}"]`)
          expect(label).toBeInTheDocument()
        }
      })
    })
  })

  describe('Honeypot field', () => {
    it('has a hidden honeypot field', () => {
      const { container } = render(<ContactForm />)
      // Honeypot should exist but be visually hidden
      const honeypot = container.querySelector('[name="website"]') ||
                       container.querySelector('[name="url"]') ||
                       container.querySelector('[aria-hidden="true"] input')
      expect(honeypot).toBeInTheDocument()
    })

    it('honeypot field is not visible', () => {
      const { container } = render(<ContactForm />)
      const honeypotWrapper = container.querySelector('[aria-hidden="true"]')
      expect(honeypotWrapper).toBeInTheDocument()
      // Should have sr-only or similar hidden styling
      const style = window.getComputedStyle(honeypotWrapper!)
      expect(
        honeypotWrapper?.className.includes('sr-only') ||
        honeypotWrapper?.className.includes('hidden') ||
        style.position === 'absolute'
      ).toBe(true)
    })
  })
})
```

**`__tests__/lib/actions.test.ts`:**

```ts
import { describe, it, expect, vi } from 'vitest'

// Mock Resend before importing the action
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'test-id' }),
    },
  })),
}))

describe('Contact form server action', () => {
  it('rejects submission when honeypot field is filled', async () => {
    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'test@example.com')
    formData.set('message', 'Hello')
    formData.set('website', 'spam-bot-value') // honeypot filled

    const result = await submitContactForm(formData)
    // Should silently succeed (don't reveal honeypot detection to bots)
    // but NOT actually send email
    expect(result.success).toBe(true) // appears successful to bot
  })

  it('rejects submission with missing required fields', async () => {
    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', '')
    formData.set('email', '')
    formData.set('message', '')
    formData.set('website', '')

    const result = await submitContactForm(formData)
    expect(result.success).toBe(false)
    expect(result.errors).toBeDefined()
  })

  it('rejects submission with invalid email', async () => {
    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'not-an-email')
    formData.set('message', 'Hello there')
    formData.set('website', '')

    const result = await submitContactForm(formData)
    expect(result.success).toBe(false)
    expect(result.errors?.email).toBeDefined()
  })

  it('accepts valid submission', async () => {
    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', 'Jane Doe')
    formData.set('email', 'jane@example.com')
    formData.set('organization', 'City of Portland')
    formData.set('phone', '503-555-1234')
    formData.set('message', 'I need strategic planning help for my department.')
    formData.set('website', '') // honeypot empty

    const result = await submitContactForm(formData)
    expect(result.success).toBe(true)
  })

  it('sanitizes input — strips HTML tags', async () => {
    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', '<script>alert("xss")</script>Test')
    formData.set('email', 'test@example.com')
    formData.set('message', 'Hello <b>world</b>')
    formData.set('website', '')

    const result = await submitContactForm(formData)
    // Should succeed but sanitize the content
    expect(result.success).toBe(true)
  })
})
```

## Implementation Spec

### Page Layout (`src/app/contact/page.tsx`)

- **Background:** `brand-cream`
- H1: "Let's Talk" with amber decorative rule
- Two-column layout on desktop (`lg:grid-cols-5`), stacked on mobile
  - Left column (`lg:col-span-2`): Contact info
  - Right column (`lg:col-span-3`): Contact form

**Left column content:**
- Brief paragraph: "Every engagement begins with a conversation. Reach out by phone, email, or the form here — I will respond personally."
- Email: `mary@accomplishpoints.com` (`mailto:` link, styled as `brand-teal`)
- Location: "Bend, Oregon"
- Image placeholder for slide06 (brick wall, confident pose) or slide05 (white shirt)

**Right column:**
- `<ContactForm />` component

### ContactForm (`src/components/ui/ContactForm.tsx`)

**Must be `'use client'`** — uses state for form handling.

**Fields:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | Yes | Non-empty after trim |
| Organization | text | No | — |
| Email | email | Yes | Valid email format |
| Phone | tel | No | — |
| How can I help? | textarea | Yes | Non-empty after trim, min 10 chars |
| website (honeypot) | text | — | Hidden, must be empty |

**Form behavior:**
- Client-side validation on submit (prevent wasteful server calls)
- Show inline error messages below invalid fields (use `aria-describedby`)
- Error text color: `#A13D2D` (the muted error red)
- Submit button disables during submission (prevent double-submit)
- On success: replace form with confirmation message "Thank you. I will be in touch soon."
- On server error: show form-level error message above form

**Textarea placeholder:** "Tell me briefly about your situation and what you are looking for."

**Honeypot implementation:**
```tsx
<div className="sr-only" aria-hidden="true" tabIndex={-1}>
  <label htmlFor="website">Website</label>
  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
</div>
```

### Server Action (`src/lib/actions.ts`)

```ts
'use server'

import { Resend } from 'resend'

type FormState = {
  success: boolean
  errors?: Record<string, string>
  message?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData): Promise<FormState> {
  // 1. Extract fields
  const name = (formData.get('name') as string)?.trim() || ''
  const email = (formData.get('email') as string)?.trim() || ''
  const organization = (formData.get('organization') as string)?.trim() || ''
  const phone = (formData.get('phone') as string)?.trim() || ''
  const message = (formData.get('message') as string)?.trim() || ''
  const honeypot = (formData.get('website') as string) || ''

  // 2. Honeypot check — silently "succeed" to not tip off bots
  if (honeypot) {
    return { success: true }
  }

  // 3. Sanitize — strip HTML tags
  const sanitize = (str: string) => str.replace(/<[^>]*>/g, '')
  const cleanName = sanitize(name)
  const cleanEmail = sanitize(email)
  const cleanOrg = sanitize(organization)
  const cleanPhone = sanitize(phone)
  const cleanMessage = sanitize(message)

  // 4. Validate required fields
  const errors: Record<string, string> = {}
  if (!cleanName) errors.name = 'Name is required.'
  if (!cleanEmail) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) errors.email = 'Please enter a valid email address.'
  if (!cleanMessage) errors.message = 'Please describe how I can help.'
  else if (cleanMessage.length < 10) errors.message = 'Please provide a bit more detail.'

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  // 5. Send email via Resend
  try {
    await resend.emails.send({
      from: 'Accomplish Points Website <noreply@accomplishpoints.com>',
      to: process.env.CONTACT_EMAIL_TO || 'mary@accomplishpoints.com',
      replyTo: cleanEmail,
      subject: `New inquiry from ${cleanName}${cleanOrg ? ` (${cleanOrg})` : ''}`,
      text: [
        `Name: ${cleanName}`,
        cleanOrg ? `Organization: ${cleanOrg}` : '',
        `Email: ${cleanEmail}`,
        cleanPhone ? `Phone: ${cleanPhone}` : '',
        '',
        'Message:',
        cleanMessage,
      ].filter(Boolean).join('\n'),
    })

    return { success: true, message: 'Thank you. I will be in touch soon.' }
  } catch {
    return { success: false, errors: { form: 'Something went wrong. Please try again or email directly.' } }
  }
}
```

### Environment Variables

Ensure `.env.local.example` (from T01) includes:
```
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_EMAIL_TO=mary@accomplishpoints.com
```

## Acceptance Criteria

1. All tests pass
2. Exactly one H1: "Let's Talk"
3. Two-column layout: contact info left, form right on desktop
4. Email displayed as clickable `mailto:` link
5. Form has 5 visible fields with correct required/optional states
6. Every field has a semantic `<label>`
7. Honeypot field is hidden from visual users and screen readers
8. Client-side validation shows inline errors
9. Server action validates, sanitizes, and sends email via Resend
10. Honeypot-filled submissions silently "succeed" without sending email
11. HTML tags stripped from all input before sending
12. Success state replaces form with confirmation message
13. Submit button is disabled during submission
14. No emojis, no exclamation points
15. No CAPTCHA
