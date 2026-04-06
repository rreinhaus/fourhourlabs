import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navigation } from '@/components/Navigation'
import { getDictionary, type Lang } from '@/lib/get-dictionary'
import '@/app/globals.css'

interface Props {
  children: React.ReactNode
  params: { lang: Lang }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  return {
    title: {
      default: dict.meta.home_title,
      template: '%s | 4hourlabs',
    },
    description: dict.meta.home_description,
    metadataBase: new URL('https://fourhourlabs.com'),
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        en: '/en',
        lv: '/lv',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'lv' }]
}

export default async function LangLayout({ children, params }: Props) {
  const dict = await getDictionary(params.lang)

  return (
    <html
      lang={params.lang}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-white text-slate-900 antialiased">
        <Navigation dict={dict.nav} lang={params.lang} />
        <main>{children}</main>
      </body>
    </html>
  )
}
