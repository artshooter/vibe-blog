'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function LifeDeathQuote() {
  const t = useTranslations('me-and-ditan.quote')

  const lines = [
    { key: 'line1', delay: 0 },
    { key: 'line2', delay: 0.6 },
    { key: 'line3', delay: 1.2 },
    { key: 'line4', delay: 1.8, highlight: true },
  ]

  return (
    <div className="my-16 md:my-24 relative">
      {/* 装饰性光斑 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,108,0.3) 0%, transparent 70%)'
        }}
      />

      {/* 主容器 */}
      <motion.div
        className="relative max-w-2xl mx-auto px-8 py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* 上边框装饰 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="w-12 h-[1px] bg-[#c9a86c]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#c9a86c]/40" />
          <div className="w-12 h-[1px] bg-[#c9a86c]/40" />
        </div>

        {/* 文字内容 */}
        <div className="space-y-6 md:space-y-8 text-center">
          {lines.map((line) => (
            <motion.p
              key={line.key}
              className={`
                leading-relaxed md:leading-loose
                ${line.highlight
                  ? 'text-xl md:text-2xl text-[#2a2725] font-medium'
                  : 'text-base md:text-lg text-[#3d3a35]/80'
                }
              `}
              style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: line.delay, duration: 0.8, ease: 'easeOut' }}
            >
              {line.highlight ? (
                <span className="relative inline-block">
                  {/* 高亮背景 */}
                  <motion.span
                    className="absolute inset-0 -inset-x-2 -inset-y-1 bg-[#c9a86c]/10 -z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: line.delay + 0.3, duration: 0.6 }}
                    style={{ transformOrigin: 'left' }}
                  />
                  {t(line.key)}
                </span>
              ) : (
                t(line.key)
              )}
            </motion.p>
          ))}
        </div>

        {/* 下边框装饰 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="w-12 h-[1px] bg-[#c9a86c]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#c9a86c]/40" />
          <div className="w-12 h-[1px] bg-[#c9a86c]/40" />
        </div>
      </motion.div>
    </div>
  )
}
