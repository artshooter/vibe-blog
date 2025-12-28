'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface TimelineEvent {
  date: string
  title: string
  description: string
  country?: string
}

export default function Timeline() {
  const t = useTranslations('world-war-one')

  const events: TimelineEvent[] = [
    {
      date: t('timeline.events.event1.date'),
      title: t('timeline.events.event1.title'),
      description: t('timeline.events.event1.description'),
      country: t('timeline.events.event1.country'),
    },
    {
      date: t('timeline.events.event2.date'),
      title: t('timeline.events.event2.title'),
      description: t('timeline.events.event2.description'),
      country: t('timeline.events.event2.country'),
    },
    {
      date: t('timeline.events.event3.date'),
      title: t('timeline.events.event3.title'),
      description: t('timeline.events.event3.description'),
      country: t('timeline.events.event3.country'),
    },
    {
      date: t('timeline.events.event4.date'),
      title: t('timeline.events.event4.title'),
      description: t('timeline.events.event4.description'),
      country: t('timeline.events.event4.country'),
    },
    {
      date: t('timeline.events.event5.date'),
      title: t('timeline.events.event5.title'),
      description: t('timeline.events.event5.description'),
      country: t('timeline.events.event5.country'),
    },
    {
      date: t('timeline.events.event6.date'),
      title: t('timeline.events.event6.title'),
      description: t('timeline.events.event6.description'),
      country: t('timeline.events.event6.country'),
    },
    {
      date: t('timeline.events.event7.date'),
      title: t('timeline.events.event7.title'),
      description: t('timeline.events.event7.description'),
      country: t('timeline.events.event7.country'),
    },
    {
      date: t('timeline.events.event8.date'),
      title: t('timeline.events.event8.title'),
      description: t('timeline.events.event8.description'),
      country: t('timeline.events.event8.country'),
    },
  ]
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hasStarted, setHasStarted] = useState(false)

  const handleStart = () => {
    setHasStarted(true)
    // 自动播放动画
    let index = 0
    const interval = setInterval(() => {
      setActiveIndex(index)
      index++
      if (index >= events.length) {
        clearInterval(interval)
      }
    }, 2000) // 增加到2秒，让用户有时间阅读
  }

  return (
    <div className="w-full py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#d4c5a9] mb-4">
            {t('timeline.title')}
          </h3>
          <p className="text-gray-400 text-lg">
            {t('timeline.subtitle')}
          </p>
        </motion.div>

        {/* 开始按钮 */}
        {!hasStarted && (
          <div className="text-center mb-8">
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-[#8b2020] text-white font-bold rounded hover:bg-[#a02525] transition-colors"
            >
              {t('timeline.startButton')}
            </button>
          </div>
        )}

        {/* 时间线容器 */}
        <div className="relative">
          {/* 横向滚动容器 (移动端) */}
          <div className="md:hidden overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max px-4">
              {events.map((event, index) => (
                <TimelineNode
                  key={index}
                  event={event}
                  index={index}
                  isActive={activeIndex !== null && index <= activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* 桌面端布局 */}
          <div className="hidden md:block">
            {/* 连接线 */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gray-800">
              <motion.div
                className="h-full bg-[#8b2020]"
                initial={{ width: '0%' }}
                animate={{
                  width:
                    activeIndex !== null
                      ? `${((activeIndex + 1) / events.length) * 100}%`
                      : '0%',
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* 节点 */}
            <div className="flex justify-between items-start relative">
              {events.map((event, index) => (
                <div key={index} className="flex-1 relative">
                  <TimelineNode
                    event={event}
                    index={index}
                    isActive={activeIndex !== null && index <= activeIndex}
                    onClick={() => setActiveIndex(index)}
                    desktop
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 详细信息卡片 */}
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              className="mt-8 p-6 bg-[#2a2a2a] border-2 border-[#8b2020] rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-2xl font-bold text-[#d4c5a9]">
                  {events[activeIndex].title}
                </h4>
                {events[activeIndex].country && (
                  <span className="px-3 py-1 bg-[#8b2020]/30 text-[#8b2020] text-sm rounded">
                    {events[activeIndex].country}
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-400">
                {events[activeIndex].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

interface TimelineNodeProps {
  event: TimelineEvent
  index: number
  isActive: boolean
  onClick: () => void
  desktop?: boolean
}

function TimelineNode({
  event,
  index,
  isActive,
  onClick,
  desktop = false,
}: TimelineNodeProps) {
  return (
    <motion.div
      className={`${desktop ? 'flex flex-col items-center' : 'flex-shrink-0 w-32'}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* 日期 */}
      <div className="text-center mb-3">
        <div className="text-xs text-gray-500 font-mono">{event.date}</div>
      </div>

      {/* 节点圆圈 */}
      <button
        onClick={onClick}
        className={`relative w-16 h-16 rounded-full border-4 transition-all duration-300 ${
          isActive
            ? 'bg-[#8b2020] border-[#8b2020] scale-110'
            : 'bg-gray-800 border-gray-700 hover:border-gray-600'
        }`}
      >
        {/* 多米诺骨牌倒下效果 */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#8b2020]"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* 索引号 */}
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {index + 1}
        </span>
      </button>

      {/* 标题 (移动端) */}
      {!desktop && (
        <div className="mt-3 text-center">
          <div className="text-xs text-gray-400 line-clamp-2">{event.title}</div>
        </div>
      )}
    </motion.div>
  )
}
