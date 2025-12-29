'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'

interface CicadaShellProps {
  className?: string
  size?: number
}

export default function CicadaShell({ className = '', size = 28 }: CicadaShellProps) {
  const controls = useAnimation()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleInteraction = async () => {
    if (isAnimating) return
    setIsAnimating(true)

    // 寂寞如一间空屋 - 轻微晃动，透明度变化，像风吹过
    await controls.start({
      opacity: [0.5, 0.8, 0.9, 0.7, 0.5],
      rotate: [0, 2, -1, 1, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 2, ease: 'easeInOut' },
    })

    setIsAnimating(false)
  }

  return (
    <motion.div
      className={`inline-block cursor-pointer ${className}`}
      initial={{ opacity: 0.5 }}
      animate={controls}
      onClick={handleInteraction}
      onHoverStart={handleInteraction}
      whileHover={{ scale: 1.05 }}
    >
      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 40 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 蝉蜕 - 空壳，半透明 */}
        <defs>
          <linearGradient id="shellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a86c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b7355" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 头部 */}
        <ellipse cx="20" cy="10" rx="10" ry="8" fill="url(#shellGradient)" stroke="#a08060" strokeWidth="0.5" />

        {/* 眼睛（空洞） */}
        <circle cx="14" cy="8" r="3" fill="none" stroke="#a08060" strokeWidth="0.5" opacity="0.6" />
        <circle cx="26" cy="8" r="3" fill="none" stroke="#a08060" strokeWidth="0.5" opacity="0.6" />

        {/* 胸部 */}
        <ellipse cx="20" cy="22" rx="12" ry="8" fill="url(#shellGradient)" stroke="#a08060" strokeWidth="0.5" />

        {/* 腹部 */}
        <path
          d="M8 22 Q6 35 12 48 Q20 56 28 48 Q34 35 32 22"
          fill="url(#shellGradient)"
          stroke="#a08060"
          strokeWidth="0.5"
        />

        {/* 腹部纹路 */}
        <path d="M10 28 Q20 30 30 28" stroke="#a08060" strokeWidth="0.3" fill="none" opacity="0.5" />
        <path d="M11 34 Q20 36 29 34" stroke="#a08060" strokeWidth="0.3" fill="none" opacity="0.5" />
        <path d="M13 40 Q20 42 27 40" stroke="#a08060" strokeWidth="0.3" fill="none" opacity="0.5" />

        {/* 裂缝（蝉脱壳的痕迹） */}
        <path
          d="M20 14 L20 20"
          stroke="#a08060"
          strokeWidth="0.5"
          strokeDasharray="2 1"
          opacity="0.6"
        />

        {/* 腿的残留 */}
        <path d="M8 20 L2 16" stroke="#a08060" strokeWidth="0.5" opacity="0.4" />
        <path d="M8 24 L1 24" stroke="#a08060" strokeWidth="0.5" opacity="0.4" />
        <path d="M8 28 L2 32" stroke="#a08060" strokeWidth="0.5" opacity="0.4" />
        <path d="M32 20 L38 16" stroke="#a08060" strokeWidth="0.5" opacity="0.4" />
        <path d="M32 24 L39 24" stroke="#a08060" strokeWidth="0.5" opacity="0.4" />
        <path d="M32 28 L38 32" stroke="#a08060" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </motion.div>
  )
}
