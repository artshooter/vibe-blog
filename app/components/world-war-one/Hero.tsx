'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
  return (
    <Link href="/world-war-one" className="block">
      <motion.div
        className="relative w-full h-[600px] bg-gradient-to-br from-[#2a2a2a] via-[#3a3a3a] to-[#1a1a1a] overflow-hidden cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 老旧纸张纹理背景 */}
        <div className="absolute inset-0 bg-[url('/textures/paper.png')] opacity-5" />

        {/* 欧洲地图轮廓（淡化） */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            {/* 简化的欧洲地图轮廓 */}
            <path
              d="M 200 100 L 400 120 L 450 200 L 500 250 L 480 350 L 350 380 L 250 320 L 200 250 Z"
              fill="none"
              stroke="#d4c5a9"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* 内容容器 */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 text-center">
          {/* 日期标签 */}
          <motion.div
            className="inline-block px-4 py-2 mb-6 border-2 border-[#8b2020] bg-black/30"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#8b2020] font-mono text-sm tracking-wider">
              1914 - 1918
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-[#d4c5a9] mb-6 tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            第一次世界大战
          </motion.h1>

          {/* 英文副标题 */}
          <motion.p
            className="text-xl md:text-2xl text-[#d4c5a9]/70 mb-8 font-serif italic"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The Great War
          </motion.p>

          {/* 分隔线 */}
          <motion.div
            className="w-32 h-px bg-[#8b2020] mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8 }}
          />

          {/* 描述 */}
          <motion.p
            className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            从萨拉热窝的一声枪响，到改变世界的四年战争。
            <br />
            探索战争如何从局部冲突升级为全球灾难。
          </motion.p>

          {/* 参战人数统计 */}
          <motion.div
            className="mt-12 flex gap-12 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div>
              <div className="text-4xl font-bold text-[#8b2020] mb-2">6700万</div>
              <div className="text-sm text-gray-500 tracking-wide">参战人数</div>
            </div>
            <div className="w-px bg-gray-700" />
            <div>
              <div className="text-4xl font-bold text-[#8b2020] mb-2">7天</div>
              <div className="text-sm text-gray-500 tracking-wide">局部到全球</div>
            </div>
          </motion.div>

          {/* Hover 提示 */}
          {inHome && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
            >
              点击阅读 →
            </motion.div>
          )}
        </div>

        {/* 边缘磨损效果 */}
        <div className="absolute inset-0 border-4 border-[#2a2a2a]/50 pointer-events-none" />
      </motion.div>
    </Link>
  )
}
