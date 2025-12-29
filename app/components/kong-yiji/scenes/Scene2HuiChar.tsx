'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Ma_Shan_Zheng } from 'next/font/google'
import DialogueLine from '../DialogueLine'

const brushFont = Ma_Shan_Zheng({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Scene2HuiChar() {
  const t = useTranslations('kong-yiji')
  const containerRef = useRef<HTMLDivElement>(null)
  const [showFourWays, setShowFourWays] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const writeProgress = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const dialogueOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1])

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <div className="w-full">

        {/* 插画区域 */}
        <div className="relative aspect-[4/3] max-w-2xl mx-auto">
          <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
            {/* 柜台一角 - 应用笔触 */}
            <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" style={{ filter: 'url(#ink-brush)' }}>
              <path d="M 0 220 L 400 220" />
              <path d="M 0 280 L 400 280" />
              {/* 柜台纹理 - 极简 */}
              <line x1="150" y1="220" x2="150" y2="280" opacity="0.15" />
            </g>

            {/* 孔乙己 - 敲柜台姿态 - 应用笔触 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ filter: 'url(#ink-brush)' }}>
              {/* 头 */}
              <path d="M 135 60 Q 150 45, 165 60 Q 170 85, 150 90 Q 130 85, 135 60" />
              {/* 胡子 */}
              <path d="M 142 86 Q 140 98, 143 105" />
              <path d="M 158 86 Q 160 98, 157 105" />
              {/* 眼睛 - 略带得意 */}
              <path d="M 142 66 Q 146 63, 150 66" opacity="0.8" />
              <path d="M 150 66 Q 154 63, 158 66" opacity="0.8" />
              <circle cx="146" cy="67" r="1" fill="#1A1A1A" stroke="none" />
              <circle cx="154" cy="67" r="1" fill="#1A1A1A" stroke="none" />

              {/* 身体 */}
              <path d="M 135 90 L 120 200" />
              <path d="M 165 90 L 180 200" />
              <path d="M 120 200 Q 150 205, 180 200" />

              {/* 长衫填充 */}
              <path
                d="M 135 90 L 120 200 Q 150 205, 180 200 L 165 90 Z"
                fill="#4A5568"
                fillOpacity="0.08"
                stroke="none"
              />

              {/* 右手 - 敲柜台 */}
              <path d="M 168 110 Q 195 130, 215 200" />
              {/* 手指 - 长指甲，丰子恺风格的夸张 */}
              <path d="M 215 200 L 222 215" strokeWidth="0.8" />
              <path d="M 218 198 L 226 212" strokeWidth="0.8" />
            </g>

            {/* 小伙计 - 背对/侧身 - 应用笔触 */}
            <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" strokeLinecap="round" style={{ filter: 'url(#ink-brush)' }}>
              {/* 头 - 侧面，寥寥几笔 */}
              <path d="M 310 90 Q 320 75, 335 90 Q 340 110, 320 115 Q 305 110, 310 90" />
              {/* 身体 - 短衣 */}
              <path d="M 305 118 L 300 210" />
              <path d="M 335 118 L 345 210" />
              {/* 短衣填充 */}
              <path
                d="M 305 118 L 300 210 L 345 210 L 335 118 Z"
                fill="#1A1A1A"
                fillOpacity="0.05"
                stroke="none"
              />
              {/* 表情线 - 不耐烦 */}
              <path d="M 312 95 L 318 97" opacity="0.6" />
            </g>

            {/* 柜台上写的"回"字 - 应用晕染滤镜 */}
            <motion.g style={{ opacity: writeProgress }}>
              {/* 第一种写法：始终显示 */}
              <text
                x="180"
                y="255"
                fontSize="24"
                fill="#D4A84B"
                fillOpacity="0.8"
                className={brushFont.className}
                style={{ filter: 'url(#ink-bleed)' }}
              >
                回
              </text>

              {/* 其余三种写法：点击后显示 */}
              {showFourWays && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, staggerChildren: 0.3 }}
                >
                  {['囘', '囬', '廻'].map((char, i) => (
                    <motion.text
                      key={i}
                      x={215 + i * 35}
                      y="255"
                      fontSize="24"
                      fill="#D4A84B"
                      fillOpacity="0.8"
                      className={brushFont.className}
                      style={{ filter: 'url(#ink-bleed)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      {char}
                    </motion.text>
                  ))}
                </motion.g>
              )}
            </motion.g>
          </svg>

          {/* 对话 */}
          <motion.div
            className="absolute top-0 left-12"
            style={{ opacity: dialogueOpacity }}
          >
            <DialogueLine
              text={t('scenes.scene2.dialogue')}
              direction="right"
            />
          </motion.div>
        </div>

        {/* 交互按钮 */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setShowFourWays(!showFourWays)}
            className="text-[#8B7355] hover:text-[#1A1A1A] transition-colors underline underline-offset-4 text-sm"
          >
            {showFourWays ? t('scenes.scene2.hideFourWays') : t('scenes.scene2.showFourWays')}
          </button>
        </motion.div>

        {/* 场景说明 */}
        <motion.p
          className="text-center text-[#4A4A4A] mt-8 text-lg italic"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('scenes.scene2.caption')}
        </motion.p>
      </div>
    </div>
  )
}
