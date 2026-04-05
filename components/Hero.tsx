import Link from 'next/link'
import type { Dictionary, Lang } from '@/lib/get-dictionary'

interface Props {
  dict: Dictionary['hero']
  lang: Lang
}

export function Hero({ dict, lang }: Props) {
  return (
    <section className="bg-blue-900 min-h-screen flex flex-col items-start justify-center px-6 pt-24 pb-16">
      <div className="mx-auto max-w-5xl w-full">
        <p className="font-mono text-xs uppercase tracking-widest text-blue-300 mb-6">
          {dict.subhook}
        </p>

        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white max-w-3xl mb-10">
          {dict.headline}
        </h1>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/${lang}/contact`}
            className="font-mono text-sm bg-white text-blue-900 px-6 py-3 hover:bg-blue-50 transition-colors font-semibold"
          >
            {dict.cta} →
          </Link>
          <Link
            href={`/${lang}/projects`}
            className="font-mono text-sm border border-white/40 text-white px-6 py-3 hover:border-white hover:bg-white/5 transition-all"
          >
            {dict.secondary_cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
