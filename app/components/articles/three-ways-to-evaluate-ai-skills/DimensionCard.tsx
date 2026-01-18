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
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="relative mb-12"
    >
      <div className="flex items-start gap-6">
        {/* Step Indicator */}
        <div className="hidden md:flex flex-col items-center pt-2">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay }}
            className="w-px bg-gradient-to-b from-transparent via-slate-200 to-slate-200 mb-2"
          />
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-slate-200"
            style={{ backgroundColor: color }}
          >
            0{number}
          </div>
        </div>

        <div className="flex-1">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center gap-4 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: color }}
            >
              {number}
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              {title}
            </h3>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-4 md:p-2">
            <div className="bg-transparent rounded-[1.8rem] p-6 md:p-8">
              <h3 className="hidden md:block text-2xl font-bold text-slate-800 mb-8 tracking-tight">
                {title}
              </h3>

              <div className="text-slate-600 leading-relaxed">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
