'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

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
    await transporter.sendMail({
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
    return { success: true }
  } catch (err) {
    console.error('Gmail error:', err)
    return { success: false, error: 'Failed to send email' }
  }
}
