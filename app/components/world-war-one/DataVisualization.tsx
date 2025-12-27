'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function DataVisualization() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  const totalPopulation = 1700 // 百万
  const mobilized = 67 // 百万
  const percentage = (mobilized / totalPopulation) * 100

  useEffect(() => {
    if (isInView) {
      let current = 0
      const target = mobilized
      const duration = 2000 // 2秒
      const steps = 60
      const increment = target / steps
      const stepDuration = duration / steps

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isInView, mobilized])

  return (
    <div ref={ref} className="w-full py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#d4c5a9] mb-4">
            战争的规模
          </h3>
          <p className="text-gray-400">一场席卷全球的灾难</p>
        </motion.div>

        {/* 可视化 */}
        <div className="bg-[#2a2a2a] border-2 border-[#8b2020]/30 rounded-lg p-8 md:p-12">
          {/* 主要数字 */}
          <div className="text-center mb-8">
            <motion.div
              className="text-6xl md:text-8xl font-bold text-[#8b2020] mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              {count}00万
            </motion.div>
            <p className="text-xl md:text-2xl text-gray-400">参战人数</p>
          </div>

          {/* 比例可视化 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">占世界人口比例</span>
              <span className="text-lg font-bold text-[#d4c5a9]">
                {percentage.toFixed(1)}%
              </span>
            </div>

            {/* 进度条 */}
            <div className="relative h-8 bg-gray-800 rounded-full overflow-visible">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8b2020] to-[#a02525]"
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: `${percentage}%` } : {}}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </div>

              {/* 数字标签 - 放在进度条右侧外部 */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 flex items-center"
                initial={{ left: '0%', opacity: 0 }}
                animate={isInView ? { left: `${percentage}%`, opacity: 1 } : {}}
                transition={{ duration: 2, ease: 'easeOut' }}
              >
                <div className="ml-2 px-2 py-0.5 bg-[#8b2020] rounded text-xs font-bold text-white whitespace-nowrap">
                  {percentage.toFixed(1)}%
                </div>
              </motion.div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>0</span>
              <span>世界人口 17亿</span>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              number="2"
              label="主要阵营"
              sublabel="协约国 vs 同盟国"
              delay={0.2}
              isInView={isInView}
            />
            <StatCard
              number="4"
              label="战争年份"
              sublabel="1914 - 1918"
              delay={0.4}
              isInView={isInView}
            />
            <StatCard
              number="100万+"
              label="单场伤亡"
              sublabel="凡尔登战役"
              delay={0.6}
              isInView={isInView}
            />
          </div>
        </div>

        {/* 补充说明 */}
        <motion.p
          className="text-center text-sm text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          当时世界人口总数约为17亿，参战人数达到6700万，
          <br className="hidden md:block" />
          相当于每25个人中就有1人参与这场战争
        </motion.p>
      </div>
    </div>
  )
}

interface StatCardProps {
  number: string
  label: string
  sublabel: string
  delay: number
  isInView: boolean
}

function StatCard({ number, label, sublabel, delay, isInView }: StatCardProps) {
  return (
    <motion.div
      className="bg-black/50 border border-gray-800 rounded-lg p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
    >
      <div className="text-3xl font-bold text-[#d4c5a9] mb-1">{number}</div>
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-xs text-gray-600">{sublabel}</div>
    </motion.div>
  )
}
