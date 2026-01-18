'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DimensionCardProps {
  number: number
  title: string
  children: ReactNode
  color: string
  delay?: number
}

export default function DimensionCard({ number, title, children, color, delay = 0 }: DimensionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      {/* 维度编号 */}
      <div
        className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
        style={{ backgroundColor: color }}
      >
        {number}
      </div>

      {/* 标题 */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-2">
        {title}
      </h3>

      {/* 内容 */}
      <div className="text-gray-600 leading-relaxed space-y-4">
        {children}
      </div>

      {/* 底部装饰线 */}
      <div
        className="absolute bottom-0 left-6 right-6 h-1 rounded-full opacity-20"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}
