import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import { getPublishedArticles } from '@/app/components/articles'

export default function HomePage() {
  const t = useTranslations()
  const articles = getPublishedArticles()

  return (
    <main className="min-h-screen bg-black text-white">
      <LanguageSwitch />

      {/* Header */}
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-2xl md:text-3xl text-gray-400 italic">{t('home.subtitle')}</p>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-300">{t('nav.articles')}</h2>
        <div className="grid grid-cols-1 gap-8">
          {articles.map((article) => {
            const { Hero } = article
            return (
              <div key={article.meta.slug}>
                <Hero inHome={true} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pb-12 text-center text-gray-500 text-sm">
        {t('home.endOfList', { count: articles.length })}
      </div>
    </main>
  )
}
