'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import DialogueLine from '../DialogueLine'

export default function Scene1Debut() {
  const t = useTranslations('kong-yiji')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // 铜钱动画进度
  const coinsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const coin1X = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])
  const coin2X = useTransform(scrollYProgress, [0.35, 0.55], [50, 0])
  const coin3X = useTransform(scrollYProgress, [0.4, 0.6], [50, 0])
  const dialogueOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[120vh] bg-[#F8F4E8] flex items-center justify-center py-20"
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
            {t('scenes.scene1.label')}
          </span>
        </motion.div>

        {/* 插画区域 */}
        <div className="relative aspect-[4/3] max-w-2xl mx-auto">
          {/* 柜台背景 */}
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* 柜台 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none">
              {/* 曲尺形柜台 */}
              <path d="M 50 200 L 50 280 L 350 280 L 350 200" />
              <path d="M 50 200 L 150 200 L 150 230 L 350 230" />
              {/* 柜台纹理 */}
              <line x1="80" y1="240" x2="80" y2="280" opacity="0.3" />
              <line x1="120" y1="240" x2="120" y2="280" opacity="0.3" />
              <line x1="200" y1="250" x2="200" y2="280" opacity="0.3" />
              <line x1="280" y1="250" x2="280" y2="280" opacity="0.3" />
            </g>

            {/* 孔乙己 - 站立姿态 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round">
              {/* 头 */}
              <ellipse cx="250" cy="80" rx="18" ry="22" />
              {/* 花白胡子 */}
              <path d="M 238 92 Q 235 105 238 110" />
              <path d="M 245 94 Q 244 108 246 112" />
              <path d="M 255 94 Q 256 108 254 112" />
              <path d="M 262 92 Q 265 105 262 110" />
              {/* 眼睛 */}
              <circle cx="244" cy="76" r="1.5" fill="#1A1A1A" />
              <circle cx="256" cy="76" r="1.5" fill="#1A1A1A" />
              {/* 身体 - 长衫 */}
              <path d="M 232 102 L 220 200" />
              <path d="M 268 102 L 280 200" />
              <path d="M 220 200 Q 250 205 280 200" />
              {/* 长衫点彩 */}
              <path
                d="M 232 102 L 220 200 Q 250 205 280 200 L 268 102"
                fill="#4A5568"
                fillOpacity="0.12"
                stroke="none"
              />
              {/* 右手 - 排钱动作 */}
              <path d="M 268 120 Q 300 140 310 160" />
              {/* 左手 */}
              <path d="M 232 120 Q 200 135 195 145" />
            </g>

            {/* 铜钱 - 动画 */}
            <motion.g style={{ opacity: coinsOpacity }}>
              <motion.g style={{ x: coin1X }}>
                <circle cx="300" cy="195" r="8" fill="#8B7355" fillOpacity="0.6" stroke="#1A1A1A" strokeWidth="1" />
                <rect x="297" y="192" width="6" height="6" fill="#F8F4E8" />
              </motion.g>
              <motion.g style={{ x: coin2X }}>
                <circle cx="318" cy="195" r="8" fill="#8B7355" fillOpacity="0.6" stroke="#1A1A1A" strokeWidth="1" />
                <rect x="315" y="192" width="6" height="6" fill="#F8F4E8" />
              </motion.g>
              <motion.g style={{ x: coin3X }}>
                <circle cx="336" cy="195" r="8" fill="#8B7355" fillOpacity="0.6" stroke="#1A1A1A" strokeWidth="1" />
                <rect x="333" y="192" width="6" height="6" fill="#F8F4E8" />
              </motion.g>
            </motion.g>

            {/* 酒碗 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none">
              <ellipse cx="195" cy="150" rx="10" ry="4" />
              <path d="M 185 150 Q 187 162 195 162 Q 203 162 205 150" />
              {/* 酒的颜色 */}
              <ellipse cx="195" cy="154" rx="6" ry="2" fill="#D4A84B" fillOpacity="0.5" />
            </g>

            {/* 茴香豆碟子 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none">
              <ellipse cx="140" cy="195" rx="20" ry="6" />
              {/* 茴香豆 */}
              <ellipse cx="132" cy="192" rx="4" ry="3" fill="#C4A35A" fillOpacity="0.7" />
              <ellipse cx="140" cy="190" rx="4" ry="3" fill="#C4A35A" fillOpacity="0.7" />
              <ellipse cx="148" cy="192" rx="4" ry="3" fill="#C4A35A" fillOpacity="0.7" />
            </g>
          </svg>

          {/* 对话 */}
          <motion.div
            className="absolute top-4 right-4"
            style={{ opacity: dialogueOpacity }}
          >
            <DialogueLine
              text={t('scenes.scene1.dialogue')}
              direction="left"
            />
          </motion.div>
        </div>

        {/* 场景说明 */}
        <motion.p
          className="text-center text-[#4A4A4A] mt-8 text-lg italic"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('scenes.scene1.caption')}
        </motion.p>
      </div>
    </div>
  )
}
