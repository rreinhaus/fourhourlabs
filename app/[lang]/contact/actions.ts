'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder_key')

export async function sendContactEmail(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    await resend.emails.send({
      from: 'contact@boringautomation.com',
      to: 'hello@boringautomation.com',
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`,
    })
    return { success: true }
  } catch (err) {
    console.error('Resend error:', err)
    return { success: false, error: 'Failed to send email' }
  }
}
