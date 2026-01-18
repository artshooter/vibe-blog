'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
  const t = useTranslations('three-ways-to-evaluate-ai-skills')

  const content = (
    <div
      className={`relative w-full ${inHome ? 'h-[200px]' : 'h-[50vh] min-h-[400px]'} overflow-hidden flex flex-col justify-center items-center text-center px-8 transition-colors duration-500 ${inHome ? 'cursor-pointer group' : ''}`}
      style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)' }}
    >
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`${inHome ? 'text-xl md:text-1xl' : 'text-3xl md:text-5xl'} font-bold text-white mb-4 tracking-tight`}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className={`${inHome ? 'text-sm text-white/60' : 'text-lg md:text-xl text-white/70'} max-w-2xl mx-auto leading-relaxed font-light`}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* 三个维度标签 */}
        {!inHome && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {['dimension1', 'dimension2', 'dimension3'].map((key, i) => (
              <span
                key={key}
                className="px-4 py-1.5 bg-white/10 text-white/80 text-sm rounded-full border border-white/20"
              >
                {t(`hero.${key}`)}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Hover effect for home card */}
      {inHome && (
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
      )}
    </div>
  )

  if (inHome) {
    return (
      <Link href="/three-ways-to-evaluate-ai-skills" className="block group" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}
