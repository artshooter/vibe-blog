'use client'

import { useTranslations } from 'next-intl'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import GameUseCases from './GameUseCases'
import ToolComparison from './ToolComparison'
import ExpandableCard from './ExpandableCard'

export default function Content() {
  const t = useTranslations('chinese-class')

  return (

    <main className="bg-white min-h-screen font-sans">
      <BackButton variant="default" />

      {/* Hero */}
      <Hero />

      {/* 文章内容 */}
      <article className="max-w-3xl mx-auto px-6 py-20">

        {/* Intro / Project Link - Simplified */}
        <section className="mb-20 text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-6">{t('content.projectLink')}</h2>
          <a
            href={t('content.projectLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02]"
          >
            {t('hero.clickToRead')} →
          </a>
        </section>

        {/* 文生图能做游戏素材 */}
        <section className="mb-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('content.section1.title')}</h2>
            <div className="w-8 h-1 bg-gray-200 mx-auto mt-4 rounded-full"></div>
          </div>

          <p className="mb-6 leading-loose text-lg text-gray-600">
            {t('content.section1.intro')}
          </p>
          <p className="mb-12 leading-loose text-lg text-gray-800 font-medium">
            {t('content.section1.text')}
          </p>
          <GameUseCases />
        </section>

        {/* 文生图技巧 */}
        <section className="mb-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('content.section2.title')}</h2>
            <div className="w-8 h-1 bg-gray-200 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid gap-6">
            <ExpandableCard
              title={t('content.section2.tip1.title')}
              content={t('content.section2.tip1.content')}
              details={[
                t('content.section2.tip1.detail1'),
                t('content.section2.tip1.detail2'),
              ]}
            />

            <ExpandableCard
              title={t('content.section2.tip2.title')}
              content={[
                t('content.section2.tip2.content'),
                t('content.section2.tip2.solution'),
              ]}
              details={[
                t('content.section2.tip2.detail1'),
                t('content.section2.tip2.detail2'),
                t('content.section2.tip2.detail3'),
              ]}
            />
          </div>
        </section>

        {/* 工具对比 */}
        <section className="mb-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('content.section3.title')}</h2>
            <div className="w-8 h-1 bg-gray-200 mx-auto mt-4 rounded-full"></div>
          </div>
          <ToolComparison />
        </section>

        {/* Footer / Contact / Re-link */}
        <section className="text-center py-12 border-t border-gray-100">
          <p className="text-gray-500 mb-6">感谢阅读</p>
          <a
            href={t('content.projectLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 font-medium hover:text-gray-600 transition-colors border-b border-gray-200 hover:border-gray-900 pb-0.5"
          >
            访问项目主页 ↗
          </a>
        </section>
      </article>
    </main>
  )
}
