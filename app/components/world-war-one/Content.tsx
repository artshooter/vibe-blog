'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Hero from './Hero'
import Timeline from './Timeline'
import WarStages from './WarStages'
import DataVisualization from './DataVisualization'

export default function Content() {
  const t = useTranslations('world-war-one')

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black text-white">
      {/* Hero */}
      <Hero />

      {/* 引言 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl md:text-2xl text-gray-400 leading-relaxed border-l-4 border-[#8b2020] pl-6 italic">
            {t('hero.quote')}
            <br />
            {t('hero.quoteBreak1')}
            <br />
            {t('hero.quoteBreak2')}
          </blockquote>
        </motion.div>
      </section>

      {/* 数据可视化 */}
      <DataVisualization />

      {/* 分隔线 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* 战争的发生 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('outbreak.title')}
        </motion.h2>

        <ContentBlock
          title={t('outbreak.howItStarted.title')}
          content={
            <>
              <p className="mb-4 leading-relaxed">
                {t('outbreak.howItStarted.paragraph1')}
              </p>
              <p className="mb-4 leading-relaxed">
                {t('outbreak.howItStarted.paragraph2')}
              </p>
              <p className="leading-relaxed">
                {t('outbreak.howItStarted.paragraph3')}
              </p>
            </>
          }
        />

        <SubSection
          title={t('outbreak.sarajevo.title')}
          items={[
            {
              date: t('outbreak.sarajevo.event1.date'),
              text: t('outbreak.sarajevo.event1.text'),
            },
            {
              date: t('outbreak.sarajevo.event2.date'),
              text: t('outbreak.sarajevo.event2.text'),
              note: t('outbreak.sarajevo.event2.note'),
            },
            {
              date: t('outbreak.sarajevo.event3.date'),
              text: t('outbreak.sarajevo.event3.text'),
              note: t('outbreak.sarajevo.event3.note'),
            },
            {
              date: t('outbreak.sarajevo.event4.date'),
              text: t('outbreak.sarajevo.event4.text'),
            },
          ]}
        />
      </section>

      {/* 连锁反应时间线 */}
      <Timeline />

      {/* 战争是如何失控的 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <ContentBlock
          title={t('outbreak.escalation.title')}
          subtitle={t('outbreak.escalation.subtitle')}
          content={
            <div className="space-y-6">
              <EscalationPoint
                title={t('outbreak.escalation.point1.title')}
                description={t('outbreak.escalation.point1.description')}
              />
              <EscalationPoint
                title={t('outbreak.escalation.point2.title')}
                description={t('outbreak.escalation.point2.description')}
              />
              <EscalationPoint
                title={t('outbreak.escalation.point3.title')}
                description={t('outbreak.escalation.point3.description')}
              />
              <EscalationPoint
                title={t('outbreak.escalation.point4.title')}
                description={t('outbreak.escalation.point4.description')}
              />
            </div>
          }
        />
      </section>

      {/* 分隔线 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* 战争的进程 */}
      <section className="py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('phases.title')}
        </motion.h2>

        <WarStages />

        {/* 详细阶段描述 */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-16 space-y-8">
          <StageDetail
            year={t('phases.detail1917.year')}
            title={t('phases.detail1917.title')}
            points={[
              {
                subtitle: t('phases.detail1917.russia.subtitle'),
                content: t('phases.detail1917.russia.content'),
              },
              {
                subtitle: t('phases.detail1917.america.subtitle'),
                content: t('phases.detail1917.america.content'),
              },
            ]}
          />
        </div>
      </section>

      {/* 分隔线 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* 战争的影响 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('impact.title')}
        </motion.h2>

        <div className="space-y-8">
          <ImpactCard
            title={t('impact.political.title')}
            content={t('impact.political.content')}
          />

          <ImpactCard
            title={t('impact.economic.title')}
            content={t('impact.economic.content')}
          />

          <ImpactCard
            title={t('impact.social.title')}
            points={[
              {
                subtitle: t('impact.social.warTrauma.subtitle'),
                content: t('impact.social.warTrauma.content'),
              },
              {
                subtitle: t('impact.social.womenStatus.subtitle'),
                content: t('impact.social.womenStatus.content'),
              },
            ]}
          />
        </div>
      </section>

      {/* 尾声 */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center">
        <motion.div
          className="border-t-2 border-[#8b2020] pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-400 italic">
            {t('epilogue.quote')}
          </p>
          <p className="text-sm text-gray-600 mt-4">
            {t('epilogue.footnote')}
          </p>
        </motion.div>
      </section>
    </div>
  )
}

// 辅助组件

function ContentBlock({
  title,
  subtitle,
  content,
}: {
  title: string
  subtitle?: string
  content: React.ReactNode
}) {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-[#d4c5a9] mb-2">
        {title}
      </h3>
      {subtitle && <p className="text-gray-500 italic mb-4">{subtitle}</p>}
      <div className="text-gray-400">{content}</div>
    </motion.div>
  )
}

function SubSection({
  title,
  items,
}: {
  title: string
  items: Array<{ date: string; text: string; note?: string }>
}) {
  return (
    <motion.div
      className="ml-0 md:ml-8 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h4 className="text-xl font-bold text-[#d4c5a9] mb-4">{title}</h4>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-l-2 border-gray-700 pl-4">
            <div className="text-[#8b2020] font-mono text-sm mb-1">
              {item.date}
            </div>
            <p className="text-gray-400 mb-2">{item.text}</p>
            {item.note && (
              <p className="text-sm text-gray-600 italic pl-4 border-l border-gray-800">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function EscalationPoint({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <motion.div
      className="bg-[#2a2a2a]/50 border-l-4 border-[#8b2020] p-6 rounded-r-lg"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h4 className="text-lg font-bold text-[#d4c5a9] mb-2">{title}</h4>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

function StageDetail({
  year,
  title,
  points,
}: {
  year: string
  title: string
  points: Array<{ subtitle: string; content: string }>
}) {
  return (
    <motion.div
      className="bg-[#2a2a2a]/30 border border-gray-800 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[#8b2020] font-mono text-sm">{year}</span>
        <h4 className="text-2xl font-bold text-[#d4c5a9]">{title}</h4>
      </div>
      <div className="space-y-4">
        {points.map((point, index) => (
          <div key={index}>
            <h5 className="text-lg font-semibold text-gray-300 mb-2">
              {point.subtitle}
            </h5>
            <p className="text-gray-400 leading-relaxed">{point.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ImpactCard({
  title,
  content,
  points,
}: {
  title: string
  content?: string
  points?: Array<{ subtitle: string; content: string }>
}) {
  return (
    <motion.div
      className="bg-[#2a2a2a]/50 border-2 border-gray-800 rounded-lg p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold text-[#d4c5a9] mb-4">{title}</h3>
      {content && <p className="text-gray-400 leading-relaxed">{content}</p>}
      {points && (
        <div className="space-y-4 mt-4">
          {points.map((point, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-300 mb-2">
                {point.subtitle}
              </h4>
              <p className="text-gray-400 leading-relaxed">{point.content}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
