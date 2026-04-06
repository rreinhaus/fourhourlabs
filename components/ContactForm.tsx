'use client'

import { useRef, useState, useTransition } from 'react'
import { sendContactEmail } from '@/app/[lang]/contact/actions'
import type { Dictionary } from '@/lib/get-dictionary'

interface Props {
  dict: Dictionary['contact']
}

export function ContactForm({ dict }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorDetail, setErrorDetail] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      console.log('[ContactForm] Submitting form…')
      const result = await sendContactEmail(formData)
      console.log('[ContactForm] Server action result:', result)
      if (result.success) {
        setStatus('success')
        setErrorDetail(undefined)
        formRef.current?.reset()
      } else {
        console.error('[ContactForm] Submission failed:', result.error)
        setErrorDetail(result.error)
        setStatus('error')
      }
    })
  }

  const inputClass =
    'bg-white border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-900 transition-colors w-full'
  const labelClass = 'font-mono text-xs uppercase tracking-widest text-slate-500'

  return (
    <div className="mx-auto max-w-2xl">
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>{dict.name_label}</label>
          <input name="name" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>{dict.email_label}</label>
          <input name="email" type="email" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>{dict.company_label}</label>
          <input name="company" className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>{dict.message_label}</label>
          <textarea
            name="message"
            required
            rows={6}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="font-mono text-sm bg-blue-900 text-white px-6 py-3 hover:bg-blue-800 transition-colors disabled:opacity-50 self-start font-semibold"
        >
          {isPending ? '...' : dict.submit}
        </button>

        {status === 'success' && (
          <p className="font-mono text-sm text-blue-900">{dict.success}</p>
        )}
        {status === 'error' && (
          <div>
            <p className="font-mono text-sm text-red-600">{dict.error}</p>
            {errorDetail && (
              <p className="font-mono text-xs text-red-400 mt-1">{errorDetail}</p>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
