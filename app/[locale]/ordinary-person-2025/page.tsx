import Content from '@/app/components/articles/ordinary-person-2025/Content'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ordinary-person-2025.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ArticlePage() {
  return <Content />
}
