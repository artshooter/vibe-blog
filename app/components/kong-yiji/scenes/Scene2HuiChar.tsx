'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import DialogueLine from '../DialogueLine'

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
            {t('scenes.scene2.label')}
          </span>
        </motion.div>

        {/* 插画区域 */}
        <div className="relative aspect-[4/3] max-w-2xl mx-auto">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* 柜台一角 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none">
              <path d="M 0 220 L 400 220" />
              <path d="M 0 280 L 400 280" />
              {/* 柜台纹理 */}
              <line x1="100" y1="220" x2="100" y2="280" opacity="0.2" />
              <line x1="200" y1="220" x2="200" y2="280" opacity="0.2" />
              <line x1="300" y1="220" x2="300" y2="280" opacity="0.2" />
            </g>

            {/* 孔乙己 - 敲柜台姿态 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round">
              {/* 头 */}
              <ellipse cx="150" cy="70" rx="18" ry="22" />
              {/* 胡子 */}
              <path d="M 138 82 Q 135 95 138 100" />
              <path d="M 145 84 Q 144 98 146 102" />
              <path d="M 155 84 Q 156 98 154 102" />
              <path d="M 162 82 Q 165 95 162 100" />
              {/* 眼睛 - 略带得意 */}
              <path d="M 142 66 Q 146 64 150 66" />
              <path d="M 150 66 Q 154 64 158 66" />
              <circle cx="146" cy="67" r="1.5" fill="#1A1A1A" />
              <circle cx="154" cy="67" r="1.5" fill="#1A1A1A" />
              {/* 身体 */}
              <path d="M 132 92 L 120 200" />
              <path d="M 168 92 L 180 200" />
              <path d="M 120 200 Q 150 205 180 200" />
              {/* 长衫点彩 */}
              <path
                d="M 132 92 L 120 200 Q 150 205 180 200 L 168 92"
                fill="#4A5568"
                fillOpacity="0.12"
                stroke="none"
              />
              {/* 右手 - 敲柜台 */}
              <path d="M 168 110 Q 200 130 220 200" />
              {/* 手指 - 长指甲 */}
              <path d="M 220 200 L 225 210" />
              <path d="M 222 198 L 228 206" />
            </g>

            {/* 小伙计 - 背对/侧身 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round">
              {/* 头 - 侧面 */}
              <ellipse cx="320" cy="100" rx="15" ry="18" />
              {/* 身体 - 短衣 */}
              <path d="M 305 118 L 300 200" />
              <path d="M 335 118 L 340 200" />
              {/* 短衣填充 */}
              <path
                d="M 305 118 L 300 200 L 340 200 L 335 118"
                fill="#1A1A1A"
                fillOpacity="0.05"
                stroke="none"
              />
              {/* 表情线 - 不耐烦 */}
              <path d="M 310 95 L 315 98" />
            </g>

            {/* 柜台上写的"回"字 - 酒渍效果 */}
            <motion.g style={{ opacity: writeProgress }}>
              <text
                x="240"
                y="215"
                fontSize="28"
                fill="#D4A84B"
                fillOpacity="0.6"
                style={{ fontFamily: 'serif' }}
              >
                回
              </text>
              {/* 酒渍晕开效果 */}
              <circle cx="254" cy="205" r="20" fill="#D4A84B" fillOpacity="0.1" />
            </motion.g>
          </svg>

          {/* 对话 */}
          <motion.div
            className="absolute top-8 left-8"
            style={{ opacity: dialogueOpacity }}
          >
            <DialogueLine
              text={t('scenes.scene2.dialogue')}
              direction="right"
            />
          </motion.div>
        </div>

        {/* 可点击查看四种写法 */}
        <motion.div
          className="text-center mt-8"
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

          {showFourWays && (
            <motion.div
              className="mt-6 flex justify-center gap-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {['回', '囘', '囬', '廻'].map((char, i) => (
                <div key={i} className="text-center">
                  <span className="text-4xl text-[#1A1A1A]" style={{ fontFamily: 'serif' }}>
                    {char}
                  </span>
                  <p className="text-xs text-[#8B7355] mt-2">
                    {t(`scenes.scene2.charName${i + 1}`)}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
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
