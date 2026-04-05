import { NextRequest, NextResponse } from 'next/server'
import type { Lang } from '@/lib/get-dictionary'

const SUPPORTED_LANGS: Lang[] = ['en', 'lv']
const DEFAULT_LANG: Lang = 'en'

function getPreferredLang(request: NextRequest): Lang {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferred = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase().slice(0, 2))

  for (const code of preferred) {
    if (SUPPORTED_LANGS.includes(code as Lang)) {
      return code as Lang
    }
  }
  return DEFAULT_LANG
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split('/')[1]
  if (SUPPORTED_LANGS.includes(firstSegment as Lang)) {
    return NextResponse.next()
  }

  const lang = getPreferredLang(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
