'use client'

import { motion } from 'framer-motion'

interface BeeProps {
  className?: string
  size?: number
}

export default function Bee({ className = '', size = 24 }: BeeProps) {
  return (
    <motion.div
      className={`inline-block cursor-pointer ${className}`}
      animate={{
        y: [0, -4, 0, -2, 0],
        x: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.2,
        x: [0, 5, -5, 3, 0],
        transition: { duration: 0.5 },
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 翅膀 */}
        <motion.ellipse
          cx="14"
          cy="16"
          rx="6"
          ry="4"
          fill="#e8e2d5"
          opacity="0.7"
          animate={{
            scaleY: [1, 0.7, 1],
            opacity: [0.7, 0.4, 0.7],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
          }}
        />
        <motion.ellipse
          cx="26"
          cy="16"
          rx="6"
          ry="4"
          fill="#e8e2d5"
          opacity="0.7"
          animate={{
            scaleY: [1, 0.7, 1],
            opacity: [0.7, 0.4, 0.7],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            delay: 0.05,
          }}
        />
        {/* 身体 */}
        <ellipse cx="20" cy="22" rx="8" ry="10" fill="#c9a86c" />
        {/* 条纹 */}
        <rect x="12" y="18" width="16" height="2" fill="#3d3a35" opacity="0.6" />
        <rect x="12" y="23" width="16" height="2" fill="#3d3a35" opacity="0.6" />
        <rect x="12" y="28" width="16" height="2" fill="#3d3a35" opacity="0.6" />
        {/* 头 */}
        <circle cx="20" cy="10" r="5" fill="#3d3a35" />
        {/* 触角 */}
        <path
          d="M17 6 Q15 2 13 3"
          stroke="#3d3a35"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M23 6 Q25 2 27 3"
          stroke="#3d3a35"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </motion.div>
  )
}
