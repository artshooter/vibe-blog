'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import DialogueLine from '../DialogueLine'

export default function Scene3Beans() {
  const t = useTranslations('kong-yiji')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const dialogue1Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
  const dialogue2Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
  const beansScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.6])

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8"
    >
      <div className="w-full">

        {/* 插画区域 */}
        <div className="relative w-full">
          <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
            {/* 孔乙己 - 弯腰罩碟子 - 应用笔触 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ filter: 'url(#ink-brush)' }}>
              {/* 头 */}
              <path d="M 185 65 Q 200 50, 215 65 Q 220 85, 200 90 Q 180 85, 185 65" />
              {/* 胡子 */}
              <path d="M 192 88 Q 190 100, 193 108" />
              <path d="M 208 88 Q 210 100, 207 108" />
              {/* 眼睛 - 点两下 */}
              <circle cx="194" cy="72" r="1.2" fill="#1A1A1A" stroke="none" />
              <circle cx="206" cy="72" r="1.2" fill="#1A1A1A" stroke="none" />
              {/* 眉毛 - 八字眉，表现着慌 */}
              <path d="M 188 64 Q 195 68, 198 68" />
              <path d="M 212 64 Q 205 68, 202 68" />

              {/* 身体 - 佝偻 */}
              <path d="M 185 90 Q 155 130, 150 190" />
              <path d="M 215 90 Q 245 130, 250 190" />
              <path d="M 150 190 Q 200 200, 250 190" />

              {/* 长衫填充 */}
              <path
                d="M 185 90 Q 155 130, 150 190 Q 200 200, 250 190 Q 245 130, 215 90 Z"
                fill="#4A5568"
                fillOpacity="0.08"
                stroke="none"
              />

              {/* 双手 - 罩住碟子，线条极简且富有张力 */}
              <path d="M 165 140 Q 185 170, 200 185" />
              <path d="M 235 140 Q 215 170, 200 185" />
              {/* 手指 - 像爪子一样罩住 */}
              <path d="M 185 180 L 175 192" strokeWidth="0.8" />
              <path d="M 192 185 L 188 200" strokeWidth="0.8" />
              <path d="M 200 185 L 200 205" strokeWidth="0.8" />
              <path d="M 208 185 L 212 200" strokeWidth="0.8" />
              <path d="M 215 180 L 225 192" strokeWidth="0.8" />
            </g>

            {/* 茴香豆碟子 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none" style={{ filter: 'url(#fine-brush)' }}>
              <ellipse cx="200" cy="205" rx="38" ry="10" />
              {/* 茴香豆 - 点彩渲染 */}
              <motion.g style={{ scale: beansScale, transformOrigin: '200px 200px' }}>
                <circle cx="185" cy="200" r="4" fill="#C4A35A" fillOpacity="0.7" stroke="none" />
                <circle cx="195" cy="198" r="4" fill="#C4A35A" fillOpacity="0.7" stroke="none" />
                <circle cx="205" cy="198" r="4" fill="#C4A35A" fillOpacity="0.7" stroke="none" />
                <circle cx="215" cy="200" r="4" fill="#C4A35A" fillOpacity="0.7" stroke="none" />
                <circle cx="200" cy="203" r="4" fill="#C4A35A" fillOpacity="0.6" stroke="none" />
              </motion.g>
            </g>

            {/* 孩子们 - 寥寥几笔，生动传神 - 应用笔触 */}
            <g style={{ filter: 'url(#ink-brush)' }}>
              {/* 孩子1 - 左边 */}
              <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <path d="M 90 145 Q 105 130, 115 145 Q 120 160, 105 165 Q 90 160, 90 145" />
                <circle cx="108" cy="152" r="0.8" fill="#1A1A1A" stroke="none" />
                <path d="M 100 165 L 95 230" />
                <path d="M 115 165 L 120 230" />
              </g>

              {/* 孩子2 - 右边 */}
              <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <path d="M 290 145 Q 300 130, 315 145 Q 320 160, 305 165 Q 290 160, 290 145" />
                <circle cx="298" cy="152" r="0.8" fill="#1A1A1A" stroke="none" />
                <path d="M 300 165 L 295 230" />
                <path d="M 315 165 L 320 230" />
              </g>
            </g>
          </svg>

          {/* 对话 */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{ opacity: dialogue1Opacity }}
            >
              <DialogueLine
                text={t('scenes.scene3.dialogue1')}
                direction="down"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-24 left-1/2 -translate-x-1/2"
              style={{ opacity: dialogue2Opacity }}
            >
              <DialogueLine
                text={t('scenes.scene3.dialogue2')}
                direction="down"
              />
            </motion.div>
          </div>
        </div>

        {/* 场景说明 */}
        <motion.p
          className="text-center text-[#4A4A4A] mt-12 text-lg italic"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('scenes.scene3.caption')}
        </motion.p>
      </div>
    </div>
  )
}
