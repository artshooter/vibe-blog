'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
  const t = useTranslations('chinese-class')

  const content = (
    <div
      className={`relative w-full ${inHome ? 'h-[200px]' : 'h-[50vh] min-h-[400px]'} overflow-hidden flex flex-col justify-center items-center text-center px-8 transition-colors duration-500 ${inHome ? 'cursor-pointer hover:bg-white' : ''} bg-[#f5f5f7]`}
    >
      {/* Minimalist Background - subtle grid removed or kept very faint */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`${inHome ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'} font-bold text-gray-900 mb-4 tracking-tight`}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <p className={`${inHome ? 'text-sm text-gray-600' : 'text-lg md:text-xl text-gray-600'} max-w-2xl mx-auto leading-relaxed font-light`}>
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Minimalist divider */}
        {!inHome && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-gray-300 mx-auto mt-8"
          />
        )}
      </div>
    </div>
  )

  if (inHome) {
    return (
      <Link href="/chinese-class" className="block group" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}
