'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimelineEvent {
  date: string
  title: string
  description: string
  country?: string
}

const events: TimelineEvent[] = [
  {
    date: '6月28日',
    title: '萨拉热窝事件',
    description: '奥匈帝国皇储斐迪南大公在萨拉热窝被刺杀身亡',
    country: '波黑',
  },
  {
    date: '7月5日',
    title: '德国空白支票',
    description: '德国向奥匈帝国表示无条件支持',
    country: '德国',
  },
  {
    date: '7月23日',
    title: '最后通牒',
    description: '奥匈帝国向塞尔维亚发出包含十项条件的最后通牒',
    country: '奥匈',
  },
  {
    date: '7月28日',
    title: '局部冲突开始',
    description: '奥匈帝国对塞尔维亚宣战',
    country: '奥匈',
  },
  {
    date: '7月29-30日',
    title: '连锁反应开始',
    description: '俄国开始战争动员，作为斯拉夫人的保护者介入',
    country: '俄国',
  },
  {
    date: '8月1日',
    title: '德国参战',
    description: '德国对俄国宣战，法国开始军事动员',
    country: '德国',
  },
  {
    date: '8月3日',
    title: '入侵比利时',
    description: '德国对法国宣战，并入侵中立国比利时',
    country: '德国',
  },
  {
    date: '8月4日',
    title: '全球战争爆发',
    description: '英国对德国宣战，战争升级为全球冲突',
    country: '英国',
  },
]

export default function Timeline() {
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
            连锁反应：7天引爆全球
          </h3>
          <p className="text-gray-400 text-lg">
            点击时间线节点，查看战争如何一步步失控
          </p>
        </motion.div>

        {/* 开始按钮 */}
        {!hasStarted && (
          <div className="text-center mb-8">
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-[#8b2020] text-white font-bold rounded hover:bg-[#a02525] transition-colors"
            >
              观看连锁反应 →
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
