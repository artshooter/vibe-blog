'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import Timeline from './Timeline'
import TwoLayers from './TwoLayers'

export default function Content() {
  const t = useTranslations('ordinary-person-2025')

  return (
    <main className="bg-[#FDFBF7] min-h-screen">
      <BackButton variant="journal" />

      {/* 纸张纹理背景 - 固定 */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero */}
      <Hero />

      {/* 文章内容 */}
      <article className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* 第一部分：裸辞 */}
        <Section>
          <TimeMarker>{t('markers.june')}</TimeMarker>
          <Paragraph>{t('content.p1')}</Paragraph>
          <Paragraph>{t('content.p2')}</Paragraph>
          <Highlight>{t('content.highlight1')}</Highlight>
        </Section>

        {/* 第二部分：婚礼 */}
        <Section>
          <TimeMarker>{t('markers.september')}</TimeMarker>
          <Paragraph>{t('content.p3')}</Paragraph>
          <Paragraph>{t('content.p4')}</Paragraph>
          <Highlight>{t('content.highlight2')}</Highlight>
        </Section>

        {/* 第三部分：找工作 */}
        <Section>
          <Paragraph>{t('content.p5')}</Paragraph>
          <Paragraph>{t('content.p6')}</Paragraph>
        </Section>

        {/* 项目时间线 */}
        <Timeline />

        {/* 第四部分：回头看 */}
        <Section>
          <TimeMarker>{t('markers.december')}</TimeMarker>
          <Highlight>{t('content.highlight3')}</Highlight>
          <Paragraph>{t('content.p7')}</Paragraph>
        </Section>

        {/* 第五部分：顿悟 */}
        <Section>
          <Paragraph>{t('content.p8')}</Paragraph>
          <Quote>{t('content.quote1')}</Quote>
          <Paragraph>{t('content.p9')}</Paragraph>
          <Paragraph>{t('content.p10')}</Paragraph>
        </Section>

        {/* 核心顿悟 - 特别展示 */}
        <CoreInsight>
          <p>{t('content.insight1')}</p>
          <p>{t('content.insight2')}</p>
        </CoreInsight>

        {/* 第六部分：接受 */}
        <Section>
          <Paragraph>{t('content.p11')}</Paragraph>
          <Paragraph>{t('content.p12')}</Paragraph>
        </Section>

        {/* 两层生活模型 */}
        <TwoLayers />

        {/* 结尾 */}
        <Section>
          <Paragraph>{t('content.p13')}</Paragraph>
          <Ending>
            <p>{t('content.ending1')}</p>
            <p>{t('content.ending2')}</p>
          </Ending>
        </Section>

        {/* 作者信息 */}
        <footer className="mt-20 pt-8 border-t border-[#E8E2D5] text-center">
          <p className="text-[#3D3D3D]/50 text-sm">
            {t('footer.date')}
          </p>
        </footer>
      </article>
    </main>
  )
}

// 辅助组件
function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#3D3D3D] text-base md:text-lg leading-[2] md:leading-[2.2] mb-6 text-justify">
      {children}
    </p>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-8 text-[#3D3D3D] text-lg md:text-xl leading-relaxed font-medium relative pl-4 border-l-2 border-[#E07A5F]">
      {children}
    </p>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 p-4 bg-[#F4F1EA] rounded-lg text-[#3D3D3D]/80 text-sm md:text-base leading-relaxed italic">
      {children}
    </blockquote>
  )
}

function TimeMarker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-2 h-2 rounded-full bg-[#81B29A]" />
      <span className="text-[#81B29A] text-sm tracking-wider">{children}</span>
      <div className="flex-1 h-[1px] bg-[#E8E2D5]" />
    </div>
  )
}

function CoreInsight({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="my-16 p-8 bg-gradient-to-br from-[#E07A5F]/10 to-transparent rounded-2xl border border-[#E07A5F]/20"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-[#E07A5F] text-lg md:text-xl leading-relaxed font-medium space-y-4">
        {children}
      </div>
    </motion.div>
  )
}

function Ending({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 text-center text-[#3D3D3D]/70 text-base md:text-lg leading-relaxed space-y-2 italic">
      {children}
    </div>
  )
}
