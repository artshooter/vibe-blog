'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

interface LadybugProps {
  className?: string
  size?: number
}

export default function Ladybug({ className = '', size = 24 }: LadybugProps) {
  const controls = useAnimation()
  const [isFlying, setIsFlying] = useState(false)
  const isFlyingRef = useRef(false)

  const handleFly = useCallback(async () => {
    if (isFlyingRef.current) return
    isFlyingRef.current = true
    setIsFlying(true)

    // 祈祷一回
    await controls.start({
      rotate: [0, -5, 5, 0],
      scale: [1, 0.95, 1],
      transition: { duration: 0.5 },
    })

    // 支开翅膀，向右上飞行消失
    await controls.start({
      y: -100,
      x: 50,
      rotate: -15,
      opacity: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    })

    // 重置位置并“Duang”地出现一个新的
    await new Promise(resolve => setTimeout(resolve, 500))
    controls.set({
      y: 0,
      x: 0,
      rotate: 0,
      scale: 0.8,
      opacity: 0,
    })
    setIsFlying(false)

    await controls.start({
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        restDelta: 0.001,
      },
    })

    isFlyingRef.current = false
    setIsFlying(false)
  }, [controls])

  const handleHoverStart = () => {
    handleFly()
  }



  return (
    <motion.div
      className={`inline-block cursor-pointer ${className}`}
      animate={controls}
      onClick={handleFly}
      onHoverStart={handleHoverStart}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 翅膀（飞行时展开） */}
        <motion.ellipse
          cx="10"
          cy="20"
          rx="8"
          ry="4"
          fill="#c9a86c"
          opacity="0"
          animate={isFlying ? {
            opacity: [0, 0.6, 0.6],
            rotate: [-30, -30, -30],
          } : { opacity: 0 }}
          style={{ transformOrigin: '20px 20px' }}
        />
        <motion.ellipse
          cx="30"
          cy="20"
          rx="8"
          ry="4"
          fill="#c9a86c"
          opacity="0"
          animate={isFlying ? {
            opacity: [0, 0.6, 0.6],
            rotate: [30, 30, 30],
          } : { opacity: 0 }}
          style={{ transformOrigin: '20px 20px' }}
        />

        {/* 身体 */}
        <ellipse cx="20" cy="22" rx="12" ry="14" fill="#8b3a3a" />

        {/* 中线 */}
        <line x1="20" y1="8" x2="20" y2="36" stroke="#3d3a35" strokeWidth="1" />

        {/* 斑点 */}
        <circle cx="14" cy="16" r="2.5" fill="#3d3a35" />
        <circle cx="26" cy="16" r="2.5" fill="#3d3a35" />
        <circle cx="12" cy="24" r="2" fill="#3d3a35" />
        <circle cx="28" cy="24" r="2" fill="#3d3a35" />
        <circle cx="15" cy="30" r="2" fill="#3d3a35" />
        <circle cx="25" cy="30" r="2" fill="#3d3a35" />

        {/* 头 */}
        <circle cx="20" cy="6" r="5" fill="#3d3a35" />

        {/* 触角 */}
        <path d="M17 3 Q14 0 12 2" stroke="#3d3a35" strokeWidth="1" fill="none" />
        <path d="M23 3 Q26 0 28 2" stroke="#3d3a35" strokeWidth="1" fill="none" />

        {/* 腿 */}
        <motion.g
          animate={!isFlying ? {
            rotate: [0, 2, -2, 0],
          } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ transformOrigin: '20px 22px' }}
        >
          <path d="M10 18 L4 14" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M10 22 L3 22" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M10 26 L4 30" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M30 18 L36 14" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M30 22 L37 22" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M30 26 L36 30" stroke="#3d3a35" strokeWidth="1.5" />
        </motion.g>
      </svg>
    </motion.div>
  )
}
