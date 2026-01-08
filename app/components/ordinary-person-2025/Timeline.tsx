'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface Project {
  id: string
  status: 'abandoned' | 'shelved' | 'paused'
}

const projects: Project[] = [
  { id: 'bazi', status: 'abandoned' },
  { id: 'quant', status: 'shelved' },
  { id: 'game', status: 'abandoned' },
  { id: 'chess', status: 'abandoned' },
  { id: 'werewolf', status: 'paused' },
]

const statusColors = {
  abandoned: '#E07A5F',
  shelved: '#F2CC8F',
  paused: '#81B29A',
}

export default function Timeline() {
  const t = useTranslations('ordinary-person-2025.timeline')

  return (
    <div className="my-12">
      <h3 className="text-center text-[#81B29A] text-sm tracking-[0.2em] mb-8">
        {t('title')}
      </h3>

      <div className="relative">
        {/* 时间线 */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#E8E2D5]" />

        {/* 项目列表 */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`relative flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:justify-center`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* 圆点 */}
              <div
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-1.5 border-2 border-[#FDFBF7]"
                style={{ backgroundColor: statusColors[project.status] }}
              />

              {/* 内容卡片 */}
              <div className={`ml-10 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                <div className="bg-[#F4F1EA] rounded-lg p-4 inline-block">
                  <div className="text-[#3D3D3D] font-medium text-sm mb-1">
                    {t(`projects.${project.id}.name`)}
                  </div>
                  <div className="text-[#3D3D3D]/60 text-xs mb-2">
                    {t(`projects.${project.id}.desc`)}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${statusColors[project.status]}20`,
                      color: statusColors[project.status],
                    }}
                  >
                    {t(`status.${project.status}`)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
