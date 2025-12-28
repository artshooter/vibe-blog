'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
  const t = useTranslations('world-war-one')
  return (
    <Link href="/world-war-one" className="block">
      <motion.div
        className={`relative w-full ${inHome ? 'h-[400px]' : 'h-[600px]'} bg-gradient-to-br from-[#2a2a2a] via-[#3a3a3a] to-[#1a1a1a] overflow-hidden cursor-pointer group`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 老旧纸张纹理背景 */}
        <div className="absolute inset-0 bg-[url('/textures/paper.png')] opacity-5" />

        {/* 欧洲地图轮廓（淡化） */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            {/* 简化的欧洲地图轮廓 */}
            <path
              d="M 200 100 L 400 120 L 450 200 L 500 250 L 480 350 L 350 380 L 250 320 L 200 250 Z"
              fill="none"
              stroke="#d4c5a9"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* 内容容器 */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 text-center">
          {/* 日期标签 */}
          <motion.div
            className="inline-block px-4 py-2 mb-6 border-2 border-[#8b2020] bg-black/30"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#8b2020] font-mono text-sm tracking-wider">
              1914 - 1918
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            className={`${inHome ? 'text-4xl md:text-5xl mb-4' : 'text-6xl md:text-8xl mb-6'} font-bold text-[#d4c5a9] tracking-tight`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('hero.cover.title')}
          </motion.h1>

          {/* 英文副标题 */}
          <motion.p
            className={`${inHome ? 'text-lg md:text-xl mb-4' : 'text-xl md:text-2xl mb-8'} text-[#d4c5a9]/70 font-serif italic`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t('hero.cover.subtitle')}
          </motion.p>

          {/* 分隔线 */}
          <motion.div
            className={`w-32 h-px bg-[#8b2020] ${inHome ? 'mb-4' : 'mb-8'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8 }}
          />

          {/* 描述 */}
          <motion.p
            className={`max-w-2xl ${inHome ? 'text-base md:text-lg' : 'text-lg md:text-xl'} text-gray-400 leading-relaxed`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {t('hero.cover.description1')}
            <br />
            {t('hero.cover.description2')}
          </motion.p>

          {/* 参战人数统计 */}
          <motion.div
            className={`${inHome ? 'mt-6 gap-8' : 'mt-12 gap-12'} flex text-center`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div>
              <div className={`${inHome ? 'text-2xl md:text-3xl' : 'text-4xl'} font-bold text-[#8b2020] mb-2`}>{t('hero.cover.mobilizedCount')}</div>
              <div className="text-sm text-gray-500 tracking-wide">{t('hero.cover.mobilized')}</div>
            </div>
            <div className="w-px bg-gray-700" />
            <div>
              <div className={`${inHome ? 'text-2xl md:text-3xl' : 'text-4xl'} font-bold text-[#8b2020] mb-2`}>{t('hero.cover.daysToGlobalCount')}</div>
              <div className="text-sm text-gray-500 tracking-wide">{t('hero.cover.daysToGlobal')}</div>
            </div>
          </motion.div>

          {/* Hover 提示 */}
          {inHome && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
            >
              {t('hero.cover.clickToRead')}
            </motion.div>
          )}
        </div>

        {/* 边缘磨损效果 */}
        <div className="absolute inset-0 border-4 border-[#2a2a2a]/50 pointer-events-none" />
      </motion.div>
    </Link>
  )
}
