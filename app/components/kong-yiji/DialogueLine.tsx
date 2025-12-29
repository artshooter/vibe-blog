'use client'

import { motion } from 'framer-motion'
import { Ma_Shan_Zheng } from 'next/font/google'

const brushFont = Ma_Shan_Zheng({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

interface DialogueLineProps {
  text: string
  direction?: 'left' | 'right' | 'down'
  className?: string
}

// 丰子恺风格的对话 - 无边框，用毛笔质感的路径连接人物
export default function DialogueLine({
  text,
  direction = 'left',
  className = '',
}: DialogueLineProps) {
  // 根据方向定义连接线路径
  const getPath = () => {
    switch (direction) {
      case 'left':
        return "M 0 10 Q -10 15, -5 25"
      case 'right':
        return "M 100 10 Q 110 15, 105 25"
      case 'down':
        return "M 50 40 Q 55 50, 45 60"
      default:
        return "M 0 10 Q -10 15, -5 25"
    }
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 对话文字 */}
      <div
        className={`${brushFont.className} text-[#1A1A1A] text-2xl px-2 py-1 relative z-10`}
        style={{
          writingMode: 'horizontal-tb',
        }}
      >
        {text}
      </div>

      {/* SVG 手绘连接线 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ filter: 'url(#ink-brush)' }}
      >
        <motion.path
          d={getPath()}
          stroke="#1A1A1A"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        {/* 线条末端的圆点，也应用笔触效果 */}
        {direction === 'left' && (
          <circle cx="-5" cy="25" r="1.5" fill="#1A1A1A" />
        )}
        {direction === 'right' && (
          <circle cx="105" cy="25" r="1.5" fill="#1A1A1A" />
        )}
        {direction === 'down' && (
          <circle cx="45" cy="60" r="1.5" fill="#1A1A1A" />
        )}
      </svg>
    </motion.div>
  )
}
