'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
  const t = useTranslations('me-and-ditan')

  const content = (
    <motion.div
      className={`relative w-full ${inHome ? 'h-[400px]' : 'min-h-[70vh]'} bg-[#f5f2eb] overflow-hidden ${inHome ? 'cursor-pointer group' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 斑驳光影效果 - 多层渐变叠加 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 主光斑 */}
        <div
          className="absolute top-[10%] right-[20%] w-[300px] h-[400px] bg-gradient-radial from-[#fff8e7]/60 via-[#fff8e7]/20 to-transparent rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,248,231,0.6) 0%, rgba(255,248,231,0.2) 40%, transparent 70%)'
          }}
        />
        {/* 次光斑 */}
        <div
          className="absolute bottom-[20%] left-[10%] w-[200px] h-[300px] bg-gradient-radial from-[#fff8e7]/40 to-transparent rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,248,231,0.4) 0%, transparent 60%)'
          }}
        />
        {/* 树影效果 */}
        <div
          className="absolute top-0 left-[30%] w-[150px] h-full opacity-[0.08]"
          style={{
            background: 'linear-gradient(180deg, #6b7c5e 0%, transparent 100%)',
            clipPath: 'polygon(50% 0%, 30% 100%, 70% 100%)',
          }}
        />
        <div
          className="absolute top-0 right-[25%] w-[100px] h-[80%] opacity-[0.06]"
          style={{
            background: 'linear-gradient(180deg, #6b7c5e 0%, transparent 100%)',
            clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)',
          }}
        />
      </div>

      {/* 内容 */}
      <div className={`relative z-10 h-full flex flex-col justify-center items-center px-8 text-center ${inHome ? '' : 'py-20'}`}>
        {/* 作者标签 */}
        <motion.div
          className="mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-[#6b7c5e] text-sm tracking-[0.3em] font-light">
            {t('hero.author')}
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          className={`${inHome ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'} font-serif text-[#2a2725] tracking-wider mb-6`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif' }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* 分隔线 */}
        <motion.div
          className="w-16 h-[1px] bg-[#c9a86c] mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        />

        {/* 副标题/引言 */}
        <motion.p
          className={`max-w-xl ${inHome ? 'text-base md:text-lg' : 'text-lg md:text-xl'} text-[#3d3a35]/80 leading-relaxed font-light`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* 时间标记 */}
        {!inHome && (
          <motion.div
            className="mt-12 flex items-center gap-8 text-[#6b7c5e]/70"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-2xl font-light">{t('hero.yearsWaiting')}</div>
              <div className="text-xs tracking-wider mt-1">{t('hero.yearsWaitingLabel')}</div>
            </div>
            <div className="w-[1px] h-8 bg-[#c9a86c]/40" />
            <div className="text-center">
              <div className="text-2xl font-light">{t('hero.yearsCompanion')}</div>
              <div className="text-xs tracking-wider mt-1">{t('hero.yearsCompanionLabel')}</div>
            </div>
          </motion.div>
        )}

        {/* Hover 提示 */}
        {inHome && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-[#6b7c5e]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {t('hero.clickToRead')}
          </motion.div>
        )}
      </div>

      {/* 底部渐变 */}
      {!inHome && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f5f2eb] to-transparent" />
      )}
    </motion.div>
  )

  if (inHome) {
    return (
      <Link href="/me-and-ditan" className="block" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}
