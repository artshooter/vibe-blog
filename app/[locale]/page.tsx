import { useTranslations } from 'next-intl'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import { Article } from '@/app/components/types'

// 文章列表 - 新文章在此添加
const allArticles: Article[] = []

const articles = allArticles
  .filter((a) => a.meta.status === 'published')
  .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="min-h-screen bg-black text-white">
      <LanguageSwitch />
      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] text-white/60">{t('home.blogTitle')}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 gap-24">
          {articles.map((article, index) => {
            const { Hero } = article
            return (
              <div key={article.meta.articleName} className="relative">
                {index > 0 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}
                <div className="absolute -left-20 top-4 font-extralight text-lg text-white/40 tracking-widest italic hidden md:block">
                  {article.meta.date.slice(5)}
                </div>
                <Hero inHome={true} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="pb-12 text-center text-gray-500 text-sm">
        {t('home.endOfList', { count: articles.length })}
      </div>
    </main>
  )
}
