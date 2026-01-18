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
      className={`relative w-full ${inHome ? 'h-[200px]' : 'h-[60vh] min-h-[400px]'} overflow-hidden flex flex-col justify-center items-center text-center px-8 transition-all duration-700 bg-slate-50`}
    >
      {/* Background Subtle Geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 flex items-center justify-center">
        <svg className="w-full h-full max-w-5xl" viewBox="0 0 100 100">
          <motion.path
            d="M 50,20 L 80,75 L 20,75 Z"
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50" cy="20" r="1" fill="#0d9488"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="80" cy="75" r="1" fill="#1e3a5f"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="20" cy="75" r="1" fill="#1e3a5f"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-700 text-xs font-medium mb-6 tracking-wider uppercase"
        >
          {t('hero.dimension1')} • {t('hero.dimension2')} • {t('hero.dimension3')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`${inHome ? 'text-xl md:text-2xl' : 'text-3xl md:text-6xl'} font-extrabold text-[#1e3a5f] mb-6 tracking-tight`}
        >
          {t('hero.title')}
        </motion.h1>

        {!inHome && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t('hero.subtitle')}
          </motion.p>
        )}
      </div>

      {/* Hover effect for home card */}
      {inHome && (
        <div className="absolute inset-0 bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/5 transition-colors duration-300" />
      )}
    </div>
  )

  if (inHome) {
    return (
      <Link href="/three-ways-to-evaluate-ai-skills" className="block group border border-slate-200 hover:border-teal-500/30 transition-all duration-500 rounded-2xl overflow-hidden shadow-sm hover:shadow-md" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}
