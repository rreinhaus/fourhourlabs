'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { Dictionary, Lang } from '@/lib/get-dictionary'

interface Props {
  dict: Dictionary['nav']
  lang: Lang
}

export function Navigation({ dict, lang }: Props) {
  const pathname = usePathname()

  const otherLang: Lang = lang === 'en' ? 'lv' : 'en'
  const switchedPath = pathname.replace(`/${lang}`, `/${otherLang}`)

  const navLinks = [
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/projects`, label: dict.projects },
    { href: `/${lang}/contact`, label: dict.contact },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={`/${lang}`} className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="4hourlabs"
            width={140}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={switchedPath}
            className="font-mono text-xs text-blue-900 border border-blue-900/30 px-2 py-1 hover:bg-blue-900/5 transition-colors"
          >
            {dict.lang_switch}
          </Link>
        </div>
      </div>
    </nav>
  )
}
