'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

interface Stage {
  year: string
  title: string
  subtitle: string
  description: string
  icon: string
}

export default function WarStages() {
  const t = useTranslations('world-war-one')

  const stages: Stage[] = [
    {
      year: t('phases.stage1.year'),
      title: t('phases.stage1.title'),
      subtitle: t('phases.stage1.subtitle'),
      description: t('phases.stage1.description'),
      icon: '🔥',
    },
    {
      year: t('phases.stage2.year'),
      title: t('phases.stage2.title'),
      subtitle: t('phases.stage2.subtitle'),
      description: t('phases.stage2.description'),
      icon: '⚔️',
    },
    {
      year: t('phases.stage3.year'),
      title: t('phases.stage3.title'),
      subtitle: t('phases.stage3.subtitle'),
      description: t('phases.stage3.description'),
      icon: '🔄',
    },
    {
      year: t('phases.stage4.year'),
      title: t('phases.stage4.title'),
      subtitle: t('phases.stage4.subtitle'),
      description: t('phases.stage4.description'),
      icon: '🏳️',
    },
  ]
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
            {t('phases.title')}
          </h3>
          <p className="text-gray-400">{t('phases.subtitle')}</p>
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
