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
      className="relative min-h-[140vh] bg-[#F8F4E8] flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-4 w-full">
        {/* 场景标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-[#8B7355] tracking-widest">
            {t('scenes.scene3.label')}
          </span>
        </motion.div>

        {/* 插画区域 */}
        <div className="relative aspect-[4/3] max-w-2xl mx-auto">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* 孔乙己 - 弯腰罩碟子 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round">
              {/* 头 */}
              <ellipse cx="200" cy="60" rx="18" ry="22" />
              {/* 胡子 */}
              <path d="M 188 72 Q 185 85 188 90" />
              <path d="M 195 74 Q 194 88 196 92" />
              <path d="M 205 74 Q 206 88 204 92" />
              <path d="M 212 72 Q 215 85 212 90" />
              {/* 眼睛 - 着慌 */}
              <circle cx="194" cy="56" r="2" fill="#1A1A1A" />
              <circle cx="206" cy="56" r="2" fill="#1A1A1A" />
              {/* 眉毛 - 紧皱 */}
              <path d="M 190 50 L 198 52" />
              <path d="M 210 50 L 202 52" />
              {/* 身体 - 弯腰 */}
              <path d="M 182 82 Q 160 120 155 180" />
              <path d="M 218 82 Q 240 120 245 180" />
              <path d="M 155 180 Q 200 190 245 180" />
              {/* 长衫点彩 */}
              <path
                d="M 182 82 Q 160 120 155 180 Q 200 190 245 180 Q 240 120 218 82"
                fill="#4A5568"
                fillOpacity="0.12"
                stroke="none"
              />
              {/* 双手 - 五指罩住碟子 */}
              <path d="M 170 130 Q 180 160 200 180" />
              <path d="M 230 130 Q 220 160 200 180" />
              {/* 手指展开 */}
              <path d="M 185 175 L 180 185" />
              <path d="M 192 178 L 190 190" />
              <path d="M 200 180 L 200 195" />
              <path d="M 208 178 L 210 190" />
              <path d="M 215 175 L 220 185" />
            </g>

            {/* 茴香豆碟子 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none">
              <ellipse cx="200" cy="200" rx="35" ry="10" />
              {/* 茴香豆 - 会减少 */}
              <motion.g style={{ scale: beansScale, transformOrigin: '200px 195px' }}>
                <ellipse cx="185" cy="195" rx="5" ry="4" fill="#C4A35A" fillOpacity="0.8" stroke="#1A1A1A" strokeWidth="0.5" />
                <ellipse cx="195" cy="193" rx="5" ry="4" fill="#C4A35A" fillOpacity="0.8" stroke="#1A1A1A" strokeWidth="0.5" />
                <ellipse cx="205" cy="193" rx="5" ry="4" fill="#C4A35A" fillOpacity="0.8" stroke="#1A1A1A" strokeWidth="0.5" />
                <ellipse cx="215" cy="195" rx="5" ry="4" fill="#C4A35A" fillOpacity="0.8" stroke="#1A1A1A" strokeWidth="0.5" />
                <ellipse cx="200" cy="197" rx="5" ry="4" fill="#C4A35A" fillOpacity="0.7" stroke="#1A1A1A" strokeWidth="0.5" />
              </motion.g>
            </g>

            {/* 孩子们 - 围着 */}
            {/* 孩子1 - 左边 */}
            <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" strokeLinecap="round">
              <circle cx="100" cy="160" r="12" />
              {/* 眼睛望着碟子 */}
              <circle cx="104" cy="158" r="1.5" fill="#1A1A1A" />
              <circle cx="108" cy="160" r="1.5" fill="#1A1A1A" />
              <path d="M 88 172 L 85 230" />
              <path d="M 112 172 L 115 230" />
            </g>

            {/* 孩子2 - 右边 */}
            <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" strokeLinecap="round">
              <circle cx="300" cy="160" r="12" />
              <circle cx="292" cy="158" r="1.5" fill="#1A1A1A" />
              <circle cx="296" cy="160" r="1.5" fill="#1A1A1A" />
              <path d="M 288 172 L 285 230" />
              <path d="M 312 172 L 315 230" />
            </g>

            {/* 孩子3 - 后面 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6">
              <circle cx="150" cy="140" r="10" />
              <circle cx="250" cy="140" r="10" />
            </g>
          </svg>

          {/* 对话1 */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{ opacity: dialogue1Opacity }}
          >
            <DialogueLine
              text={t('scenes.scene3.dialogue1')}
              direction="down"
            />
          </motion.div>

          {/* 对话2 - 经典台词 */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
            style={{ opacity: dialogue2Opacity }}
          >
            <DialogueLine
              text={t('scenes.scene3.dialogue2')}
              direction="down"
              className="text-xl"
            />
          </motion.div>
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
