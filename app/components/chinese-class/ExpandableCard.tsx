'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ExpandableCardProps {
  title: string
  content: string | string[]
  details: string[]
}

export default function ExpandableCard({ title, content, details }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600'}`}>
            <span className="text-sm font-bold">{isOpen ? '-' : '+'}</span>
          </div>
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-gray-900' : 'text-gray-400'}`}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="text-gray-700 leading-relaxed mb-4">
                  {Array.isArray(content) ? (
                    content.map((para, idx) => (
                      <p key={idx} className="mb-3 last:mb-0">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p>{content}</p>
                  )}
                </div>

                <ol className="space-y-3 mt-4">
                  {details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.1 }}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
