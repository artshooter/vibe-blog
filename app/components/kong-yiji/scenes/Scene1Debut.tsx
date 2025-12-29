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
      className="relative w-full"
    >
      <div className="w-full">

        {/* 插画区域 */}
        <div className="relative aspect-[4/3] max-w-2xl mx-auto">
          {/* 聒噪旁白背景 - PC 端增强 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 hidden md:block">
            <BackgroundVoice text="孔乙己，你脸上又添上新伤疤了！" top="10%" left="5%" delay={0} />
            <BackgroundVoice text="你一定又偸了人家的东西了！" top="40%" left="-5%" delay={1} />
            <BackgroundVoice text="窃书不能算偸……" top="70%" left="10%" delay={2} />
            <BackgroundVoice text="店内外充满了快活的空气。" top="20%" right="5%" delay={1.5} />
            <BackgroundVoice text="你怎么这样凭空污人清白……" top="60%" right="-5%" delay={2.5} />
            <BackgroundVoice text="吊着打！" top="85%" right="15%" delay={0.5} />
          </div>

          {/* 柜台背景 */}
          <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible relative z-10">
            {/* 柜台 - 应用笔触 */}
            <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" style={{ filter: 'url(#ink-brush)' }}>
              {/* 曲尺形柜台 */}
              <path d="M 50 200 L 50 280 L 350 280 L 350 200" />
              <path d="M 50 200 L 150 200 L 150 230 L 350 230" />
              {/* 柜台纹理 - 寥寥数笔 */}
              <line x1="100" y1="235" x2="100" y2="280" opacity="0.4" />
              <line x1="250" y1="240" x2="250" y2="280" opacity="0.4" />
            </g>

            {/* 孔乙己 - 应用笔触，线条更简洁 */}
            <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ filter: 'url(#ink-brush)' }}>
              {/* 头 - 略带俯视 */}
              <path d="M 235 70 Q 250 55, 265 70 Q 270 95, 250 100 Q 230 95, 235 70" />
              {/* 胡子 - 稀疏 */}
              <path d="M 242 96 Q 240 108, 243 115" />
              <path d="M 258 96 Q 260 108, 257 115" />

              {/* 眼睛 - 极其简练的点 */}
              <circle cx="244" cy="78" r="0.8" fill="#1A1A1A" stroke="none" />
              <circle cx="256" cy="78" r="0.8" fill="#1A1A1A" stroke="none" />

              {/* 身体 - 长衫，注意线条的顿挫感 */}
              <path d="M 235 100 L 225 210" />
              <path d="M 265 100 L 275 210" />
              <path d="M 225 210 Q 250 215, 275 210" />

              {/* 长衫填充 - 淡淡的墨色点彩 */}
              <path
                d="M 235 100 L 225 210 Q 250 215, 275 210 L 265 100 Z"
                fill="#4A5568"
                fillOpacity="0.08"
                stroke="none"
              />

              {/* 右手 - 排钱，动态简洁 */}
              <path d="M 268 120 Q 290 135, 305 170" />
              {/* 左手 - 拿碗 */}
              <path d="M 232 125 Q 210 140, 205 155" />
            </g>

            {/* 铜钱 - 动画，保持点彩感 */}
            <motion.g style={{ opacity: coinsOpacity, filter: 'url(#fine-brush)' }}>
              <motion.g style={{ x: coin1X }}>
                <circle cx="300" cy="195" r="7" fill="#8B7355" fillOpacity="0.5" stroke="#1A1A1A" strokeWidth="0.8" />
                <rect x="298" y="193" width="4" height="4" fill="#F8F4E8" stroke="#1A1A1A" strokeWidth="0.5" />
              </motion.g>
              <motion.g style={{ x: coin2X }}>
                <circle cx="318" cy="195" r="7" fill="#8B7355" fillOpacity="0.5" stroke="#1A1A1A" strokeWidth="0.8" />
                <rect x="316" y="193" width="4" height="4" fill="#F8F4E8" stroke="#1A1A1A" strokeWidth="0.5" />
              </motion.g>
              <motion.g style={{ x: coin3X }}>
                <circle cx="336" cy="195" r="7" fill="#8B7355" fillOpacity="0.5" stroke="#1A1A1A" strokeWidth="0.8" />
                <rect x="334" y="193" width="4" height="4" fill="#F8F4E8" stroke="#1A1A1A" strokeWidth="0.5" />
              </motion.g>
            </motion.g>

            {/* 酒碗 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none" style={{ filter: 'url(#fine-brush)' }}>
              <ellipse cx="195" cy="160" rx="12" ry="5" />
              <path d="M 183 160 Q 185 175, 195 175 Q 205 175, 207 160" />
              <ellipse cx="195" cy="165" rx="8" ry="3" fill="#D4A84B" fillOpacity="0.4" />
            </g>

            {/* 茴香豆碟子 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none" style={{ filter: 'url(#fine-brush)' }}>
              <ellipse cx="140" cy="195" rx="22" ry="7" />
              {/* 茴香豆 - 极简点彩 */}
              <circle cx="132" cy="192" r="3" fill="#C4A35A" fillOpacity="0.6" stroke="none" />
              <circle cx="140" cy="190" r="3" fill="#C4A35A" fillOpacity="0.6" stroke="none" />
              <circle cx="148" cy="193" r="3" fill="#C4A35A" fillOpacity="0.6" stroke="none" />
            </g>
          </svg>

          {/* 对话 */}
          <motion.div
            className="absolute top-0 right-12"
            style={{ opacity: dialogueOpacity }}
          >
            <DialogueLine
              text={t('scenes.scene1.dialogue')}
              direction="left"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// 聒噪旁白背景文字组件
function BackgroundVoice({
  text,
  top,
  left,
  right,
  delay = 0
}: {
  text: string;
  top?: string;
  left?: string;
  right?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute whitespace-nowrap text-[#1A1A1A] text-lg lg:text-xl pointer-events-none"
      style={{ top, left, right, fontFamily: 'serif' }}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{
        opacity: [0, 1, 1, 0],
        scale: [0.9, 1, 1, 0.95],
        y: [10, 0, -10, -20]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        times: [0, 0.2, 0.8, 1]
      }}
      viewport={{ once: false }}
    >
      {text}
    </motion.div>
  )
}
