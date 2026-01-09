import { getTranslations } from 'next-intl/server'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import { getAllPublishedArticles } from '@/app/lib/articles-loader'

export default async function HomePage() {
  const articles = await getAllPublishedArticles()
  const t = await getTranslations()

  return (
    <main className="min-h-screen bg-black text-white">
      <LanguageSwitch />

      {/* Header */}
      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] text-white/60">{t('home.blogTitle')}</h1>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => {
            const { Hero } = article
            return (
              <div key={article.meta.articleName} className="relative group">
                <Hero inHome={true} />
                <div className="absolute bottom-3 right-3 text-xs text-white/40 font-mono">
                  {article.meta.date}
                </div>
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
