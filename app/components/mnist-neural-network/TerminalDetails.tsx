'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { useTranslations } from 'next-intl'
import 'katex/dist/katex.min.css'

interface TerminalDetailsProps {
  command: string
  children: ReactNode
  defaultExpanded?: boolean
}

export default function TerminalDetails({
  command,
  children,
  defaultExpanded = false
}: TerminalDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const t = useTranslations('mnist-neural-network')

  return (
    <div className="my-8">
      {/* Collapsed state - clickable command */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="cursor-pointer group"
          onClick={() => setIsExpanded(true)}
        >
          <div className="border border-[#50fa7b]/30 rounded-lg p-4 bg-[#0d0d0d] hover:border-[#50fa7b]/60 transition-colors">
            <div className="font-mono text-sm md:text-base">
              <span className="text-[#50fa7b]">$ </span>
              <span className="text-white group-hover:text-[#50fa7b] transition-colors">
                {command}
              </span>
              <span className="ml-2 text-[#6272a4] text-xs">
                [{t('terminal.clickToExpand')}]
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Expanded state - full content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-[#8be9fd]/30 rounded-lg overflow-hidden bg-[#0d0d0d]"
          >
            {/* Command header */}
            <div className="border-b border-[#6272a4]/30 p-4 bg-[#1a1a1a]">
              <div className="font-mono text-sm md:text-base">
                <span className="text-[#50fa7b]">$ </span>
                <span className="text-white">{command}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-[#e5e7eb] text-sm md:text-base overflow-x-auto">
              <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                {children}
              </div>
            </div>

            {/* Exit command */}
            <div className="border-t border-[#6272a4]/30 p-4 bg-[#1a1a1a]">
              <motion.div
                className="font-mono text-sm md:text-base cursor-pointer group w-fit"
                onClick={() => setIsExpanded(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-[#50fa7b]">$ </span>
                <span className="text-white group-hover:text-[#f1fa8c] transition-colors">
                  exit
                </span>
                <span className="ml-2 text-[#6272a4] text-xs">
                  [{t('terminal.clickToCollapse')}]
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
