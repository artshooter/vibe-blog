'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

type AreaId = 'altar' | 'cypress' | 'hall' | 'grass' | 'wall' | 'path'

interface Area {
  id: AreaId
  path: string
  center: { x: number; y: number }
}

const areas: Area[] = [
  {
    id: 'altar',
    path: 'M180 120 L220 120 L220 180 L180 180 Z',
    center: { x: 200, y: 150 },
  },
  {
    id: 'cypress',
    path: 'M250 100 Q280 80 320 100 Q340 130 320 160 Q280 180 250 160 Q230 130 250 100',
    center: { x: 285, y: 130 },
  },
  {
    id: 'hall',
    path: 'M80 160 L130 160 L130 200 L80 200 Z',
    center: { x: 105, y: 180 },
  },
  {
    id: 'grass',
    path: 'M140 200 Q200 190 260 200 Q270 240 260 280 Q200 290 140 280 Q130 240 140 200',
    center: { x: 200, y: 240 },
  },
  {
    id: 'wall',
    path: 'M300 200 L340 200 L340 260 L300 260 Z',
    center: { x: 320, y: 230 },
  },
  {
    id: 'path',
    path: 'M120 240 Q160 220 200 240 Q240 260 280 240 Q300 250 320 240',
    center: { x: 200, y: 245 },
  },
]

export default function GardenMap() {
  const t = useTranslations('me-and-ditan.map')
  const [activeArea, setActiveArea] = useState<AreaId | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="my-16 relative">
      {/* 标题 */}
      <h3 className="text-center text-[#6b7c5e] text-sm tracking-[0.3em] mb-6">
        {t('title')}
      </h3>

      {/* 地图容器 */}
      <div className="relative max-w-lg mx-auto">
        <svg
          viewBox="0 0 400 340"
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          {/* 背景 */}
          <rect x="40" y="60" width="320" height="260" fill="#f5f2eb" stroke="#e8e2d5" strokeWidth="2" rx="4" />

          {/* 园墙纹理 */}
          <rect x="40" y="60" width="320" height="260" fill="none" stroke="#d4cfc4" strokeWidth="1" strokeDasharray="4 2" rx="4" />

          {/* 古柏树 - 装饰性圆点 */}
          {[
            { x: 260, y: 110 }, { x: 280, y: 100 }, { x: 300, y: 115 },
            { x: 255, y: 135 }, { x: 275, y: 130 }, { x: 295, y: 140 }, { x: 315, y: 125 },
            { x: 265, y: 155 }, { x: 285, y: 150 }, { x: 305, y: 158 },
          ].map((pos, i) => (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r="8"
              fill="#6b7c5e"
              opacity="0.3"
            />
          ))}

          {/* 可点击区域 */}
          {areas.map((area) => (
            <motion.path
              key={area.id}
              d={area.path}
              fill={activeArea === area.id ? '#c9a86c' : '#e8e2d5'}
              fillOpacity={activeArea === area.id ? 0.4 : 0.2}
              stroke={activeArea === area.id ? '#c9a86c' : '#6b7c5e'}
              strokeWidth={activeArea === area.id ? 2 : 1}
              strokeDasharray={area.id === 'path' ? '4 4' : 'none'}
              className="cursor-pointer"
              whileHover={{ fillOpacity: 0.4 }}
              onClick={() => {
                setActiveArea(area.id)
                setShowTooltip(true)
              }}
            />
          ))}

          {/* 区域标签 */}
          <text x="200" y="155" textAnchor="middle" className="text-xs fill-[#3d3a35]" opacity="0.6">
            {t('labels.altar')}
          </text>
          <text x="285" y="135" textAnchor="middle" className="text-xs fill-[#6b7c5e]" opacity="0.8">
            {t('labels.cypress')}
          </text>
          <text x="105" y="185" textAnchor="middle" className="text-xs fill-[#3d3a35]" opacity="0.6">
            {t('labels.hall')}
          </text>
          <text x="200" y="245" textAnchor="middle" className="text-xs fill-[#6b7c5e]" opacity="0.6">
            {t('labels.grass')}
          </text>
          <text x="320" y="235" textAnchor="middle" className="text-xs fill-[#3d3a35]" opacity="0.6">
            {t('labels.wall')}
          </text>

          {/* 轮椅轨迹 */}
          <motion.path
            d="M120 280 Q140 260 180 270 Q220 280 260 260 Q300 240 320 260"
            fill="none"
            stroke="#3d3a35"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />

          {/* 轮椅图标 */}
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: [0, 200, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="120" cy="280" r="6" fill="#3d3a35" opacity="0.6" />
            <circle cx="120" cy="280" r="3" fill="#f5f2eb" />
          </motion.g>

          {/* 图例 */}
          <g transform="translate(50, 300)">
            <text className="text-[10px] fill-[#3d3a35]" opacity="0.5">
              {t('legend')}
            </text>
          </g>
        </svg>

        {/* 文字浮层 */}
        <AnimatePresence>
          {showTooltip && activeArea && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-[#e8e2d5]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button
                className="absolute top-3 right-3 text-[#6b7c5e] hover:text-[#3d3a35] transition-colors"
                onClick={() => setShowTooltip(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <p
                className="text-[#3d3a35] leading-relaxed pr-6"
                style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif' }}
              >
                {t(`content.${activeArea}`)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 提示 - 保持固定高度避免布局跳动 */}
      <p className={`text-center text-sm mt-4 h-5 ${showTooltip ? 'text-transparent' : 'text-[#6b7c5e]/60'}`}>
        {t('hint')}
      </p>
    </div>
  )
}
