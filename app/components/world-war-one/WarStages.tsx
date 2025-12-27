'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Stage {
  year: string
  title: string
  subtitle: string
  description: string
  icon: string
}

const stages: Stage[] = [
  {
    year: '1914',
    title: '战火初燃',
    subtitle: 'Initial Outbreak',
    description:
      '战争爆发初期，各国怀揣速决战的幻想。西线在马恩河战役后陷入僵局，双方开始挖掘战壕。',
    icon: '🔥',
  },
  {
    year: '1915-1916',
    title: '僵持',
    subtitle: 'Stalemate',
    description:
      '西线进入全面堑壕战。凡尔登战役、索姆河战役带来巨大伤亡，但进展甚微。这是残酷的消耗战。',
    icon: '⚔️',
  },
  {
    year: '1917',
    title: '变局',
    subtitle: 'Turning Point',
    description:
      '沙俄退出协约国，美国参战。两大决定性事件对战争格局产生根本性改变。',
    icon: '🔄',
  },
  {
    year: '1918',
    title: '溃败',
    subtitle: 'Collapse',
    description:
      '同盟国在协约国反攻下节节败退。11月11日签署停战协定，第一次世界大战正式结束。',
    icon: '🏳️',
  },
]

export default function WarStages() {
  return (
    <div className="w-full py-16 px-4 md:px-8 bg-black/30">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#d4c5a9] mb-4">
            战争进程
          </h3>
          <p className="text-gray-400">四年战争的演变历程</p>
        </motion.div>

        {/* 时间线 */}
        <div className="relative">
          {/* 垂直线 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800" />

          {/* 阶段列表 */}
          {stages.map((stage, index) => (
            <StageItem key={index} stage={stage} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StageItem({ stage, index }: { stage: Stage; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="relative mb-16 last:mb-0"
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* 桌面端：左右交替布局 */}
      <div className="hidden md:flex items-center">
        {isLeft ? (
          <>
            {/* 左侧内容 */}
            <div className="w-1/2 pr-12 text-right">
              <StageContent stage={stage} />
            </div>
            {/* 中心节点 */}
            <StageNode stage={stage} isInView={isInView} />
            {/* 右侧空白 */}
            <div className="w-1/2" />
          </>
        ) : (
          <>
            {/* 左侧空白 */}
            <div className="w-1/2" />
            {/* 中心节点 */}
            <StageNode stage={stage} isInView={isInView} />
            {/* 右侧内容 */}
            <div className="w-1/2 pl-12">
              <StageContent stage={stage} />
            </div>
          </>
        )}
      </div>

      {/* 移动端：统一靠右布局 */}
      <div className="md:hidden flex items-start">
        {/* 节点 */}
        <div className="flex-shrink-0">
          <StageNode stage={stage} isInView={isInView} mobile />
        </div>
        {/* 内容 */}
        <div className="ml-6 flex-1">
          <StageContent stage={stage} />
        </div>
      </div>
    </motion.div>
  )
}

function StageNode({
  stage,
  isInView,
  mobile = false,
}: {
  stage: Stage
  isInView: boolean
  mobile?: boolean
}) {
  return (
    <div className={`relative ${mobile ? '' : 'flex-shrink-0'}`}>
      {/* 外圈动画 */}
      {isInView && (
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-[#8b2020]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      )}

      {/* 节点 */}
      <motion.div
        className="relative w-16 h-16 rounded-full bg-[#8b2020] border-4 border-black flex items-center justify-center text-2xl"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {stage.icon}
      </motion.div>
    </div>
  )
}

function StageContent({ stage }: { stage: Stage }) {
  return (
    <div>
      {/* 年份 */}
      <div className="text-[#8b2020] font-mono text-sm mb-2">{stage.year}</div>

      {/* 标题 */}
      <h4 className="text-2xl font-bold text-[#d4c5a9] mb-1">{stage.title}</h4>

      {/* 英文副标题 */}
      <p className="text-gray-500 italic text-sm mb-3">{stage.subtitle}</p>

      {/* 描述 */}
      <p className="text-gray-400 leading-relaxed">{stage.description}</p>
    </div>
  )
}
