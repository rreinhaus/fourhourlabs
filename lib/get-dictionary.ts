import type enJson from '@/dictionaries/en.json'

export type Dictionary = typeof enJson

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  lv: () => import('@/dictionaries/lv.json').then((m) => m.default),
}

export type Lang = keyof typeof dictionaries

export const getDictionary = async (lang: Lang): Promise<Dictionary> => {
  const loader = dictionaries[lang] ?? dictionaries.en
  return loader() as Promise<Dictionary>
}
