'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Hero from './Hero'
import SeasonScenes from './SeasonScenes'
import GardenMap from './GardenMap'
import LifeDeathQuote from './LifeDeathQuote'
import { Bee, Ant, Ladybug, CicadaShell, Dewdrop } from './creatures'

export default function Content() {
  const t = useTranslations('me-and-ditan')

  return (
    <main className="bg-[#f5f2eb] min-h-screen">
      {/* 斑驳光影背景 - 固定 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[5%] right-[10%] w-[400px] h-[500px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,248,231,0.5) 0%, transparent 60%)'
          }}
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-[300px] h-[400px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,248,231,0.4) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Hero */}
      <Hero />

      {/* 文章内容 */}
      <article className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* 第一段：缘分 */}
        <Section>
          <Paragraph>{t('content.p1')}</Paragraph>
          <Paragraph>{t('content.p2')}</Paragraph>
        </Section>

        {/* 第二段：等待 */}
        <Section>
          <Paragraph>{t('content.p3')}</Paragraph>
        </Section>

        {/* 第三段：理解 */}
        <Section>
          <Paragraph>{t('content.p4')}</Paragraph>
        </Section>

        {/* 第四段：逃避与观察 */}
        <Section>
          <Paragraph>{t('content.p5')}</Paragraph>
          <Quote>{t('content.quote1')}</Quote>

          {/* 园中生灵 - 交互区域 */}
          <div className="my-12 relative">
            <SectionTitle>{t('creatures.title')}</SectionTitle>
            <div className="relative bg-gradient-to-b from-[#f5f2eb] via-[#f8f5ee] to-[#f5f2eb] rounded-2xl p-8 md:p-12 overflow-hidden">
              {/* 装饰性背景 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-8 w-1 h-20 bg-[#6b7c5e] rounded-full" />
                <div className="absolute top-8 left-16 w-1 h-16 bg-[#6b7c5e] rounded-full" />
                <div className="absolute bottom-4 right-12 w-1 h-24 bg-[#6b7c5e] rounded-full" />
                <div className="absolute bottom-8 right-20 w-1 h-14 bg-[#6b7c5e] rounded-full" />
              </div>

              {/* 生灵们 */}
              <div className="relative flex flex-wrap items-center justify-center gap-8 md:gap-12 py-8">
                {/* 蜂儿 */}
                <div className="flex flex-col items-center gap-2">
                  <Bee size={32} />
                  <span className="text-xs text-[#6b7c5e]/60">蜂儿</span>
                </div>

                {/* 蚂蚁 */}
                <div className="flex flex-col items-center gap-2">
                  <Ant size={28} direction="right" />
                  <span className="text-xs text-[#6b7c5e]/60">蚂蚁</span>
                </div>

                {/* 瓢虫 */}
                <div className="flex flex-col items-center gap-2">
                  <Ladybug size={30} />
                  <span className="text-xs text-[#6b7c5e]/60">瓢虫</span>
                </div>

                {/* 蝉蜕 */}
                <div className="flex flex-col items-center gap-2">
                  <CicadaShell size={28} />
                  <span className="text-xs text-[#6b7c5e]/60">蝉蜕</span>
                </div>

                {/* 露水 */}
                <div className="flex flex-col items-center gap-2">
                  <Dewdrop size={50} />
                  <span className="text-xs text-[#6b7c5e]/60">露水</span>
                </div>
              </div>

              {/* 提示 */}
              <p className="text-center text-xs text-[#6b7c5e]/50 mt-4">
                悬停或点击观察它们
              </p>
            </div>
          </div>

          <Paragraph>{t('content.p6')}</Paragraph>
        </Section>

        {/* 古园地图探索 */}
        <Section>
          <GardenMap />
        </Section>

        {/* 第五段：生与死 */}
        <Section>
          <Paragraph>{t('content.p7')}</Paragraph>
        </Section>

        {/* 核心金句 - 特别展示 */}
        <LifeDeathQuote />

        <Section>
          <Paragraph>{t('content.p8')}</Paragraph>
        </Section>

        {/* 第六段：如何活 */}
        <Section>
          <Paragraph>{t('content.p9')}</Paragraph>
        </Section>

        {/* 四季场景交互组件 */}
        <Section>
          <SectionTitle>{t('content.scenesTitle')}</SectionTitle>
          <SeasonScenes />
        </Section>

        {/* 结尾 */}
        <Section>
          <Paragraph>{t('content.ending')}</Paragraph>
        </Section>

        {/* 作者信息 */}
        <footer className="mt-20 pt-8 border-t border-[#e8e2d5] text-center">
          <p className="text-[#6b7c5e] text-sm">
            {t('footer.author')}
          </p>
          <p className="text-[#3d3a35]/50 text-xs mt-2">
            {t('footer.note')}
          </p>
        </footer>
      </article>
    </main>
  )
}

// 段落组件
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
    <p
      className="text-[#3d3a35] text-lg md:text-xl leading-[2] md:leading-[2.2] mb-6 text-justify"
      style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", Georgia, serif' }}
    >
      {children}
    </p>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="my-8 pl-6 border-l-2 border-[#c9a86c] text-[#3d3a35]/80 text-base md:text-lg leading-[2] italic"
      style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", Georgia, serif' }}
    >
      {children}
    </blockquote>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="my-10 text-center text-xl md:text-2xl text-[#3d3a35] font-light leading-relaxed"
      style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif' }}
    >
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center text-[#6b7c5e] text-sm tracking-[0.3em] mb-8"
    >
      {children}
    </h2>
  )
}
