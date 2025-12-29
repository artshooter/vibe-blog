'use client'

import { useTranslations } from 'next-intl'

export default function HeroCompact() {
  const t = useTranslations('kong-yiji')

  return (
    <div className="bg-[#F8F4E8] p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'serif' }}>
        {t('hero.title')}
      </h2>
      <p className="text-[#4A4A4A] italic" style={{ fontFamily: 'serif' }}>
        {t('hero.subtitle')}
      </p>
    </div>
  )
}
