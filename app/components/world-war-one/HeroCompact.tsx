'use client'

import { motion } from 'framer-motion'

export default function HeroCompact() {
  return (
    <motion.div
      className="relative w-full h-[300px] bg-gradient-to-br from-[#2a2a2a] via-[#3a3a3a] to-[#1a1a1a] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 背景纹理 */}
      <div className="absolute inset-0 bg-[url('/textures/paper.png')] opacity-5" />

      {/* 内容 */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
        <motion.div
          className="inline-block px-3 py-1 mb-4 border border-[#8b2020] bg-black/30"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[#8b2020] font-mono text-xs tracking-wider">
            1914 - 1918
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#d4c5a9] mb-3"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          第一次世界大战
        </motion.h2>

        <motion.div
          className="w-16 h-px bg-[#8b2020] mb-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
        />

        <motion.p
          className="text-sm text-gray-400 max-w-md"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          从局部冲突到全球灾难
        </motion.p>
      </div>

      {/* 边框 */}
      <div className="absolute inset-0 border-2 border-[#2a2a2a]/50 pointer-events-none" />
    </motion.div>
  )
}
