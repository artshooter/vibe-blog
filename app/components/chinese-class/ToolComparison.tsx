'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function ToolComparison() {
  const t = useTranslations('chinese-class')

  return (
    <div className="space-y-12">
      <motion.p
        className="text-gray-600 mb-10 leading-loose text-lg max-w-3xl border-l-2 border-gray-200 pl-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t('content.section3.intro')}
      </motion.p>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Side: Nana Banana */}
        <motion.div
          className="border-t-2 border-purple-800 pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 text-2xl mb-2">Nana Banana</h4>
            <span className="text-sm font-medium text-purple-700 uppercase tracking-widest">
              {t('content.section3.point1.title')}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-gray-800 font-medium text-xl leading-relaxed">
              Logic First.
            </p>
            <p className="text-gray-500 italic">
              "Smarter at understanding complex prompts."
            </p>
            <div className="w-12 h-0.5 bg-gray-100 my-4"></div>
            <p className="text-gray-600 leading-loose">
              {t('content.section3.point1.content')}
            </p>
          </div>
        </motion.div>

        {/* Right Side: MidJourney */}
        <motion.div
          className="border-t-2 border-blue-800 pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 text-2xl mb-2">MidJourney</h4>
            <span className="text-sm font-medium text-blue-700 uppercase tracking-widest">
              {t('content.section3.point2.title')}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-gray-800 font-medium text-xl leading-relaxed">
              Aesthetics First.
            </p>
            <p className="text-gray-500 italic">
              "Better looking results out of the box."
            </p>
            <div className="w-12 h-0.5 bg-gray-100 my-4"></div>
            <p className="text-gray-600 leading-loose">
              {t('content.section3.point2.content')}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
