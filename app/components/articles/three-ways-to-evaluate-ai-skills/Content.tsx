'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import DimensionCard from './DimensionCard'
import SkillEvaluator from './SkillEvaluator'

export default function Content() {
  const t = useTranslations('three-ways-to-evaluate-ai-skills')

  const dimensionColors = ['#1e3a5f', '#0d9488', '#1e293b']

  return (
    <main className="bg-[#f8fafc] min-h-screen font-sans selection:bg-teal-500/10 selection:text-teal-900">
      <BackButton variant="default" />

      {/* Hero */}
      <Hero />

      {/* 文章内容 */}
      <article className="max-w-4xl mx-auto px-6 py-20 pb-40">
        {/* 引言 */}
        <section className="mb-24 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light italic"
          >
            "{t('content.intro')}"
          </motion.div>
        </section>

        {/* 三个维度 */}
        <div className="space-y-24 mb-32">
          {/* 维度1：理解本质 */}
          <section>
            <DimensionCard
              number={1}
              title={t('content.dimension1.title')}
              color={dimensionColors[0]}
              delay={0}
            >
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">{t('content.dimension1.intro')}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 例子1：思维链 */}
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <p className="font-bold text-slate-800 mb-2">
                      {t('content.dimension1.example1.title')}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t('content.dimension1.example1.content')}
                    </p>
                  </div>

                  {/* 例子2：套壳工具 */}
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow grayscale opacity-70">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </div>
                    <p className="font-bold text-slate-700 mb-2">
                      {t('content.dimension1.example2.title')}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {t('content.dimension1.example2.content')}
                    </p>
                  </div>
                </div>
              </div>
            </DimensionCard>
          </section>

          {/* 维度2：产出成果 */}
          <section>
            <DimensionCard
              number={2}
              title={t('content.dimension2.title')}
              color={dimensionColors[1]}
              delay={0.1}
            >
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed italic">
                  {t('content.dimension2.content')}
                </p>
              </div>
            </DimensionCard>
          </section>

          {/* 维度3：通用能力 */}
          <section>
            <DimensionCard
              number={3}
              title={t('content.dimension3.title')}
              color={dimensionColors[2]}
              delay={0.2}
            >
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">{t('content.dimension3.intro')}</p>

                <div className="space-y-6">
                  {/* 正例 */}
                  <div className="bg-teal-50/50 border-l-4 border-teal-500 p-8 rounded-r-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-0.5 bg-teal-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Positive</span>
                      <p className="font-bold text-teal-900">
                        {t('content.dimension3.positive.title')}
                      </p>
                    </div>
                    <p className="text-teal-800/80 leading-relaxed text-sm">
                      {t('content.dimension3.positive.content')}
                    </p>
                  </div>

                  {/* 反例 */}
                  <div className="bg-slate-100/50 border-l-4 border-slate-300 p-8 rounded-r-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-0.5 bg-slate-400 text-white text-[10px] font-bold rounded uppercase tracking-wider">Negative</span>
                      <p className="font-bold text-slate-700">
                        {t('content.dimension3.negative.title')}
                      </p>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {t('content.dimension3.negative.content')}
                    </p>
                  </div>
                </div>
              </div>
            </DimensionCard>
          </section>
        </div>

        {/* 结论 */}
        <section className="mb-32 text-center relative">
          <div className="absolute inset-0 bg-teal-500/5 blur-3xl rounded-full -z-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-4">
              {t('content.conclusion')}
            </p>
          </motion.div>
        </section>

        {/* 交互式评估器 */}
        <section className="mb-24">
          <SkillEvaluator />
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-slate-200">
          <p className="text-slate-400 text-sm">{t('content.footer')}</p>
        </footer>
      </article>
    </main>
  )
}
