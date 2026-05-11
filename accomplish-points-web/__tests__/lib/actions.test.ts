import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const sendEmailMock = vi.fn().mockResolvedValue({ id: 'test-id' })

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function MockResend() {
    return {
      emails: { send: sendEmailMock },
    }
  }),
}))

describe('Contact form server action', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    process.env.RESEND_API_KEY = 're_test_key'
    delete process.env.CONTACT_EMAIL_TO
  })

  afterEach(() => {
    delete process.env.RESEND_API_KEY
    delete process.env.CONTACT_EMAIL_TO
  })

  it('rejects submission when honeypot field is filled', async () => {
    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'test@example.com')
    formData.set('message', 'Hello')
    formData.set('website', 'spam-bot-value')
    const result = await submitContactForm(formData)
    expect(result.success).toBe(true)
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
    formData.set('website', '')
    const result = await submitContactForm(formData)
    expect(result.success).toBe(true)
    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ['mary@accomplishpoints.com'],
        subject: 'Contact form: Jane Doe',
      })
    )
  })

  it('sanitizes input — strips HTML tags', async () => {
    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', '<script>alert("xss")</script>Test')
    formData.set('email', 'test@example.com')
    formData.set('message', 'Hello <b>world</b>')
    formData.set('website', '')
    const result = await submitContactForm(formData)
    expect(result.success).toBe(true)
  })

  it('returns a form error when email delivery is not configured', async () => {
    delete process.env.RESEND_API_KEY

    const { submitContactForm } = await import('@/lib/actions')
    const formData = new FormData()
    formData.set('name', 'Jane Doe')
    formData.set('email', 'jane@example.com')
    formData.set('message', 'I need strategic planning help for my department.')
    formData.set('website', '')

    const result = await submitContactForm(formData)

    expect(result.success).toBe(false)
    expect(result.errors?.form).toBeDefined()
    expect(sendEmailMock).not.toHaveBeenCalled()
  })
})
