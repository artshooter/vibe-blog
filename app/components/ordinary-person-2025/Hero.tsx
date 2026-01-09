'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
  const t = useTranslations('ordinary-person-2025')

  const content = (
    <motion.div
      className={`relative w-full ${inHome ? 'h-[200px]' : 'min-h-[60vh]'} bg-[#FDFBF7] overflow-hidden ${inHome ? 'cursor-pointer group' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 纸张纹理背景 */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 内容 */}
      <div className={`relative z-10 h-full flex flex-col justify-center items-center px-8 text-center ${inHome ? '' : 'py-20'}`}>
        {/* 年份标签 */}
        <motion.div
          className={inHome ? 'mb-2' : 'mb-4'}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className={`text-[#81B29A] ${inHome ? 'text-xs' : 'text-sm'} tracking-[0.3em] font-light`}>
            {t('hero.year')}
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          className={`${inHome ? 'text-2xl md:text-3xl mb-2' : 'text-4xl md:text-5xl mb-4'} text-[#3D3D3D] tracking-wide font-light`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* 手绘下划线效果 */}
        <motion.div
          className={`${inHome ? 'w-16 mb-3' : 'w-24 mb-6'} h-[2px]`}
          style={{
            background: 'linear-gradient(90deg, transparent, #E07A5F 20%, #E07A5F 80%, transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        {/* 副标题 */}
        <motion.p
          className={`max-w-md ${inHome ? 'text-xs md:text-sm line-clamp-2' : 'text-base md:text-lg'} text-[#3D3D3D]/70 leading-relaxed font-light`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* 时间线预览 - 仅在非首页显示 */}
        {!inHome && (
          <motion.div
            className="mt-12 flex items-center gap-6 text-[#81B29A]/80 text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span>{t('hero.june')}</span>
            <div className="w-16 h-[1px] bg-[#81B29A]/40" />
            <span>{t('hero.september')}</span>
            <div className="w-16 h-[1px] bg-[#81B29A]/40" />
            <span>{t('hero.december')}</span>
          </motion.div>
        )}

        {/* Hover 提示 */}
        {inHome && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#3D3D3D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {t('hero.clickToRead')}
          </motion.div>
        )}
      </div>
    </motion.div>
  )

  if (inHome) {
    return (
      <Link href="/ordinary-person-2025" className="block" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}
