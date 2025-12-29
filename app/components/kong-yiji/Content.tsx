'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import Scene1Debut from './scenes/Scene1Debut'
import Scene2HuiChar from './scenes/Scene2HuiChar'
import Scene3Beans from './scenes/Scene3Beans'
import Scene4Final from './scenes/Scene4Final'

export default function Content() {
  const t = useTranslations('kong-yiji')

  return (
    <div className="min-h-screen bg-[#F8F4E8]">
      <BackButton variant="nature" />

      {/* Hero */}
      <Hero />

      {/* 开篇引言 */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.p
          className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed text-center"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('content.intro')}
        </motion.p>
      </section>

      {/* 分隔线 */}
      <Divider />

      {/* 第一部分：咸亨酒店 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part1.p1')} />
        <Paragraph text={t('content.part1.p2')} />
        <Paragraph text={t('content.part1.p3')} />
      </section>

      {/* 场景1：初登场 */}
      <Scene1Debut />

      {/* 第二部分：孔乙己的身份 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part2.p1')} />
        <Paragraph text={t('content.part2.p2')} />
      </section>

      {/* 分隔线 */}
      <Divider />

      {/* 第三部分：众人的嘲笑 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part3.p1')} />
        <Paragraph text={t('content.part3.p2')} />
      </section>

      {/* 场景2：教"回"字 */}
      <Scene2HuiChar />

      {/* 第四部分：孔乙己与孩子们 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part4.p1')} />
      </section>

      {/* 场景3：分茴香豆 */}
      <Scene3Beans />

      {/* 过渡段落 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <motion.p
          className="text-xl md:text-2xl text-[#1A1A1A] text-center italic"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('content.transition')}
        </motion.p>
      </section>

      {/* 分隔线 */}
      <Divider />

      {/* 第五部分：打折了腿 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part5.p1')} />
        <Paragraph text={t('content.part5.p2')} />
      </section>

      {/* 场景4：最后一次 */}
      <Scene4Final />

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
        </motion.div>
      </section>

      {/* 留白 */}
      <div className="h-32" />

      {/* 作者信息 */}
      <footer className="max-w-3xl mx-auto px-6 py-12 border-t border-[#1A1A1A]/10">
        <motion.div
          className="text-center text-[#8B7355]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm">{t('footer.author')}</p>
          <p className="text-sm mt-1">{t('footer.date')}</p>
        </motion.div>
      </footer>
    </div>
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
function Divider() {
  return (
    <motion.div
      className="max-w-xs mx-auto py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/20 to-transparent" />
    </motion.div>
  )
}
