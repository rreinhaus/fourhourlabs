import Link from 'next/link'
import { FileText, Users, Mail } from 'lucide-react'
import type { Dictionary, Lang } from '@/lib/get-dictionary'

interface Props {
  dict: Dictionary['projects']
  lang: Lang
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'invoice-automation': FileText,
  'crm-lead-enrichment': Users,
  'email-triage-agent': Mail,
}

export function ProjectGrid({ dict, lang }: Props) {
  return (
    <section id="projects" className="border-t border-slate-100 py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-4">
          {dict.title}
        </p>
        <p className="text-slate-600 text-lg mb-12 max-w-xl">{dict.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200">
          {dict.items.map((project) => {
            const Icon = iconMap[project.id] ?? FileText
            return (
              <div
                key={project.id}
                className="bg-white p-8 flex flex-col gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-mono text-base font-bold text-slate-900">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-slate-500 border border-slate-200 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${lang}/projects/${project.id}`}
                  className="font-mono text-xs text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                >
                  {dict.cta} →
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
