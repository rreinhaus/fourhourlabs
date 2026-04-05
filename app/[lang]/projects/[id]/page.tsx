import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, type Lang } from '@/lib/get-dictionary'

interface Props {
  params: { lang: Lang; id: string }
}

const VALID_IDS = ['invoice-automation', 'crm-lead-enrichment', 'email-triage-agent']

export async function generateStaticParams() {
  return (['en', 'lv'] as Lang[]).flatMap((lang) =>
    VALID_IDS.map((id) => ({ lang, id }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!VALID_IDS.includes(params.id)) return {}
  const dict = await getDictionary(params.lang)
  const cs = dict.case_studies.items[params.id as keyof typeof dict.case_studies.items]
  return {
    title: `${cs.title} — 4hourlabs`,
    description: cs.headline,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  if (!VALID_IDS.includes(params.id)) notFound()

  const dict = await getDictionary(params.lang)
  const cs = dict.case_studies.items[params.id as keyof typeof dict.case_studies.items]
  const labels = dict.case_studies

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <div className="bg-blue-900 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/${params.lang}/projects`}
            className="font-mono text-xs text-blue-300 hover:text-white transition-colors mb-8 inline-block"
          >
            {labels.back}
          </Link>
          <div className="flex flex-wrap gap-2 mb-6">
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-blue-200 border border-blue-700 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-mono text-3xl sm:text-4xl font-bold text-white max-w-3xl mb-4">
            {cs.headline}
          </h1>
          <p className="font-mono text-sm text-blue-300">{cs.client}</p>
        </div>
      </div>

      {/* Results bar */}
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-8">
            {labels.results_label}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200">
            {cs.results.map((r) => (
              <div key={r.metric} className="bg-white px-6 py-6">
                <p className="font-mono text-3xl font-bold text-blue-900 mb-1">{r.metric}</p>
                <p className="text-sm text-slate-600">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge + Solution */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-4">
              {labels.challenge_label}
            </p>
            <p className="text-slate-700 leading-relaxed">{cs.challenge}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-4">
              {labels.solution_label}
            </p>
            <p className="text-slate-700 leading-relaxed">{cs.solution}</p>
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="border-t border-slate-100 px-6 py-12 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-6">
            {labels.tech_label}
          </p>
          <div className="flex flex-wrap gap-3">
            {cs.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-sm text-slate-700 border border-slate-300 bg-white px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-slate-100 px-6 py-16">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-mono text-lg font-bold text-slate-900 max-w-md">
            {labels.cta_label}
          </p>
          <Link
            href={`/${params.lang}/contact`}
            className="font-mono text-sm bg-blue-900 text-white px-6 py-3 hover:bg-blue-800 transition-colors font-semibold flex-shrink-0"
          >
            {labels.cta_button} →
          </Link>
        </div>
      </div>
    </div>
  )
}
