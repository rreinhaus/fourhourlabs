import type { Metadata } from 'next'
import { getDictionary, type Lang } from '@/lib/get-dictionary'
import { ContactForm } from '@/components/ContactForm'

interface Props {
  params: { lang: Lang }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.meta.contact_title,
    description: dict.meta.contact_description,
  }
}

export default async function ContactPage({ params }: Props) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-4">
            {dict.contact.title}
          </p>
          <p className="text-slate-600 text-lg">
            {dict.contact.subtitle}
          </p>
        </div>
        <ContactForm dict={dict.contact} />
      </div>
    </div>
  )
}
