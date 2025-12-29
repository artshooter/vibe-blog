import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/app/components/articles'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'me-and-ditan.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug('me-and-ditan')

  if (!article) {
    notFound()
  }

  const { Content } = article

  return <Content />
}
