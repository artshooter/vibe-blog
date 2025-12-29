'use client'

import { motion } from 'framer-motion'

interface DialogueLineProps {
  text: string
  direction?: 'left' | 'right' | 'down'
  className?: string
}

// 丰子恺风格的对话 - 无边框，用线条连接人物
export default function DialogueLine({
  text,
  direction = 'left',
  className = '',
}: DialogueLineProps) {
  // 根据方向决定线条样式
  const lineStyles = {
    left: 'border-l-2 pl-3 ml-2',
    right: 'border-r-2 pr-3 mr-2',
    down: 'border-t-2 pt-3 mt-2',
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 对话文字 */}
      <div
        className={`text-[#1A1A1A] text-lg ${lineStyles[direction]} border-[#1A1A1A]/40`}
        style={{
          fontFamily: 'serif',
          writingMode: 'horizontal-tb',
        }}
      >
        {/* 引号装饰 */}
        <span className="text-[#8B7355]/60">&ldquo;</span>
        {text}
        <span className="text-[#8B7355]/60">&rdquo;</span>
      </div>

      {/* 连接线的小圆点 */}
      {direction === 'left' && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1A1A1A]/40" />
      )}
      {direction === 'right' && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1A1A1A]/40" />
      )}
      {direction === 'down' && (
        <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1A1A1A]/40" />
      )}
    </motion.div>
  )
}
