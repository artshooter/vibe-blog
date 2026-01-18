import Content from '@/app/components/articles/cs-course-for-beginners/Content'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cs-course-for-beginners.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ArticlePage() {
  return <Content />
}
