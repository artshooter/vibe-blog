'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function GameUseCases() {
  const t = useTranslations('chinese-class')

  const items = [
    {
      title: t('content.section1.items.item1'),
      icon: '💬',
      gradient: 'from-[#8b5cf6] to-[#6d28d9]', // Purple gradient
      shadowColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
      title: t('content.section1.items.item2'),
      icon: '🎭',
      gradient: 'from-[#3b82f6] to-[#1d4ed8]', // Blue gradient
      shadowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      title: t('content.section1.items.item3'),
      icon: '💝',
      gradient: 'from-[#f59e0b] to-[#d97706]', // Amber/Gold gradient
      shadowColor: 'rgba(245, 158, 11, 0.3)'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`relative p-6 rounded-xl text-center cursor-default group overflow-hidden bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          {/* Subtle background wash - removed */}
          <div className={`absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

          <div className="relative z-10">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl text-white shadow-lg`}>
              {item.icon}
            </div>
            <p className="font-bold text-gray-800 text-lg group-hover:text-gray-900 transition-colors">{item.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
