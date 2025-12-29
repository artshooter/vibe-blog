'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import DialogueLine from '../DialogueLine'

export default function Scene4Final() {
  const t = useTranslations('kong-yiji')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const dialogue1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const dialogue2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const leaveProgress = useTransform(scrollYProgress, [0.6, 0.9], [0, 100])
  const fadeOut = useTransform(scrollYProgress, [0.7, 0.95], [1, 0])

  // 色调变冷
  const coldFilter = useTransform(scrollYProgress, [0.3, 0.7], [0, 0.3])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#F8F4E8] flex items-center justify-center py-20"
    >
      {/* 冷色调滤镜 */}
      <motion.div
        className="absolute inset-0 bg-[#4A5568] pointer-events-none"
        style={{ opacity: coldFilter }}
      />

      <div className="relative max-w-4xl mx-auto px-4 w-full">
        {/* 场景标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-[#8B7355] tracking-widest">
            {t('scenes.scene4.label')}
          </span>
        </motion.div>

        {/* 插画区域 */}
        <div className="relative aspect-[4/3] max-w-2xl mx-auto">
          <motion.svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            style={{ opacity: fadeOut }}
          >
            {/* 门槛 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none">
              <rect x="0" y="250" width="400" height="20" fill="#8B7355" fillOpacity="0.2" />
              <line x1="0" y1="250" x2="400" y2="250" />
              <line x1="0" y1="270" x2="400" y2="270" />
            </g>

            {/* 孔乙己 - 坐在门槛下，用手走 */}
            <motion.g style={{ x: leaveProgress }}>
              <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round">
                {/* 头 - 黑瘦 */}
                <ellipse cx="150" cy="180" rx="16" ry="20" />
                {/* 脸色 - 灰暗 */}
                <ellipse cx="150" cy="180" rx="14" ry="18" fill="#4A4A4A" fillOpacity="0.15" stroke="none" />
                {/* 胡子 - 更乱 */}
                <path d="M 138 192 Q 133 205 136 212" />
                <path d="M 144 194 Q 141 208 143 215" />
                <path d="M 150 195 Q 150 210 150 218" />
                <path d="M 156 194 Q 159 208 157 215" />
                <path d="M 162 192 Q 167 205 164 212" />
                {/* 眼睛 - 恳求 */}
                <ellipse cx="144" cy="176" rx="2" ry="1.5" fill="#1A1A1A" />
                <ellipse cx="156" cy="176" rx="2" ry="1.5" fill="#1A1A1A" />
                {/* 身体 - 破夹袄 */}
                <path d="M 134 200 L 125 245" />
                <path d="M 166 200 L 175 245" />
                {/* 破夹袄点彩 - 更暗 */}
                <path
                  d="M 134 200 L 125 245 L 175 245 L 166 200"
                  fill="#4A5568"
                  fillOpacity="0.2"
                  stroke="none"
                />
                {/* 盘着的腿 + 蒲包 */}
                <ellipse cx="150" cy="255" rx="30" ry="10" fill="#8B7355" fillOpacity="0.3" stroke="#1A1A1A" strokeWidth="1" />
                {/* 草绳 */}
                <path d="M 120 210 Q 130 200 140 210" strokeDasharray="3,2" />
                <path d="M 160 210 Q 170 200 180 210" strokeDasharray="3,2" />
                {/* 双手 - 沾满泥，撑地 */}
                <path d="M 134 210 Q 100 230 90 250" />
                <path d="M 166 210 Q 200 230 210 250" />
                {/* 手掌 - 泥色 */}
                <ellipse cx="85" cy="255" rx="8" ry="5" fill="#5D4E37" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="1" />
                <ellipse cx="215" cy="255" rx="8" ry="5" fill="#5D4E37" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="1" />
              </g>

              {/* 四文大钱 */}
              <g>
                <circle cx="200" cy="235" r="6" fill="#8B7355" fillOpacity="0.5" stroke="#1A1A1A" strokeWidth="0.8" />
                <rect x="198" y="233" width="4" height="4" fill="#F8F4E8" />
                <circle cx="212" cy="235" r="6" fill="#8B7355" fillOpacity="0.5" stroke="#1A1A1A" strokeWidth="0.8" />
                <rect x="210" y="233" width="4" height="4" fill="#F8F4E8" />
                <circle cx="224" cy="235" r="6" fill="#8B7355" fillOpacity="0.5" stroke="#1A1A1A" strokeWidth="0.8" />
                <rect x="222" y="233" width="4" height="4" fill="#F8F4E8" />
                <circle cx="236" cy="235" r="6" fill="#8B7355" fillOpacity="0.5" stroke="#1A1A1A" strokeWidth="0.8" />
                <rect x="234" y="233" width="4" height="4" fill="#F8F4E8" />
              </g>
            </motion.g>

            {/* 酒碗 - 放在门槛上 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none">
              <ellipse cx="300" cy="245" rx="12" ry="5" />
              <path d="M 288 245 Q 290 260 300 260 Q 310 260 312 245" />
              <ellipse cx="300" cy="250" rx="8" ry="3" fill="#D4A84B" fillOpacity="0.4" />
            </g>
          </motion.svg>

          {/* 对话1 */}
          <motion.div
            className="absolute top-8 left-8"
            style={{ opacity: dialogue1Opacity }}
          >
            <DialogueLine
              text={t('scenes.scene4.dialogue1')}
              direction="right"
            />
          </motion.div>

          {/* 对话2 - 跌断 */}
          <motion.div
            className="absolute bottom-24 left-1/4"
            style={{ opacity: dialogue2Opacity }}
          >
            <DialogueLine
              text={t('scenes.scene4.dialogue2')}
              direction="down"
            />
          </motion.div>
        </div>

        {/* 场景说明 */}
        <motion.p
          className="text-center text-[#4A4A4A] mt-12 text-lg italic"
          style={{ fontFamily: 'serif', opacity: fadeOut }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('scenes.scene4.caption')}
        </motion.p>
      </div>
    </div>
  )
}
