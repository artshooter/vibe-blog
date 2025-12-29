'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import BackButton from '@/app/components/common/BackButton'
import BrushFilter, { PaperTexture } from './BrushFilter'
import Hero from './Hero'
import Scene1Debut from './scenes/Scene1Debut'
import Scene2HuiChar from './scenes/Scene2HuiChar'
import Scene3Beans from './scenes/Scene3Beans'
import Scene4Final from './scenes/Scene4Final'

export default function Content() {
  const t = useTranslations('kong-yiji')

  return (
    <div className="min-h-screen bg-[#F8F4E8] relative">
      <BrushFilter />
      <PaperTexture />
      <BackButton variant="nature" />

      {/* Hero */}
      <Hero />

      {/* 第一部分：咸亨酒店格局与伙计生涯 (正常文档流) */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part1.p1')} />
        <Paragraph text={t('content.part1.p2')} />
        <Paragraph text={t('content.part1.p3')} />
      </section>

      {/* 场景1：孔乙己初登场 (左右布局) */}
      <SideBySideLayout
        text={
          <>
            <Paragraph text={t('content.part2.p1')} />
          </>
        }
        illustration={<Scene1Debut />}
        reverse={false}
      />

      {/* 第三部分：出身与为人 (正常文档流) */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part3.p1')} />
        <Paragraph text={t('content.part3.p2')} />
      </section>

      {/* 场景2：教“回”字 (左右布局) */}
      <SideBySideLayout
        text={
          <>
            <Paragraph text={t('content.part4.p1')} />
          </>
        }
        illustration={<Scene2HuiChar />}
        reverse={true}
      />

      {/* 场景3：分茴香豆 (左右布局) */}
      <SideBySideLayout
        text={
          <>
            <Paragraph text={t('content.part5.p1')} />
          </>
        }
        illustration={<Scene3Beans />}
        reverse={false}
      />

      {/* 过渡段落 */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <motion.p
          className="text-xl md:text-2xl text-[#1A1A1A] italic"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('content.transition')}
        </motion.p>
      </section>

      {/* 第六部分：打断腿 (正常文档流) */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part6.p1')} />
      </section>

      {/* 场景4：最后一次温酒 (左右布局) */}
      <SideBySideLayout
        text={
          <>
            <Paragraph text={t('content.part7.p1')} />
          </>
        }
        illustration={<Scene4Final />}
        reverse={true}
      />

      {/* 结尾 */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Paragraph text={t('content.ending.p1')} className="mb-8" />

          {/* 最后一句 - 特别强调 */}
          <motion.p
            className="text-2xl md:text-3xl text-[#1A1A1A] font-medium"
            style={{ fontFamily: 'serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t('content.ending.final')}
          </motion.p>

          {/* 落款 */}
          <p className="mt-12 text-[#8B7355] text-lg italic">
            {t('footer.date')}
          </p>
        </motion.div>
      </section>
    </div>
  )
}

// 图文并排组件
function SideBySideLayout({
  text,
  illustration,
  reverse = false
}: {
  text: React.ReactNode;
  illustration: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 md:py-16">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 lg:gap-16`}>
        {/* 文字列 */}
        <div className="flex-1 w-full space-y-6">
          {text}
        </div>

        {/* 插画列 */}
        <div className="flex-1 w-full">
          <div className="bg-white/50 rounded-2xl p-3 md:p-6 shadow-sm backdrop-blur-sm border border-[#1A1A1A]/5 ring-1 ring-[#1A1A1A]/5">
            {illustration}
          </div>
        </div>
      </div>
    </section>
  )
}

// 段落组件
function Paragraph({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.p
      className={`text-lg text-[#4A4A4A] leading-loose mb-6 ${className}`}
      style={{ fontFamily: 'serif', textIndent: '2em' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {text}
    </motion.p>
  )
}

// 分隔线组件
function Divider({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`max-w-xs mx-auto py-8 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/20 to-transparent" />
    </motion.div>
  )
}
