'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

export default function Hero({ inHome = false }: { inHome?: boolean }) {
  const t = useTranslations('mnist-neural-network')
  const [cursorVisible, setCursorVisible] = useState(true)

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const content = (
    <section className={`relative ${inHome ? 'h-[200px]' : 'min-h-screen'} flex items-center justify-center overflow-hidden bg-[#1a1a1a] px-4`}>
      {/* Scanline effect (subtle) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_4px] opacity-30"></div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Login banner */}
        {!inHome && (
          <motion.div
            className="mb-8 font-mono text-sm text-[#6272a4]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('hero.loginBanner')}
          </motion.div>
        )}

        {/* ASCII Art Title - hidden on home page for space */}
        {!inHome && (
          <motion.pre
            className="mb-6 font-mono text-[#50fa7b] text-xs md:text-sm overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {` __  __ _   _ ___ ____ _____
|  \\/  | \\ | |_ _/ ___|_   _|
| |\\/| |  \\| || |\\___ \\ | |
| |  | | |\\  || | ___) || |
|_|  |_|_| \\_|___|____/ |_|  `}
          </motion.pre>
        )}

        {/* Simple title for home page */}
        {inHome && (
          <motion.h2
            className="mb-3 font-mono text-2xl md:text-3xl text-[#50fa7b] font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MNIST
          </motion.h2>
        )}

        {/* Subtitle */}
        <motion.div
          className={`${inHome ? 'mb-4' : 'mb-8'} font-mono ${inHome ? 'text-sm md:text-base' : 'text-base md:text-lg'} text-white`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: inHome ? 0.2 : 0.6, duration: inHome ? 0.5 : 0.8 }}
        >
          {t('hero.subtitle')}
        </motion.div>

        {/* Command prompt */}
        {!inHome && (
          <motion.div
            className="mb-4 font-mono text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <span className="text-[#50fa7b]">user@neural-network</span>
            <span className="text-white">:</span>
            <span className="text-[#8be9fd]">~</span>
            <span className="text-white">$ </span>
            <span className="text-white">./mnist_tutorial.sh</span>
            {cursorVisible && (
              <span className="ml-1 inline-block h-4 w-2 bg-white"></span>
            )}
          </motion.div>
        )}

        {/* Description for home page */}
        {inHome && (
          <motion.div
            className="mb-4 font-mono text-xs text-[#e5e7eb]/80 leading-relaxed line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('metadata.description')}
          </motion.div>
        )}

        {/* Loading bar - only show on detail page */}
        {!inHome && (
          <>
            <motion.div
              className="mb-6 font-mono text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="text-[#e5e7eb]">{t('hero.initializing')}</div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-2 bg-[#0d0d0d] rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-[#50fa7b]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.5, duration: 1.5, ease: 'easeInOut' }}
                  />
                </div>
                <motion.span
                  className="text-[#50fa7b]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 0.3 }}
                >
                  100%
                </motion.span>
              </div>
            </motion.div>

            {/* Ready message */}
            <motion.div
              className="font-mono text-sm text-[#50fa7b]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            >
              {t('hero.ready')}
            </motion.div>

            {/* Help text */}
            <motion.div
              className="mt-8 font-mono text-xs text-[#6272a4]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.5 }}
            >
              # {t('hero.helpText')}
            </motion.div>
          </>
        )}

        {/* Scroll indicator */}
        {!inHome && (
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
          >
            <div className="font-mono text-xs text-[#6272a4]">
              {t('hero.scrollHint')}
            </div>
            <motion.div
              className="h-8 w-5 rounded-full border-2 border-[#50fa7b] flex items-start justify-center p-1"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-[#50fa7b]"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Click to read indicator for home page */}
        {inHome && (
          <motion.div
            className="mt-4 font-mono text-xs text-[#50fa7b]/60 group-hover:text-[#f1fa8c] transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {t('hero.clickToRead')}
          </motion.div>
        )}
      </div>
    </section>
  )

  if (inHome) {
    return (
      <Link href="/mnist-neural-network" className="block group" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}
