import type { Metadata } from 'next'
import { getDictionary, type Lang } from '@/lib/get-dictionary'
import { ProjectGrid } from '@/components/ProjectGrid'

interface Props {
  params: { lang: Lang }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.meta.projects_title,
    description: dict.meta.projects_description,
  }
}

export default async function ProjectsPage({ params }: Props) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="pt-20">
      <ProjectGrid dict={dict.projects} lang={params.lang} />
    </div>
  )
}
