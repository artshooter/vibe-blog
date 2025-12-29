'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AntProps {
  className?: string
  size?: number
  direction?: 'left' | 'right'
}

export default function Ant({ className = '', size = 20, direction = 'right' }: AntProps) {
  const controls = useAnimation()
  const [isThinking, setIsThinking] = useState(true)

  useEffect(() => {
    const animate = async () => {
      // 摇头晃脑捋触须
      await controls.start({
        rotate: [0, -5, 5, -3, 3, 0],
        transition: { duration: 2, ease: 'easeInOut' },
      })

      // 猛然间想透了什么
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 },
      })

      setIsThinking(false)

      // 转身疾行而去
      await controls.start({
        x: direction === 'right' ? 200 : -200,
        transition: { duration: 2, ease: 'easeIn' },
      })

      // 重置
      await controls.start({
        x: 0,
        opacity: 0,
        transition: { duration: 0 },
      })

      await new Promise(resolve => setTimeout(resolve, 3000))

      setIsThinking(true)
      await controls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      })
    }

    animate()
    const interval = setInterval(animate, 10000)
    return () => clearInterval(interval)
  }, [controls, direction])

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={controls}
      style={{ transformOrigin: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: direction === 'left' ? 'scaleX(-1)' : 'none' }}
      >
        {/* 触角 */}
        <motion.path
          d="M28 12 Q32 8 35 10"
          stroke="#3d3a35"
          strokeWidth="1.5"
          fill="none"
          animate={isThinking ? {
            d: ['M28 12 Q32 8 35 10', 'M28 12 Q30 6 35 8', 'M28 12 Q32 8 35 10'],
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.path
          d="M28 12 Q34 12 36 16"
          stroke="#3d3a35"
          strokeWidth="1.5"
          fill="none"
          animate={isThinking ? {
            d: ['M28 12 Q34 12 36 16', 'M28 12 Q36 10 38 14', 'M28 12 Q34 12 36 16'],
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
        />

        {/* 头 */}
        <ellipse cx="26" cy="15" rx="6" ry="5" fill="#3d3a35" />

        {/* 胸 */}
        <ellipse cx="18" cy="18" rx="5" ry="4" fill="#3d3a35" />

        {/* 腹 */}
        <ellipse cx="8" cy="20" rx="7" ry="6" fill="#3d3a35" />

        {/* 腿 */}
        <motion.g
          animate={!isThinking ? {
            rotate: [0, 10, -10, 10, -10, 0],
          } : {}}
          transition={{ duration: 0.2, repeat: Infinity }}
          style={{ transformOrigin: '18px 18px' }}
        >
          <path d="M20 18 L26 26" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M18 20 L22 28" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M16 18 L10 26" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M20 16 L26 10" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M16 16 L10 10" stroke="#3d3a35" strokeWidth="1.5" />
          <path d="M18 16 L18 8" stroke="#3d3a35" strokeWidth="1.5" />
        </motion.g>
      </svg>
    </motion.div>
  )
}
