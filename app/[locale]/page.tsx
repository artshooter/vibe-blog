import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'
import { kongYijiArticle } from '@/app/components/kong-yiji'
import { worldWarOneArticle } from '@/app/components/world-war-one'
import { mnistArticle } from '@/app/components/mnist-neural-network'
import { meAndDitanArticle } from '@/app/components/me-and-ditan'
import { backViewArticle } from '@/app/components/back-view'
import { guxiangArticle } from '@/app/components/guxiang'
import { farewellToCambridgeArticle } from '@/app/components/farewell-to-cambridge'

// 文章列表 - 新文章在此添加
const allArticles = [
  farewellToCambridgeArticle,
  guxiangArticle,
  backViewArticle,
  kongYijiArticle,
  worldWarOneArticle,
  mnistArticle,
  meAndDitanArticle,
]

const articles = allArticles
  .filter((a) => a.meta.status === 'published')

export default async function HomePage() {
  const t = await getTranslations()
  const locale = await getLocale()

  return (
    <main className="min-h-screen bg-black text-white">
      <LanguageSwitch />

      {/* Header */}
      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] text-white/60">{t('home.blogTitle')}</h1>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 gap-24">
          {articles.map((article, index) => {
            const { Hero } = article
            return (
              <Link key={article.meta.articleName} href={`/${locale}/${article.meta.articleName}`}>
                <div className="relative hover:opacity-80 transition-opacity cursor-pointer">
                  {index > 0 && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                  <div className="absolute -left-20 top-4 font-extralight text-lg text-white/40 tracking-widest italic hidden md:block">
                    {article.meta.date.slice(5)}
                  </div>
                  <Hero inHome={true} />
                </div>
              </Link>
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
