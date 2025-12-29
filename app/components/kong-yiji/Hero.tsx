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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* 孔乙己插画 - 简笔风格 */}
        <motion.div
          className={`${inHome ? 'w-48 h-48 mb-4' : 'w-64 h-64 mb-8'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <KongYijiIllustration />
        </motion.div>

        {/* 标题 */}
        <motion.h1
          className={`${inHome ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'} font-bold text-[#1A1A1A] tracking-wider mb-4`}
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          className={`${inHome ? 'text-base md:text-lg' : 'text-lg md:text-xl'} text-[#4A4A4A] italic`}
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* 作者 */}
        <motion.p
          className="mt-4 text-sm text-[#8B7355]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {t('hero.author')}
        </motion.p>

        {/* Hover 提示 */}
        {inHome && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-[#8B7355]/60 opacity-0 group-hover:opacity-100 transition-opacity"
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
