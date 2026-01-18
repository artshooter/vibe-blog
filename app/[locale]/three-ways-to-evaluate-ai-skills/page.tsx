import Content from '@/app/components/three-ways-to-evaluate-ai-skills/Content'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'three-ways-to-evaluate-ai-skills.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ArticlePage() {
  return <Content />
}
