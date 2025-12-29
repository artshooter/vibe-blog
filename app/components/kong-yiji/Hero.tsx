'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
  const t = useTranslations('kong-yiji')

  const content = (
    <motion.div
      className={`relative w-full ${inHome ? 'h-[400px]' : 'h-[70vh] min-h-[500px]'} bg-[#F8F4E8] overflow-hidden ${inHome ? 'cursor-pointer group' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 宣纸纹理 */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-8">
        {/* 文字区域 */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* 标题 */}
          <motion.h1
            className={`${inHome ? 'text-4xl md:text-6xl' : 'text-6xl md:text-8xl'} font-bold text-[#1A1A1A] tracking-wider mb-4`}
            style={{ fontFamily: 'serif' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t('hero.title')}
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            className={`${inHome ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} text-[#4A4A4A] italic max-w-md`}
            style={{ fontFamily: 'serif' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* 作者 */}
          <motion.p
            className="mt-6 text-[#8B7355] text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t('hero.author')}
          </motion.p>
        </div>

        {/* 侧置插画区域 - 正面孔乙己 */}
        <motion.div
          className={`${inHome ? 'w-56 h-56' : 'w-72 h-72 md:w-96 md:h-96'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <FrontIllustration />
        </motion.div>

        {/* Hover 提示 */}
        {inHome && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm text-[#8B7355]/60 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {t('hero.clickToRead')}
          </motion.div>
        )}
      </div>

      {/* 底部墨迹装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1A1A1A]/20 to-transparent" />
    </motion.div>
  )

  if (inHome) {
    return (
      <Link href="/kong-yiji" className="block" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}

// 孔乙己简笔插画 - 丰子恺风格
function KongYijiIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* 人物 - 简笔勾勒 */}
      <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 头部轮廓 */}
        <ellipse cx="100" cy="50" rx="20" ry="24" />

        {/* 花白胡子 */}
        <path d="M 85 60 Q 80 75 85 80" />
        <path d="M 90 62 Q 88 78 92 82" />
        <path d="M 100 64 Q 100 80 100 85" />
        <path d="M 110 62 Q 112 78 108 82" />
        <path d="M 115 60 Q 120 75 115 80" />

        {/* 眼睛 - 略显疲惫 */}
        <path d="M 90 45 Q 95 43 98 45" />
        <path d="M 102 45 Q 105 43 110 45" />
        <circle cx="94" cy="46" r="1" fill="#1A1A1A" />
        <circle cx="106" cy="46" r="1" fill="#1A1A1A" />

        {/* 身体 - 长衫 */}
        <path d="M 80 74 L 70 160" />
        <path d="M 120 74 L 130 160" />
        <path d="M 70 160 Q 100 165 130 160" />

        {/* 长衫褶皱 */}
        <path d="M 85 90 L 82 130" />
        <path d="M 115 90 L 118 130" />
        <path d="M 95 100 Q 100 140 105 100" opacity="0.5" />

        {/* 手臂 - 端着酒碗 */}
        <path d="M 75 85 Q 55 100 60 115" />
        <path d="M 125 85 Q 145 100 140 115" />

        {/* 酒碗 */}
        <ellipse cx="60" cy="120" rx="12" ry="5" />
        <path d="M 48 120 Q 50 135 60 135 Q 70 135 72 120" />
      </g>

      {/* 点彩 - 长衫的青灰色 */}
      <path
        d="M 80 74 L 70 160 Q 100 165 130 160 L 120 74 Q 100 70 80 74"
        fill="#4A5568"
        fillOpacity="0.15"
        stroke="none"
      />

      {/* 点彩 - 酒的琥珀色 */}
      <ellipse cx="60" cy="125" rx="8" ry="3" fill="#D4A84B" fillOpacity="0.4" />
    </svg>
  )
}

// 孔乙己正面插画 - 瘦高增强版
function FrontIllustration() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full overflow-visible">
      <defs>
        <filter id="ink-brush-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="ink-bleed-hero">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="ink" />
          <feComposite in="SourceGraphic" in2="ink" operator="over" />
        </filter>
      </defs>

      {/* 人物主体 */}
      <g style={{ filter: 'url(#ink-brush-hero)' }}>
        {/* 头部 - 正面圆润简笔 */}
        <circle cx="120" cy="50" r="28" stroke="#1A1A1A" strokeWidth="1.8" fill="none" />

        {/* 面部特征 - 仅有的两点水墨眼神 */}
        <g fill="#1A1A1A">
          <circle cx="112" cy="48" r="1.2" />
          <circle cx="128" cy="48" r="1.2" />
        </g>

        {/* 身体/长衫 - 极其瘦高的廓形 */}
        <path
          d="M 108 78 L 95 220 Q 120 225, 145 220 L 132 78"
          stroke="#1A1A1A"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* 填充 - 淡淡的长衫色 */}
        <path
          d="M 108 78 L 95 220 Q 120 225, 145 220 L 132 78 Z"
          fill="#4A5568"
          fillOpacity="0.08"
          stroke="none"
        />

        {/* 脖颈/肩膀连接线 */}
        <path d="M 112 78 Q 112 85, 112 95" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.6" />
        <path d="M 128 78 Q 128 85, 128 95" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.6" />

        {/* 右手臂 - 略微张开平衡 */}
        <path d="M 140 100 Q 175 140, 195 190" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* 左手臂与酒碗 - 端碗动作 */}
        <path d="M 100 100 Q 75 130, 60 155" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* 酒碗 */}
        <g transform="translate(56, 165)">
          <path d="M -15 -5 Q -12 12, 0 12 Q 12 12, 15 -5" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
          <path d="M -16 -6 Q 0 -13, 16 -6" stroke="#1A1A1A" strokeWidth="1.2" fill="none" opacity="0.3" />
          {/* 黄酒色彩 */}
          <ellipse cx="0" cy="4" rx="10" ry="4" fill="#D4A84B" fillOpacity="0.4" stroke="none" style={{ filter: 'url(#ink-bleed-hero)' }} />
        </g>
      </g>
    </svg>
  )
}
