'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const scenes = [
  {
    id: 'sunset',
    gradient: 'from-[#c9a86c]/20 via-[#f5f2eb] to-[#e8e2d5]',
    accent: '#c9a86c',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="45" r="15" fill="currentColor" opacity="0.6" />
        <path d="M5 45 h50" stroke="currentColor" strokeWidth="2" />
        <path d="M15 35 L30 25 L45 35" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'swallow',
    gradient: 'from-[#6b7c5e]/10 via-[#f5f2eb] to-[#e8e2d5]',
    accent: '#6b7c5e',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <path d="M10 30 Q20 20 30 30 Q40 40 50 30" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M15 25 Q25 35 35 25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M25 35 Q35 25 45 35" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'snow',
    gradient: 'from-[#e8e2d5] via-[#f5f2eb] to-[#fff8e7]',
    accent: '#8a9a8a',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="15" cy="45" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="25" cy="42" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="35" cy="46" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="45" cy="43" r="2" fill="currentColor" opacity="0.3" />
        <path d="M20 48 L22 42 L24 48" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'cypress',
    gradient: 'from-[#6b7c5e]/15 via-[#f5f2eb] to-[#e8e2d5]',
    accent: '#4a5d4a',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <path d="M30 10 L20 50 L40 50 Z" fill="currentColor" opacity="0.3" />
        <path d="M30 5 L30 55" stroke="currentColor" strokeWidth="2" />
        <path d="M25 25 L30 20 L35 25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <path d="M22 40 L30 32 L38 40" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'rain',
    gradient: 'from-[#3d3a35]/10 via-[#e8e2d5] to-[#f5f2eb]',
    accent: '#5a6a7a',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <path d="M15 20 L15 45" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M25 15 L25 50" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M35 18 L35 48" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M45 22 L45 42" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <ellipse cx="30" cy="55" rx="20" ry="3" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: 'autumn',
    gradient: 'from-[#c9a86c]/15 via-[#f5f2eb] to-[#e8e2d5]',
    accent: '#a67c52',
    icon: (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <ellipse cx="20" cy="45" rx="8" ry="4" fill="currentColor" opacity="0.3" transform="rotate(-15 20 45)" />
        <ellipse cx="40" cy="48" rx="6" ry="3" fill="currentColor" opacity="0.4" transform="rotate(10 40 48)" />
        <ellipse cx="30" cy="42" rx="7" ry="3.5" fill="currentColor" opacity="0.35" transform="rotate(-5 30 42)" />
        <path d="M25 20 Q30 30 35 25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
]

export default function SeasonScenes() {
  const t = useTranslations('me-and-ditan.scenes')
  const [activeScene, setActiveScene] = useState(0)

  return (
    <div className="my-16">
      {/* 场景展示区 */}
      <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            className={`absolute inset-0 bg-gradient-to-br ${scenes[activeScene].gradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 场景图标 */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
              style={{ color: scenes[activeScene].accent }}
            >
              <div className="scale-[3] md:scale-[5]">
                {scenes[activeScene].icon}
              </div>
            </div>

            {/* 文字内容 */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-[#3d3a35] leading-relaxed max-w-2xl font-light"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif' }}
              >
                {t(`${scenes[activeScene].id}.text`)}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 场景选择器 */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            onClick={() => setActiveScene(index)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
              ${activeScene === index
                ? 'bg-[#3d3a35] text-[#f5f2eb]'
                : 'bg-[#e8e2d5] text-[#3d3a35] hover:bg-[#ddd6c8]'
              }
            `}
          >
            <span
              className="w-5 h-5"
              style={{ color: activeScene === index ? '#f5f2eb' : scene.accent }}
            >
              {scene.icon}
            </span>
            <span className="text-sm">{t(`${scene.id}.label`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
