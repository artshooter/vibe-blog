'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import orangeImg from './orange.webp'

export default function Content() {
  const t = useTranslations('back-view')

  return (
    <div className="min-h-screen bg-[#F5F5DC] relative">
      {/* 纸张纹理 */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.08'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <BackButton variant="nature" />

      {/* Hero */}
      <Hero />

      {/* 开篇 */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.p
          className="text-xl md:text-2xl text-[#2C3E50] leading-relaxed text-center italic"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('content.opening')}
        </motion.p>
      </section>

      <Divider />

      {/* 第一部分：祸不单行 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part1.p1')} />
        <Paragraph text={t('content.part1.p2')} />
      </section>

      {/* 第二部分：决定送行 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part2.p1')} />
      </section>

      {/* 第三部分：车站送别 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part3.p1')} />
      </section>

      <Divider />

      {/* 核心场景：买橘子 */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <Paragraph text={t('content.climax.p1')} highlight />
      </section>

      {/* 泪水涌出 - 特殊强调 */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <motion.p
          className="text-xl md:text-2xl text-[#2C3E50] text-center italic leading-relaxed"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('content.tears')}
        </motion.p>
      </section>

      <Divider />

      {/* 第四部分：离别 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part4.p1')} />
      </section>

      {/* 第五部分：近况 */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <Paragraph text={t('content.part5.p1')} />
      </section>

      {/* 父亲来信 - 信纸样式 */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <motion.div
          className="bg-white/80 rounded-lg p-8 md:p-12 shadow-lg border border-[#2C3E50]/10"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-lg text-[#3D2C1E] leading-loose"
            style={{ fontFamily: 'serif' }}
          >
            {t('content.letter')}
          </p>
        </motion.div>
      </section>

      {/* 结尾 */}
      <section className="max-w-3xl mx-auto px-6 py-16 relative z-10">
        <motion.p
          className="text-2xl md:text-3xl text-[#2C3E50] font-medium mb-8"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('content.ending')}
        </motion.p>

        {/* 落款 */}
        <motion.p
          className="mt-12 text-[#7F8C8D] text-lg italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('footer.author')}
        </motion.p>
      </section>
    </div>
  )
}

// 段落组件
function Paragraph({ text, highlight = false }: { text: string; highlight?: boolean }) {
  return (
    <motion.p
      className={`text-lg ${highlight ? 'text-[#2C3E50]' : 'text-[#3D2C1E]'} leading-loose mb-6`}
      style={{ fontFamily: 'serif', textIndent: '2em' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {text}
    </motion.p>
  )
}

// 分隔线
function Divider() {
  return (
    <div className="max-w-xs mx-auto py-8">
      <div className="flex items-center justify-center gap-4">
        <motion.div
          className="h-px w-16 bg-gradient-to-r from-transparent to-[#2C3E50]/30"
          initial={{ scaleX: 0, originX: 1 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.1
          }}
        >
          <OrangeIcon />
        </motion.div>
        <motion.div
          className="h-px w-16 bg-gradient-to-l from-transparent to-[#2C3E50]/30"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </div>
    </div>
  )
}

// 橘子图标
function OrangeIcon() {
  return (
    <Image src={orangeImg} alt="orange" width={64} height={64} />
  )
}

