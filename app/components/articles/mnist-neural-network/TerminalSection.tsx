'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TerminalSectionProps {
  command: string
  title: string
  children: ReactNode
}

export default function TerminalSection({ command, title, children }: TerminalSectionProps) {
  return (
    <motion.section
      className="my-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Command prompt */}
      <div className="mb-6 font-mono text-sm md:text-base">
        <span className="text-[#50fa7b]">$ </span>
        <span className="text-white">{command}</span>
      </div>

      {/* Title */}
      <h2 className="mb-8 text-2xl md:text-4xl font-bold text-white">
        {title}
      </h2>

      {/* Content */}
      <div className="text-sm md:text-base">
        {children}
      </div>

      {/* Divider */}
      <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#6272a4]/30 to-transparent" />
    </motion.section>
  )
}
