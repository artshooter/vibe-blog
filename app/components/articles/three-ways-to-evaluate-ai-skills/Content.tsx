'use client'

import { useTranslations } from 'next-intl'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import DimensionCard from './DimensionCard'
import SkillEvaluator from './SkillEvaluator'

export default function Content() {
  const t = useTranslations('three-ways-to-evaluate-ai-skills')

  const dimensionColors = ['#1e3a5f', '#0d9488', '#6366f1']

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <BackButton variant="default" />

      {/* Hero */}
      <Hero />

      {/* 文章内容 */}
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        {/* 引言 */}
        <section className="mb-16 text-center">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('content.intro')}
          </p>
        </section>

        {/* 三个维度 */}
        <div className="space-y-8 mb-16">
          {/* 维度1：理解本质 */}
          <DimensionCard
            number={1}
            title={t('content.dimension1.title')}
            color={dimensionColors[0]}
            delay={0}
          >
            <p>{t('content.dimension1.intro')}</p>

            <div className="mt-4 space-y-4">
              {/* 例子1：思维链 */}
              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
                <p className="font-medium text-teal-800 mb-2">
                  {t('content.dimension1.example1.title')}
                </p>
                <p className="text-teal-700 text-sm leading-relaxed">
                  {t('content.dimension1.example1.content')}
                </p>
              </div>

              {/* 例子2：套壳工具 */}
              <div className="bg-gray-100 border-l-4 border-gray-400 p-4 rounded-r-lg">
                <p className="font-medium text-gray-700 mb-2">
                  {t('content.dimension1.example2.title')}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('content.dimension1.example2.content')}
                </p>
              </div>
            </div>
          </DimensionCard>

          {/* 维度2：产出成果 */}
          <DimensionCard
            number={2}
            title={t('content.dimension2.title')}
            color={dimensionColors[1]}
            delay={0.1}
          >
            <p>{t('content.dimension2.content')}</p>
          </DimensionCard>

          {/* 维度3：通用能力 */}
          <DimensionCard
            number={3}
            title={t('content.dimension3.title')}
            color={dimensionColors[2]}
            delay={0.2}
          >
            <p>{t('content.dimension3.intro')}</p>

            <div className="mt-4 space-y-4">
              {/* 正例 */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                <p className="font-medium text-indigo-800 mb-2">
                  {t('content.dimension3.positive.title')}
                </p>
                <p className="text-indigo-700 text-sm leading-relaxed">
                  {t('content.dimension3.positive.content')}
                </p>
              </div>

              {/* 反例 */}
              <div className="bg-gray-100 border-l-4 border-gray-400 p-4 rounded-r-lg">
                <p className="font-medium text-gray-700 mb-2">
                  {t('content.dimension3.negative.title')}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('content.dimension3.negative.content')}
                </p>
              </div>
            </div>
          </DimensionCard>
        </div>

        {/* 结论 */}
        <section className="mb-16 text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
            {t('content.conclusion')}
          </p>
        </section>

        {/* 交互式评估器 */}
        <section className="mb-16">
          <SkillEvaluator />
        </section>

        {/* Footer */}
        <section className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm">{t('content.footer')}</p>
        </section>
      </article>
    </main>
  )
}
