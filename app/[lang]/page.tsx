import type { Metadata } from 'next'
import { getDictionary, type Lang } from '@/lib/get-dictionary'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { ProjectGrid } from '@/components/ProjectGrid'

interface Props {
  params: { lang: Lang }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.meta.home_title,
    description: dict.meta.home_description,
  }
}

export default async function HomePage({ params }: Props) {
  const dict = await getDictionary(params.lang)

  return (
    <>
      <Hero dict={dict.hero} lang={params.lang} />
      <Pricing dict={dict.pricing} />
      <ProjectGrid dict={dict.projects} lang={params.lang} />
    </>
  )
}
