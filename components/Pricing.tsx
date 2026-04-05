import { Check } from 'lucide-react'
import type { Dictionary } from '@/lib/get-dictionary'

interface Props {
  dict: Dictionary['pricing']
}

export function Pricing({ dict }: Props) {
  const plans = [dict.setup, dict.retainer]

  return (
    <section id="pricing" className="border-t border-slate-100 py-24 px-6 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-4">
          {dict.title}
        </p>
        <p className="text-slate-600 text-lg mb-12 max-w-xl">{dict.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200">
          {plans.map((plan) => (
            <div key={plan.label} className="bg-white p-8 flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <h3 className="font-mono text-lg font-bold text-slate-900">
                  {plan.label}
                </h3>
                <span className="font-mono text-xs text-slate-500 border border-slate-200 px-2 py-0.5">
                  {plan.type}
                </span>
              </div>

              <p className="font-mono text-2xl font-bold text-blue-900">
                {plan.range}
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                {plan.description}
              </p>

              <ul className="flex flex-col gap-3 mt-auto">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 text-blue-900 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
