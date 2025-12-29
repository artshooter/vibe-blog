'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'

interface DewdropProps {
  className?: string
  size?: number
}

export default function Dewdrop({ className = '', size = 60 }: DewdropProps) {
  const controls = useAnimation()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleInteraction = async () => {
    if (isAnimating) return
    setIsAnimating(true)

    // 重置
    setParticles([])
    await controls.start({
      y: 0,
      x: 0,
      scale: 0.6,
      opacity: 1,
      transition: { duration: 0 },
    })

    // 在草叶上滚动
    await controls.start({
      x: [0, 5, 10, 15],
      y: [0, 2, 5, 8],
      scale: [0.6, 0.7, 0.85, 1],
      transition: { duration: 1.5, ease: 'easeOut' },
    })

    // 聚集，压弯草叶
    await controls.start({
      scale: 1.2,
      y: 12,
      transition: { duration: 0.5, ease: 'easeIn' },
    })

    // 轰然坠地
    await controls.start({
      y: 40,
      scale: 0.5,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    })

    // 摔开万道金光
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.cos((i * Math.PI * 2) / 8) * 20,
        y: Math.sin((i * Math.PI * 2) / 8) * 15 + 40,
      }))
    )

    await new Promise(resolve => setTimeout(resolve, 800))
    setParticles([])

    // 重置回初始状态
    await controls.start({
      y: 0,
      x: 0,
      scale: 0.8,
      opacity: 1,
      transition: { duration: 0.3 },
    })

    setIsAnimating(false)
  }

  return (
    <div
      className={`relative inline-block cursor-pointer ${className}`}
      style={{ width: size, height: size + 20 }}
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
    >
      {/* 草叶 */}
      <svg
        width={size}
        height={size + 20}
        viewBox="0 0 60 80"
        fill="none"
        className="absolute inset-0"
      >
        <motion.path
          d="M30 75 Q25 50 35 30 Q40 20 35 10"
          stroke="#6b7c5e"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={isAnimating ? {
            d: [
              'M30 75 Q25 50 35 30 Q40 20 35 10',
              'M30 75 Q25 50 35 35 Q38 25 33 15',
              'M30 75 Q25 50 35 30 Q40 20 35 10',
            ],
          } : {}}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </svg>

      {/* 露水 */}
      <motion.div
        className="absolute"
        style={{ left: 28, top: 8 }}
        animate={controls}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <defs>
            <radialGradient id="dewGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#fff8e7" />
              <stop offset="100%" stopColor="#c9a86c" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          <circle cx="8" cy="8" r="6" fill="url(#dewGradient)" />
          <circle cx="5" cy="5" r="2" fill="#ffffff" opacity="0.8" />
        </svg>
      </motion.div>

      {/* 金光粒子 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-[#c9a86c]"
          style={{ left: 30, top: 8 }}
          initial={{ opacity: 0, x: 0, y: 40, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: particle.x,
            y: particle.y,
            scale: [0, 1, 0.5],
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
