'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function TwoLayers() {
  const t = useTranslations('ordinary-person-2025.twoLayers')

  return (
    <div className="my-12 flex flex-col items-center">
      <h3 className="text-center text-[#81B29A] text-sm tracking-[0.2em] mb-8">
        {t('title')}
      </h3>

      <div className="relative w-full max-w-sm">
        {/* 探索层 */}
        <motion.div
          className="relative z-10 bg-gradient-to-br from-[#81B29A]/20 to-[#81B29A]/10 rounded-xl p-6 mb-[-20px] border border-[#81B29A]/30"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#81B29A] text-sm font-medium mb-2">{t('explore.title')}</div>
          <div className="text-[#3D3D3D]/70 text-sm leading-relaxed">
            {t('explore.desc')}
          </div>
        </motion.div>

        {/* 支撑层 */}
        <motion.div
          className="relative bg-gradient-to-br from-[#E07A5F]/20 to-[#E07A5F]/10 rounded-xl p-6 pt-8 border border-[#E07A5F]/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-[#E07A5F] text-sm font-medium mb-2">{t('support.title')}</div>
          <div className="text-[#3D3D3D]/70 text-sm leading-relaxed">
            {t('support.desc')}
          </div>
        </motion.div>
      </div>

      <p className="text-center text-[#3D3D3D]/50 text-xs mt-6 max-w-xs">
        {t('note')}
      </p>
    </div>
  )
}
