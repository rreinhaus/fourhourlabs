'use server'

import nodemailer from 'nodemailer'

function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = (process.env.GMAIL_APP_PASSWORD ?? '').replace(/\s/g, '')

  // Masked log — shows enough to confirm vars are loaded without exposing secrets
  console.log(
    '[contact] Env check — GMAIL_USER:',
    user ? `${user.slice(0, 4)}…${user.slice(-8)}` : 'MISSING',
    '| GMAIL_APP_PASSWORD length:',
    pass.length > 0 ? pass.length : 'MISSING'
  )

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  })
}

export async function sendContactEmail(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const message = formData.get('message') as string

  console.log('[contact] Submission received — name:', name, '| email:', email, '| company:', company)

  if (!name || !email || !message) {
    console.warn('[contact] Validation failed — missing required fields')
    return { success: false, error: 'Missing required fields' }
  }

  const transporter = createTransporter()

  try {
    console.log('[contact] Attempting to send via Gmail SMTP…')

    const info = await transporter.sendMail({
      from: `"4hourlabs Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #1e3a8a;">New inquiry via 4hourlabs.com</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 100px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Company</td><td style="padding: 8px 0;">${company || '—'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="color: #64748b; margin-bottom: 4px;">Message</p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    console.log('[contact] Email sent successfully — messageId:', info.messageId)
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const code = (err as Record<string, unknown>).code
    const response = (err as Record<string, unknown>).response
    console.error('[contact] Gmail SMTP error — code:', code, '| message:', message, '| response:', response)
    return { success: false, error: `SMTP error: ${message}` }
  }
}
